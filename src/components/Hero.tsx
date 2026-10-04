import { Link } from 'react-router-dom'
import StoryImage from './StoryImage'
import { PRODUCTS, CATEGORIES } from '../data/products'
import { categoryPath } from '../data/collections'
import { FESTIVE } from '../config'

// Shop-first hero. The first screen has to answer "what is this site and what
// can I buy here" without a scroll: the H1 names the range, the subline gives
// the count, the starting price and how it is delivered, and the tiles and the
// category row are links straight into the catalogue. Every number is worked
// out from the catalogue, so it never goes stale after a refresh.

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`
const inCats = (cats: string[]) => PRODUCTS.filter((p) => cats.includes(p.category))
const fromPrice = (cats: string[]) => Math.min(...inCats(cats).map((p) => p.price))
const MIN_PRICE = Math.min(...PRODUCTS.map((p) => p.price))

// The three shelves that sell, as photographs with a label plate. The plate is
// a solid panel rather than type laid over the photo, so it reads on any crop.
const TILES = [
  {
    title: 'Gajras & hair accessories',
    cats: ['Gajras', 'Hair Accessories'],
    to: '/collections/gajras',
    image: 'hero-bun',
    alt: 'A red rose and jasmine gajra pinned into a bun, worn with a red silk saree',
    position: '50% 40%',
  },
  {
    title: 'Door latkans & torans',
    cats: ['Door Hangings'],
    to: '/collections/door-hangings',
    image: 'hero-mandir',
    alt: 'A wooden Shubh Labh toran with parrots and bells above a home mandir lit with diyas',
    position: '50% 30%',
  },
  {
    title: 'Pooja essentials',
    cats: ['Pooja Essentials'],
    to: '/collections/pooja-essentials',
    image: 'col-pooja',
    alt: 'A rani pink lotus pooja aasan among marigold petals',
    position: '50% 50%',
  },
]

// Category circles: a close crop that reads at 80px, and a short label. The
// images are 192px squares from scripts/circle-thumbs.py, not the 600px story
// files, so ten of them cost less than one hero photo.
const CIRCLES: Record<string, { image: string; label: string }> = {
  Gajras: { image: 'col-gajras', label: 'Gajras' },
  'Hair Accessories': { image: 'col-hair-2', label: 'Hair accessories' },
  'Festive Décor': { image: 'col-festive', label: 'Festive décor' },
  'Door Hangings': { image: 'col-door-2', label: 'Door hangings' },
  'Pooja Essentials': { image: 'ch-mandir', label: 'Pooja' },
  Crochet: { image: 'col-crochet', label: 'Crochet' },
  'Artificial Flowers': { image: 'col-flowers', label: 'Flowers' },
  Kids: { image: 'col-kids', label: 'Kids' },
  'Travel Essentials': { image: 'col-travel', label: 'Travel' },
  'Craft Supplies': { image: 'col-craft', label: 'Craft' },
}

const TRUST = ['Delivered by Amazon.in', 'Secure checkout & easy returns', 'Bulk orders on WhatsApp']

export default function Hero() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-7 lg:pb-10 lg:pt-9">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-5">
            <p className="kicker">Handmade &amp; handpicked in India</p>
            <h1 className="mt-4 font-display text-[36px] font-medium leading-[1.04] text-ink sm:text-5xl lg:text-[54px]">
              Gajras, door latkans &amp; pooja décor for every Indian occasion
            </h1>
            <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-soft sm:text-base">
              {PRODUCTS.length} products for weddings, Diwali, the home mandir and gifting, from{' '}
              <span className="font-medium text-ink">{inr(MIN_PRICE)}</span>. Order on Amazon.in with secure checkout,
              delivered anywhere in India.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/shop" className="btn-solid">
                Shop all {PRODUCTS.length}
                <span className="-ml-1 hidden sm:inline">products</span>
              </Link>
              {FESTIVE.diwali ? (
                <Link to="/diwali-gifting" className="btn-terra">
                  Diwali gifts
                </Link>
              ) : (
                <a href="#popular" className="btn-line">
                  Bestsellers
                </a>
              )}
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-soft">
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="block h-1.5 w-1.5 rotate-45 bg-brass" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Shelf tiles. From the tablet up; on a phone the category row below
              does the same job in a third of the height. */}
          <div className="hidden h-[440px] grid-cols-2 grid-rows-2 gap-3 sm:grid lg:col-span-7 lg:h-[460px]">
            {TILES.map((t, i) => {
              const count = inCats(t.cats).length
              return (
                <Link
                  key={t.to}
                  to={t.to}
                  className={`group relative block overflow-hidden bg-sand ${i === 0 ? 'row-span-2' : ''}`}
                >
                  <StoryImage
                    name={t.image}
                    alt={t.alt}
                    priority={i === 0}
                    minWidth={640}
                    sizes="(min-width: 1024px) 28vw, 50vw"
                    position={t.position}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 bg-cream/95 px-4 py-3">
                    <div>
                      <p className="font-display text-[21px] font-medium leading-tight text-ink group-hover:text-terra">
                        {t.title}
                      </p>
                      <p className="mt-0.5 text-[12.5px] text-soft">
                        {count} products, from {inr(fromPrice(t.cats))}
                      </p>
                    </div>
                    <span className="shrink-0 pb-0.5 text-[11px] font-medium uppercase tracking-[0.2em] text-terra">
                      Shop <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Every category, one tap away */}
        <div className="mt-8 border-t border-blush pt-6 lg:mt-10">
          <div className="flex items-baseline justify-between">
            <h2 className="kicker">Shop by category</h2>
            <Link to="/shop" className="text-[11px] font-medium uppercase tracking-[0.2em] text-terra hover:text-terra-dark">
              View all <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ul className="no-scrollbar -mx-4 mt-4 flex snap-x scroll-px-4 gap-3 overflow-x-auto px-4 pb-1 lg:mx-0 lg:grid lg:grid-cols-10 lg:gap-4 lg:overflow-visible lg:px-0">
            {CATEGORIES.map((c) => {
              const circle = CIRCLES[c]
              return (
                <li key={c} className="w-[78px] shrink-0 snap-start lg:w-auto">
                  <Link to={categoryPath(c)} className="group flex flex-col items-center text-center">
                    <span className="block h-[72px] w-[72px] overflow-hidden rounded-full bg-sand ring-1 ring-blush ring-offset-2 ring-offset-cream transition group-hover:ring-terra lg:h-[92px] lg:w-[92px]">
                      {circle && (
                        <img
                          src={`/story/${circle.image}-sq192.webp`}
                          alt=""
                          width={192}
                          height={192}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                        />
                      )}
                    </span>
                    <span className="mt-2.5 text-[12.5px] leading-tight text-ink group-hover:text-terra">
                      {circle?.label ?? c}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
