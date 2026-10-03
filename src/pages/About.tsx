import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import StoryImage from '../components/StoryImage'

// Told in four short chapters, each with one photograph of the range in use.
// The facts are the same ones the rest of the site stands behind: two things
// made in our workshop, everything else chosen, every order through Amazon.in.
const CHAPTERS = [
  {
    n: 'I',
    title: 'Where it began',
    image: 'hero-bun',
    alt: 'A rani pink rose and jasmine gajra pinned into a bun',
    text: [
      'Atreya started as a small home-grown venture with one belief: the things in a home do not need to be mass-produced to be beautiful. The best pieces are the ones that carry a human touch: a stitch, a knot, a detail someone lingered over.',
      'It began with the small things that make a day feel like an occasion. A gajra for the haldi. A seat for the idol in the mandir. Something to hang at the door when the festival comes.',
    ],
  },
  {
    n: 'II',
    title: 'What we make',
    image: 'craft-aasan',
    alt: 'Close up of the satin petals and gold beaded border of a lotus aasan',
    text: [
      'Two things on this site come out of our own small workshop. The lotus pooja aasans, where every petal is cut and shaped on its own and the gold beaded border is stitched around by hand. And the crochet, worked one piece at a time in cotton yarn.',
      'Because they are made by hand, no two come out exactly alike. We think that is the point.',
    ],
  },
  {
    n: 'III',
    title: 'What we choose',
    image: 'ch-door',
    alt: 'A gold mirror lotus latkan hanging on a dark carved door beside a lit diya',
    text: [
      'Everything else we handpick. We go through the market ourselves and compare what is out there until something is good enough to carry our name: the gajras and rose hair pins, the latkans and torans, the meenakari thalis, the garlands and hanging bells, the bear sunglasses that children refuse to take off.',
      'We would rather list twelve things we would keep in our own home than a hundred we would not, which is why the shelf grows slowly and why nothing goes up untested.',
    ],
  },
  {
    n: 'IV',
    title: 'How it reaches you',
    image: 'ch-mandir-2',
    alt: 'Hands carrying a gold meenakari puja thali with a yellow rose',
    text: [
      'Every piece is checked and packed by hand, and the same words sit on every one of our listings to say so. Every order is fulfilled through Amazon.in, so you get fast delivery, Amazon\'s returns and buyer protection, while we get on with what we do best: making and choosing beautiful things.',
    ],
  },
]

export default function About() {
  usePageMeta(
    'Our Story | Atreya',
    'Atreya is an Indian house for gajras, pooja decor and keepsakes. We make crochet and lotus pooja aasans in our own workshop, and handpick the rest, from latkans to thalis.',
  )

  return (
    <>
      <section className="border-b border-blush">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-24">
          <p className="kicker">Our story</p>
          <h1 className="mt-5 font-display text-[44px] font-medium leading-[1.05] sm:text-6xl">
            Some of it we make. The rest we go and find.
          </h1>
          <div className="ornament mt-8 justify-center" aria-hidden="true">
            <span />
          </div>
          <p className="mt-8 font-display text-2xl italic leading-snug text-soft">
            Beautiful things for you and your home, handmade and handpicked in India.
          </p>
        </div>
      </section>

      {CHAPTERS.map((c, i) => {
        const flip = i % 2 === 1
        return (
          <section key={c.n} className={`py-16 sm:py-24 ${flip ? 'bg-paper' : ''}`}>
            <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16">
              <div className={flip ? 'lg:order-2' : ''}>
                <StoryImage
                  name={c.image}
                  alt={c.alt}
                  priority={i === 0}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div>
                <p className="font-display text-2xl italic text-gold">{c.n}</p>
                <h2 className="mt-2 font-display text-[40px] font-medium leading-[1.05] sm:text-5xl">{c.title}</h2>
                <div className="prose-story mt-6 leading-relaxed text-soft">
                  {c.text.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )
      })}

      <section className="border-t border-blush bg-paper py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="font-display text-[36px] font-medium sm:text-[44px]">What we stand for</h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            <div>
              <p className="font-display text-2xl italic text-gold">Made by hand</p>
              <p className="mt-3 text-sm leading-relaxed text-soft">
                What we make, we make one at a time, so no two pieces are identical.
              </p>
            </div>
            <div>
              <p className="font-display text-2xl italic text-gold">Picked, not just stocked</p>
              <p className="mt-3 text-sm leading-relaxed text-soft">
                What we do not make, we go and find, and we turn down far more than we keep.
              </p>
            </div>
            <div>
              <p className="font-display text-2xl italic text-gold">Rooted in tradition</p>
              <p className="mt-3 text-sm leading-relaxed text-soft">
                Gajras, latkans, torans and aasans that keep everyday Indian craft in everyday use.
              </p>
            </div>
          </div>
          <Link
            to="/shop"
            className="btn-solid mt-12"
          >
            Explore the collection
          </Link>
        </div>
      </section>
    </>
  )
}
