import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PRODUCTS, CATEGORIES } from '../data/products'
import ProductCard from '../components/ProductCard'
import HeroCarousel from '../components/HeroCarousel'
import UspRow from '../components/UspRow'
import { TAGLINE, whatsappLink } from '../config'

// Representative image per category for the tile grid.
const CATEGORY_TILE_ASINS: Record<string, string> = {
  'Crochet': 'B0G95YC1T9',
  'Festive Décor': 'B09QJVDNFW',
  'Artificial Flowers': 'B0CMDJR8QM',
  'Home Décor': 'B0GDY75WHT',
  'Craft Supplies': 'B09Y29QS4V',
}

const TRENDING_ASINS = [
  'B0GDXXM3PR', 'B0GDV4HTRJ', 'B0GDY75WHT', 'B0G95YC1T9',
  'B0CMDJR8QM', 'B09Y2B4XHL', 'B0GG5BVR7R', 'B09QJVDNFW',
]

const CURATED = [
  {
    title: 'Festive Décor',
    sub: 'Torans, bells and door hangings that make every entrance a welcome.',
    ctaLabel: 'Shop festive',
    to: '/shop?category=Festive%20D%C3%A9cor',
    asin: 'B09Y2B4XHL',
  },
  {
    title: 'Thoughtful Gifts',
    sub: 'Everlasting bouquets and crochet keepsakes, gifts that never wilt.',
    ctaLabel: 'Shop gifting',
    to: '/shop?category=Artificial%20Flowers',
    asin: 'B0CMDK5J4T',
  },
  {
    title: 'Bulk & Corporate',
    sub: 'Wedding favours, event décor and branded corporate gifting at scale.',
    ctaLabel: 'Get a quote on WhatsApp',
    href: whatsappLink('Hi Atreya! I would like a quote for a bulk / corporate order.'),
    asin: 'B0GDXXM3PR',
  },
]

export default function Home() {
  usePageMeta('Atreya | Handmade Décor & Crochet Keepsakes', `${TAGLINE}. Shop the collection on Amazon.in.`)

  const trending = TRENDING_ASINS.map((a) => PRODUCTS.find((p) => p.asin === a)!).filter(Boolean)

  return (
    <>
      <HeroCarousel />

      {/* Category tiles (Vaaree-style) */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Shop by category</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {CATEGORIES.map((c) => {
              const p = PRODUCTS.find((q) => q.asin === CATEGORY_TILE_ASINS[c]) ?? PRODUCTS.find((q) => q.category === c)
              const count = PRODUCTS.filter((q) => q.category === c).length
              return (
                <Link
                  key={c}
                  to={`/shop?category=${encodeURIComponent(c)}`}
                  className="group overflow-hidden rounded-2xl border border-blush bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="aspect-square overflow-hidden bg-sand">
                    {p?.image && (
                      <img
                        src={p.image}
                        alt={c}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-sm font-semibold text-ink group-hover:text-terra">{c}</p>
                    <p className="mt-0.5 text-xs text-soft">{count} {count === 1 ? 'piece' : 'pieces'}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <UspRow />

      {/* Trending now (Pastiche-style) */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Trending now</h2>
            <Link to="/shop" className="text-sm font-semibold text-terra hover:text-terra-dark">
              View all →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {trending.map((p) => (
              <ProductCard key={p.asin} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Curated collections (Pastiche-style narrative blocks) */}
      <section className="bg-sand py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Curated for every occasion</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {CURATED.map((c) => {
              const p = PRODUCTS.find((q) => q.asin === c.asin)
              const inner = (
                <>
                  <div className="aspect-[4/3] overflow-hidden bg-blush">
                    {p?.image && (
                      <img
                        src={p.image}
                        alt={c.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-semibold">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-soft">{c.sub}</p>
                    <p className="mt-4 text-sm font-semibold text-terra">{c.ctaLabel} →</p>
                  </div>
                </>
              )
              const cls =
                'group block overflow-hidden rounded-2xl border border-blush bg-white shadow-sm transition-shadow hover:shadow-md'
              return c.to ? (
                <Link key={c.title} to={c.to} className={cls}>
                  {inner}
                </Link>
              ) : (
                <a key={c.title} href={c.href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {inner}
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story band */}
      <section className="bg-blush/60 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Made by hand, meant to last</h2>
          <p className="mt-4 leading-relaxed text-soft">
            Atreya began with a simple idea: the little things in a home should carry warmth.
            From hand-crocheted hearts to festive torans that welcome guests at the door, every piece
            is crafted, checked and packed with the same care we'd want in our own homes.
          </p>
          <Link
            to="/about"
            className="mt-6 inline-block rounded-full border border-terra px-6 py-3 text-sm font-semibold text-terra transition-colors hover:bg-terra hover:text-white"
          >
            Read our story
          </Link>
        </div>
      </section>
    </>
  )
}
