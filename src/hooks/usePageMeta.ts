import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL } from '../config'

/** Sets document title, meta description and canonical URL for the page. */
export function usePageMeta(title: string, description: string) {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description)
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `${SITE_URL}${pathname === '/' ? '/' : pathname}`
  }, [title, description, pathname])
}
