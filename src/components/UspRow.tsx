// The house rules, stated once and the same way everywhere. Text only: the
// brand system rules out icons in circles and every other kind of clip art.
const PROMISES = [
  {
    n: 'I',
    title: 'Made by us, or chosen by us',
    sub: 'The crochet and the lotus aasans come from our own workshop. Everything else we pick, piece by piece.',
  },
  {
    n: 'II',
    title: 'Hand checked, hand packed',
    sub: 'Every order is looked over before it ships. The same rule on every listing, without exception.',
  },
  {
    n: 'III',
    title: 'Delivered by Amazon.in',
    sub: 'Secure checkout, delivery across India, and Amazon\'s own return policy and buyer protection.',
  },
  {
    n: 'IV',
    title: 'Weddings and bulk',
    sub: 'Favors, mandap decor and gifting in quantity, quoted on WhatsApp.',
  },
]

export default function UspRow() {
  return (
    <section aria-label="Our promise" className="border-y border-blush bg-paper">
      <div className="mx-auto grid max-w-7xl gap-y-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-blush">
        {PROMISES.map((p) => (
          <div key={p.n} className="px-0 text-center sm:px-6">
            <p className="font-display text-xl italic text-gold">{p.n}</p>
            <p className="mt-2 font-display text-[22px] font-medium leading-tight text-ink">{p.title}</p>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-soft">{p.sub}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
