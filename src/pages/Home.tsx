import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PRODUCTS, CATEGORIES, type Product } from '../data/products'
import { categoryPath } from '../data/collections'
import { CATEGORY_IMAGES } from '../data/story'
import ProductCard from '../components/ProductCard'
import Hero from '../components/Hero'
import UspRow from '../components/UspRow'
import StoryImage from '../components/StoryImage'
import { FESTIVE, whatsappLink } from '../config'
import { thumb } from '../lib/thumb'

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`

// The home page is told as four chapters, one per place in the home the range
// belongs to, rather than as a grid of categories. Every claim in this copy is
// one the listings and the collection guides already stand behind.
const CHAPTERS = [
  {
    n: 'I',
    title: 'Worn on the day',
    text: [
      'A wedding week is four functions in five days, and the flowers in your hair have to last through every one of them. Ours are fabric, so the gajra pinned at nine for the haldi still looks fresh in the photographs at midnight.',
      'Yellow for the haldi, rani pink for the mehndi, red for the wedding itself, and white for every day after. For smaller moments there are rose pins that push into a juda in a second, and clips a mother and daughter can match.',
    ],
    image: 'ch-hair',
    imageAlt: 'A woman with mehndi on her hands wearing a yellow rose hand gajra',
    inset: 'ch-hair-2',
    insetAlt: 'A rani pink rose juda comb with pearl sprays set in a bun',
    links: [
      { label: 'Gajras', to: '/collections/gajras' },
      { label: 'Hair accessories', to: '/collections/hair-accessories' },
    ],
    asins: ['B0HFBN6VKM', 'B0HGFMB8JJ', 'B0HD2H3LF4'],
  },
  {
    n: 'II',
    title: 'Kept in the mandir',
    text: [
      'Every home has one corner that is looked after more carefully than the rest. For it we make one thing ourselves: a lotus aasan, stitched petal by petal in our workshop, to lift an idol, a kalash or a diya thali off the shelf.',
      'Around it, a few things we chose. A meenakari thali whose katori have lids, so the roli stays where you put it. A mirror work matki for Janmashtami that tends to stay up long after the festival.',
    ],
    image: 'ch-mandir',
    imageAlt: 'A yellow lotus pooja aasan on a mandir shelf among marigolds and brass',
    inset: 'ch-mandir-2',
    insetAlt: 'Hands holding a gold meenakari puja thali with a yellow rose',
    links: [{ label: 'Pooja essentials', to: '/collections/pooja-essentials' }],
    asins: ['B0HB4N2JSH', 'B0HF9ZSQY3', 'B0HFBM7WZG'],
  },
  {
    n: 'III',
    title: 'Hung at the door',
    text: [
      'The door is the first thing a guest sees and the last thing a festival leaves behind. A toran runs across the top; latkans hang down each side, in pairs, so the entrance reads as a frame rather than a strip.',
      'Gold mirror lotuses for Diwali, Ganesh ji for Chaturthi and a new home, gota patti rings with bells that sound as the door opens, and flower strings that are still white on the last day of the festival.',
    ],
    image: 'ch-door',
    imageAlt: 'A gold mirror lotus latkan hanging against a dark carved door beside a lit diya',
    inset: 'ch-door-2',
    insetAlt: 'A doorway framed by red lotus latkans with pink jhumkas',
    links: [
      { label: 'Door hangings', to: '/collections/door-hangings' },
      { label: 'Festive décor', to: '/collections/festive-decor' },
    ],
    asins: ['B0HJ8S6WZZ', 'B0HFQ8KM5T', 'B0HJ8Z86C8'],
  },
  {
    n: 'IV',
    title: 'Small things for the people you love',
    text: [
      'Some of the best things here cost the least. Mini crochet hearts, made in our workshop one at a time, to scatter in a bowl or tuck into a card. Bear sunglasses with bow clips for a child\'s birthday photograph. Paper soap that lives in a school bag.',
      'None of it is meant to be thrown away after one use.',
    ],
    image: 'ch-gifts',
    imageAlt: 'Two hands holding a pile of mini crochet hearts in many colors',
    inset: 'ch-gifts-2',
    insetAlt: 'A girl smiling in brown bear sunglasses with lace bows in her hair',
    links: [
      { label: 'Crochet', to: '/collections/crochet' },
      { label: 'Kids', to: categoryPath('Kids') },
      { label: 'Travel essentials', to: categoryPath('Travel Essentials') },
    ],
    asins: ['B0GDXXM3PR', 'B0HGFFKH66', 'B0HFQ1KFPJ'],
  },
]

// The newest arrivals, which is what a returning visitor has not seen.
const NEW_ASINS = ['B0HJ8P8NBY', 'B0HJ8KSPP7', 'B0HF4PXH7S', 'B0HGFLGL4V']

const byAsin = (asins: string[]) =>
  asins.map((a) => PRODUCTS.find((p) => p.asin === a)).filter((p): p is Product => Boolean(p))

export default function Home() {
  usePageMeta(
    'Atreya | Gajras, Latkans, Pooja Aasans & Handmade Décor',
    'Gajras, rose hair pins, door latkans, puja thalis and festive decor chosen across India, plus crochet and lotus pooja aasans from our own workshop. Shop on Amazon.in.',
  )

  return (
    <>
      <Hero />

      {/* Seasonal: the Diwali edit, straight after the hero while FESTIVE.diwali */}
      {FESTIVE.diwali && (
        <section className="diwali-night text-cream">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
            <div className="grid grid-cols-3 gap-3 lg:col-span-7">
              {[
                { name: 'diwali-mandir', alt: 'A home mandir with diyas lit, framed by red lotus latkans' },
                { name: 'diwali-gift', alt: 'A rani pink lotus pooja aasan beside its gift box' },
                { name: 'ch-door', alt: 'A gold mirror lotus latkan on a carved door beside a lit diya' },
              ].map((im, i) => (
                <div key={im.name} className={`overflow-hidden ${i === 1 ? 'lg:-translate-y-6' : ''}`}>
                  <StoryImage name={im.name} alt={im.alt} sizes="(min-width: 1024px) 19vw, 33vw" className="aspect-[3/4.2] w-full object-cover" />
                </div>
              ))}
            </div>
            <div className="lg:col-span-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-marigold">The Diwali edit</p>
              <h2 className="mt-4 font-display text-[40px] font-medium leading-[1.05] sm:text-5xl">
                Gifts for the festival of lights.
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-cream/80">
                Lotus aasans for the mandir, thalis whose katori close, latkans for the door and gajras for the
                puja. Gifts that come out again next Diwali, made or chosen by us and checked before they ship.
              </p>
              <Link
                to="/diwali-gifting"
                className="mt-8 inline-flex bg-marigold px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-night transition-colors hover:bg-cream"
              >
                Shop Diwali gifting
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* The statement */}
      <section className="border-t border-blush py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="ornament justify-center" aria-hidden="true">
            <span />
          </div>
          <p className="mt-8 font-display text-[26px] leading-[1.38] text-ink sm:text-[34px]">
            Atreya is a small Indian house for the things that turn a day into an occasion: the gajra
            pinned before the haldi, the aasan beneath the idol, the latkan that rings when the door
            opens. <em className="text-terra">A few of them we make with our own hands.</em> The rest we
            choose, one at a time.
          </p>
        </div>
      </section>

      {/* Four chapters */}
      {CHAPTERS.map((c, i) => {
        const flip = i % 2 === 1
        const items = byAsin(c.asins)
        return (
          <section key={c.n} className={`py-16 sm:py-24 ${flip ? 'bg-paper' : ''}`}>
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-12 lg:gap-16">
              <div className={`relative lg:col-span-6 ${flip ? 'lg:order-2' : ''}`}>
                <div className="overflow-hidden bg-sand">
                  <StoryImage
                    name={c.image}
                    alt={c.imageAlt}
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="aspect-[4/5] w-full object-cover sm:aspect-[5/5.4]"
                  />
                </div>
                <div
                  className={`absolute -bottom-8 hidden w-[38%] overflow-hidden border-[10px] sm:block ${
                    flip ? 'left-3 border-paper lg:-left-8' : 'right-3 border-cream lg:-right-8'
                  }`}
                >
                  <StoryImage name={c.inset} alt={c.insetAlt} sizes="20vw" className="aspect-square w-full object-cover" />
                </div>
              </div>

              <div className={`lg:col-span-5 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}>
                <p className="font-display text-2xl italic text-gold">{c.n}</p>
                <h2 className="mt-2 font-display text-[40px] font-medium leading-[1.05] text-ink sm:text-5xl">{c.title}</h2>
                <div className="prose-story mt-6 leading-relaxed text-soft">
                  {c.text.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </div>

                <ul className="mt-8 grid grid-cols-3 gap-3">
                  {items.map((p) => (
                    <li key={p.asin}>
                      <Link to={`/product/${p.asin}`} className="group block">
                        <div className="aspect-square overflow-hidden bg-white">
                          <img
                            src={p.image ? thumb(p.image) : ''}
                            alt={`${p.name} by Atreya`}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                        </div>
                        <p className="mt-2 line-clamp-2 text-[13px] leading-snug text-ink group-hover:text-terra">{p.name}</p>
                        <p className="mt-0.5 text-[13px] text-soft">{inr(p.price)}</p>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                  {c.links.map((l) => (
                    <Link key={l.to} to={l.to} className="link-draw">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Made by us: the craft band */}
      <section className="bg-ink py-20 text-cream sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-12 lg:gap-16">
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
            <h2 className="mt-4 font-display text-[40px] font-medium leading-[1.05] sm:text-5xl">
              Petal by petal, stitch by stitch.
            </h2>
            <div className="prose-story mt-6 leading-relaxed text-cream/80">
              <p>
                Two things on this site come out of our own workshop. The lotus aasans, where every petal is
                cut and shaped on its own and the gold beaded border is stitched around by hand. And the
                crochet, worked one piece at a time in cotton yarn. That is why no two open, or sit, exactly
                alike, and why we cannot make a thousand of anything in a week.
              </p>
              <p>
                Everything else we choose. We go through the market ourselves and set aside far more than we
                keep, and whatever makes it onto the shelf is checked again before it ships.
              </p>
            </div>
            <Link
              to="/about"
              className="mt-8 inline-flex border border-cream/70 px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-cream transition-colors hover:bg-cream hover:text-ink"
            >
              Read our story
            </Link>
          </div>
        </div>
      </section>

      {/* The collections */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <p className="kicker">Shop by collection</p>
            <h2 className="mt-3 font-display text-[40px] font-medium leading-tight sm:text-5xl">The collections</h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-5 md:gap-x-5">
            {CATEGORIES.map((c) => {
              const art = CATEGORY_IMAGES[c]
              const count = PRODUCTS.filter((p) => p.category === c).length
              return (
                <Link key={c} to={categoryPath(c)} className="group block text-center">
                  <div className="overflow-hidden bg-sand">
                    {art && (
                      <StoryImage
                        name={art.image}
                        alt={art.alt}
                        sizes="(min-width: 768px) 19vw, 50vw"
                        className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    )}
                  </div>
                  <p className="mt-4 font-display text-[22px] font-medium leading-tight text-ink group-hover:text-terra">{c}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-soft">
                    {count} {count === 1 ? 'piece' : 'pieces'}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* New on the shelf */}
      <section className="border-t border-blush py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker">Just arrived</p>
              <h2 className="mt-3 font-display text-[40px] font-medium leading-tight sm:text-5xl">New on the shelf</h2>
            </div>
            <Link to="/shop" className="link-draw">
              Shop everything
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {byAsin(NEW_ASINS).map((p) => (
              <ProductCard key={p.asin} product={p} />
            ))}
          </div>
        </div>
      </section>

      <UspRow />

      {/* Weddings, events and gifting */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <StoryImage
              name="bulk-garlands"
              alt="Red and white mogra garlands with bells hung in rows across a room"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="kicker">Weddings, events &amp; gifting</p>
            <h2 className="mt-4 font-display text-[40px] font-medium leading-[1.05] sm:text-5xl">
              One piece, or one hundred.
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-soft">
              Hand gajras for a bridal party, latkans for every pillar of a mandap, crochet hearts for a favor
              table, aasans for a stack of housewarming hampers. Quantities beyond the multi-packs are a
              conversation rather than an order form: tell us what, how many and by when, and we will quote.
            </p>
            <a
              href={whatsappLink('Hi Atreya! I would like a quote for a bulk / wedding / corporate order.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-terra mt-8"
            >
              Ask for a quote on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
