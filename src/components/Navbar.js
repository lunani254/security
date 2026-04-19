'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { CATEGORIES } from '@/data/products'

// Categories worth surfacing in the dropdown (skip the "all" pseudo-category)
const NAV_TYPES = CATEGORIES.filter((c) => c.id !== 'all')

export default function Navbar() {
  const [open, setOpen] = useState(false)        // mobile drawer
  const [typesOpen, setTypesOpen] = useState(false) // desktop dropdown
  const dropRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    if (!typesOpen) return
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setTypesOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [typesOpen])

  // Close drawer on escape, lock body scroll
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(8,12,23,0.95)] backdrop-blur-md border-b border-[rgba(0,229,255,0.08)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Logo />
            <div>
              <div className="font-black tracking-[4px] text-[15px] leading-none text-white">
                OMNIVEIL
              </div>
              <div
                className="text-[8px] text-[#00e5ff] tracking-[5px] leading-none mt-1"
                style={{ fontWeight: 300 }}
              >
                SECURITY
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8 text-[11px] tracking-[2px] text-gray-400 uppercase font-mono">
            <Link href="/#services" className="hover:text-[#00e5ff] transition-colors duration-200">
              Services
            </Link>

            {/* Products dropdown */}
            <div className="relative" ref={dropRef}>
              <button
                type="button"
                onClick={() => setTypesOpen((v) => !v)}
                className={`flex items-center gap-2 transition-colors duration-200 ${
                  typesOpen ? 'text-[#00e5ff]' : 'hover:text-[#00e5ff]'
                }`}
                aria-expanded={typesOpen}
                aria-haspopup="true"
              >
                Products
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 10 10"
                  fill="none"
                  className={`transition-transform duration-200 ${typesOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M2 4 L5 7 L8 4" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>

              {typesOpen && (
                <div className="absolute top-full right-0 mt-3 w-[460px] bg-[#0b111e] border border-[rgba(0,229,255,0.18)] shadow-[0_20px_60px_rgba(0,0,0,0.6)] animate-fade-in">
                  <div className="p-5 border-b border-[rgba(0,229,255,0.08)] flex items-center justify-between">
                    <div className="text-[9px] tracking-[4px] text-[#00e5ff] uppercase font-mono">
                      Browse by Type
                    </div>
                    <Link
                      href="/products"
                      onClick={() => setTypesOpen(false)}
                      className="text-[9px] tracking-[3px] text-gray-500 uppercase font-mono hover:text-[#00e5ff] transition-colors"
                    >
                      View all
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-px bg-[rgba(0,229,255,0.05)]">
                    {NAV_TYPES.map((c) => (
                      <Link
                        key={c.id}
                        href={`/products?type=${c.id}`}
                        onClick={() => setTypesOpen(false)}
                        className="bg-[#0b111e] hover:bg-[#0d1425] px-4 py-3 text-[10px] tracking-[2px] uppercase font-mono text-gray-400 hover:text-[#00e5ff] transition-colors"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/#why" className="hover:text-[#00e5ff] transition-colors duration-200">
              Why Us
            </Link>
            <Link href="/#contact" className="hover:text-[#00e5ff] transition-colors duration-200">
              Contact
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+254780741147"
              className="hidden xl:block text-[11px] tracking-[1px] text-gray-500 hover:text-[#00e5ff] transition-colors duration-200 font-mono"
            >
              +254 780 741 147
            </a>
            <Link
              href="/products"
              className="hidden sm:block text-[11px] tracking-[2px] uppercase bg-[#00e5ff] text-[#080c17] font-black px-5 py-2.5 hover:opacity-90 transition-opacity duration-200"
            >
              Order Now
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="lg:hidden text-gray-300 hover:text-[#00e5ff] transition-colors p-1"
              aria-label="Open menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden animate-fade-in">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-[rgba(4,7,14,0.85)] backdrop-blur-sm"
          />

          <aside className="absolute top-0 right-0 bottom-0 w-[88vw] max-w-sm bg-[#0b111e] border-l border-[rgba(0,229,255,0.18)] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-[rgba(0,229,255,0.08)]">
              <div className="text-[9px] tracking-[4px] text-[#00e5ff] uppercase font-mono">
                Menu
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
                aria-label="Close menu"
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M5 5 L17 17 M17 5 L5 17" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
            </div>

            <nav className="p-5 space-y-1">
              <DrawerLink href="/" onClick={() => setOpen(false)}>Home</DrawerLink>
              <DrawerLink href="/products" onClick={() => setOpen(false)}>Catalogue</DrawerLink>
              <DrawerLink href="/#services" onClick={() => setOpen(false)}>Services</DrawerLink>
              <DrawerLink href="/#why" onClick={() => setOpen(false)}>Why Us</DrawerLink>
              <DrawerLink href="/#contact" onClick={() => setOpen(false)}>Contact</DrawerLink>
            </nav>

            <div className="px-5 pb-2 pt-4 text-[9px] tracking-[4px] text-[#00e5ff] uppercase font-mono">
              Camera Types
            </div>
            <div className="grid grid-cols-2 gap-px bg-[rgba(0,229,255,0.05)] mx-5 mb-6 mt-2">
              {NAV_TYPES.map((c) => (
                <Link
                  key={c.id}
                  href={`/products?type=${c.id}`}
                  onClick={() => setOpen(false)}
                  className="bg-[#0b111e] hover:bg-[#0d1425] px-3 py-3 text-[10px] tracking-[2px] uppercase font-mono text-gray-400 hover:text-[#00e5ff] transition-colors text-center"
                >
                  {c.label}
                </Link>
              ))}
            </div>

            <div className="px-5 pb-6 space-y-3 border-t border-[rgba(0,229,255,0.08)] pt-5">
              <a
                href="tel:+254780741147"
                onClick={() => setOpen(false)}
                className="block text-center text-[11px] tracking-[2px] text-gray-300 font-mono py-3 border border-[rgba(0,229,255,0.2)] hover:border-[#00e5ff] hover:text-[#00e5ff] transition-colors"
              >
                Call Sales
              </a>
              <a
                href="https://wa.me/254780741147"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="block text-center text-[11px] tracking-[2px] text-[#080c17] font-black uppercase bg-[#00e5ff] py-3 hover:opacity-90 transition-opacity"
              >
                WhatsApp Us
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}

function DrawerLink({ href, onClick, children }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-3 py-3 text-[13px] tracking-[2px] uppercase font-mono text-gray-300 hover:text-[#00e5ff] hover:bg-[rgba(0,229,255,0.04)] transition-colors"
    >
      {children}
    </Link>
  )
}

function Logo() {
  return (
    <svg width="34" height="34" viewBox="0 0 90 90" fill="none">
      <defs>
        <radialGradient id="nlg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="45" cy="45" r="42" fill="url(#nlg)" />
      <polygon
        points="45,5 80,25 80,65 45,85 10,65 10,25"
        stroke="#00e5ff"
        strokeWidth="1.5"
        opacity="0.35"
      />
      <circle cx="45" cy="45" r="28" fill="#001522" />
      <circle cx="45" cy="45" r="28" stroke="#00e5ff" strokeWidth="2" opacity="0.85" />
      <circle cx="45" cy="45" r="8" fill="#00e5ff" />
      <circle cx="45" cy="45" r="3.5" fill="white" />
      <line x1="17" y1="45" x2="30" y2="45" stroke="#00e5ff" strokeWidth="1.2" opacity="0.6" />
      <line x1="60" y1="45" x2="73" y2="45" stroke="#00e5ff" strokeWidth="1.2" opacity="0.6" />
      <line x1="45" y1="17" x2="45" y2="30" stroke="#00e5ff" strokeWidth="1.2" opacity="0.6" />
      <line x1="45" y1="60" x2="45" y2="73" stroke="#00e5ff" strokeWidth="1.2" opacity="0.6" />
    </svg>
  )
}
