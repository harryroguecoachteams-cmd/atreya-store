const USPS = [
  {
    title: 'Handmade with love',
    sub: 'Every piece crafted one at a time',
    icon: (
      <path d="M12 21s-7-4.5-9.5-9C.9 8.6 2.7 5 6 5c2 0 3.2 1 4 2.2C10.8 6 12 5 14 5c3.3 0 5.1 3.6 3.5 7-2.5 4.5-9.5 9-9.5 9h4z" />
    ),
  },
  {
    title: 'Crafted in India',
    sub: 'Designed & made by Indian hands',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3.5 9h17M3.5 15h17M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      </>
    ),
  },
  {
    title: 'Secure Amazon checkout',
    sub: 'Prices, delivery & returns on Amazon.in',
    icon: (
      <>
        <path d="M6 8h12l1.5 12h-15L6 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </>
    ),
  },
  {
    title: 'Bulk & corporate orders',
    sub: 'Weddings, events & gifting on WhatsApp',
    icon: (
      <>
        <path d="M3 20l1.2-3.6A8.5 8.5 0 1 1 7.6 19L3 20Z" />
        <path d="M9 10h6M9 13h4" />
      </>
    ),
  },
]

export default function UspRow() {
  return (
    <section className="border-y border-blush bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 lg:grid-cols-4">
        {USPS.map((u) => (
          <div key={u.title} className="flex items-start gap-3">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 shrink-0 text-terra"
              aria-hidden="true"
            >
              {u.icon}
            </svg>
            <div>
              <p className="text-sm font-semibold text-ink">{u.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-soft">{u.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
