import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PRODUCTS } from '../data/products'
import { COLLECTIONS, collectionBySlug } from '../data/collections'
import ProductCard from '../components/ProductCard'
import StoryImage from '../components/StoryImage'
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
  // Pooja Essentials mixes our own aasans with handpicked thalis, so the kicker
  // has a middle case rather than claiming the whole shelf either way.
  const ours = items.filter((p) => isHandmade(p.category, p.asin)).length
  const kicker =
    ours === 0 ? 'Handpicked by us' : ours === items.length ? 'Handmade by us' : 'Handmade and handpicked by us'
  const bulkMessage = `Hi Atreya! I'd like a bulk quote for ${collection.category}. Quantity and date: `

  return (
    <>
      {/* Banner: the words on cream, a photograph of the range in use */}
      <section className="border-b border-blush">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-12 pt-6 lg:grid-cols-12 lg:items-center lg:gap-14 lg:pb-16">
          <div className="lg:col-span-6">
            <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.2em] text-soft">
              <Link to="/" className="hover:text-terra">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/shop" className="hover:text-terra">Shop</Link>
              <span className="mx-2">/</span>
              <span className="text-ink">{collection.category}</span>
            </nav>
            <p className="kicker mt-10">{kicker}</p>
            <h1 className="mt-4 font-display text-[38px] font-medium leading-[1.05] text-ink sm:text-5xl lg:text-[54px]">
              {collection.heading}
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed text-soft">{collection.intro}</p>
            <a href="#pieces" className="link-draw mt-8">
              See the {items.length} {items.length === 1 ? 'piece' : 'pieces'}
            </a>
          </div>
          <div className="order-first lg:order-none lg:col-span-6">
            <div className="overflow-hidden bg-sand">
              <StoryImage
                name={collection.image}
                alt={collection.imageAlt}
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="aspect-[4/3] w-full object-cover lg:aspect-[5/5.2]"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="pieces" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-3xl font-medium">
            {items.length} {items.length === 1 ? 'piece' : 'pieces'} in {collection.category}
          </h2>
          <Link to="/shop" className="link-draw">
            Shop everything
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.asin} product={p} />
          ))}
        </div>
      </section>

      {/* The buying guide. This is the part that earns the ranking, so it is
          real advice rather than keyword filler. */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <p className="kicker text-center">The buying guide</p>
          <div className="ornament mt-5 justify-center" aria-hidden="true">
            <span />
          </div>
          {collection.body.map((b, i) => (
            <article key={b.heading} className="mt-12 first-of-type:mt-10">
              <p className="font-display text-lg italic text-gold">{['I', 'II', 'III', 'IV', 'V', 'VI'][i]}</p>
              <h2 className="mt-1 font-display text-[30px] font-medium leading-tight">{b.heading}</h2>
              <p className="mt-4 leading-relaxed text-soft">{b.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FAQs. They collapse, but the answers stay in the HTML either way,
          which is what crawlers and answer engines read. */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center font-display text-[34px] font-medium">Questions people ask</h2>
          <div className="mt-8 divide-y divide-blush border-y border-blush">
            {collection.faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-medium text-ink marker:hidden">
                  {f.q}
                  <span className="shrink-0 text-2xl font-light text-terra transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-soft">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-14 bg-ink px-6 py-10 text-center text-cream sm:px-10">
            <h2 className="font-display text-[28px] font-medium">Buying for a wedding or an event?</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/75">
              Quantities beyond the multi-packs are a conversation, not an order form. Tell us the
              count and the date and we will quote for it.
            </p>
            <a
              href={whatsappLink(bulkMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex border border-cream/70 px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-cream transition-colors hover:bg-cream hover:text-ink"
            >
              Ask for a bulk quote
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-blush py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center font-display text-[34px] font-medium">The other collections</h2>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            {others.map((c) => (
              <Link key={c.slug} to={`/collections/${c.slug}`} className="group block text-center">
                <div className="overflow-hidden bg-sand">
                  <StoryImage
                    name={c.image}
                    alt={c.imageAlt}
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-3 font-display text-xl font-medium leading-tight text-ink group-hover:text-terra">{c.category}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-soft">
                  {PRODUCTS.filter((q) => q.category === c.category).length} pieces
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
