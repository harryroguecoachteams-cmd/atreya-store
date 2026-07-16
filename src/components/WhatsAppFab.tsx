import { whatsappLink } from '../config'

export default function WhatsAppFab() {
  return (
    <a
      href={whatsappLink('Hi Atreya! I found you through atreya.store.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-105"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.16-1.5A9.94 9.94 0 1 0 12.04 2Zm0 18.1a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.06.9.87-2.98-.2-.31a8.14 8.14 0 1 1 6.82 3.7Zm4.46-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.02-.37.1-.5.11-.11.25-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.19.87 2.35 1 2.51.12.16 1.7 2.6 4.13 3.65.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28Z" />
      </svg>
    </a>
  )
}
