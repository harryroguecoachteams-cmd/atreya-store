import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function SearchBar({ className = '', onSubmitted }: { className?: string; onSubmitted?: () => void }) {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')

  useEffect(() => setQ(params.get('q') ?? ''), [params])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const query = q.trim()
    navigate(query ? `/shop?q=${encodeURIComponent(query)}` : '/shop')
    onSubmitted?.()
  }

  return (
    <form onSubmit={submit} role="search" className={`relative ${className}`}>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search torans, bouquets, keepsakes…"
        aria-label="Search products"
        className="w-full rounded-full border border-ink/10 bg-white py-2.5 pl-4 pr-11 text-sm text-ink placeholder:text-soft/70 focus:border-terra focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-terra text-white transition-colors hover:bg-terra-dark"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>
    </form>
  )
}
