import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL } from '../config'

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

type MetaOptions = {
  image?: string
  /** Page has no indexable content (404). Emits noindex and drops the canonical. */
  noindex?: boolean
  /** og:type override; defaults to website. Product pages pass "product". */
  ogType?: string
  /**
   * Canonical path when it is not this URL. Shop's category filter points at
   * the matching /collections/<slug> page, so the two do not compete.
   */
  canonicalPath?: string
}

/** Sets document title, description, canonical and OG/Twitter tags for the page. */
export function usePageMeta(title: string, description: string, options: MetaOptions = {}) {
  const { image, noindex = false, ogType = 'website', canonicalPath } = options
  const { pathname } = useLocation()
  useEffect(() => {
    const path = canonicalPath ?? pathname
    const url = `${SITE_URL}${path === '/' ? '/' : path}`
    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', ogType)
    upsertMeta('property', 'og:locale', 'en_IN')
    upsertMeta('property', 'og:image', image ?? `${SITE_URL}/og-image.jpg`)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    // A 404 that self-canonicalises tells Google the URL is a real page, which
    // is how delisted products stay in the index. Say noindex and say nothing
    // about a canonical or an og:url.
    upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')
    if (noindex) {
      canonical?.remove()
      ogUrl?.remove()
      return
    }
    upsertMeta('property', 'og:url', url)
    if (canonical) {
      canonical.href = url
    } else {
      const link = document.createElement('link')
      link.rel = 'canonical'
      link.href = url
      document.head.appendChild(link)
    }
  }, [title, description, image, pathname, noindex, ogType, canonicalPath])
}
