// Which lifestyle photo stands for each category, wherever a category is shown
// as a picture (home tiles, the collection footer, the shop header). Files live
// in public/story and are built by scripts/story-images.py.
//
// Every one is a real listing photograph with no text on it. The listing
// infographics are deliberately kept off the site.

export const CATEGORY_IMAGES: Record<string, { image: string; alt: string }> = {
  Gajras: { image: 'col-gajras', alt: 'A white jasmine wreath gajra around a low bun' },
  'Hair Accessories': { image: 'col-hair-2', alt: 'A pink rose clip with pearl sprays worn in open hair' },
  'Festive Décor': { image: 'bulk-garlands', alt: 'Red and white mogra garlands with bells hung across a room' },
  'Door Hangings': { image: 'col-door-2', alt: 'A gota patti bangle latkan with a golden bell beside a carved door' },
  'Pooja Essentials': { image: 'col-pooja', alt: 'A rani pink lotus pooja aasan among marigold petals' },
  Crochet: { image: 'col-crochet', alt: 'Mini crochet hearts in red, green, yellow and purple' },
  'Artificial Flowers': { image: 'col-flowers', alt: 'Hands holding loose white artificial mogra buds' },
  Kids: { image: 'col-kids', alt: 'A smiling girl in bear sunglasses with bow clips in her hair' },
  'Travel Essentials': { image: 'col-travel', alt: 'A tube of pink paper soap flakes beside a washbasin' },
  'Craft Supplies': { image: 'col-craft', alt: 'White pearl beads spilling from a bowl' },
}
