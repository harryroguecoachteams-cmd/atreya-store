import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PRODUCTS, CATEGORIES } from '../data/products'
import { COLLECTIONS, collectionByCategory } from '../data/collections'
import ProductCard from '../components/ProductCard'

const PRICE_RANGES = [
  { key: 'under-200', label: 'Under ₹200', min: 0, max: 199 },
  { key: '200-500', label: '₹200 to ₹500', min: 200, max: 500 },
  { key: '500-1000', label: '₹500 to ₹1,000', min: 500, max: 1000 },
  { key: '1000-plus', label: '₹1,000+', min: 1000, max: Infinity },
]

const SORTS = [
  { key: 'featured', label: 'Featured' },
  { key: 'price-asc', label: 'Price: low to high' },
  { key: 'price-desc', label: 'Price: high to low' },
  { key: 'discount', label: 'Biggest discount' },
]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  // On a phone the filters fold away behind a button, so the first screen is
  // products rather than two blocks of chips. From lg up they are a sidebar.
  const [filtersOpen, setFiltersOpen] = useState(false)
  const category = params.get('category')
  // A filtered view is the same content as its collection page, so point the
  // canonical there instead of at bare /shop. Without this the two compete and
  // neither ranks.
  const collection = category ? collectionByCategory(category) : undefined

  usePageMeta(
    'Shop | Atreya',
    'Browse every Atreya piece: gajras, rose hair pins, door latkans, lotus pooja aasans, puja thalis, festive garlands and bells, crochet hearts and more. Every order ships via Amazon.in.',
    { canonicalPath: collection ? `/collections/${collection.slug}` : '/shop' },
  )
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
  const pool = category ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS

  const filters = () => (
    <>
      <div className="flex items-baseline justify-between">
        <p className="kicker">Refine</p>
        {hasFilters && (
          <button
            onClick={() => setParams(sort !== 'featured' ? { sort } : {})}
            className="text-[11px] uppercase tracking-[0.2em] text-terra hover:text-terra-dark"
          >
            Clear all
          </button>
        )}
      </div>

      {q && (
        <p className="mt-4 border border-blush bg-white px-3 py-2 text-sm text-soft">
          Search: <span className="font-medium text-ink">“{params.get('q')}”</span>
        </p>
      )}

      <p className="mt-6 font-display text-xl font-medium text-ink">Category</p>
      <div className="mt-2 flex flex-wrap gap-2 lg:flex-col lg:gap-0">
        <FilterChip active={!category} label="All" count={PRODUCTS.length} onClick={() => setParam('category', null)} />
        {CATEGORIES.map((c) => (
          <FilterChip
            key={c}
            active={category === c}
            label={c}
            count={PRODUCTS.filter((p) => p.category === c).length}
            onClick={() => setParam('category', category === c ? null : c)}
          />
        ))}
      </div>

      <p className="mt-7 font-display text-xl font-medium text-ink">Price</p>
      <div className="mt-2 flex flex-wrap gap-2 lg:flex-col lg:gap-0">
        {PRICE_RANGES.map((r) => (
          <FilterChip
            key={r.key}
            active={price === r.key}
            label={r.label}
            onClick={() => setParam('price', price === r.key ? null : r.key)}
          />
        ))}
      </div>
    </>
  )

  return (
    <>
      {/* A compact header: title, count, delivery line, then straight to the
          products. The collection links are real hrefs because the filter
          chips render none, so without them a crawler never reaches the pages. */}
      <section className="border-b border-blush">
        <div className="mx-auto max-w-7xl px-4 pb-5 pt-6 sm:pt-8">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.2em] text-soft">
            <Link to="/" className="hover:text-terra">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-ink">Shop</span>
          </nav>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
            <h1 className="font-display text-[34px] font-medium leading-[1.05] sm:text-[44px]">
              {category ?? 'Shop all products'}
            </h1>
            <p className="pb-1.5 text-[13px] text-soft">
              {pool.length} products, from ₹{Math.min(...pool.map((p) => p.price))}. Secure checkout and delivery by
              Amazon.in.
            </p>
          </div>
          <nav aria-label="Collections" className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4">
            {COLLECTIONS.map((c) => (
              <Link
                key={c.slug}
                to={`/collections/${c.slug}`}
                className="shrink-0 border border-blush bg-white px-3.5 py-1.5 text-[13px] text-soft transition-colors hover:border-ink/40 hover:text-ink"
              >
                {c.category}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 pt-8">
        {collection && (
          <p className="mb-8 border-l-2 border-brass bg-paper px-5 py-4 text-sm text-soft">
            Not sure which one you need?{' '}
            <Link to={`/collections/${collection.slug}`} className="font-medium text-terra underline-offset-4 hover:underline">
              Read the {collection.category.toLowerCase()} buying guide
            </Link>
            .
          </p>
        )}

        <div className="gap-12 lg:flex">
          {/* Filters: a sidebar from lg up */}
          <aside className="hidden shrink-0 lg:block lg:w-56">
            {filters()}
          </aside>

          {/* Grid + sort toolbar */}
          <div className="flex-1">
            {/* Cards carry h3 titles; this keeps the outline h1 > h2 > h3. */}
            <h2 className="sr-only">Products</h2>
            <div className="flex items-center justify-between gap-3 border-b border-blush pb-4">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  aria-expanded={filtersOpen}
                  className="border border-ink/70 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-ink lg:hidden"
                >
                  {filtersOpen ? 'Hide filters' : `Filters${hasFilters ? ` (${[category, price, q].filter(Boolean).length})` : ''}`}
                </button>
                <p className="whitespace-nowrap text-[11px] uppercase tracking-[0.2em] text-soft">
                  {shown.length} {shown.length === 1 ? 'product' : 'products'}
                </p>
              </div>
              <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-soft">
                <span className="hidden sm:inline">Sort</span>
                <select
                  aria-label="Sort products"
                  value={sort}
                  onChange={(e) => setParam('sort', e.target.value === 'featured' ? null : e.target.value)}
                  className="border-0 border-b border-ink/25 bg-transparent max-w-[9.5rem] py-1 pr-6 text-sm normal-case tracking-normal text-ink focus:border-ink focus:outline-none"
                >
                  {SORTS.map((s) => (
                    <option key={s.key} value={s.key}>{s.label}</option>
                  ))}
                </select>
              </label>
            </div>

            {/* The same filters on a phone, opened from the toolbar */}
            {filtersOpen && <div className="border-b border-blush pb-6 pt-5 lg:hidden">{filters()}</div>}

            {shown.length === 0 ? (
              <div className="mt-10 border border-blush bg-paper p-10 text-center">
                <p className="font-display text-2xl font-medium">No products match that</p>
                <p className="mt-2 text-sm text-soft">Try clearing a filter or searching for something else.</p>
                <button onClick={() => setParams({})} className="btn-solid mt-6">
                  Show everything
                </button>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3">
                {shown.map((p, i) => (
                  <ProductCard key={p.asin} product={p} priority={i < 2} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

function FilterChip({ active, label, count, onClick }: { active: boolean; label: string; count?: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`border px-3.5 py-2 text-left text-sm transition-colors lg:flex lg:w-full lg:items-baseline lg:justify-between lg:border-0 lg:px-0 lg:py-1.5 ${
        active ? 'border-ink bg-ink text-cream lg:bg-transparent lg:font-medium lg:text-terra' : 'border-blush bg-white text-soft hover:text-ink lg:bg-transparent'
      }`}
    >
      <span>{label}</span>
      {count !== undefined && <span className={`ml-1.5 text-xs ${active ? 'lg:text-terra' : 'text-soft/80'}`}>{count}</span>}
    </button>
  )
}
