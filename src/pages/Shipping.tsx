import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { whatsappLink } from '../config'

const FAQS = [
  {
    q: 'Who actually ships my order?',
    a: 'Amazon does. Every product on this site is an Amazon.in listing, and tapping "Buy on Amazon" hands you over to Amazon for payment, delivery and returns. We never take your card details or your address, because we never see them.',
  },
  {
    q: 'How long does delivery take?',
    a: 'The delivery date shown on the Amazon listing at checkout is the one that counts. Metro addresses usually land in two to four days and smaller towns take longer. We do not control this and cannot promise a date the listing has not.',
  },
  {
    q: 'What is the return window?',
    a: 'Amazon\'s standard return policy for the listing applies, which for most of our products is a returns window of seven days from delivery. The exact window is stated on the product page on Amazon before you pay. Returns are raised in your Amazon account, not with us.',
  },
  {
    q: 'Something arrived damaged. What do I do?',
    a: 'Raise it as a return or replacement in your Amazon orders page, which is the fastest route to a refund. Then message us on WhatsApp with the order ID if you want us to look at what went wrong, because damage in transit usually means our packing needs fixing.',
  },
  {
    q: 'Do you deliver outside India?',
    a: 'Not at the moment. Everything ships within India through Amazon.in. For international bulk enquiries, message us and we will tell you honestly whether it is worth doing.',
  },
  {
    q: 'How do bulk and corporate orders work?',
    a: 'Differently from everything above. Bulk orders are quoted over WhatsApp, invoiced directly, and shipped by us rather than by Amazon, so the timeline depends on the quantity and your date. Tell us the count and the deadline first, because for weddings the deadline is usually the constraint.',
  },
]

export default function Shipping() {
  usePageMeta(
    'Shipping & Returns | Atreya',
    'How Atreya orders ship: every product is fulfilled by Amazon.in, with Amazon delivery timelines, returns and buyer protection. Bulk and corporate orders are quoted directly.',
  )

  // "how long does atreya take to deliver" is a question, and questions are what
  // answer engines quote. Same upsert-by-id pattern as the collection pages.
  useEffect(() => {
    let el = document.getElementById('shipping-faq-jsonld') as HTMLScriptElement | null
    if (!el) {
      el = document.createElement('script')
      el.id = 'shipping-faq-jsonld'
      el.type = 'application/ld+json'
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
    return () => el?.remove()
  }, [])

  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Shipping and returns</h1>
      <p className="mt-4 leading-relaxed text-soft">
        The short version: we are a catalogue, Amazon is the shop. Every product here is a live
        Amazon.in listing, so your payment, your delivery and your returns all run through Amazon
        with the buyer protection that comes with it. We would rather send you somewhere you already
        trust than ask you to trust a new checkout.
      </p>

      <div className="mt-10 divide-y divide-blush border-y border-blush">
        {FAQS.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink marker:hidden">
              {f.q}
              <span className="shrink-0 text-terra transition-transform group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="mt-3 leading-relaxed text-soft">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-blush/60 p-6 sm:p-8">
        <h2 className="font-display text-xl font-semibold">Still stuck?</h2>
        <p className="mt-2 text-sm leading-relaxed text-soft">
          If your question is about an order that has already shipped, Amazon can act on it and we
          cannot. For anything else, including bulk quotes, wrong or missing items and questions
          about a product before you buy, WhatsApp is the fastest way to reach a person here.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappLink('Hi Atreya! I have a question about shipping or a return.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center rounded-full bg-terra px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-terra-dark"
          >
            Message us on WhatsApp
          </a>
          <Link
            to="/contact"
            className="inline-flex justify-center rounded-full border border-terra px-6 py-3 text-sm font-semibold text-terra transition-colors hover:bg-terra hover:text-white"
          >
            Other ways to reach us
          </Link>
        </div>
      </div>
    </section>
  )
}
