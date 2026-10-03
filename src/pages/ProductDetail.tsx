import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PRODUCTS } from '../data/products'
import { PRODUCT_COPY } from '../data/product-copy'
import { categoryPath } from '../data/collections'
import ProductCard from '../components/ProductCard'
import { thumb, thumbSrcSet } from '../lib/thumb'
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

  // A raw slice(0, 140) cut every product description mid-word, so the shipped
  // meta read "...the one that keeps selling through the year for anniversari".
  // og:description carries the same string and WhatsApp renders it verbatim, so
  // every shared product link previewed with a broken sentence. Trim back to a
  // word boundary, and to a sentence end when there is one in range.
  const blurb = (text: string, limit: number) => {
    if (text.length <= limit) return text
    const window = text.slice(0, limit + 1)
    const sentence = Math.max(window.lastIndexOf('. '), window.lastIndexOf('? '), window.lastIndexOf('! '))
    if (sentence >= limit * 0.6) return window.slice(0, sentence + 1)
    return `${window.slice(0, window.lastIndexOf(' ')).replace(/[,;:]$/, '')}...`
  }

  usePageMeta(
    product ? `${product.name} | Atreya` : 'Product not found | Atreya',
    product
      ? `${product.name}: ${isHandmade(product.category, product.asin) ? 'handmade' : 'handpicked'} by Atreya. ${blurb(story, 90)}`
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

  const related = PRODUCTS.filter((p) => p.category === product.category && p.asin !== product.asin).slice(0, 4)
  const bulkMessage = `Hi Atreya! I'd like a bulk quote for: ${product.name} (${product.asin}). Quantity: `
  const ours = isHandmade(product.category, product.asin)
  // The first sentence of the story is set large, as the lead, and the rest
  // follows as ordinary text.
  const cut = story.search(/(?<=[.!?])\s+/)
  const lead = cut > 0 ? story.slice(0, cut) : story
  const rest = cut > 0 ? story.slice(cut).trim() : ''

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-6">
        <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.2em] text-soft">
          <Link to="/" className="hover:text-terra">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-terra">Shop</Link>
          <span className="mx-2">/</span>
          <Link to={categoryPath(product.category)} className="hover:text-terra">
            {product.category}
          </Link>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden bg-white">
              <img
                src={product.images[imgIndex] ?? product.image ?? ''}
                srcSet={thumbSrcSet(product.images[imgIndex] ?? product.image ?? '')}
                sizes="(min-width: 1024px) 55vw, 100vw"
                alt={
                  imgIndex === 0
                    ? `${product.name} by Atreya`
                    : `${product.name}, view ${imgIndex + 1} of ${product.images.length}`
                }
                fetchPriority={imgIndex === 0 ? 'high' : undefined}
                className="aspect-square w-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setImgIndex(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`w-16 overflow-hidden border transition-colors sm:w-20 ${
                      i === imgIndex ? 'border-ink' : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={thumb(img)} alt="" loading="lazy" className="aspect-square w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:col-span-5 lg:pt-4">
            <p className="kicker">{product.category}</p>
            <h1 className="mt-3 font-display text-[36px] font-medium leading-[1.08] text-ink sm:text-[44px]">{product.name}</h1>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-2xl font-medium text-ink">{inr(product.price)}</span>
              {product.mrp && (
                <span className="text-sm text-soft">
                  MRP <s>{inr(product.mrp)}</s>
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-soft">Price and delivery as listed on Amazon.in</p>

            <div className="mt-7 flex flex-col gap-3">
              <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer" className="btn-terra w-full">
                Buy on Amazon
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
              <a href={whatsappLink(bulkMessage)} target="_blank" rel="noopener noreferrer" className="btn-line w-full">
                Bulk order enquiry on WhatsApp
              </a>
            </div>

            {/* Provenance, stated plainly */}
            <div className="mt-8 border-y border-blush py-5">
              <p className="font-display text-xl font-medium text-ink">{ours ? 'Made by us' : 'Chosen by us'}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-soft">
                {ours
                  ? 'Made by hand in our own workshop, one at a time, so no two come out exactly alike. Checked again before it ships.'
                  : 'We do not make this one. We chose it, after going through the market and setting aside the ones that were not good enough, and we check every piece before it ships.'}
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-gold">
                Hand checked · Hand packed · Secure checkout on Amazon.in
              </p>
            </div>

            {/* Highlights */}
            {product.bullets.length > 0 && (
              <div className="mt-8">
                <h2 className="font-display text-2xl font-medium">Highlights</h2>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-soft">
                  {product.bullets.map((b) => {
                    // Listing bullets open with an ALL CAPS lead ("PACK OF 2, ONE FOR
                    // EACH WRIST: ..."). Set it as a small tracked label instead of
                    // letting it shout in the middle of the page.
                    const m = b.match(/^([^a-z:]{4,80}):\s*(.+)$/)
                    return (
                      <li key={b} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-brass" aria-hidden="true" />
                        <span>
                          {m ? (
                            <>
                              <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-ink">{m[1]}</span>
                              <span className="mt-1 block">{m[2]}</span>
                            </>
                          ) : (
                            b
                          )}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* The story of the piece, then the facts */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-12 lg:gap-16">
          {story && (
            <div className="lg:col-span-7">
              <p className="kicker">About this piece</p>
              <p className="mt-5 font-display text-[26px] leading-[1.35] text-ink sm:text-[30px]">{lead}</p>
              {rest && <p className="mt-5 leading-relaxed text-soft">{rest}</p>}
            </div>
          )}
          {product.specs.length > 0 && (
            <div className="lg:col-span-5">
              <p className="kicker">Product details</p>
              <dl className="mt-5 divide-y divide-blush border-y border-blush">
                {product.specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-[42%_58%] gap-3 py-3 text-sm">
                    <dt className="text-ink">{s.label}</dt>
                    <dd className="text-soft">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="font-display text-[34px] font-medium">You may also like</h2>
              <Link to={categoryPath(product.category)} className="link-draw">
                More {product.category}
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
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
