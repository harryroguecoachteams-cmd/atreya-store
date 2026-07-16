import { useState, type FormEvent } from 'react'
import { usePageMeta } from '../hooks/usePageMeta'
import { CONTACT_EMAIL, whatsappLink } from '../config'

export default function Contact() {
  usePageMeta(
    'Contact — Atreya',
    'Questions about an Atreya product or a bulk/custom order? Reach us on WhatsApp or email — we reply within a day.',
  )
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (name.trim().length < 2) return setError('Please enter your name.')
    if (message.trim().length < 10) return setError('Please write a message of at least 10 characters.')
    setError('')
    window.open(whatsappLink(`Hi, I'm ${name.trim()}.\n\n${message.trim()}`), '_blank', 'noopener')
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Get in touch</h1>
      <p className="mt-3 max-w-xl leading-relaxed text-soft">
        Questions about a product, your Amazon order, or a bulk / custom order for weddings and events?
        Send us a message — we usually reply within a day.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <form onSubmit={submit} noValidate className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">Your name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-terra"
              placeholder="e.g. Priya Sharma"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              minLength={10}
              rows={5}
              className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-terra"
              placeholder="Tell us what you're looking for…"
            />
          </div>
          {error && <p className="text-sm font-medium text-terra">{error}</p>}
          <button
            type="submit"
            className="rounded-full bg-terra px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-terra-dark"
          >
            Send via WhatsApp
          </button>
          <p className="text-xs text-soft">Opens WhatsApp with your message pre-filled — nothing is stored on this site.</p>
        </form>

        <div className="space-y-5">
          <div className="rounded-2xl border border-blush bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">WhatsApp</p>
            <a
              href={whatsappLink('Hi Atreya! I have a question.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block font-medium text-ink hover:text-terra"
            >
              Chat with us directly →
            </a>
          </div>
          <div className="rounded-2xl border border-blush bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">Email</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-1 block font-medium text-ink hover:text-terra">
              {CONTACT_EMAIL}
            </a>
          </div>
          <div className="rounded-2xl border border-blush bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">Orders & returns</p>
            <p className="mt-1 text-sm leading-relaxed text-soft">
              All orders are processed by Amazon.in. For delivery status, returns or refunds, please use
              your Amazon account's <span className="font-medium text-ink">Your Orders</span> page.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
