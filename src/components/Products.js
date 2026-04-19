import Link from 'next/link'
import { PRODUCTS, formatKES } from '@/data/products'

const PREVIEW = PRODUCTS.slice(0, 6)

export default function Products({ inView }) {
  return (
    <section id="products" className="py-28 px-6 bg-[#080c17]">
      <div className="max-w-7xl mx-auto">

        <div className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
          <div>
            <div className="text-[10px] tracking-[5px] text-[#00e5ff] uppercase font-mono mb-4">
              Product Range
            </div>
            <h2 className="text-[clamp(32px,4vw,52px)] font-black leading-tight tracking-tight text-white">
              Every Angle.<br />Every Environment.
            </h2>
          </div>
          <Link
            href="/products"
            className="self-start md:self-auto border border-[rgba(0,229,255,0.2)] text-[#00e5ff] text-[10px] tracking-[3px] uppercase px-6 py-3 hover:bg-[rgba(0,229,255,0.06)] transition-colors duration-200 font-mono whitespace-nowrap"
          >
            View Full Catalogue
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(0,229,255,0.06)]">
          {PREVIEW.map((p, i) => (
            <Link
              href={`/products/${p.code}`}
              key={p.id}
              className={`relative bg-[#080c17] group overflow-hidden hover:bg-[#0d1425] transition-colors duration-300 block ${inView ? `animate-scale-in delay-${(i + 1) * 100}` : 'opacity-0'}`}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, #080c17, rgba(8,12,23,0.3), transparent)' }}
                />

                <div className="absolute top-3 left-3 font-mono text-[9px] text-[#00e5ff] opacity-60 tracking-widest">
                  {p.code}
                </div>

                <div className="absolute top-3 right-3 border border-[rgba(0,229,255,0.25)] bg-[rgba(8,12,23,0.75)] text-[#00e5ff] font-mono text-[8px] tracking-widest px-2 py-1">
                  {p.category}
                </div>

                {/* Corner brackets on hover */}
                <svg className="absolute top-0 left-0 w-8 h-8 text-[#00e5ff] opacity-0 group-hover:opacity-50 transition-opacity duration-300" viewBox="0 0 32 32" fill="none">
                  <path d="M0 16 L0 0 L16 0" stroke="currentColor" strokeWidth="1" />
                </svg>
                <svg className="absolute top-0 right-0 w-8 h-8 text-[#00e5ff] opacity-0 group-hover:opacity-50 transition-opacity duration-300" viewBox="0 0 32 32" fill="none">
                  <path d="M32 16 L32 0 L16 0" stroke="currentColor" strokeWidth="1" />
                </svg>
                <svg className="absolute bottom-0 left-0 w-8 h-8 text-[#00e5ff] opacity-0 group-hover:opacity-50 transition-opacity duration-300" viewBox="0 0 32 32" fill="none">
                  <path d="M0 16 L0 32 L16 32" stroke="currentColor" strokeWidth="1" />
                </svg>
                <svg className="absolute bottom-0 right-0 w-8 h-8 text-[#00e5ff] opacity-0 group-hover:opacity-50 transition-opacity duration-300" viewBox="0 0 32 32" fill="none">
                  <path d="M32 16 L32 32 L16 32" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="flex items-baseline justify-between mb-2 gap-4">
                  <h3 className="font-black text-lg tracking-wide text-white">{p.name}</h3>
                  <div className="font-mono text-[11px] text-[#00e5ff] tracking-[2px] whitespace-nowrap">
                    {formatKES(p.price)}
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{p.desc}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {p.specs.map((spec) => (
                    <span
                      key={spec}
                      className="border border-[rgba(0,229,255,0.12)] text-gray-500 font-mono text-[9px] tracking-[1px] px-2 py-1"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="text-[10px] tracking-[3px] text-[#00e5ff] uppercase font-mono flex items-center gap-3">
                  View and Order
                  <div className="w-8 h-px bg-[#00e5ff] group-hover:w-14 transition-all duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
