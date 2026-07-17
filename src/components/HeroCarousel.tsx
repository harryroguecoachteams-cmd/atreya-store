import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { AMAZON_STOREFRONT, whatsappLink } from '../config'

interface Slide {
  kicker: string
  title: React.ReactNode
  sub: string
  cta: { label: string; to?: string; href?: string }
  ctaSecondary: { label: string; to?: string; href?: string }
  asins: string[]
  bg: string
}

const SLIDES: Slide[] = [
  {
    kicker: 'Handmade in India',
    title: (
      <>
        India&rsquo;s new home for <span className="text-terra">handmade</span> décor &amp; keepsakes
      </>
    ),
    sub: 'Crochet keepsakes, festive torans, everlasting flowers and statement décor, each piece crafted with care, one at a time.',
    cta: { label: 'Shop the collection', to: '/shop' },
    ctaSecondary: { label: 'Visit our Amazon store', href: AMAZON_STOREFRONT },
    asins: ['B0GDV4HTRJ', 'B0GDY75WHT', 'B0G95YC1T9'],
    bg: 'bg-cream',
  },
  {
    kicker: 'Festive Décor',
    title: (
      <>
        Décor that <span className="text-terra">welcomes</span> every guest at the door
      </>
    ),
    sub: 'Jasmine torans, golden jingle bells and silver hanging bells. Handmade festive touches for every celebration.',
    cta: { label: 'Shop Festive Décor', to: '/shop?category=Festive%20D%C3%A9cor' },
    ctaSecondary: { label: 'See all products', to: '/shop' },
    asins: ['B09Y2B4XHL', 'B09QJVDNFW', 'B0B8XR4XNW'],
    bg: 'bg-sand',
  },
  {
    kicker: 'Gifting · Bulk · Corporate',
    title: (
      <>
        Gifts they&rsquo;ll keep <span className="text-terra">forever</span>, one piece or one hundred
      </>
    ),
    sub: 'Everlasting rose bouquets and crochet keepsakes, perfect for weddings, events and corporate gifting. Bulk orders welcome.',
    cta: {
      label: 'Enquire for bulk orders',
      href: whatsappLink('Hi Atreya! I would like a quote for a bulk / corporate order.'),
    },
    ctaSecondary: { label: 'Shop gifting', to: '/shop?category=Artificial%20Flowers' },
    asins: ['B0CMDJR8QM', 'B0CMDK5J4T', 'B0GG5BVR7R'],
    bg: 'bg-blush/60',
  },
]

function CtaButton({ cta, primary }: { cta: Slide['cta']; primary: boolean }) {
  const cls = primary
    ? 'rounded-full bg-terra px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-terra-dark'
    : 'rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-terra hover:text-terra'
  return cta.to ? (
    <Link to={cta.to} className={cls}>
      {cta.label}
    </Link>
  ) : (
    <a href={cta.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {cta.label}
    </a>
  )
}

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const paused = useRef(false)

  useEffect(() => {
    timer.current = setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % SLIDES.length)
    }, 6000)
    return () => clearInterval(timer.current!)
  }, [])

  return (
    <section
      className="relative overflow-hidden"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      aria-roledescription="carousel"
    >
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {SLIDES.map((slide, si) => {
          const imgs = slide.asins.map((a) => PRODUCTS.find((p) => p.asin === a)!).filter(Boolean)
          return (
            <div key={si} className={`w-full shrink-0 ${slide.bg}`} aria-hidden={si !== index}>
              <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20 lg:py-24">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{slide.kicker}</p>
                  <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                    {slide.title}
                  </h1>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-soft">{slide.sub}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <CtaButton cta={slide.cta} primary />
                    <CtaButton cta={slide.ctaSecondary} primary={false} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {imgs.map((p, i) => (
                    <Link key={p.asin} to={`/product/${p.asin}`} tabIndex={si === index ? 0 : -1}>
                      <img
                        src={p.image!}
                        alt={p.name}
                        loading={si === 0 ? 'eager' : 'lazy'}
                        className={`w-full rounded-2xl border border-blush object-cover shadow-sm transition-transform hover:scale-[1.02] ${
                          i === 1 ? 'mt-8' : i === 2 ? 'mt-16' : ''
                        }`}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <button
        aria-label="Previous slide"
        onClick={() => setIndex((index - 1 + SLIDES.length) % SLIDES.length)}
        className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-white/80 text-ink backdrop-blur transition-colors hover:border-terra hover:text-terra md:flex"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <button
        aria-label="Next slide"
        onClick={() => setIndex((index + 1) % SLIDES.length)}
        className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-white/80 text-ink backdrop-blur transition-colors hover:border-terra hover:text-terra md:flex"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? 'w-6 bg-terra' : 'w-2 bg-ink/20 hover:bg-ink/40'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
