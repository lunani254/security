'use client'
import { Suspense, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import OrderForm from '@/components/OrderForm'
import {
  PRODUCTS,
  CATEGORIES,
  ENVIRONMENTS,
  RESOLUTIONS,
  BRANDS,
  formatKES,
} from '@/data/products'

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="bg-[#080c17] min-h-screen" />}>
      <ProductsPageInner />
    </Suspense>
  )
}

const PRICE_BANDS = [
  { id: 'all', label: 'Any', match: () => true },
  { id: 'lt10k', label: 'Under 10k', match: (p) => p.price < 10000 },
  { id: '10to20k', label: '10k to 20k', match: (p) => p.price >= 10000 && p.price < 20000 },
  { id: 'gte20k', label: '20k and above', match: (p) => p.price >= 20000 },
]

const categoryFromParam = (t) =>
  t && CATEGORIES.some((c) => c.id === t) ? t : 'all'

function ProductsPageInner() {
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type')

  const [category, setCategory] = useState(() => categoryFromParam(typeParam))
  const [envs, setEnvs] = useState([]) // multi
  const [resolutions, setResolutions] = useState([]) // multi
  const [brands, setBrands] = useState([]) // multi
  const [priceBand, setPriceBand] = useState('all')
  const [sort, setSort] = useState('featured')
  const [query, setQuery] = useState('')
  const [activeProduct, setActiveProduct] = useState(null)

  // Sync category when the ?type= query param changes (nav-link click)
  // Storing the previous value in state is the recommended React pattern.
  const [lastTypeParam, setLastTypeParam] = useState(typeParam)
  if (typeParam !== lastTypeParam) {
    setLastTypeParam(typeParam)
    setCategory(categoryFromParam(typeParam))
  }

  const toggle = (list, setList, value) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let items = PRODUCTS.filter((p) => {
      if (category !== 'all' && !p.types.includes(category)) return false
      if (envs.length && !envs.includes(p.environment)) return false
      if (resolutions.length && !resolutions.includes(p.resolution)) return false
      if (brands.length && !brands.includes(p.brand)) return false
      const band = PRICE_BANDS.find((b) => b.id === priceBand) || PRICE_BANDS[0]
      if (!band.match(p)) return false
      if (q) {
        const haystack = `${p.name} ${p.code} ${p.brand} ${p.category} ${p.desc}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })

    if (sort === 'price-asc') items = [...items].sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') items = [...items].sort((a, b) => b.price - a.price)
    else if (sort === 'name') items = [...items].sort((a, b) => a.name.localeCompare(b.name))

    return items
  }, [category, envs, resolutions, brands, priceBand, sort, query])

  const clearAll = () => {
    setCategory('all')
    setEnvs([])
    setResolutions([])
    setBrands([])
    setPriceBand('all')
    setQuery('')
  }

  const activeCount =
    (category !== 'all' ? 1 : 0)
    + envs.length
    + resolutions.length
    + brands.length
    + (priceBand !== 'all' ? 1 : 0)
    + (query ? 1 : 0)

  return (
    <div className="bg-[#080c17] text-white min-h-screen">
      <Navbar />

      {/* Page header */}
      <section className="relative pt-28 pb-14 px-6 border-b border-[rgba(0,229,255,0.08)] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        <div
          className="absolute left-0 right-0 h-px animate-scan-line pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.35), transparent)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-[10px] tracking-[5px] text-[#00e5ff] uppercase font-mono mb-4">
            Full Catalogue
          </div>
          <h1 className="text-[clamp(36px,5vw,64px)] font-black leading-none tracking-tight text-white mb-5">
            Every Camera. <span className="text-[#00e5ff]">One Shelf.</span>
          </h1>
          <p className="text-gray-400 max-w-xl text-sm leading-relaxed">
            Browse the complete OmniVeil range. Filter by environment, resolution,
            or price, then request a callback on any unit. No sign-up required.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Sidebar */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center justify-between mb-6">
              <div className="text-[10px] tracking-[4px] text-[#00e5ff] uppercase font-mono">
                Filters
                {activeCount > 0 && (
                  <span className="ml-2 text-gray-500 normal-case tracking-normal">
                    ({activeCount} active)
                  </span>
                )}
              </div>
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-[10px] tracking-[2px] text-gray-500 uppercase font-mono hover:text-[#00e5ff] transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            <FilterGroup label="Type">
              <div className="flex flex-col gap-1">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={`text-left text-[11px] tracking-[1px] font-mono px-3 py-2 border transition-colors ${
                      category === c.id
                        ? 'border-[#00e5ff] text-[#00e5ff] bg-[rgba(0,229,255,0.05)]'
                        : 'border-transparent text-gray-500 hover:text-white hover:border-[rgba(0,229,255,0.1)]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup label="Environment">
              <div className="flex flex-wrap gap-2">
                {ENVIRONMENTS.map((e) => (
                  <Chip
                    key={e.id}
                    active={envs.includes(e.id)}
                    onClick={() => toggle(envs, setEnvs, e.id)}
                  >
                    {e.label}
                  </Chip>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup label="Resolution">
              <div className="flex flex-wrap gap-2">
                {RESOLUTIONS.map((r) => (
                  <Chip
                    key={r.id}
                    active={resolutions.includes(r.id)}
                    onClick={() => toggle(resolutions, setResolutions, r.id)}
                  >
                    {r.label}
                  </Chip>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup label="Brand">
              <div className="flex flex-wrap gap-2">
                {BRANDS.map((b) => (
                  <Chip
                    key={b}
                    active={brands.includes(b)}
                    onClick={() => toggle(brands, setBrands, b)}
                  >
                    {b}
                  </Chip>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup label="Price">
              <div className="flex flex-col gap-1">
                {PRICE_BANDS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setPriceBand(b.id)}
                    className={`text-left text-[11px] tracking-[1px] font-mono px-3 py-2 border transition-colors ${
                      priceBand === b.id
                        ? 'border-[#00e5ff] text-[#00e5ff] bg-[rgba(0,229,255,0.05)]'
                        : 'border-transparent text-gray-500 hover:text-white hover:border-[rgba(0,229,255,0.1)]'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </FilterGroup>
          </aside>

          {/* Grid */}
          <div className="lg:col-span-9">
            {/* Search bar */}
            <div className="relative mb-6">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
              >
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M11 11 L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search cameras by name, brand, or code"
                className="w-full bg-[#0b111e] border border-[rgba(0,229,255,0.15)] pl-11 pr-10 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00e5ff] focus:bg-[#0d1425] transition-colors"
                aria-label="Search products"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00e5ff] transition-colors p-1"
                  aria-label="Clear search"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 3 L13 13 M13 3 L3 13" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </button>
              )}
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[rgba(0,229,255,0.08)]">
              <div className="font-mono text-[10px] tracking-[3px] text-gray-500 uppercase">
                {filtered.length} {filtered.length === 1 ? 'Result' : 'Results'}
              </div>
              <div className="flex items-center gap-3">
                <label htmlFor="sort" className="font-mono text-[10px] tracking-[3px] text-gray-600 uppercase hidden sm:inline">
                  Sort
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-transparent border border-[rgba(0,229,255,0.2)] text-gray-300 font-mono text-[11px] tracking-[1px] px-3 py-2 focus:outline-none focus:border-[#00e5ff] cursor-pointer"
                >
                  <option value="featured" className="bg-[#0b111e]">Featured</option>
                  <option value="price-asc" className="bg-[#0b111e]">Price: Low to High</option>
                  <option value="price-desc" className="bg-[#0b111e]">Price: High to Low</option>
                  <option value="name" className="bg-[#0b111e]">Name A to Z</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-[rgba(0,229,255,0.15)]">
                <div className="text-[10px] tracking-[4px] text-[#00e5ff] uppercase font-mono mb-3">
                  No matches
                </div>
                <p className="text-gray-500 text-sm mb-6">
                  Nothing in the catalogue matches these filters.
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="border border-[rgba(0,229,255,0.25)] text-[#00e5ff] text-[10px] tracking-[3px] uppercase px-6 py-3 hover:bg-[rgba(0,229,255,0.06)] transition-colors font-mono"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px bg-[rgba(0,229,255,0.06)]">
                {filtered.map((p) => (
                  <article
                    key={p.id}
                    className="relative bg-[#080c17] group overflow-hidden hover:bg-[#0d1425] transition-colors duration-300"
                  >
                    <Link href={`/products/${p.code}`} className="block relative h-48 overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-full h-full object-cover grayscale opacity-45 group-hover:opacity-70 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, #080c17, rgba(8,12,23,0.25), transparent)' }}
                      />
                      <div className="absolute top-3 left-3 font-mono text-[9px] text-[#00e5ff] opacity-70 tracking-widest">
                        {p.code}
                      </div>
                      <div className="absolute top-3 right-3 border border-[rgba(0,229,255,0.25)] bg-[rgba(8,12,23,0.75)] text-[#00e5ff] font-mono text-[8px] tracking-widest px-2 py-1">
                        {p.category}
                      </div>

                      <svg className="absolute top-0 left-0 w-7 h-7 text-[#00e5ff] opacity-0 group-hover:opacity-50 transition-opacity duration-300" viewBox="0 0 32 32" fill="none">
                        <path d="M0 16 L0 0 L16 0" stroke="currentColor" strokeWidth="1" />
                      </svg>
                      <svg className="absolute top-0 right-0 w-7 h-7 text-[#00e5ff] opacity-0 group-hover:opacity-50 transition-opacity duration-300" viewBox="0 0 32 32" fill="none">
                        <path d="M32 16 L32 0 L16 0" stroke="currentColor" strokeWidth="1" />
                      </svg>
                      <svg className="absolute bottom-0 left-0 w-7 h-7 text-[#00e5ff] opacity-0 group-hover:opacity-50 transition-opacity duration-300" viewBox="0 0 32 32" fill="none">
                        <path d="M0 16 L0 32 L16 32" stroke="currentColor" strokeWidth="1" />
                      </svg>
                      <svg className="absolute bottom-0 right-0 w-7 h-7 text-[#00e5ff] opacity-0 group-hover:opacity-50 transition-opacity duration-300" viewBox="0 0 32 32" fill="none">
                        <path d="M32 16 L32 32 L16 32" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </Link>

                    <div className="p-5">
                      <Link href={`/products/${p.code}`} className="block group/title">
                        <div className="flex items-baseline justify-between mb-2 gap-3">
                          <h3 className="font-black text-[15px] tracking-wide text-white group-hover/title:text-[#00e5ff] transition-colors">
                            {p.name}
                          </h3>
                          <div className="font-mono text-[11px] text-[#00e5ff] tracking-[2px] whitespace-nowrap">
                            {formatKES(p.price)}
                          </div>
                        </div>
                        <p className="text-gray-500 text-[13px] leading-relaxed mb-4 line-clamp-3">
                          {p.desc}
                        </p>
                      </Link>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {p.specs.slice(0, 3).map((spec) => (
                          <span
                            key={spec}
                            className="border border-[rgba(0,229,255,0.12)] text-gray-500 font-mono text-[9px] tracking-[1px] px-2 py-1"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/products/${p.code}`}
                          className="text-center border border-[rgba(0,229,255,0.2)] text-gray-400 font-mono text-[10px] tracking-[2px] uppercase py-3 hover:border-[#00e5ff] hover:text-[#00e5ff] transition-colors"
                        >
                          Details
                        </Link>
                        <button
                          type="button"
                          onClick={() => setActiveProduct(p)}
                          className="bg-[#00e5ff] text-[#080c17] font-black text-[10px] tracking-[2px] uppercase py-3 hover:opacity-90 transition-opacity"
                        >
                          Quote
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />

      {/* Order modal — keyed so each open starts with a fresh form */}
      <OrderForm
        key={activeProduct?.id ?? 'closed'}
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </div>
  )
}

function FilterGroup({ label, children }) {
  return (
    <div className="mb-6 pb-6 border-b border-[rgba(0,229,255,0.06)] last:border-b-0">
      <div className="text-[9px] tracking-[3px] text-gray-500 uppercase font-mono mb-3">
        {label}
      </div>
      {children}
    </div>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-[10px] tracking-[2px] uppercase font-mono px-3 py-1.5 border transition-colors ${
        active
          ? 'bg-[#00e5ff] text-[#080c17] border-[#00e5ff]'
          : 'border-[rgba(0,229,255,0.2)] text-gray-400 hover:text-[#00e5ff] hover:border-[#00e5ff]'
      }`}
    >
      {children}
    </button>
  )
}
