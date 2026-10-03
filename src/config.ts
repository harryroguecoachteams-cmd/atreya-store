// Site-wide brand constants.
export const SITE_URL = 'https://atreya.store';
export const BRAND = 'Atreya';
export const TAGLINE = 'Handmade & handpicked décor, gajras and keepsakes from India';

// Only two things are made in our own workshop: all of the crochet, and the
// lotus pooja aasans. Everything else is handpicked from the market, so a
// blanket "100% handmade" claim across the catalogue would be false. Anything
// user-facing that says "handmade" must go through isHandmade().
//
// The aasans are listed by ASIN because Pooja Essentials also holds the
// thalis and the Krishna matki, which we do not make. A category-wide flag
// would have claimed them as ours.
export const HANDMADE_CATEGORIES = ['Crochet'];
export const HANDMADE_ASINS = [
  'B0HB4N2JSH', // Lotus Pooja Aasan, Rani Pink
  'B0HF4N37JD', // Lotus Pooja Aasan, Yellow
  'B0HF4PXH7S', // Lotus Pooja Aasan, Pack of 2
];
export const isHandmade = (category: string, asin?: string) =>
  HANDMADE_CATEGORIES.includes(category) || (asin !== undefined && HANDMADE_ASINS.includes(asin));

// Seasonal theme switch. While true, the announcement bar, the nav, the home
// page band and the footer all point at /diwali-gifting. Turn it off after Bhai
// Dooj; the page itself stays up (it ranks for "diwali gifts" next year too).
export const FESTIVE = { diwali: true };

export const WHATSAPP_NUMBER = '919711548517';
// TODO(harsh): create this mailbox in cPanel → Email Accounts (or change it)
export const CONTACT_EMAIL = 'hello@atreya.store';

export const AMAZON_STOREFRONT = 'https://www.amazon.in/s?me=A2YEFZP86DTGZC';

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
