import { Link } from 'react-router-dom'
import { AMAZON_STOREFRONT, CONTACT_EMAIL, whatsappLink } from '../config'

export default function Footer() {
  return (
    <footer className="border-t border-blush bg-sand">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-xl font-semibold text-terra">Atreya</p>
          <p className="mt-2 text-sm leading-relaxed text-soft">
            Handmade crochet keepsakes, festive décor and artificial flowers — designed and crafted in India with love.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-soft">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/shop" className="text-ink hover:text-terra">Shop the collection</Link></li>
            <li><Link to="/about" className="text-ink hover:text-terra">Our story</Link></li>
            <li><Link to="/contact" className="text-ink hover:text-terra">Contact us</Link></li>
            <li><Link to="/privacy" className="text-ink hover:text-terra">Privacy policy</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-soft">Get in touch</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={whatsappLink('Hi Atreya! I have a question about your products.')} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-terra">
                WhatsApp us
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink hover:text-terra">{CONTACT_EMAIL}</a>
            </li>
            <li>
              <a href={AMAZON_STOREFRONT} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-terra">
                Amazon.in storefront
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-blush py-4 text-center text-xs text-soft">
        © {new Date().getFullYear()} Atreya. All rights reserved.
      </div>
    </footer>
  )
}
