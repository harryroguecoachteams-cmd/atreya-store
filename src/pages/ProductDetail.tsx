import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PRODUCTS } from '../data/products'
import { PRODUCT_COPY } from '../data/product-copy'
import { categoryPath } from '../data/collections'
import ProductCard from '../components/ProductCard'
import NotFound from './NotFound'
import { SITE_URL, isHandmade, whatsappLink } from '../config'

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`

export default function ProductDetail() {
  const { asin } = useParams()
  const product = PRODUCTS.find((p) => p.asin === asin)
  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => setImgIndex(0), [asin])

  // Site-original copy where we have written it, the Amazon description only as
  // a fallback. The Amazon text also lives on amazon.in, so anything using it
  // here is competing with a far stronger page for its own words.
  const story = product ? (PRODUCT_COPY[product.asin] ?? product.description) : ''

  usePageMeta(
    product ? `${product.name} | Atreya` : 'Product not found | Atreya',
    product
      ? `${product.name}: ${isHandmade(product.category) ? 'handmade' : 'handpicked'} by Atreya. ${story.slice(0, 140)}`
      : 'This product could not be found.',
    {
      image: product?.image ? `${SITE_URL}${product.image}` : undefined,
      noindex: !product,
      ogType: 'product',
    },
  )

  // Product + BreadcrumbList JSON-LD for search engines. Upsert by id so
  // prerendered HTML and client hydration never leave duplicate schema blocks.
  useEffect(() => {
    if (!product) return
    const upsert = (id: string, data: unknown) => {
      let el = document.getElementById(id) as HTMLScriptElement | null
      if (!el) {
        el = document.createElement('script')
        el.id = id
        el.type = 'application/ld+json'
        document.head.appendChild(el)
      }
      el.textContent = JSON.stringify(data)
      return el
    }
    // Amazon reprices; a year out is the honest ceiling on how long this holds.
    const validUntil = new Date(Date.now() + 365 * 864e5).toISOString().slice(0, 10)
    const productEl = upsert('product-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: product.images.map((i) => `${SITE_URL}${i}`),
      description: story,
      sku: product.asin,
      productID: product.asin,
      category: product.category,
      brand: { '@type': 'Brand', name: 'Atreya' },
      offers: {
        '@type': 'Offer',
        url: product.amazonUrl,
        priceCurrency: 'INR',
        price: product.price,
        priceValidUntil: validUntil,
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: 'Atreya' },
      },
    })
    const crumbEl = upsert('breadcrumb-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/shop` },
        { '@type': 'ListItem', position: 3, name: product.category, item: `${SITE_URL}${categoryPath(product.category)}` },
        { '@type': 'ListItem', position: 4, name: product.name, item: `${SITE_URL}/product/${product.asin}` },
      ],
    })
    return () => {
      productEl?.remove()
      crumbEl?.remove()
    }
  }, [product, story])

  if (!product) return <NotFound />

  const discount = product.mrp ? Math.round((1 - product.price / product.mrp) * 100) : 0
  const related = PRODUCTS.filter((p) => p.category === product.category && p.asin !== product.asin).slice(0, 4)
  const bulkMessage = `Hi Atreya! I'd like a bulk quote for: ${product.name} (${product.asin}). Quantity: `

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-soft">
          <Link to="/" className="hover:text-terra">Home</Link>
          <span className="mx-1.5">/</span>
          <Link to="/shop" className="hover:text-terra">Shop</Link>
          <span className="mx-1.5">/</span>
          <Link to={categoryPath(product.category)} className="hover:text-terra">
            {product.category}
          </Link>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="overflow-hidden rounded-2xl border border-blush bg-sand">
              <img
                src={product.images[imgIndex] ?? product.image ?? ''}
                alt={product.name}
                className="aspect-square w-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setImgIndex(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`w-16 overflow-hidden rounded-xl border-2 transition-colors sm:w-20 ${
                      i === imgIndex ? 'border-terra' : 'border-blush hover:border-ink/30'
                    }`}
                  >
                    <img src={img} alt="" className="aspect-square w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">{product.category}</p>
            <h1 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">{product.name}</h1>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl font-semibold text-ink">{inr(product.price)}</span>
              {product.mrp && (
                <>
                  <span className="text-base text-soft line-through">{inr(product.mrp)}</span>
                  {discount >= 10 && (
                    <span className="rounded-full bg-terra px-2.5 py-1 text-xs font-semibold text-white">
                      {discount}% off
                    </span>
                  )}
                </>
              )}
            </div>
            <p className="mt-1 text-xs text-soft">Price &amp; delivery as listed on Amazon.in</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={product.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-terra px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-terra-dark"
              >
                Buy on Amazon
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
              <a
                href={whatsappLink(bulkMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-terra px-6 py-3.5 text-sm font-semibold text-terra transition-colors hover:bg-terra hover:text-white"
              >
                Bulk order enquiry
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M3 20l1.2-3.6A8.5 8.5 0 1 1 7.6 19L3 20Z" />
                </svg>
              </a>
            </div>

            {/* Trust mini-row */}
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-soft">
              {isHandmade(product.category) ? (
                <>
                  <span>✓ Handmade in our workshop</span>
                  <span>✓ Made in India</span>
                </>
              ) : (
                <>
                  <span>✓ Handpicked by us</span>
                  <span>✓ Checked before it ships</span>
                </>
              )}
              <span>✓ Secure checkout via Amazon.in</span>
            </div>

            {/* Highlights */}
            {product.bullets.length > 0 && (
              <div className="mt-8">
                <h2 className="font-display text-lg font-semibold">Highlights</h2>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-soft">
                  {product.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications (Pastiche-style) */}
            {product.specs.length > 0 && (
              <div className="mt-8">
                <h2 className="font-display text-lg font-semibold">Product details</h2>
                <dl className="mt-3 overflow-hidden rounded-2xl border border-blush">
                  {product.specs.map((s, i) => (
                    <div
                      key={s.label}
                      className={`grid grid-cols-[40%_60%] gap-3 px-4 py-2.5 text-sm ${
                        i % 2 === 0 ? 'bg-white' : 'bg-sand/60'
                      }`}
                    >
                      <dt className="font-medium text-ink">{s.label}</dt>
                      <dd className="text-soft">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {story && (
          <div className="mt-12 max-w-3xl">
            <h2 className="font-display text-xl font-semibold">About this piece</h2>
            <p className="mt-3 leading-relaxed text-soft">{story}</p>
          </div>
        )}
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-sand py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-2xl font-semibold">You may also like</h2>
              <Link
                to={categoryPath(product.category)}
                className="text-sm font-semibold text-terra hover:text-terra-dark"
              >
                More {product.category} →
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.asin} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
