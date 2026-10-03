import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta('Page not found | Atreya', 'The page you were looking for does not exist.', {
    noindex: true,
  })

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-8xl italic text-brass">404</p>
      <h1 className="mt-4 font-display text-3xl font-medium sm:text-4xl">This thread got tangled</h1>
      <p className="mt-3 max-w-md text-soft">
        The page you're looking for doesn't exist, but the collection is just a click away.
      </p>
      <Link
        to="/shop"
        className="btn-terra mt-8"
      >
        Browse the collection
      </Link>
    </section>
  )
}
