import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { PRODUCTS } from '../data/products'

export default function About() {
  usePageMeta(
    'Our Story | Atreya',
    'Atreya is an Indian home décor brand. We crochet our own keepsakes and lotus pooja aasans, and handpick festive garlands, gajras, bells and flowers from Indian markets.',
  )
  const collage = ['B0GG5BVR7R', 'B0GDY7RSXY', 'B0CMDJR8QM', 'B09Y2B4XHL']
    .map((a) => PRODUCTS.find((p) => p.asin === a)!)
    .filter(Boolean)

  return (
    <section className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Our story</h1>
      <div className="mt-6 space-y-5 leading-relaxed text-soft">
        <p>
          <strong className="text-ink">Atreya</strong> started as a small home-grown venture with one
          belief: décor doesn't need to be mass-produced to be beautiful. The best pieces are the ones
          that carry a human touch: a stitch, a knot, a detail someone lingered over.
        </p>
        <p>
          Two things sit behind everything on this site. Some of it we make: our little workshop
          hand-crochets the hearts, keychains, scrunchies and rose gajras, and stitches the lotus
          pooja aasans petal by petal. The rest we handpick, going through the market ourselves and
          comparing what is out there until something is good enough to carry our name: the mogra
          and pom pom garlands, the jasmine torans, the hanging bells, the everlasting flowers and
          the brass-worked wooden vases.
        </p>
        <p>
          We would rather list twelve things we would keep in our own home than a hundred we would
          not, which is why the catalogue grows slowly and why nothing goes up untested.
        </p>
        <p>
          Every order is fulfilled through <strong className="text-ink">Amazon.in</strong>, so you get
          fast delivery, easy returns and buyer protection, while we focus on what we do best: making
          and choosing beautiful things.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {collage.map((p) => (
          <img key={p.asin} src={p.image!} alt={`${p.name} by Atreya`} className="aspect-square w-full rounded-2xl border border-blush object-cover" loading="lazy" />
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-blush/60 p-6 text-center sm:p-8">
        <h2 className="font-display text-xl font-semibold">What we stand for</h2>
        <div className="mt-5 grid gap-5 text-sm sm:grid-cols-3">
          <div>
            <p className="font-semibold text-terra">Handmade first</p>
            <p className="mt-1 text-soft">Crochet pieces are made one at a time, so no two are identical.</p>
          </div>
          <div>
            <p className="font-semibold text-terra">Handpicked, not just listed</p>
            <p className="mt-1 text-soft">What we don't make, we go and find, and reject far more than we keep.</p>
          </div>
          <div>
            <p className="font-semibold text-terra">Rooted in tradition</p>
            <p className="mt-1 text-soft">Torans, gajras and bells that keep Indian festive craft alive.</p>
          </div>
        </div>
        <Link
          to="/shop"
          className="mt-7 inline-block rounded-full bg-terra px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-terra-dark"
        >
          Explore the collection
        </Link>
      </div>
    </section>
  )
}
