import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AMAZON_STOREFRONT } from '../config'
import SearchBar from './SearchBar'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const navItem = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'text-terra' : 'text-soft hover:text-ink'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-blush bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 lg:gap-8">
        <Link to="/" className="shrink-0 font-display text-2xl font-semibold tracking-tight text-terra">
          Atreya
          <span className="ml-2 hidden align-middle text-[11px] font-body font-medium uppercase tracking-[0.2em] text-gold xl:inline">
            Home Décor
          </span>
        </Link>

        <SearchBar className="hidden max-w-md flex-1 md:block" />

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={navItem} end={l.to === '/'}>
              {l.label}
            </NavLink>
          ))}
          <a
            href={AMAZON_STOREFRONT}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 rounded-full bg-terra px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-terra-dark"
          >
            Buy on Amazon
          </a>
        </nav>

        <button
          className="ml-auto p-2 text-ink md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <div className="px-4 pb-3 md:hidden">
        <SearchBar onSubmitted={() => setOpen(false)} />
      </div>

      {open && (
        <nav className="border-t border-blush px-4 pb-4 md:hidden">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={navItem} end={l.to === '/'} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <a
            href={AMAZON_STOREFRONT}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block rounded-full bg-terra px-4 py-2 text-sm font-semibold text-white"
          >
            Buy on Amazon
          </a>
        </nav>
      )}
    </header>
  )
}
