import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import { thumb, thumbSrcSet } from '../lib/thumb'

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`

// No discount badge. Percent-off bursts are the discount theatre the brand
// system rules out, and the MRP is still shown, quietly, beside the price.
// `priority` is for the first cards of a grid that opens above the fold: their
// photo is the largest thing on the first screen, so it must not wait for lazy
// loading.
export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const hoverImage = product.images[1]

  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-white">
        {product.image && (
          <img
            src={thumb(product.image)}
            srcSet={thumbSrcSet(product.image)}
            sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw"
            alt={`${product.name} by Atreya`}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            decoding="async"
            className={`h-full w-full object-cover transition-all duration-500 ${
              hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-[1.03]'
            }`}
          />
        )}
        {hoverImage && (
          <img
            src={thumb(hoverImage)}
            srcSet={thumbSrcSet(hoverImage)}
            sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw"
            alt=""
            loading="lazy"
            decoding="async"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-[1.03] object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-gold">{product.category}</p>
        <h3 className="mt-1.5 font-display text-[19px] font-medium leading-snug text-ink sm:text-[21px]">
          <Link to={`/product/${product.asin}`} className="after:absolute after:inset-0 group-hover:text-terra">
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto flex items-baseline justify-between gap-2 pt-2">
          <p className="flex items-baseline gap-2">
            <span className="text-[15px] font-medium text-ink">{inr(product.price)}</span>
            {product.mrp && (
              <span className="text-xs text-soft">
                <span className="sr-only">MRP </span>
                <s>{inr(product.mrp)}</s>
              </span>
            )}
          </p>
          <a
            href={product.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Buy ${product.name} on Amazon`}
            className="relative z-10 text-[10px] font-medium uppercase tracking-[0.2em] text-soft underline-offset-4 transition-colors hover:text-terra hover:underline"
          >
            Amazon ↗
          </a>
        </div>
      </div>
    </article>
  )
}
