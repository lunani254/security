'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import CCTVBrackets from './CCTVBrackets'

function useLiveTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const pad = (n) => String(n).padStart(2, '0')
    const update = () => {
      const now = new Date()
      setTime(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Hero({ inView }) {
  const time = useLiveTime()
  const cursorRef = useRef(null)
  const labelRef = useRef(null)
  const [showLabel, setShowLabel] = useState(false)

  const handleMouseMove = useCallback((e) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = e.clientX + 'px'
      cursorRef.current.style.top = e.clientY + 'px'
    }
    if (labelRef.current) {
      labelRef.current.style.left = e.clientX + 22 + 'px'
      labelRef.current.style.top = e.clientY + 22 + 'px'
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    const timer = setTimeout(() => setShowLabel(true), 1200)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timer)
    }
  }, [handleMouseMove])

  return (
    <>
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="fixed z-999 pointer-events-none"
        style={{ transform: 'translate(-50%, -50%)', transition: 'left 0.04s linear, top 0.04s linear' }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" stroke="#00e5ff" strokeWidth="0.75" opacity="0.4" />
          <line x1="20" y1="2" x2="20" y2="10" stroke="#00e5ff" strokeWidth="1" opacity="0.8" />
          <line x1="20" y1="30" x2="20" y2="38" stroke="#00e5ff" strokeWidth="1" opacity="0.8" />
          <line x1="2" y1="20" x2="10" y2="20" stroke="#00e5ff" strokeWidth="1" opacity="0.8" />
          <line x1="30" y1="20" x2="38" y2="20" stroke="#00e5ff" strokeWidth="1" opacity="0.8" />
          <circle cx="20" cy="20" r="2" fill="#00e5ff" opacity="0.9" />
        </svg>
      </div>

      {/* Subject detected label */}
      {showLabel && (
        <div
          ref={labelRef}
          className="fixed z-998 pointer-events-none hidden md:block"
          style={{ transition: 'left 0.06s linear, top 0.06s linear' }}
        >
          <div
            className="text-[9px] font-mono text-[#00e5ff] border border-[rgba(0,229,255,0.3)] bg-[rgba(8,12,23,0.9)] px-2 py-1 whitespace-nowrap tracking-[2px]"
          >
            SUBJECT DETECTED
          </div>
        </div>
      )}

      {/* Hero section */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">

        {/* Grid background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Scan line */}
        <div
          className="absolute left-0 right-0 h-px animate-scan-line pointer-events-none z-10"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent)' }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8,12,23,0.85) 100%)' }}
        />

        {/* HUD top-left */}
        <div className="absolute top-20 left-6 z-20 font-mono text-[10px] text-[#00e5ff] opacity-60 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-blink-rec" />
            <span className="tracking-widest">REC</span>
          </div>
          <div className="tracking-widest">{time}</div>
          <div className="tracking-widest">CAM 01 / NBI-HQ</div>
        </div>

        {/* HUD top-right */}
        <div className="absolute top-20 right-6 z-20 font-mono text-[10px] text-[#00e5ff] opacity-60 text-right space-y-1">
          <div className="tracking-widest">OMNIVEIL SECURITY</div>
          <div className="tracking-widest">MOTION : ACTIVE</div>
          <div className="tracking-widest">NAIROBI, KENYA</div>
        </div>

        {/* Corner brackets */}
        <div className="absolute inset-6 pointer-events-none z-10">
          <svg className="absolute top-0 left-0 w-16 h-16 text-[#00e5ff]" viewBox="0 0 64 64" fill="none">
            <path d="M0 32 L0 0 L32 0" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          </svg>
          <svg className="absolute top-0 right-0 w-16 h-16 text-[#00e5ff]" viewBox="0 0 64 64" fill="none">
            <path d="M64 32 L64 0 L32 0" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          </svg>
          <svg className="absolute bottom-0 left-0 w-16 h-16 text-[#00e5ff]" viewBox="0 0 64 64" fill="none">
            <path d="M0 32 L0 64 L32 64" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          </svg>
          <svg className="absolute bottom-0 right-0 w-16 h-16 text-[#00e5ff]" viewBox="0 0 64 64" fill="none">
            <path d="M64 32 L64 64 L32 64" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          </svg>
        </div>

        {/* Main content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">

          {/* Left: text */}
          <div>
            <div className={`text-[10px] tracking-[5px] text-[#00e5ff] uppercase mb-6 font-mono ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
              Professional CCTV Installation / Nairobi
            </div>

            <h1 className={`text-[clamp(42px,6vw,80px)] font-black leading-none tracking-tight mb-8 text-white ${inView ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
              Everything<br />
              Is Being<br />
              <span className="text-[#00e5ff]">Watched.</span>
            </h1>

            <p className={`text-gray-400 text-base leading-relaxed max-w-md mb-10 ${inView ? 'animate-fade-up delay-300' : 'opacity-0'}`}>
              OmniVeil Security designs and installs professional surveillance systems
              for homes and businesses across Nairobi. From a single camera to a
              full enterprise network, we secure it all.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 ${inView ? 'animate-fade-up delay-400' : 'opacity-0'}`}>
              <Link
                href="/products"
                className="inline-block bg-[#00e5ff] text-[#080c17] font-black text-[11px] tracking-[3px] uppercase px-8 py-4 hover:opacity-90 transition-opacity duration-200"
              >
                Browse Products
              </Link>
              <a
                href="#services"
                className="inline-block border border-[rgba(0,229,255,0.25)] text-gray-400 text-[11px] tracking-[3px] uppercase px-8 py-4 hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all duration-200"
              >
                Our Services
              </a>
            </div>
          </div>

          {/* Right: live feed mockup */}
          <div className={`hidden lg:block ${inView ? 'animate-scale-in delay-300' : 'opacity-0'}`}>
            <CCTVBrackets>
              <div className="relative aspect-video overflow-hidden bg-[#0d1425] border border-[rgba(0,229,255,0.1)]">
                <img
                  src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=900&q=80"
                  alt="Security camera live feed"
                  className="w-full h-full object-cover opacity-50 grayscale"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, #080c17, transparent)' }}
                />
                <div className="absolute top-3 left-3 font-mono text-[9px] text-[#00e5ff] opacity-80 space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-red-500 animate-blink-rec" />
                    <span className="tracking-widest">LIVE</span>
                  </div>
                  <div className="tracking-widest">{time}</div>
                </div>
                <div className="absolute bottom-3 right-3 font-mono text-[9px] text-[#00e5ff] opacity-60 tracking-widest">
                  FEED 01 / 06
                </div>
                <div
                  className="absolute left-0 right-0 h-px animate-scan-line"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.5), transparent)' }}
                />
              </div>
            </CCTVBrackets>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
          <div className="text-[9px] tracking-[4px] text-gray-600 uppercase font-mono">Scroll</div>
          <div
            className="w-px h-12 opacity-40"
            style={{ background: 'linear-gradient(to bottom, #00e5ff, transparent)' }}
          />
        </div>
      </section>
    </>
  )
}