import { useMemo } from 'react'
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

  return (
    <>
      <section className="border-b border-blush">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-12 text-center sm:pt-16">
          <p className="kicker">The collection</p>
          <h1 className="mt-4 font-display text-[44px] font-medium leading-[1.05] sm:text-6xl">
            {category ?? 'Everything in the house'}
          </h1>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-soft">
            {PRODUCTS.length} pieces, each one made by us or chosen by us. Every order is delivered by
            Amazon.in, with its secure checkout and returns.
          </p>

          {/* Real links to the collection pages. The filter chips below render
              no href, so without these a crawler never reaches them. */}
          <nav aria-label="Collections" className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
            {COLLECTIONS.map((c) => (
              <Link key={c.slug} to={`/collections/${c.slug}`} className="link-draw">
                {c.category}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
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
          {/* Filters */}
          <aside className="mb-8 shrink-0 lg:mb-0 lg:w-56">
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
          </aside>

          {/* Grid + sort toolbar */}
          <div className="flex-1">
            {/* Cards carry h3 titles; this keeps the outline h1 > h2 > h3. */}
            <h2 className="sr-only">Products</h2>
            <div className="flex items-center justify-between gap-3 border-b border-blush pb-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-soft">
                {shown.length} {shown.length === 1 ? 'piece' : 'pieces'}
              </p>
              <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-soft">
                Sort
                <select
                  value={sort}
                  onChange={(e) => setParam('sort', e.target.value === 'featured' ? null : e.target.value)}
                  className="border-0 border-b border-ink/25 bg-transparent py-1 pr-6 text-sm normal-case tracking-normal text-ink focus:border-ink focus:outline-none"
                >
                  {SORTS.map((s) => (
                    <option key={s.key} value={s.key}>{s.label}</option>
                  ))}
                </select>
              </label>
            </div>

            {shown.length === 0 ? (
              <div className="mt-10 border border-blush bg-paper p-10 text-center">
                <p className="font-display text-2xl font-medium">No pieces match that</p>
                <p className="mt-2 text-sm text-soft">Try clearing a filter or searching for something else.</p>
                <button onClick={() => setParams({})} className="btn-solid mt-6">
                  Show everything
                </button>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3">
                {shown.map((p) => (
                  <ProductCard key={p.asin} product={p} />
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
