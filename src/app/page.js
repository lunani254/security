'use client'
import { useRef, useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Products from '@/components/Products'
import WhyUs from '@/components/WhyUs'
import CTA from '@/components/Cta'
import Footer from '@/components/Footer'

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}

export default function HomePage() {
  const [heroRef, heroIn]         = useInView(0.1)
  const [servicesRef, servicesIn] = useInView()
  const [productsRef, productsIn] = useInView()
  const [whyRef, whyIn]           = useInView()
  const [ctaRef, ctaIn]           = useInView()

  return (
    <div className="bg-[#080c17] text-white min-h-screen overflow-x-hidden">

      <Navbar />

      <div ref={heroRef}>
        <Hero inView={heroIn} />
      </div>

      <div className="border-t border-[rgba(0,229,255,0.06)]" />

      <div ref={servicesRef}>
        <Services inView={servicesIn} />
      </div>

      <div className="border-t border-[rgba(0,229,255,0.06)]" />

      <div ref={productsRef}>
        <Products inView={productsIn} />
      </div>

      <div className="border-t border-[rgba(0,229,255,0.06)]" />

      <div ref={whyRef}>
        <WhyUs inView={whyIn} />
      </div>

      <div className="border-t border-[rgba(0,229,255,0.06)]" />

      <div ref={ctaRef}>
        <CTA inView={ctaIn} />
      </div>

      <Footer />

    </div>
  )
}