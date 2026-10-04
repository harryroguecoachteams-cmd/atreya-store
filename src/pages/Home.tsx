import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PRODUCTS, type Product } from '../data/products'
import { categoryPath } from '../data/collections'
import { BESTSELLERS } from '../data/bestsellers'
import ProductCard from '../components/ProductCard'
import Hero from '../components/Hero'
import UspRow from '../components/UspRow'
import StoryImage from '../components/StoryImage'
import { FESTIVE, whatsappLink } from '../config'

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`

// The home page is a shop first and a story second: roughly seven parts
// catalogue (hero, bestsellers, occasions, budget, new arrivals, bulk) to three
// parts brand (the Diwali band, the four chapters as one strip, the workshop
// band). The chapters keep their words, they just no longer fill a screen each.

const byAsin = (asins: string[]) =>
  asins.map((a) => PRODUCTS.find((p) => p.asin === a)).filter((p): p is Product => Boolean(p))

// Bestsellers: order lines from the last few weeks (src/data/bestsellers.ts),
// then the catalogue order for anything that has not sold yet, so a tab is
// never short of products.
const rank = (p: Product) => {
  const i = BESTSELLERS.indexOf(p.asin)
  return i === -1 ? BESTSELLERS.length + PRODUCTS.indexOf(p) : i
}
const TABS = [
  { key: 'all', label: 'All' },
  { key: 'Pooja Essentials', label: 'Pooja' },
  { key: 'Gajras', label: 'Gajras' },
  { key: 'Hair Accessories', label: 'Hair accessories' },
  { key: 'Door Hangings', label: 'Door hangings' },
  { key: 'Festive Décor', label: 'Festive décor' },
]
const popular = (key: string) => {
  if (key !== 'all') {
    return PRODUCTS.filter((p) => p.category === key)
      .sort((a, b) => rank(a) - rank(b))
      .slice(0, 8)
  }
  // "All" is the true top sellers, but no more than two from one shelf, so the
  // first row shows the range rather than three colors of one aasan.
  const perCat: Record<string, number> = {}
  const out: Product[] = []
  for (const p of [...PRODUCTS].sort((a, b) => rank(a) - rank(b))) {
    if ((perCat[p.category] ?? 0) >= 2) continue
    perCat[p.category] = (perCat[p.category] ?? 0) + 1
    out.push(p)
    if (out.length === 8) break
  }
  return out
}

const UNDER_200 = PRODUCTS.filter((p) => p.price < 200)
const inCats = (cats: string[]) => PRODUCTS.filter((p) => cats.includes(p.category))

const OCCASIONS: { title: string; line: string; to: string; image: string; alt: string; items: Product[] }[] = [
  {
    title: 'The wedding week',
    line: 'Gajras, hand gajras and rose pins for the haldi, mehndi and pheras.',
    to: '/collections/gajras',
    image: 'ch-hair',
    alt: 'A woman with mehndi on her hands wearing a yellow rose hand gajra',
    items: inCats(['Gajras', 'Hair Accessories']),
  },
  FESTIVE.diwali
    ? {
        title: 'Diwali & Lakshmi puja',
        line: 'Aasans, thalis, latkans and gifts, gathered in one edit.',
        to: '/diwali-gifting',
        image: 'diwali-mandir',
        alt: 'A home mandir with diyas lit, framed by red lotus latkans',
        items: [],
      }
    : {
        title: 'Festivals at home',
        line: 'Torans, flower ladis, garlands and bells for every room.',
        to: '/collections/festive-decor',
        image: 'diwali-mandir',
        alt: 'A home mandir with diyas lit, framed by red lotus latkans',
        items: inCats(['Festive Décor']),
      },
  {
    title: 'Griha pravesh',
    line: 'Ganesh ji latkans, Shubh Labh torans and mirror lotuses for a new door.',
    to: '/collections/door-hangings',
    image: 'ch-door-2',
    alt: 'A doorway framed by red lotus latkans with pink jhumkas',
    items: inCats(['Door Hangings']),
  },
  {
    title: 'Return gifts',
    line: 'Latkans, rose pins, bear sunglasses and paper soap, all under ₹200.',
    to: '/shop?price=under-200',
    image: 'ch-gifts-2',
    alt: 'A girl smiling in brown bear sunglasses with lace bows in her hair',
    items: UNDER_200,
  },
]

// The four chapters of the brand story, one card each.
const CHAPTERS = [
  {
    n: 'I',
    title: 'Worn on the day',
    text: 'Fabric gajras that look as fresh at midnight as they did when they were pinned for the haldi, in a color for every function.',
    to: '/collections/gajras',
    image: 'ch-hair-2',
    alt: 'A rani pink rose juda comb with pearl sprays set in a bun',
  },
  {
    n: 'II',
    title: 'Kept in the mandir',
    text: 'A lotus aasan we stitch ourselves, petal by petal, and a few thalis we chose because their katori close.',
    to: '/collections/pooja-essentials',
    image: 'ch-mandir',
    alt: 'A yellow lotus pooja aasan on a mandir shelf among marigolds and brass',
  },
  {
    n: 'III',
    title: 'Hung at the door',
    text: 'A toran across the top and latkans down each side, in pairs, so the entrance reads as a frame.',
    to: '/collections/door-hangings',
    image: 'ch-door',
    alt: 'A gold mirror lotus latkan hanging against a dark carved door beside a lit diya',
  },
  {
    n: 'IV',
    title: 'Small things for the people you love',
    text: 'Crochet hearts made one at a time, and little things for children that are not thrown away after one use.',
    to: '/collections/crochet',
    image: 'ch-gifts',
    alt: 'Two hands holding a pile of mini crochet hearts in many colors',
  },
]

// The newest arrivals, which is what a returning visitor has not seen. More
// than four are listed because anything already in the Bestsellers or budget
// rows is skipped, so no product shows twice on the page.
const NEW_ASINS = ['B0HJ8Z86C8', 'B0HJ8P8NBY', 'B0HGFLGL4V', 'B0HHGC9GYV', 'B0HJ8KSPP7', 'B0HJ8S6WZZ', 'B0HF4PXH7S']

// Resolved once (the catalogue is static), so the rows below can skip
// whatever the rows above already show.
const BEST_ALL = popular('all')
const onPage = new Set(BEST_ALL.map((p) => p.asin))
// A spread of shelves for the budget row, not the first four in the catalogue.
const BUDGET = (() => {
  const seen = new Set<string>()
  return [...UNDER_200]
    .filter((p) => !onPage.has(p.asin))
    .sort((a, b) => rank(a) - rank(b))
    .filter((p) => (seen.has(p.category) ? false : (seen.add(p.category), true)))
    .slice(0, 4)
})()
BUDGET.forEach((p) => onPage.add(p.asin))
const NEW = byAsin(NEW_ASINS)
  .filter((p) => !onPage.has(p.asin))
  .slice(0, 4)

function SectionHead({ kicker, title, to, link, id }: { kicker: string; title: string; to?: string; link?: string; id?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div>
        <p className="kicker">{kicker}</p>
        <h2 id={id} className="mt-2 font-display text-[32px] font-medium leading-tight text-ink sm:text-[40px]">
          {title}
        </h2>
      </div>
      {to && link && (
        <Link to={to} className="link-draw">
          {link}
        </Link>
      )}
    </div>
  )
}

export default function Home() {
  usePageMeta(
    'Atreya | Gajras, Latkans, Pooja Aasans & Handmade Décor',
    'Gajras, rose hair pins, door latkans, puja thalis and festive decor chosen across India, plus crochet and lotus pooja aasans from our own workshop. Shop on Amazon.in.',
  )
  const [tab, setTab] = useState('all')
  const shown = tab === 'all' ? BEST_ALL : popular(tab)
  const tabPath = tab === 'all' ? '/shop' : categoryPath(tab)

  return (
    <>
      <Hero />

      {/* Bestsellers, by shelf */}
      <section id="popular" aria-labelledby="popular-title" className="scroll-mt-28 border-t border-blush py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead kicker="What people are buying" title="Bestsellers" id="popular-title" />
          <div className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4" role="group" aria-label="Filter bestsellers by shelf">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                aria-pressed={tab === t.key}
                className={`shrink-0 border px-4 py-2 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors ${
                  tab === t.key ? 'border-ink bg-ink text-cream' : 'border-blush bg-white text-soft hover:border-ink/40 hover:text-ink'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {shown.map((p) => (
              <ProductCard key={p.asin} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to={tabPath} className="btn-line">
              {tab === 'all' ? `Shop all ${PRODUCTS.length} products` : `Shop all ${tab.toLowerCase()}`}
            </Link>
          </div>
        </div>
      </section>

      {/* Seasonal: the Diwali edit while FESTIVE.diwali */}
      {FESTIVE.diwali && (
        <section className="diwali-night text-cream">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-12 lg:gap-14 lg:py-16">
            <div className="grid grid-cols-3 gap-3 lg:col-span-7">
              {[
                { name: 'col-door', alt: 'A home mandir with a Ganesh idol, lit diyas and latkans on either side' },
                { name: 'diwali-gift', alt: 'A rani pink lotus pooja aasan beside its gift box' },
                { name: 'ch-door', alt: 'A gold mirror lotus latkan on a carved door beside a lit diya' },
              ].map((im, i) => (
                <div key={im.name} className={`overflow-hidden ${i === 1 ? 'lg:-translate-y-6' : ''}`}>
                  <StoryImage name={im.name} alt={im.alt} sizes="(min-width: 1024px) 19vw, 33vw" className="aspect-[3/4] w-full object-cover" />
                </div>
              ))}
            </div>
            <div className="lg:col-span-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-marigold">The Diwali edit</p>
              <h2 className="mt-4 font-display text-[38px] font-medium leading-[1.05] sm:text-5xl">
                Gifts for the festival of lights.
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-cream/80">
                Lotus aasans for the mandir, thalis whose katori close, latkans for the door and gajras for the
                puja, plus ready gift pairs at one combined price. Gifts that come out again next Diwali.
              </p>
              <Link
                to="/diwali-gifting"
                className="mt-7 inline-flex bg-marigold px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-night transition-colors hover:bg-cream"
              >
                Shop Diwali gifting
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Shop by occasion */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead kicker="Shop by occasion" title="What are you shopping for?" />
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
            {OCCASIONS.map((o) => {
              const items = o.items
              return (
                <Link key={o.title} to={o.to} className="group block">
                  <div className="overflow-hidden bg-sand">
                    <StoryImage
                      name={o.image}
                      alt={o.alt}
                      sizes="(min-width: 1024px) 23vw, 46vw"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-4 font-display text-[22px] font-medium leading-tight text-ink group-hover:text-terra sm:text-2xl">
                    {o.title}
                  </p>
                  <p className="mt-1.5 text-[14px] leading-snug text-soft">{o.line}</p>
                  <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-terra">
                    {items.length > 0 ? `${items.length} products, from ${inr(Math.min(...items.map((p) => p.price)))}` : 'Shop the edit'}{' '}
                    <span aria-hidden="true">→</span>
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Budget row */}
      <section className="border-t border-blush bg-paper py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead
            kicker="Gifts and return gifts"
            title="Under ₹200"
            to="/shop?price=under-200"
            link={`See all ${UNDER_200.length}`}
          />
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {BUDGET.map((p) => (
              <ProductCard key={p.asin} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* New on the shelf */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHead kicker="Just arrived" title="New on the shelf" to="/shop" link="Shop everything" />
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {NEW.map((p) => (
              <ProductCard key={p.asin} product={p} />
            ))}
          </div>
        </div>
      </section>

      <UspRow />

      {/* The story, told in four cards */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-6">
              <p className="kicker">Our story</p>
              <h2 className="mt-3 font-display text-[32px] font-medium leading-[1.08] text-ink sm:text-[44px]">
                A small Indian house for the things that turn a day into an occasion.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="leading-relaxed text-soft">
                The gajra pinned before the haldi, the aasan beneath the idol, the latkan that rings when the door
                opens. <em className="font-display text-[19px] text-terra">A few of them we make with our own hands.</em>{' '}
                The rest we choose, one at a time.
              </p>
              <Link to="/about" className="link-draw mt-5">
                Read our story
              </Link>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
            {CHAPTERS.map((c) => (
              <Link key={c.n} to={c.to} className="group block">
                <div className="overflow-hidden bg-sand">
                  <StoryImage
                    name={c.image}
                    alt={c.alt}
                    sizes="(min-width: 1024px) 23vw, 46vw"
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-4 font-display text-lg italic text-gold">{c.n}</p>
                <p className="font-display text-[21px] font-medium leading-tight text-ink group-hover:text-terra">{c.title}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-soft">{c.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Made by us: the craft band */}
      <section className="bg-ink py-16 text-cream sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-12 lg:gap-16">
          <div className="grid grid-cols-2 gap-3 lg:col-span-6">
            <StoryImage
              name="craft-aasan"
              alt="Close up of the satin petals and hand stitched gold beaded border of a lotus aasan"
              sizes="(min-width: 1024px) 23vw, 50vw"
              className="aspect-[4/5] w-full object-cover"
            />
            <StoryImage
              name="craft-crochet"
              alt="Close up of the stitches on two crochet hearts"
              sizes="(min-width: 1024px) 23vw, 50vw"
              className="mt-10 aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-brass">Made by us</p>
            <h2 className="mt-4 font-display text-[38px] font-medium leading-[1.05] sm:text-5xl">
              Petal by petal, stitch by stitch.
            </h2>
            <p className="mt-5 leading-relaxed text-cream/80">
              Two things here come out of our own workshop: the lotus aasans, every petal cut and shaped on its own
              with the gold beaded border stitched by hand, and the crochet, worked one piece at a time in cotton
              yarn. Everything else we choose ourselves, and check again before it ships.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/collections/pooja-essentials"
                className="inline-flex bg-cream px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass"
              >
                Shop lotus aasans
              </Link>
              <Link
                to="/collections/crochet"
                className="inline-flex border border-cream/70 px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-cream transition-colors hover:bg-cream hover:text-ink"
              >
                Shop crochet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Weddings, events and gifting */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <StoryImage
              name="bulk-garlands"
              alt="Red and white mogra garlands with bells hung in rows across a room"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/3] w-full object-cover lg:aspect-[4/4.2]"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="kicker">Weddings, events &amp; corporate gifting</p>
            <h2 className="mt-4 font-display text-[38px] font-medium leading-[1.05] sm:text-5xl">One piece, or one hundred.</h2>
            <p className="mt-5 max-w-lg leading-relaxed text-soft">
              Hand gajras for a bridal party, latkans for every pillar of a mandap, crochet hearts for a favor table,
              aasans for a stack of housewarming hampers. Tell us what, how many and by when, and we will quote on
              WhatsApp.
            </p>
            <a
              href={whatsappLink('Hi Atreya! I would like a quote for a bulk / wedding / corporate order.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-terra mt-7"
            >
              Get a bulk quote on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
