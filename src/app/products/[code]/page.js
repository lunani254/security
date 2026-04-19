'use client'
import { useMemo, useState, use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import OrderForm from '@/components/OrderForm'
import {
  PRODUCTS,
  findProductByCode,
  formatKES,
  WHATSAPP_NUMBERS,
  INSTALLATION_FEE,
} from '@/data/products'

// Universal benefits OmniVeil offers on every install
const BENEFITS = [
  {
    title: 'Free Site Survey',
    body: 'A technician walks the property with you, marks camera positions, and confirms cabling routes before you commit.',
  },
  {
    title: 'Certified Installation',
    body: 'Mounted, aligned, sealed and labelled by trained installers. Cables routed cleanly so the result looks intentional.',
  },
  {
    title: '12-Month Warranty',
    body: 'Local warranty on the camera plus our workmanship. If anything fails in the first year we replace it, no shipping abroad.',
  },
  {
    title: 'Remote View Setup',
    body: 'We configure the mobile app on your phone before we leave site, so you can watch the feed from anywhere.',
  },
]

export default function ProductDetailPage({ params }) {
  const { code } = use(params)
  const product = useMemo(() => findProductByCode(code), [code])
  const [orderOpen, setOrderOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const related = useMemo(() => {
    if (!product) return []
    const primaryType = product.types?.[0]
    const sameType = PRODUCTS.filter(
      (p) => p.id !== product.id && p.types?.includes(primaryType),
    )
    const pool = sameType.length
      ? sameType
      : PRODUCTS.filter((p) => p.id !== product.id)
    return pool.slice(0, 4)
  }, [product])

  if (!product) return notFound()

  // Build a feature list from available data so every product gets bullets
  const featureLines = [
    `${product.resolution} sensor delivers crisp, professional surveillance footage`,
    ...product.specs.map((s) => `${s} included on this model`),
    product.environment === 'outdoor'
      ? 'Weatherproof housing rated for the Kenyan outdoors'
      : product.environment === 'hybrid'
        ? 'Indoor and outdoor capable, mountable on most surfaces'
        : 'Discreet indoor form factor that fits any room',
  ]

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/products/${product.code}`
    : `https://omniveil.security/products/${product.code}`
  const shareText = `${product.name} from OmniVeil Security at ${formatKES(product.price)}`

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // ignore
    }
  }

  return (
    <div className="bg-[#080c17] text-white min-h-screen">
      <Navbar />

      {/* Breadcrumb */}
      <section className="pt-24 px-6 border-b border-[rgba(0,229,255,0.05)]">
        <div className="max-w-7xl mx-auto py-4 flex items-center gap-3 font-mono text-[10px] tracking-[3px] uppercase flex-wrap">
          <Link href="/" className="text-gray-600 hover:text-[#00e5ff] transition-colors">
            Home
          </Link>
          <span className="text-gray-700">/</span>
          <Link href="/products" className="text-gray-600 hover:text-[#00e5ff] transition-colors">
            Catalogue
          </Link>
          <span className="text-gray-700">/</span>
          <span className="text-[#00e5ff]">{product.code}</span>
        </div>
      </section>

      {/* Detail header */}
      <section className="px-6 py-14 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Image column */}
          <div className="lg:col-span-6">
            <div className="relative aspect-square bg-[#0b111e] border border-[rgba(0,229,255,0.12)] overflow-hidden">
              <CornerBrackets />
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-4 left-4 font-mono text-[10px] text-[#00e5ff] tracking-[3px] opacity-80">
                {product.code}
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-2 font-mono text-[9px] text-red-400 tracking-[3px]">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                LIVE
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div className="font-mono text-[8px] text-gray-500 tracking-[3px]">
                  {product.brand?.toUpperCase()}
                  {product.model ? ` / ${product.model}` : ''}
                </div>
                <div className="font-mono text-[8px] text-gray-500 tracking-[3px]">
                  RES: {product.resolution}
                </div>
              </div>

              <div
                className="absolute left-0 right-0 h-px animate-scan-line pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.45), transparent)' }}
              />
            </div>

            {/* Thumbnail strip placeholder (active state on the only image) */}
            <div className="mt-3 flex gap-3">
              <div className="w-20 h-20 border-2 border-[#00e5ff] bg-[#0b111e] overflow-hidden">
                <img src={product.img} alt="" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Meta strip */}
            <div className="grid grid-cols-3 gap-px mt-5 bg-[rgba(0,229,255,0.08)]">
              <MetaCell label="Environment" value={product.environment} />
              <MetaCell label="Resolution" value={product.resolution} />
              <MetaCell label="Brand" value={product.brand || 'OmniVeil'} />
            </div>
          </div>

          {/* Content column */}
          <div className="lg:col-span-6 flex flex-col">

            <div className="text-[10px] tracking-[5px] text-[#00e5ff] uppercase font-mono mb-3">
              {product.category}
            </div>

            <h1 className="text-[clamp(32px,4vw,52px)] font-black leading-[1.05] tracking-tight text-white mb-4">
              {product.name}
            </h1>

            {product.model && (
              <div className="font-mono text-[11px] text-gray-500 tracking-[2px] mb-4">
                Model: {product.model}
              </div>
            )}

            {/* Price + rating row */}
            <div className="flex items-baseline gap-5 mb-6 flex-wrap">
              <div className="text-[clamp(28px,3vw,38px)] font-black text-[#00e5ff] tracking-tight leading-none">
                {formatKES(product.price)}
              </div>
              <div className="flex items-center gap-2 text-[10px] tracking-[2px] uppercase font-mono text-gray-500">
                <Stars />
                <span>In stock, ships within 24h</span>
              </div>
            </div>

            <p className="text-gray-400 text-[15px] leading-relaxed mb-6">
              {product.long || product.desc}
            </p>

            {/* Quick action: open quote modal */}
            <div className="border border-[rgba(0,229,255,0.18)] bg-[rgba(0,229,255,0.02)] p-5 mb-6">
              <div className="text-[9px] tracking-[4px] text-[#00e5ff] uppercase font-mono mb-3">
                Get this camera
              </div>
              <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
                <div className="text-[11px] text-gray-400 leading-relaxed">
                  Add quantity, choose installation, send a pre-filled WhatsApp quote.
                </div>
                <div className="font-mono text-[10px] text-gray-500">
                  Install +{formatKES(INSTALLATION_FEE)}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOrderOpen(true)}
                  className="bg-[#00e5ff] text-[#080c17] font-black text-[11px] tracking-[3px] uppercase py-4 hover:opacity-90 transition-opacity"
                >
                  Build Quote
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBERS[0].number}?text=${encodeURIComponent(`Hello OmniVeil, I'm interested in ${product.name} (${product.code}) at ${formatKES(product.price)}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-[#25D366] text-[#25D366] font-black text-[11px] tracking-[3px] uppercase py-4 text-center hover:bg-[#25D366] hover:text-[#05140a] transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.52 3.48A11.77 11.77 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.85 11.85 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44Zm-8.46 18.3h-.01a9.82 9.82 0 0 1-5.01-1.37l-.36-.22-3.74.98 1-3.64-.23-.38a9.8 9.8 0 1 1 18.18-5.24 9.82 9.82 0 0 1-9.83 9.87Z" />
                  </svg>
                  Quick WhatsApp
                </a>
              </div>
            </div>

            {/* Quick contact strip */}
            <div className="grid grid-cols-2 gap-3 mb-2">
              <a
                href="tel:+254780741147"
                className="border border-[rgba(0,229,255,0.18)] text-gray-400 text-[10px] tracking-[3px] uppercase font-mono py-3 text-center hover:border-[#00e5ff] hover:text-[#00e5ff] transition-colors"
              >
                Call Sales
              </a>
              <Link
                href="/products"
                className="border border-[rgba(0,229,255,0.18)] text-gray-400 text-[10px] tracking-[3px] uppercase font-mono py-3 text-center hover:border-[#00e5ff] hover:text-[#00e5ff] transition-colors"
              >
                Back to Catalogue
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Description + Features + Specs */}
      <section className="px-6 py-14 border-t border-[rgba(0,229,255,0.08)] bg-[#06090f]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="Product" title="Description" />
            <div className="space-y-4 text-gray-400 text-[15px] leading-relaxed">
              <p>{product.long || product.desc}</p>
              <p>
                Every {product.brand || 'OmniVeil'} camera we ship is paired with a
                local Nairobi setup, professional cabling and full mobile app
                configuration so you can review footage from anywhere.
              </p>
            </div>

            <SectionHeader eyebrow="What you get" title="Key Features" className="mt-12" />
            <ul className="space-y-3">
              {featureLines.map((line, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-[#00e5ff] shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Spec sheet sidebar */}
          <aside className="lg:col-span-5">
            <div className="border border-[rgba(0,229,255,0.15)] bg-[#0b111e]">
              <div className="px-5 py-3 border-b border-[rgba(0,229,255,0.1)] flex items-center justify-between">
                <span className="text-[9px] tracking-[4px] text-[#00e5ff] uppercase font-mono">
                  Specifications
                </span>
                <span className="text-[9px] tracking-[3px] text-gray-600 uppercase font-mono">
                  {product.code}
                </span>
              </div>
              <dl className="divide-y divide-[rgba(0,229,255,0.06)]">
                <SpecRow label="Brand" value={product.brand || 'OmniVeil'} />
                {product.model && <SpecRow label="Model" value={product.model} />}
                <SpecRow label="Category" value={product.category} />
                <SpecRow label="Resolution" value={product.resolution} />
                <SpecRow label="Environment" value={product.environment} />
                <SpecRow label="Unit Price" value={formatKES(product.price)} />
                <SpecRow label="Installation" value={`+${formatKES(INSTALLATION_FEE)}`} />
                <SpecRow label="Warranty" value="12 Months" />
              </dl>
            </div>

            {/* Share row */}
            <div className="mt-6 border border-[rgba(0,229,255,0.1)] bg-[#0b111e]">
              <div className="px-5 py-3 border-b border-[rgba(0,229,255,0.08)] text-[9px] tracking-[4px] text-[#00e5ff] uppercase font-mono">
                Share this product
              </div>
              <div className="grid grid-cols-4 gap-px bg-[rgba(0,229,255,0.06)]">
                <ShareButton
                  href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
                  label="WhatsApp"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.77 11.77 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.85 11.85 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44Z" /></svg>
                </ShareButton>
                <ShareButton
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  label="Facebook"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V5h-3a4 4 0 0 0-4 4v2H7v3h3v8h3v-8h3l1-3h-4V9a1 1 0 0 1 1-1Z" /></svg>
                </ShareButton>
                <ShareButton
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                  label="X / Twitter"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 3h3l-7.5 8.6L22 21h-6.4l-5-6.5L4.7 21H2l8-9.2L1.6 3H8l4.5 5.9L18 3Z" /></svg>
                </ShareButton>
                <button
                  type="button"
                  onClick={onCopy}
                  className="bg-[#0b111e] hover:bg-[#0d1425] text-gray-400 hover:text-[#00e5ff] transition-colors flex flex-col items-center justify-center gap-1.5 py-4"
                  aria-label="Copy product link"
                >
                  {copied ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8 L7 12 L13 4" stroke="#00e5ff" strokeWidth="1.6" />
                      </svg>
                      <span className="text-[8px] tracking-[2px] uppercase font-mono text-[#00e5ff]">Copied</span>
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <rect x="6" y="6" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M4 16V5a1 1 0 0 1 1-1h11" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                      <span className="text-[8px] tracking-[2px] uppercase font-mono">Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Benefits / What you get */}
      <section className="px-6 py-16 border-t border-[rgba(0,229,255,0.08)]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Included with every order" title="Why buy from OmniVeil" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(0,229,255,0.06)]">
            {BENEFITS.map((b, i) => (
              <div key={i} className="bg-[#0b111e] p-6">
                <div className="text-[10px] tracking-[4px] text-[#00e5ff] uppercase font-mono mb-3">
                  0{i + 1}
                </div>
                <h3 className="text-white font-black tracking-wide text-base mb-3">
                  {b.title}
                </h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Need Help card */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto border border-[rgba(0,229,255,0.18)] bg-[rgba(0,229,255,0.03)] p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7">
            <div className="text-[10px] tracking-[5px] text-[#00e5ff] uppercase font-mono mb-3">
              Need Help?
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
              Talk to our team
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
              Not sure if {product.name} is the right fit? Our installers can
              recommend the best camera for your space and walk you through pricing.
            </p>
          </div>
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBERS[1].number}?text=${encodeURIComponent(`Hello OmniVeil Support, I have a question about ${product.name} (${product.code}).`)}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] text-[#05140a] font-black text-[11px] tracking-[3px] uppercase py-4 text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.77 11.77 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.85 11.85 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44Z" /></svg>
              WhatsApp Support
            </a>
            <a
              href="tel:+254106871484"
              className="border border-[#00e5ff] text-[#00e5ff] font-black text-[11px] tracking-[3px] uppercase py-4 text-center hover:bg-[#00e5ff] hover:text-[#080c17] transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Related cameras */}
      {related.length > 0 && (
        <section className="px-6 py-14 border-t border-[rgba(0,229,255,0.08)] bg-[#06090f]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-8 gap-6 flex-wrap">
              <div>
                <div className="text-[10px] tracking-[5px] text-[#00e5ff] uppercase font-mono mb-3">
                  You might also like
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                  Featured Items
                </h2>
              </div>
              <Link
                href="/products"
                className="font-mono text-[10px] tracking-[3px] uppercase text-gray-500 hover:text-[#00e5ff] transition-colors"
              >
                View all
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(0,229,255,0.06)]">
              {related.map((r) => (
                <Link
                  href={`/products/${r.code}`}
                  key={r.id}
                  className="group bg-[#080c17] hover:bg-[#0d1425] transition-colors duration-300 overflow-hidden"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={r.img}
                      alt={r.name}
                      className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, #080c17, rgba(8,12,23,0.2), transparent)' }}
                    />
                    <div className="absolute top-3 left-3 font-mono text-[9px] text-[#00e5ff] opacity-70 tracking-widest">
                      {r.code}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="font-mono text-[9px] text-gray-500 tracking-[3px] mb-2">
                      {r.category}
                    </div>
                    <h3 className="font-black text-sm tracking-wide text-white mb-2 line-clamp-2">
                      {r.name}
                    </h3>
                    <div className="font-mono text-[12px] text-[#00e5ff] tracking-[2px]">
                      {formatKES(r.price)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

      <OrderForm
        key={orderOpen ? product.id : 'closed'}
        product={orderOpen ? product : null}
        onClose={() => setOrderOpen(false)}
      />
    </div>
  )
}

function CornerBrackets() {
  return (
    <>
      <svg className="absolute top-0 left-0 w-10 h-10 text-[#00e5ff] pointer-events-none z-10" viewBox="0 0 32 32" fill="none">
        <path d="M0 16 L0 0 L16 0" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
      </svg>
      <svg className="absolute top-0 right-0 w-10 h-10 text-[#00e5ff] pointer-events-none z-10" viewBox="0 0 32 32" fill="none">
        <path d="M32 16 L32 0 L16 0" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-10 h-10 text-[#00e5ff] pointer-events-none z-10" viewBox="0 0 32 32" fill="none">
        <path d="M0 16 L0 32 L16 32" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-10 h-10 text-[#00e5ff] pointer-events-none z-10" viewBox="0 0 32 32" fill="none">
        <path d="M32 16 L32 32 L16 32" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
      </svg>
    </>
  )
}

function MetaCell({ label, value }) {
  return (
    <div className="bg-[#080c17] px-4 py-3">
      <div className="text-[8px] tracking-[3px] text-gray-600 uppercase font-mono mb-1">
        {label}
      </div>
      <div className="text-[11px] text-gray-200 font-mono tracking-[1px] capitalize">
        {value}
      </div>
    </div>
  )
}

function SectionHeader({ eyebrow, title, className = '' }) {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="text-[9px] tracking-[5px] text-[#00e5ff] uppercase font-mono mb-3">
        {eyebrow}
      </div>
      <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
        {title}
      </h2>
    </div>
  )
}

function SpecRow({ label, value }) {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <dt className="text-[10px] tracking-[2px] text-gray-500 uppercase font-mono">
        {label}
      </dt>
      <dd className="text-[13px] text-gray-200 font-mono tracking-[1px] text-right capitalize">
        {value}
      </dd>
    </div>
  )
}

function ShareButton({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Share on ${label}`}
      className="bg-[#0b111e] hover:bg-[#0d1425] text-gray-400 hover:text-[#00e5ff] transition-colors flex flex-col items-center justify-center gap-1.5 py-4"
    >
      {children}
      <span className="text-[8px] tracking-[2px] uppercase font-mono">{label}</span>
    </a>
  )
}

function Stars() {
  return (
    <div className="flex items-center gap-0.5 text-[#00e5ff]">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="10" height="10" viewBox="0 0 12 12" fill="currentColor">
          <path d="M6 0.5 L7.5 4 L11 4.5 L8.4 7 L9 10.5 L6 8.8 L3 10.5 L3.6 7 L1 4.5 L4.5 4 Z" />
        </svg>
      ))}
    </div>
  )
}
