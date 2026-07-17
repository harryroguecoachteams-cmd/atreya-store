import { Link } from 'react-router-dom'
import type { Product } from '../data/products'

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`

export default function ProductCard({ product }: { product: Product }) {
  const discount = product.mrp ? Math.round((1 - product.price / product.mrp) * 100) : 0
  const hoverImage = product.images[1]

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-blush bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-sand">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={`h-full w-full object-cover transition-all duration-300 ${
              hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-105'
            }`}
          />
        )}
        {hoverImage && (
          <img
            src={hoverImage}
            alt=""
            loading="lazy"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
        <h3 className="mt-1 font-display text-lg font-medium leading-snug">
          <Link to={`/product/${product.asin}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-ink">{inr(product.price)}</span>
          {product.mrp && <span className="text-sm text-soft line-through">{inr(product.mrp)}</span>}
        </div>
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-terra transition-colors group-hover:text-terra-dark">
            View details →
          </span>
          <a
            href={product.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Buy ${product.name} on Amazon`}
            className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-terra hover:text-terra"
          >
            Amazon
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  )
}
