import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PRODUCTS, CATEGORIES } from '../data/products'
import ProductCard from '../components/ProductCard'

const PRICE_RANGES = [
  { key: 'under-200', label: 'Under ₹200', min: 0, max: 199 },
  { key: '200-500', label: '₹200 – ₹500', min: 200, max: 500 },
  { key: '500-1000', label: '₹500 – ₹1,000', min: 500, max: 1000 },
  { key: '1000-plus', label: '₹1,000+', min: 1000, max: Infinity },
]

const SORTS = [
  { key: 'featured', label: 'Featured' },
  { key: 'price-asc', label: 'Price: low to high' },
  { key: 'price-desc', label: 'Price: high to low' },
  { key: 'discount', label: 'Biggest discount' },
]

export default function Shop() {
  usePageMeta(
    'Shop — Atreya',
    'Browse Atreya handmade crochet keepsakes, festive décor, artificial flowers and craft supplies. Every product ships via Amazon.in.',
  )
  const [params, setParams] = useSearchParams()
  const category = params.get('category')
  const price = params.get('price')
  const sort = params.get('sort') ?? 'featured'
  const q = (params.get('q') ?? '').trim().toLowerCase()

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next)
  }

  const shown = useMemo(() => {
    let list = PRODUCTS
    if (q) {
      list = list.filter((p) =>
        [p.name, p.fullName, p.description, p.category].join(' ').toLowerCase().includes(q),
      )
    }
    if (category) list = list.filter((p) => p.category === category)
    const range = PRICE_RANGES.find((r) => r.key === price)
    if (range) list = list.filter((p) => p.price >= range.min && p.price <= range.max)
    const discount = (p: (typeof PRODUCTS)[number]) => (p.mrp ? 1 - p.price / p.mrp : 0)
    switch (sort) {
      case 'price-asc': return [...list].sort((a, b) => a.price - b.price)
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price)
      case 'discount': return [...list].sort((a, b) => discount(b) - discount(a))
      default: return list
    }
  }, [q, category, price, sort])

  const hasFilters = Boolean(category || price || q)

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">The collection</h1>
      <p className="mt-2 text-soft">
        Every piece is fulfilled through Amazon.in — tap “Amazon” for delivery, reviews and secure checkout.
      </p>

      <div className="mt-8 gap-10 lg:flex">
        {/* Filters (Floreal-style sidebar on desktop) */}
        <aside className="mb-6 shrink-0 lg:mb-0 lg:w-56">
          <div className="flex items-baseline justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-soft">Filters</p>
            {hasFilters && (
              <button
                onClick={() => setParams(sort !== 'featured' ? { sort } : {})}
                className="text-xs font-semibold text-terra hover:text-terra-dark"
              >
                Clear all
              </button>
            )}
          </div>

          {q && (
            <p className="mt-3 rounded-xl border border-blush bg-white px-3 py-2 text-sm text-soft">
              Search: <span className="font-semibold text-ink">“{params.get('q')}”</span>
            </p>
          )}

          <p className="mt-5 text-sm font-semibold text-ink">Category</p>
          <div className="mt-2 flex flex-wrap gap-2 lg:flex-col lg:gap-1.5">
            <FilterChip active={!category} label={`All (${PRODUCTS.length})`} onClick={() => setParam('category', null)} />
            {CATEGORIES.map((c) => (
              <FilterChip
                key={c}
                active={category === c}
                label={`${c} (${PRODUCTS.filter((p) => p.category === c).length})`}
                onClick={() => setParam('category', category === c ? null : c)}
              />
            ))}
          </div>

          <p className="mt-6 text-sm font-semibold text-ink">Price</p>
          <div className="mt-2 flex flex-wrap gap-2 lg:flex-col lg:gap-1.5">
            {PRICE_RANGES.map((r) => (
              <FilterChip
                key={r.key}
                active={price === r.key}
                label={r.label}
                onClick={() => setParam('price', price === r.key ? null : r.key)}
              />
            ))}
          </div>
        </aside>

        {/* Grid + sort toolbar */}
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-soft">
              {shown.length} {shown.length === 1 ? 'piece' : 'pieces'}
            </p>
            <label className="flex items-center gap-2 text-sm text-soft">
              Sort
              <select
                value={sort}
                onChange={(e) => setParam('sort', e.target.value === 'featured' ? null : e.target.value)}
                className="rounded-full border border-ink/10 bg-white px-3 py-1.5 text-sm text-ink focus:border-terra focus:outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
              </select>
            </label>
          </div>

          {shown.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-blush bg-white p-10 text-center">
              <p className="font-display text-xl font-semibold">No pieces match that</p>
              <p className="mt-2 text-sm text-soft">Try clearing a filter or searching for something else.</p>
              <button
                onClick={() => setParams({})}
                className="mt-5 rounded-full bg-terra px-5 py-2.5 text-sm font-semibold text-white hover:bg-terra-dark"
              >
                Show everything
              </button>
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
              {shown.map((p) => (
                <ProductCard key={p.asin} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function FilterChip({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-left text-sm font-medium transition-colors lg:rounded-xl ${
        active ? 'bg-ink text-white' : 'border border-ink/10 bg-white text-soft hover:text-ink lg:border-transparent lg:bg-transparent'
      }`}
    >
      {label}
    </button>
  )
}
