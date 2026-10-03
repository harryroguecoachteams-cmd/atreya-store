import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AMAZON_STOREFRONT, FESTIVE } from '../config'
import SearchBar from './SearchBar'

// The collections people actually shop by, in the order of the home page
// story. Crochet, Kids, Travel Essentials and Craft Supplies are reached from
// Shop all, the footer and the home page collections grid.
const links = [
  ...(FESTIVE.diwali ? [{ to: '/diwali-gifting', label: 'Diwali gifting' }] : []),
  { to: '/shop', label: 'Shop all' },
  { to: '/collections/gajras', label: 'Gajras' },
  { to: '/collections/hair-accessories', label: 'Hair accessories' },
  { to: '/collections/pooja-essentials', label: 'Pooja' },
  { to: '/collections/door-hangings', label: 'Door hangings' },
  { to: '/collections/festive-decor', label: 'Festive décor' },
  { to: '/about', label: 'Our story' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)

  const navItem = ({ isActive }: { isActive: boolean }) =>
    `relative py-1 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-terra after:transition-transform ${
      isActive ? 'text-terra after:scale-x-100' : 'text-ink/80 hover:text-ink after:scale-x-0'
    }`
  // The seasonal link is set in terracotta so it reads as the moment, not as
  // one more shelf.
  const festive = (to: string) => (to === '/diwali-gifting' ? ' !text-terra' : '')

  return (
    <header className="sticky top-0 z-40 border-b border-blush bg-cream/95 backdrop-blur">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 lg:h-[76px]">
        {/* Left: search on desktop, menu on mobile */}
        <div className="flex items-center">
          <SearchBar className="hidden w-60 lg:block" />
          <button
            className="-ml-2 p-2 text-ink lg:hidden"
            onClick={() => {
              setOpen(!open)
              setSearching(false)
            }}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
            </svg>
          </button>
        </div>

        {/* Lotus wordmark, traced from the brand artwork by scripts/brand-logo.py */}
        <Link to="/" aria-label="Atreya, home" className="flex flex-col items-center leading-none" onClick={() => setOpen(false)}>
          <img src="/brand/atreya-wordmark.svg" alt="Atreya" width={1033} height={239} className="h-8 w-auto lg:h-10" />
          <span className="mt-1 hidden font-display text-[13px] italic text-soft lg:block">Handmade &amp; handpicked</span>
        </Link>

        {/* Right */}
        <div className="flex items-center justify-end gap-6">
          <Link to="/contact" className="hidden text-[11px] font-medium uppercase tracking-[0.22em] text-ink/80 hover:text-ink lg:inline">
            Contact
          </Link>
          <a
            href={AMAZON_STOREFRONT}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden border border-ink/70 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-cream lg:inline-block"
          >
            Amazon store
          </a>
          <button
            className="-mr-2 p-2 text-ink lg:hidden"
            onClick={() => {
              setSearching(!searching)
              setOpen(false)
            }}
            aria-label="Search"
            aria-expanded={searching}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop collection row */}
      <nav aria-label="Main" className="hidden border-t border-blush lg:block">
        <ul className="mx-auto flex max-w-7xl items-center justify-center gap-7 px-4 py-3 xl:gap-9">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} className={(a) => navItem(a) + festive(l.to)}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {searching && (
        <div className="border-t border-blush px-4 py-3 lg:hidden">
          <SearchBar onSubmitted={() => setSearching(false)} />
        </div>
      )}

      {open && (
        <nav aria-label="Main" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-blush px-4 pb-8 pt-2 lg:hidden">
          <ul className="divide-y divide-blush">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block py-3.5 font-display text-[22px] ${isActive || l.to === '/diwali-gifting' ? 'text-terra' : 'text-ink'}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/contact" onClick={() => setOpen(false)} className="block py-3.5 font-display text-[22px] text-ink">
                Contact
              </NavLink>
            </li>
          </ul>
          <a href={AMAZON_STOREFRONT} target="_blank" rel="noopener noreferrer" className="btn-solid mt-6 w-full">
            Visit our Amazon store
          </a>
        </nav>
      )}
    </header>
  )
}
