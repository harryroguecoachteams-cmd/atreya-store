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
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-8 px-4 py-10 sm:py-12 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-blush">
        {PROMISES.map((p) => (
          <div key={p.n} className="px-0 text-center sm:px-6">
            <p className="font-display text-xl italic text-gold">{p.n}</p>
            <p className="mt-2 font-display text-[19px] font-medium leading-tight text-ink sm:text-[22px]">{p.title}</p>
            <p className="mx-auto mt-2 max-w-xs text-[13px] leading-relaxed text-soft sm:text-sm">{p.sub}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
