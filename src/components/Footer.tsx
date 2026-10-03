import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AMAZON_STOREFRONT, CONTACT_EMAIL, whatsappLink } from '../config'
import { CATEGORIES } from '../data/products'
import { categoryPath } from '../data/collections'

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

  const heading = 'text-[11px] font-medium uppercase tracking-[0.24em] text-brass'
  const item = 'text-cream/75 transition-colors hover:text-cream'

  return (
    <footer className="bg-ink text-cream">
      {/* Sign off */}
      <div className="border-b border-cream/10">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <img
            src="/brand/atreya-wordmark-light.svg"
            alt="Atreya"
            width={1033}
            height={239}
            loading="lazy"
            className="mx-auto h-14 w-auto sm:h-[72px]"
          />
          <div className="ornament mt-5 justify-center" aria-hidden="true">
            <span />
          </div>
          <p className="mt-5 font-display text-2xl italic text-cream/85">Beautiful things for you and your home.</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/65">
            Hand checked and hand packed, every piece. Delivered across India by Amazon.in.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className={heading}>The house</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/about" className={item}>Our story</Link></li>
            <li><Link to="/shop" className={item}>Shop all</Link></li>
            <li><Link to="/diwali-gifting" className={item}>Diwali gifting</Link></li>
            <li><Link to="/contact" className={item}>Contact us</Link></li>
            <li><Link to="/shipping-returns" className={item}>Shipping &amp; returns</Link></li>
            <li><Link to="/privacy" className={item}>Privacy policy</Link></li>
          </ul>
        </div>

        <div>
          <p className={heading}>Collections</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link to={categoryPath(c)} className={item}>
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={heading}>Talk to us</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={whatsappLink('Hi Atreya! I have a question about your products.')} target="_blank" rel="noopener noreferrer" className={item}>
                WhatsApp +91 97115 48517
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className={item}>{CONTACT_EMAIL}</a>
            </li>
            <li>
              <a
                href={whatsappLink('Hi Atreya! I would like a quote for a bulk / wedding / corporate order.')}
                target="_blank"
                rel="noopener noreferrer"
                className={item}
              >
                Bulk &amp; wedding orders
              </a>
            </li>
            <li>
              <a href={AMAZON_STOREFRONT} target="_blank" rel="noopener noreferrer" className={item}>
                Our Amazon.in store
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/atreyastore" target="_blank" rel="noopener noreferrer" className={item}>
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className={heading}>Join the Atreya circle</p>
          <p className="mt-4 text-sm leading-relaxed text-cream/75">
            New pieces and festive collections, before anyone else. We will reach you on WhatsApp. No spam, ever.
          </p>
          <form onSubmit={joinCircle} className="mt-5 flex items-end gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              aria-label="Email address"
              className="w-full min-w-0 border-0 border-b border-cream/35 bg-transparent px-0 py-2 text-sm text-cream placeholder:text-cream/55 focus:border-cream focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 border border-cream/70 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-cream transition-colors hover:bg-cream hover:text-ink"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-cream/10 px-4 py-5 text-center text-xs text-cream/55">
        © {new Date().getFullYear()} Atreya · Handmade &amp; handpicked in India
      </div>
    </footer>
  )
}
