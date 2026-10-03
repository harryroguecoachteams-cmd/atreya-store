import { Link } from 'react-router-dom'
import StoryImage from './StoryImage'

// Editorial hero: one statement, three photographs of the range in use. Same
// line and same type as the Amazon Brand Store hero, so a shopper moving
// between the two sees one house. Replaced the old three slide carousel, which
// hid two thirds of its message behind a timer.
const PANELS = [
  { name: 'hero-bun', alt: 'A rani pink rose and jasmine gajra pinned into a bun, worn with a red silk saree', position: '50% 40%' },
  { name: 'hero-mandir', alt: 'A wooden Shubh Labh toran with parrots and bells above a home mandir lit with diyas', position: '50% 45%' },
  { name: 'hero-girl', alt: 'A smiling girl in pink bear sunglasses with bows in her hair', position: '50% 35%' },
]

export default function Hero() {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-14 pt-6 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-16">
        {/* Photos first on mobile, so the page opens on the product in use */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:order-2 lg:col-span-7">
          {PANELS.map((p, i) => (
            <div key={p.name} className={`overflow-hidden bg-sand ${i === 1 ? 'lg:translate-y-8' : ''}`}>
              <StoryImage
                name={p.name}
                alt={p.alt}
                priority={i === 0}
                sizes="(min-width: 1024px) 20vw, 33vw"
                position={p.position}
                className="aspect-[3/4.4] w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="lg:order-1 lg:col-span-5">
          <p className="kicker">Handmade &amp; handpicked in India</p>
          <h1 className="mt-5 font-display text-[44px] font-medium leading-[1.02] text-ink sm:text-6xl lg:text-[68px]">
            Beautiful things for you and your home.
          </h1>
          <p className="mt-5 font-display text-[22px] italic leading-snug text-soft sm:text-2xl">
            Some of it we make by hand. The rest we go and find.
          </p>
          <p className="mt-5 max-w-md leading-relaxed text-soft">
            Gajras for the wedding week, aasans for the mandir, latkans for the door, and small things for
            the people you love. Chosen one at a time, and checked before they ship.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link to="/shop" className="btn-solid">
              Explore the collection
            </Link>
            <Link to="/about" className="link-draw">
              Read our story
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
