import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PRODUCTS, type Product } from '../data/products'
import ProductCard from '../components/ProductCard'
import StoryImage from '../components/StoryImage'
import { SITE_URL, whatsappLink } from '../config'
import { thumb } from '../lib/thumb'

// The Diwali gift edit. Not a category page: it gathers pieces from five
// shelves around one occasion, so it has its own route and its own copy.
// Every product here is live and buyable; a section quietly drops anything
// that leaves the catalogue, so nothing on this page can point at a dead ASIN.

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`
const pick = (asins: string[]) =>
  asins.map((a) => PRODUCTS.find((p) => p.asin === a)).filter((p): p is Product => Boolean(p))

const SECTIONS = [
  {
    id: 'mandir',
    title: 'For the mandir',
    line: 'The gift that is used every morning, not only on the night of the puja.',
    asins: ['B0HF4PXH7S', 'B0HF9ZSQY3', 'B0HF9ZJXT3', 'B0HGM61K1N'],
  },
  {
    id: 'doorway',
    title: 'For the doorway',
    line: 'Lakshmi is welcomed at the door, so that is where the decorating starts.',
    asins: ['B0HFPJJSW4', 'B0HJ8Z86C8', 'B0HJ8P8NBY', 'B0HJ8S6WZZ'],
  },
  {
    id: 'house',
    title: 'To dress the house',
    line: 'Garlands, torans and bells for the rooms the guests will see.',
    asins: ['B0HC4FD2F4', 'B09MD5M6YP', 'B09QJV7VXZ', 'B09Y2B4XHL'],
  },
  {
    id: 'her',
    title: 'For her Diwali look',
    line: 'For the Lakshmi puja, the card party and the family photograph.',
    asins: ['B0HGFLGL4V', 'B0HFB5PHDK', 'B0HD2H3LF4', 'B0HGFJ5DD1'],
  },
  {
    id: 'small',
    title: 'Small gifts, under ₹200',
    line: 'For the neighbors, the children and everyone who drops in with sweets.',
    asins: ['B0HFPM5MZB', 'B0HFPJTFVH', 'B0HGFFKH66', 'B0HFQDY4K3'],
    maxPrice: 199,
  },
]

const SETS = [
  {
    title: 'The first mandir',
    text: 'For a couple setting up their first home this Diwali: a pair of lotus aasans for two deities, and a thali whose katori close.',
    asins: ['B0HF4PXH7S', 'B0HF9ZSQY3'],
  },
  {
    title: 'The Lakshmi doorway',
    text: 'Four gold mirror lotus latkans, two on each side of the main door, and twenty four golden bells to string along the toran.',
    asins: ['B0HFPJJSW4', 'B09QJV7VXZ'],
  },
  {
    title: 'The puja outfit',
    text: 'A rose juda comb for the bun and a pair of red rose hand gajras, for the Lakshmi puja and the photographs after it.',
    asins: ['B0HGFLGL4V', 'B0HFB5PHDK'],
  },
]

// Resolved once: the catalogue is static, and the schema effect below depends
// on these, so building them per render would re-run it on every render.
const sections = SECTIONS.map((s) => ({
  ...s,
  items: pick(s.asins).filter((p) => !s.maxPrice || p.price <= s.maxPrice),
})).filter((s) => s.items.length > 0)
const sets = SETS.map((s) => ({ ...s, items: pick(s.asins) })).filter((s) => s.items.length === s.asins.length)
const all = sections.flatMap((s) => s.items)

const FAQS = [
  {
    q: 'Will my order arrive before Diwali?',
    a: 'Every order is delivered by Amazon.in, and Amazon shows the delivery date for your pincode before you pay. Orders get busier as Dhanteras gets closer, so the safest thing is to order a week or two ahead.',
  },
  {
    q: 'Can I send a gift straight to someone else?',
    a: 'Yes. Enter their address at checkout on Amazon.in and the order goes directly to them.',
  },
  {
    q: 'What is a good Diwali gift for a new home?',
    a: 'A lotus pooja aasan for their mandir, or the pack of two, with a thali to go with it. It is used every day rather than only on the festival, which is what makes it a good housewarming gift.',
  },
  {
    q: 'Are the thalis silver or gold?',
    a: 'No. The gold and peacock thalis are decorative metal with meenakari enamel work, not solid silver or gold, and they are priced that way.',
  },
  {
    q: 'Do you take corporate and bulk Diwali orders?',
    a: 'Yes. Quantities beyond the multi-packs are quoted on WhatsApp. Tell us what you want, how many, the budget per gift and the date it has to arrive.',
  },
]

export default function DiwaliGifting() {
  usePageMeta(
    'Diwali Gifts: Pooja Aasans, Puja Thalis & Door Latkans | Atreya',
    'Diwali gifts that outlast the festival: handmade lotus pooja aasans, meenakari puja thalis, door latkans, torans, garlands and gajras, from Rs 129. Delivered by Amazon.in.',
    { image: `${SITE_URL}/products/B0HF4PXH7S.jpg` },
  )

  // CollectionPage + ItemList + FAQPage + BreadcrumbList, upserted by id so the
  // prerendered snapshot and hydration never leave duplicate blocks.
  useEffect(() => {
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
    const url = `${SITE_URL}/diwali-gifting`
    const nodes = [
      upsert('diwali-jsonld', {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Diwali gifts',
        url,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: all.length,
          itemListElement: all.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: p.name,
            url: `${SITE_URL}/product/${p.asin}`,
          })),
        },
      }),
      upsert('diwali-breadcrumb-jsonld', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Diwali gifting', item: url },
        ],
      }),
      upsert('diwali-faq-jsonld', {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      }),
    ]
    return () => nodes.forEach((n) => n.remove())
  }, [])

  return (
    <>
      {/* Diwali night hero */}
      <section className="diwali-night text-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-8 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-20">
          <div className="lg:col-span-5">
            <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.2em] text-cream/60">
              <Link to="/" className="hover:text-cream">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-cream/90">Diwali gifting</span>
            </nav>
            <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.28em] text-marigold">The Diwali edit</p>
            <h1 className="mt-4 font-display text-[44px] font-medium leading-[1.03] sm:text-6xl">
              Diwali gifts that are still in use next Diwali.
            </h1>
            <div className="ornament mt-7" aria-hidden="true">
              <span />
            </div>
            <p className="mt-7 max-w-md leading-relaxed text-cream/80">
              The box of sweets is finished by Bhai Dooj and the dry fruit tin goes to the back of the
              cupboard. These are the other kind of gift: an aasan for the mandir, a thali whose katori close,
              latkans for the door. Things that come out again next year, and the year after.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="border-b border-cream/40 pb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-cream hover:border-marigold hover:text-marigold">
                  {s.title}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-5 grid-rows-2 gap-3 lg:col-span-7">
            <div className="col-span-3 row-span-2 overflow-hidden">
              <StoryImage
                name="diwali-mandir"
                alt="A home mandir with diyas lit, framed by a pair of red lotus latkans"
                priority
                sizes="(min-width: 1024px) 34vw, 60vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="col-span-2 overflow-hidden">
              <StoryImage
                name="ch-door"
                alt="A gold mirror lotus latkan on a carved door beside a lit diya"
                sizes="(min-width: 1024px) 22vw, 40vw"
                className="aspect-square h-full w-full object-cover"
              />
            </div>
            <div className="col-span-2 overflow-hidden">
              <StoryImage
                name="diwali-gift"
                alt="A rani pink lotus pooja aasan beside its gift box"
                sizes="(min-width: 1024px) 22vw, 40vw"
                className="aspect-square h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gift sets */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <p className="kicker">Put together for you</p>
            <h2 className="mt-3 font-display text-[40px] font-medium leading-tight sm:text-5xl">Three gifts we would give</h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-soft">
              Pairs that belong together. Each piece is its own order on Amazon.in, so buy one or both.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {sets.map((set) => {
              const total = set.items.reduce((sum, p) => sum + p.price, 0)
              return (
                <article key={set.title} className="flex flex-col border border-blush bg-cream p-6 sm:p-8">
                  <div className="grid grid-cols-2 gap-3">
                    {set.items.map((p) => (
                      <Link key={p.asin} to={`/product/${p.asin}`} className="group block bg-white">
                        <img
                          src={p.image ? thumb(p.image) : ''}
                          alt={`${p.name} by Atreya`}
                          loading="lazy"
                          decoding="async"
                          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      </Link>
                    ))}
                  </div>
                  <h3 className="mt-6 font-display text-[28px] font-medium leading-tight">{set.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-soft">{set.text}</p>
                  <ul className="mt-5 space-y-2 border-t border-blush pt-4 text-sm">
                    {set.items.map((p) => (
                      <li key={p.asin} className="flex items-baseline justify-between gap-4">
                        <Link to={`/product/${p.asin}`} className="text-ink hover:text-terra">{p.name}</Link>
                        <span className="shrink-0 text-soft">{inr(p.price)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-5 text-[11px] uppercase tracking-[0.2em] text-gold">
                    {inr(total)} for both
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* The edit, by who it is for */}
      {sections.map((s, i) => (
        <section key={s.id} id={s.id} className={`scroll-mt-28 py-16 sm:py-20 ${i % 2 === 1 ? 'bg-paper' : ''}`}>
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-display text-xl italic text-gold">{['I', 'II', 'III', 'IV', 'V'][i]}</p>
                <h2 className="mt-1 font-display text-[36px] font-medium leading-tight sm:text-[44px]">{s.title}</h2>
                <p className="mt-2 max-w-xl text-soft">{s.line}</p>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
              {s.items.map((p) => (
                <ProductCard key={p.asin} product={p} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Corporate and family gifting */}
      <section className="diwali-night py-16 text-cream sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16">
          <StoryImage
            name="diwali-door"
            alt="A doorway framed by Ganesh ji latkans with red lotus buds, lamps glowing down the hall"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-[4/3] w-full object-cover"
          />
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-marigold">Corporate &amp; family gifting</p>
            <h2 className="mt-4 font-display text-[38px] font-medium leading-[1.05] sm:text-5xl">Gifting for a whole office, or a whole family.</h2>
            <p className="mt-6 leading-relaxed text-cream/80">
              Aasans, thalis and latkans in quantity, for employees, clients or every household in the extended
              family. Tell us how many, the budget per gift and the date it has to arrive, and we will quote on
              WhatsApp.
            </p>
            <a
              href={whatsappLink('Hi Atreya! I would like a quote for Diwali gifting. Quantity, budget per gift and date: ')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex bg-marigold px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-night transition-colors hover:bg-cream"
            >
              Ask for a Diwali quote
            </a>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center font-display text-[34px] font-medium">Diwali gifting questions</h2>
          <div className="mt-8 divide-y divide-blush border-y border-blush">
            {FAQS.map((f) => (
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
          <p className="mt-10 text-center">
            <Link to="/shop" className="link-draw">
              Or browse everything in the house
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
