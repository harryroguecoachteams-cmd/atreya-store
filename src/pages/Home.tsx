import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PRODUCTS, CATEGORIES } from '../data/products'
import ProductCard from '../components/ProductCard'
import { AMAZON_STOREFRONT, TAGLINE } from '../config'

const FEATURED_ASINS = ['B0GDXXM3PR', 'B0GDV4HTRJ', 'B0GDY75WHT', 'B0G95YC1T9']

export default function Home() {
  usePageMeta('Atreya — Handmade Décor & Crochet Keepsakes', `${TAGLINE}. Shop the collection on Amazon.in.`)

  const featured = FEATURED_ASINS.map((a) => PRODUCTS.find((p) => p.asin === a)!).filter(Boolean)
  const heroImages = ['B0GDV4HTRJ', 'B0G95YC1T9', 'B0GDY75WHT'].map(
    (a) => PRODUCTS.find((p) => p.asin === a)!,
  )

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Crafted in India</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Handmade pieces that make a house feel like <span className="text-terra">home</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-soft">
              Crochet keepsakes, festive torans and bells, everlasting flowers and statement décor —
              each piece made with care, one at a time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="rounded-full bg-terra px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-terra-dark"
              >
                Shop the collection
              </Link>
              <a
                href={AMAZON_STOREFRONT}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-terra hover:text-terra"
              >
                Visit our Amazon store
              </a>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {heroImages.map((p, i) => (
              <img
                key={p.asin}
                src={p.image!}
                alt={p.name}
                className={`w-full rounded-2xl border border-blush object-cover shadow-sm ${
                  i === 1 ? 'mt-8' : i === 2 ? 'mt-16' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-sand py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Shop by category</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c}
                to={`/shop?category=${encodeURIComponent(c)}`}
                className="rounded-full border border-ink/10 bg-white px-5 py-2.5 text-sm font-medium transition-colors hover:border-terra hover:text-terra"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Customer favourites</h2>
            <Link to="/shop" className="text-sm font-semibold text-terra hover:text-terra-dark">
              View all →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.asin} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Story band */}
      <section className="bg-blush/60 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Made by hand, meant to last</h2>
          <p className="mt-4 leading-relaxed text-soft">
            Atreya began with a simple idea — that the little things in a home should carry warmth.
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
