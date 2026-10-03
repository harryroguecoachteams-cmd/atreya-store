import { Link } from 'react-router-dom'
import { FESTIVE } from '../config'

export default function AnnouncementBar() {
  if (FESTIVE.diwali) {
    return (
      <Link
        to="/diwali-gifting"
        className="diwali-night block px-4 py-2.5 text-center text-[10.5px] font-medium uppercase tracking-[0.24em] text-cream/90 transition-colors hover:text-marigold"
      >
        <span className="text-marigold">The Diwali edit is here</span>
        <span className="hidden sm:inline">&ensp;·&ensp;Gifts for the mandir, the door and the people you love&ensp;·&ensp;Delivered by Amazon.in</span>
        <span className="sm:hidden">&ensp;·&ensp;Shop gifts</span>
      </Link>
    )
  }
  return (
    <div className="bg-ink px-4 py-2.5 text-center text-[10.5px] font-medium uppercase tracking-[0.24em] text-cream/85">
      <span className="hidden sm:inline">
        Handmade &amp; handpicked in India&ensp;·&ensp;Delivered by Amazon.in&ensp;·&ensp;Bulk &amp; wedding orders on WhatsApp
      </span>
      <span className="sm:hidden">Handmade &amp; handpicked · Delivered by Amazon.in</span>
    </div>
  )
}
