import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PRODUCTS } from '../data/products'
import { COLLECTIONS, collectionBySlug } from '../data/collections'
import ProductCard from '../components/ProductCard'
import NotFound from './NotFound'
import { SITE_URL, isHandmade, whatsappLink } from '../config'

export default function Collection() {
  const { slug } = useParams()
  const collection = slug ? collectionBySlug(slug) : undefined
  const items = collection ? PRODUCTS.filter((p) => p.category === collection.category) : []
  const hero = collection ? PRODUCTS.find((p) => p.asin === collection.heroAsin) : undefined

  usePageMeta(
    collection ? collection.title : 'Collection not found | Atreya',
    collection ? collection.description : 'This collection could not be found.',
    {
      image: hero?.image ? `${SITE_URL}${hero.image}` : undefined,
      noindex: !collection,
    },
  )

  // ItemList tells Google what the page lists, BreadcrumbList gives it the
  // hierarchy, FAQPage is the part answer engines quote. Upsert by id so the
  // prerendered snapshot and client hydration never leave duplicate blocks.
  useEffect(() => {
    if (!collection) return
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
    const url = `${SITE_URL}/collections/${collection.slug}`
    const nodes = [
      upsert('collection-jsonld', {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: collection.heading,
        description: collection.description,
        url,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: items.length,
          itemListElement: items.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: p.name,
            url: `${SITE_URL}/product/${p.asin}`,
          })),
        },
      }),
      upsert('collection-breadcrumb-jsonld', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/shop` },
          { '@type': 'ListItem', position: 3, name: collection.category, item: url },
        ],
      }),
      upsert('collection-faq-jsonld', {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: collection.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }),
    ]
    return () => nodes.forEach((n) => n?.remove())
  }, [collection, items])

  if (!collection) return <NotFound />

  const others = COLLECTIONS.filter((c) => c.slug !== collection.slug)
  const madeByUs = isHandmade(collection.category)
  const bulkMessage = `Hi Atreya! I'd like a bulk quote for ${collection.category}. Quantity and date: `

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-8">
        <nav aria-label="Breadcrumb" className="text-xs text-soft">
          <Link to="/" className="hover:text-terra">Home</Link>
          <span className="mx-1.5">/</span>
          <Link to="/shop" className="hover:text-terra">Shop</Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink">{collection.category}</span>
        </nav>

        <div className="mt-6 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            {madeByUs ? 'Handmade by us' : 'Handpicked by us'}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            {collection.heading}
          </h1>
          <p className="mt-4 leading-relaxed text-soft">{collection.intro}</p>
        </div>

        <div className="mt-9 flex items-end justify-between">
          <h2 className="font-display text-xl font-semibold">
            {items.length} {items.length === 1 ? 'piece' : 'pieces'} in {collection.category}
          </h2>
          <Link to="/shop" className="text-sm font-semibold text-terra hover:text-terra-dark">
            Shop everything →
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.asin} product={p} />
          ))}
        </div>
      </section>

      {/* The buying guide. This is the part that earns the ranking, so it is
          real advice rather than keyword filler. */}
      <section className="bg-sand py-14">
        <div className="mx-auto max-w-3xl px-4">
          {collection.body.map((b) => (
            <article key={b.heading} className="mb-9 last:mb-0">
              <h2 className="font-display text-2xl font-semibold">{b.heading}</h2>
              <p className="mt-3 leading-relaxed text-soft">{b.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FAQs. Rendered open in the markup with <details open> would be noisy on
          mobile, so they collapse, but the answers stay in the HTML either way,
          which is what crawlers and answer engines read. */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-display text-2xl font-semibold">Questions people ask</h2>
          <div className="mt-6 divide-y divide-blush border-y border-blush">
            {collection.faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink marker:hidden">
                  {f.q}
                  <span className="shrink-0 text-terra transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-soft">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-blush/60 p-6 text-center sm:p-8">
            <h2 className="font-display text-xl font-semibold">Buying for a wedding or an event?</h2>
            <p className="mt-2 text-sm leading-relaxed text-soft">
              Quantities beyond the multi-packs are a conversation, not an order form. Tell us the
              count and the date and we will quote for it.
            </p>
            <a
              href={whatsappLink(bulkMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-terra px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-terra-dark"
            >
              Ask for a bulk quote
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-blush py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-display text-xl font-semibold">Browse the other collections</h2>
          <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {others.map((c) => {
              const p = PRODUCTS.find((q) => q.asin === c.heroAsin)
              return (
                <Link
                  key={c.slug}
                  to={`/collections/${c.slug}`}
                  className="group overflow-hidden rounded-2xl border border-blush bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-sand">
                    {p?.image && (
                      <img
                        src={p.image}
                        alt={c.category}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-ink group-hover:text-terra">{c.category}</p>
                    <p className="mt-0.5 text-xs text-soft">
                      {PRODUCTS.filter((q) => q.category === c.category).length} pieces
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
