import { usePageMeta } from '../hooks/usePageMeta'
import { CONTACT_EMAIL } from '../config'

export default function Privacy() {
  usePageMeta('Privacy Policy | Atreya', 'How atreya.store handles your data: no accounts, no tracking cookies, purchases handled entirely by Amazon.in.')

  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Privacy policy</h1>
      <p className="mt-2 text-sm text-soft">Last updated: 16 July 2026</p>

      <div className="prose-sm mt-8 space-y-6 leading-relaxed text-soft">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">What this site collects</h2>
          <p className="mt-2">
            atreya.store is a catalogue website. It has no user accounts, no checkout, and it does not
            set tracking cookies. We do not collect, store or sell personal information through this site.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">Purchases happen on Amazon</h2>
          <p className="mt-2">
            All product purchases are completed on Amazon.in. Your order, payment and delivery details
            are handled entirely by Amazon under the{' '}
            <a href="https://www.amazon.in/gp/help/customer/display.html?nodeId=200534380" target="_blank" rel="noopener noreferrer" className="text-terra underline">
              Amazon.in Privacy Notice
            </a>. We only see the information Amazon shares with sellers to fulfil your order.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">WhatsApp and email</h2>
          <p className="mt-2">
            If you contact us on WhatsApp or email, we use your message only to reply and help you.
            We don't add you to marketing lists or share your details with anyone.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">Hosting logs</h2>
          <p className="mt-2">
            Our hosting provider keeps standard server logs (IP address, pages visited, browser type)
            for security and troubleshooting. These are automatically rotated and are not used for profiling.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">Questions</h2>
          <p className="mt-2">
            Write to <a href={`mailto:${CONTACT_EMAIL}`} className="text-terra underline">{CONTACT_EMAIL}</a> for
            anything privacy-related.
          </p>
        </div>
      </div>
    </section>
  )
}
