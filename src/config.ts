// Site-wide brand constants.
export const SITE_URL = 'https://atreya.store';
export const BRAND = 'Atreya';
export const TAGLINE = 'Handmade décor & crochet keepsakes, crafted in India';

// TODO(harsh): replace with the real WhatsApp business number (country code, no +)
export const WHATSAPP_NUMBER = '919999999999';
// TODO(harsh): create this mailbox in cPanel → Email Accounts (or change it)
export const CONTACT_EMAIL = 'hello@atreya.store';

export const AMAZON_STOREFRONT = 'https://www.amazon.in/s?me=A2YEFZP86DTGZC';

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
