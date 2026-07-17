import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta('Page not found | Atreya', 'The page you were looking for does not exist.')

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-7xl font-semibold text-blush">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">This thread got tangled</h1>
      <p className="mt-3 max-w-md text-soft">
        The page you're looking for doesn't exist, but the collection is just a click away.
      </p>
      <Link
        to="/shop"
        className="mt-8 rounded-full bg-terra px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-terra-dark"
      >
        Browse the collection
      </Link>
    </section>
  )
}
