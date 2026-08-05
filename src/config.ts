// Site-wide brand constants.
export const SITE_URL = 'https://atreya.store';
export const BRAND = 'Atreya';
export const TAGLINE = 'Handmade & handpicked décor, gajras and keepsakes from India';

// Only these two categories are made in our own workshop (all crochet, plus the
// lotus pooja aasans). Everything else is handpicked from the market, so a
// blanket "100% handmade" claim across the catalogue would be false. Anything
// user-facing that says "handmade" must go through isHandmade().
export const HANDMADE_CATEGORIES = ['Crochet', 'Pooja Essentials'];
export const isHandmade = (category: string) => HANDMADE_CATEGORIES.includes(category);

export const WHATSAPP_NUMBER = '919711548517';
// TODO(harsh): create this mailbox in cPanel → Email Accounts (or change it)
export const CONTACT_EMAIL = 'hello@atreya.store';

export const AMAZON_STOREFRONT = 'https://www.amazon.in/s?me=A2YEFZP86DTGZC';

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
