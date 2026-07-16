import type { Product } from '../data/products'

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`

export default function ProductCard({ product }: { product: Product }) {
  const discount = product.mrp ? Math.round((1 - product.price / product.mrp) * 100) : 0

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-blush bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-sand">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {discount >= 10 && (
          <span className="absolute left-3 top-3 rounded-full bg-terra px-2.5 py-1 text-xs font-semibold text-white">
            {discount}% off
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">{product.category}</p>
        <h3 className="mt-1 font-display text-lg font-medium leading-snug">{product.name}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-ink">{inr(product.price)}</span>
          {product.mrp && <span className="text-sm text-soft line-through">{inr(product.mrp)}</span>}
        </div>
        <a
          href={product.amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-terra"
        >
          Buy on Amazon
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </a>
      </div>
    </article>
  )
}
