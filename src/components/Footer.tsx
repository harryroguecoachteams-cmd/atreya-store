import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AMAZON_STOREFRONT, CONTACT_EMAIL, whatsappLink } from '../config'
import { CATEGORIES } from '../data/products'
import { categoryPath } from '../data/collections'

const TRUST = [
  { title: 'Handmade & handpicked', sub: 'Made by us or chosen by us' },
  { title: 'Sourced in India', sub: 'Indian makers and Indian markets' },
  { title: 'Secure payments', sub: 'Checkout safely on Amazon.in' },
  { title: 'Bulk orders welcome', sub: 'Weddings, events & corporate' },
]

export default function Footer() {
  const [email, setEmail] = useState('')

  // No mailing backend yet, so signups route to WhatsApp and no lead is lost.
  const joinCircle = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = email.trim()
      ? `Hi Atreya! Please add me to your updates list. My email: ${email.trim()}`
      : 'Hi Atreya! Please add me to your updates list.'
    window.open(whatsappLink(msg), '_blank', 'noopener')
    setEmail('')
  }

  return (
    <footer className="border-t border-blush bg-sand">
      {/* Trust strip (Craftroots-style) */}
      <div className="border-b border-blush bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-6 lg:grid-cols-4">
          {TRUST.map((t) => (
            <div key={t.title} className="text-center">
              <p className="text-sm font-semibold text-ink">{t.title}</p>
              <p className="mt-0.5 text-xs text-soft">{t.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Our roots */}
        <div>
          <p className="font-display text-xl font-semibold text-terra">Atreya</p>
          <p className="mt-2 text-sm leading-relaxed text-soft">
            Crochet keepsakes and lotus pooja aasans from our own workshop, plus gajras, festive garlands and everlasting flowers handpicked across India.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="text-ink hover:text-terra">Our story</Link></li>
            <li><Link to="/contact" className="text-ink hover:text-terra">Contact us</Link></li>
            <li><Link to="/shipping-returns" className="text-ink hover:text-terra">Shipping &amp; returns</Link></li>
            <li><Link to="/privacy" className="text-ink hover:text-terra">Privacy policy</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-soft">Categories</p>
          <ul className="mt-3 space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link to={categoryPath(c)} className="text-ink hover:text-terra">
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-soft">Quick links</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/shop" className="text-ink hover:text-terra">Shop all</Link></li>
            <li>
              <a
                href={whatsappLink('Hi Atreya! I would like a quote for a bulk / corporate order.')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-terra"
              >
                Bulk order
              </a>
            </li>
            <li>
              <a href={AMAZON_STOREFRONT} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-terra">
                Amazon.in storefront
              </a>
            </li>
            <li>
              <a
                href={whatsappLink('Hi Atreya! I have a question about your products.')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-terra"
              >
                WhatsApp us
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink hover:text-terra">{CONTACT_EMAIL}</a>
            </li>
          </ul>
        </div>

        {/* Join the circle (Craftroots-style newsletter) */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-soft">Join the Atreya circle</p>
          <p className="mt-3 text-sm leading-relaxed text-soft">
            Be first to see new pieces and festive collections. We'll reach you on WhatsApp. No spam, ever.
          </p>
          <form onSubmit={joinCircle} className="mt-4 flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              aria-label="Email address"
              className="w-full min-w-0 rounded-full border border-ink/10 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-soft/70 focus:border-terra focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-terra px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-terra-dark"
            >
              Join
            </button>
          </form>
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.instagram.com/atreyastore"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Atreya on Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:border-terra hover:text-terra"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
              </svg>
            </a>
            <a
              href={whatsappLink('Hi Atreya!')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Atreya on WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:border-terra hover:text-terra"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M3 20l1.2-3.6A8.5 8.5 0 1 1 7.6 19L3 20Z" />
              </svg>
            </a>
            <a
              href={AMAZON_STOREFRONT}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Atreya on Amazon"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:border-terra hover:text-terra"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M6 8h12l1.5 12h-15L6 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-blush py-4 text-center text-xs text-soft">
        © {new Date().getFullYear()} Atreya · Handmade &amp; handpicked in India. All rights reserved.
      </div>
    </footer>
  )
}
