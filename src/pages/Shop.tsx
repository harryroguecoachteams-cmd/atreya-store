import { useSearchParams } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PRODUCTS, CATEGORIES } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  usePageMeta(
    'Shop — Atreya',
    'Browse Atreya handmade crochet keepsakes, festive décor, artificial flowers and craft supplies. Every product ships via Amazon.in.',
  )
  const [params, setParams] = useSearchParams()
  const active = params.get('category')
  const shown = active ? PRODUCTS.filter((p) => p.category === active) : PRODUCTS

  const setCategory = (c: string | null) => {
    if (c) setParams({ category: c })
    else setParams({})
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">The collection</h1>
      <p className="mt-2 text-soft">
        Every piece is fulfilled through Amazon.in — tap “Buy on Amazon” for prices, delivery and reviews.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => setCategory(null)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            !active ? 'bg-ink text-white' : 'border border-ink/10 bg-white text-soft hover:text-ink'
          }`}
        >
          All ({PRODUCTS.length})
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === c ? 'bg-ink text-white' : 'border border-ink/10 bg-white text-soft hover:text-ink'
            }`}
          >
            {c} ({PRODUCTS.filter((p) => p.category === c).length})
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {shown.map((p) => (
          <ProductCard key={p.asin} product={p} />
        ))}
      </div>
    </section>
  )
}
