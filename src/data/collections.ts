// Category landing pages.
//
// Why these exist: /shop?category=X is a query parameter that canonicalises to
// /shop, so no category view could ever rank on its own. All of the search
// demand is at category level ("artificial gajra for hair", "mogra garland for
// decoration", "lotus pooja aasan"), and we had nothing pointed at it. These
// are real, prerendered, individually indexable routes.
//
// Only categories holding three or more products get one. A landing page built
// around a single SKU is thin content and Google treats it as such; Home Décor
// and Craft Supplies keep pointing at the /shop filter until they grow.
//
// Copy rule: everything here is written for this site. It must NOT be lifted
// from the Amazon listing, because amazon.in outranks us on our own words.

export interface CollectionFaq {
  q: string
  a: string
}

export interface Collection {
  slug: string
  /** Must match a category string in products.ts exactly. */
  category: string
  /** Page h1. Longer and more specific than the nav label. */
  heading: string
  title: string
  description: string
  /** Lead paragraph, rendered above the grid. */
  intro: string
  /** Body paragraphs, rendered below the grid. This is the part that ranks. */
  body: { heading: string; text: string }[]
  faqs: CollectionFaq[]
  /** ASIN whose photo represents the collection in tiles and OG cards. */
  heroAsin: string
}

export const COLLECTIONS: Collection[] = [
  {
    slug: 'gajras',
    category: 'Gajras',
    heading: 'Artificial gajras for hair, bun and wrist',
    title: 'Artificial Gajra for Hair, Bun & Hand | Atreya',
    description:
      'Artificial jasmine and rose gajras for haldi, mehendi and sangeet. Bun gajras, hand gajras and wrist corsages that keep their shape all day, from Rs 149. Ships via Amazon.in.',
    intro:
      'A gajra is the one accessory that has to survive an entire function. Real mogra browns within hours of being pinned, usually somewhere between the haldi and the photographs. Ours are made from fabric and satin, so they look the same at midnight as they did at nine in the morning, and they go back in the box for the next wedding in the family.',
    body: [
      {
        heading: 'Bun gajra or hand gajra: which one you need',
        text: 'A bun gajra, also called a juda gajra or veni, wraps around a bun or a low knot and is pinned in place. Ours run about 13 inches, which is enough to circle a medium bun once. A hand gajra, or floral corsage, sits on the wrist on an elasticated band and is what most bridesmaids wear for haldi and mehendi. If you are buying for a group, the hand gajras are the safer choice, because a wrist band fits everybody and a bun size does not.',
      },
      {
        heading: 'Matching the flowers to the function',
        text: 'Yellow rose and jasmine reads as haldi. Red rose with pearl reads as sangeet, karva chauth or a reception, and it is the one that photographs best against a darker outfit. White jasmine is the neutral of the set and works for daily wear, temple visits and Navratri as easily as for a wedding. Buying for a bridal party is usually a pack of five in one color rather than five different ones, so the row of hands matches in photographs.',
      },
      {
        heading: 'Why fabric instead of fresh',
        text: 'Fresh mogra is beautiful and it is also a same-day purchase that has to be sourced, stored cold and pinned within a few hours. For a wedding week with four functions, that is four trips to the flower market. A fabric gajra is bought once, arrives before the week starts, survives being packed in a suitcase, and can be posted to a cousin in another city. It also does not trigger anything for guests who react to fresh jasmine, which comes up more often than people expect at a crowded mehendi.',
      },
    ],
    faqs: [
      {
        q: 'Will an artificial gajra look fake in photographs?',
        a: 'At arm\'s length in a photograph, a fabric mogra bud and a fresh one are hard to tell apart, because what the camera picks up is the shape and the white. Up close, a fabric gajra reads as a made piece rather than a fresh one. Most people buying for a full wedding week accept that trade for flowers that survive all four functions.',
      },
      {
        q: 'What size is the bun gajra and will it fit my hair?',
        a: 'The jasmine bun gajra measures about 13 inches, roughly 33 cm, of strung length. That circles a medium bun once. For a larger bun or a thicker knot, use two and pin them so the joins sit underneath.',
      },
      {
        q: 'Are the hand gajras one size?',
        a: 'Yes. The band is elasticated and opens from about 5 cm to 10 cm across, which covers adult wrists and most teenagers. That is why they work for a bridesmaid set where you cannot measure everyone in advance.',
      },
      {
        q: 'How do I store them between functions?',
        a: 'Keep them flat in the box they arrive in, not squashed at the bottom of a bag. If a petal is crushed, steam from a kettle held at a distance will usually open it back out. Do not iron them directly.',
      },
      {
        q: 'Can I order these in bulk for a wedding?',
        a: 'Yes, and this is the most common bulk request we get. Message us on WhatsApp with the color, the quantity and the date and we will quote for it. Below about ten pieces it is usually cheaper to just buy the multi-packs on Amazon.',
      },
    ],
    heroAsin: 'B0HC479QXR',
  },
  {
    slug: 'festive-decor',
    category: 'Festive Décor',
    heading: 'Festive decor: torans, flower ladis, garlands and bells',
    title: 'Toran, Flower Ladi, Garlands & Hanging Bells | Atreya',
    description:
      'Artificial flower ladis, mogra and pom pom garlands, jasmine torans and silver hanging bells for Diwali, pooja rooms, mandaps and wedding decor. From Rs 199, ships via Amazon.in.',
    intro:
      'Everything on this page hangs. Door frames, mandap poles, pooja room shelves, staircase railings and the back of a photo booth are the places these end up, and the reason people buy artificial rather than fresh is simple: a marigold ladi strung on the morning of Diwali is brown by the third day, and the decoration has to last the whole festival.',
    body: [
      {
        heading: 'How much length you actually need',
        text: 'This is where most orders go wrong. A standard Indian door frame needs about 7 feet to run across the top and drop a little down each side. A single-door pooja room shelf takes 2 to 3 feet. A mandap pole, depending on height, takes 8 to 12 feet per pole. Our flower ladis come as four strings of 5 feet, which is 20 feet total, so one pack covers a main door and a pooja room with some left over. The mogra garlands come as four strings of 2.5 feet, which suits shelves, idols and photo frames rather than doorways.',
      },
      {
        heading: 'Bells: pack sizes and where they go',
        text: 'Hanging bells at 2.5 inches are the size used on torans, door hangings and jhoolas, small enough to sound bright rather than heavy. A pack of 12 covers one door hanging. A pack of 24 does a door and a window. The pack of 48 is for people decorating a whole house for Diwali or making torans to sell, and works out cheapest per bell by a distance. Silver suits cooler palettes and white flowers; gold sits better with marigold and traditional red.',
      },
      {
        heading: 'Storing decor between festivals',
        text: 'Artificial garlands are worth buying once and using for years, but only if they are stored coiled loosely in a bag rather than folded into a box. Folded flowers set a crease that does not come out. Bells should be kept dry, because the string is what fails first, not the metal. Every year, check the knots on a toran before hanging it rather than after.',
      },
    ],
    faqs: [
      {
        q: 'How many flower ladi strings do I need for a main door?',
        a: 'One 5 foot string covers the top of a standard door frame. Two strings let you run the top and drop both sides, which is the look most people want. The pack of four covers a main door plus a pooja room or a second doorway.',
      },
      {
        q: 'Can these be used outdoors?',
        a: 'For a function, yes. For permanent outdoor use, no. Direct sun fades fabric flowers over a few weeks and rain marks them. Bring them in after the event and they will last for years of festivals.',
      },
      {
        q: 'Are the bells loud enough to hear?',
        a: 'They are decorative jingle bells, not temple bells. You will hear them clearly when a door opens or a breeze moves the toran, which is the point. If you want a single loud bell for a mandir, this is not the product.',
      },
      {
        q: 'How do I clean a garland that has been in storage?',
        a: 'Shake it out, then go over it with a hairdryer on cool at low speed to lift the dust. For anything greasier, a barely damp cloth on the petals works. Do not put fabric garlands in water.',
      },
      {
        q: 'Do you supply for weddings and events?',
        a: 'Yes. Mandap and venue quantities are a WhatsApp conversation rather than an Amazon order, because the length calculation depends on your venue. Send us the pole count and heights and we will work out the meterage.',
      },
    ],
    heroAsin: 'B0HCPKG6HW',
  },
  {
    slug: 'pooja-essentials',
    category: 'Pooja Essentials',
    heading: 'Lotus pooja aasan for your home temple',
    title: 'Lotus Pooja Aasan for Idol, Kalash & Diya | Atreya',
    description:
      'Handmade 24.5 cm lotus pooja aasan in cream and rani pink. A satin petal mat for an idol, kalash or diya thali in your home mandir, stitched petal by petal and gift boxed.',
    intro:
      'An aasan is the seat you give the deity, and for most home mandirs it is either a folded cloth or nothing at all. The lotus aasan is the middle ground between those and a full silver throne: it lifts an idol, a kalash or a diya thali off the shelf, it opens out to 24.5 cm, and it folds flat when the mandir is cleaned.',
    body: [
      {
        heading: 'What it fits',
        text: 'At 24.5 cm across when open, the aasan seats a small to medium idol, a standard steel or copper kalash, or a diya thali. If your idol is over about 9 inches wide at the base, measure before ordering, because a base that overhangs the petals loses the effect. Two aasans side by side is the usual arrangement for a mandir holding a pair of deities.',
      },
      {
        heading: 'Made by us, petal by petal',
        text: 'This is one of the two things on this site that comes out of our own workshop rather than the market. Each petal is cut and shaped individually, the gold beaded border is stitched by hand around the edge, and the center panel carries the brocade or the printed Om, swastik and kalash motifs. Because they are shaped by hand, no two open exactly alike, and a petal sitting a degree off from its neighbour is a sign of the method rather than a fault.',
      },
      {
        heading: 'Choosing between cream and rani pink',
        text: 'Cream with terracotta is the quieter of the two and disappears into a wooden or marble mandir, letting the idol stay the focus. Rani pink with gold is the festival choice, and it is the one people buy for Diwali, Navratri and Griha Pravesh, where the mandir itself is meant to look dressed. Both arrive in a gift box with a woven label, which is why they get bought as housewarming and wedding gifts more often than for the buyer\'s own home.',
      },
    ],
    faqs: [
      {
        q: 'What size idol does the 24.5 cm aasan fit?',
        a: 'It seats a small to medium idol comfortably, up to roughly 9 inches across at the base. Measure the widest point of your idol\'s base rather than its height, since height does not matter here.',
      },
      {
        q: 'Can it be washed?',
        a: 'No, and this is worth knowing before you buy. It is a satin and brocade piece with a beaded border, so it is spot cleaned with a dry or barely damp cloth. Keeping it out of direct contact with oil lamps and kumkum does more good than any cleaning method.',
      },
      {
        q: 'Does it fold for storage?',
        a: 'Yes, the petals fold in toward the center so it stores flat. Store it in the gift box it arrives in and it keeps its shape between festivals.',
      },
      {
        q: 'Is this suitable as a Griha Pravesh or wedding gift?',
        a: 'It is one of the most common reasons people buy it. It arrives already boxed with a woven label, so it does not need wrapping, and it is the kind of gift that gets used rather than stored.',
      },
      {
        q: 'Are the two colors the same design?',
        a: 'The shape and size are the same. The cream version has a brocade center panel and the rani pink has a gold printed Om, swastik and kalash motif. Both carry the same hand stitched gold beaded border.',
      },
    ],
    heroAsin: 'B0HB4N2JSH',
  },
  {
    slug: 'crochet',
    category: 'Crochet',
    heading: 'Handmade crochet keepsakes, keychains and decor',
    title: 'Handmade Crochet Keychains, Hearts & Scrunchies | Atreya',
    description:
      'Crochet hearts, cherry and heart keychains, evil eye wall charms, scrunchies and rose gajras, crocheted one at a time in our own workshop. Small handmade gifts from Rs 149.',
    intro:
      'This is the part of the catalogue we actually make. Every piece here is crocheted by hand, one at a time, which is why the sets vary slightly and why we cannot produce a thousand of anything in a week. They are small on purpose: bowl fillers, keychains, hair ties, wall charms, the kind of thing that gets picked up and turned over.',
    body: [
      {
        heading: 'Where the hearts actually get used',
        text: 'Mini crochet hearts started as a Valentine\'s product and are now bought year round for tiered trays, bowl and vase filling, gift hampers, card making and wedding favor tables. The set of 12 in red is the one people buy for February and for anniversaries. The multicolor set of 6 is the one that ends up in a child\'s room or scattered on a bookshelf. At about 1.25 inches each, they read as texture rather than as objects, which is the point.',
      },
      {
        heading: 'Small gifts that do not feel disposable',
        text: 'The keychains and scrunchies exist because a gift under Rs 300 is usually either forgettable or plastic. A crocheted cherry keychain takes an evening to make and looks it. These are what people buy for return gifts, for a friend\'s birthday alongside something larger, for Secret Santa at an office, and for the little bag that goes with a bigger present.',
      },
      {
        heading: 'Caring for crochet',
        text: 'Cotton yarn holds up well to handling and badly to a washing machine. Hand wash in cool water with a mild soap, press the water out rather than wringing, and dry flat, because hanging a wet crochet piece stretches it permanently out of shape. The keychains and charms are better spot cleaned than washed at all. None of these are toys and the smaller pieces should stay away from children under four and pets.',
      },
    ],
    faqs: [
      {
        q: 'Are these really handmade?',
        a: 'Yes. The crochet and the lotus pooja aasans are the two things on this site made in our own workshop. Everything else in the catalogue is handpicked from Indian markets, and we say which is which on every product page.',
      },
      {
        q: 'Why do the pieces in my set look slightly different from each other?',
        a: 'Because they are crocheted individually rather than machine stamped. Small variations in size, tension and shade between pieces are normal and are how you can tell handmade crochet from a factory version.',
      },
      {
        q: 'Can I wash a crochet scrunchie?',
        a: 'Hand wash in cool water with a mild soap, squeeze the water out gently and dry flat. Machine washing will fuzz the popcorn stitch and hanging it wet will stretch it.',
      },
      {
        q: 'Are the small pieces safe for children?',
        a: 'They are decor items, not toys. The mini hearts and charms contain small parts and should be kept away from children under four and from pets.',
      },
      {
        q: 'Can you crochet something custom?',
        a: 'For quantities that justify it, yes. Custom colors for wedding favors and corporate gifting are worth asking about on WhatsApp. One-off custom pieces usually are not worth it for either of us.',
      },
    ],
    heroAsin: 'B0G95YC1T9',
  },
  {
    slug: 'artificial-flowers',
    category: 'Artificial Flowers',
    heading: 'Artificial flowers: rose bouquets and loose mogra buds',
    title: 'Artificial Rose Bouquets & Loose Mogra Flowers | Atreya',
    description:
      'Everlasting artificial rose bouquets in red, pink and yellow, plus loose white mogra buds by the 50 g pack for gajra making and craft. Ships via Amazon.in.',
    intro:
      'Two different things live on this page. The rose bouquets are finished gifts, twelve stems arranged and ready to hand over. The loose mogra is raw material, sold by weight for people who are making something: gajras, torans, hair accessories, craft projects and stage decor.',
    body: [
      {
        heading: 'A bouquet that outlasts the occasion',
        text: 'The argument for artificial roses is not that they beat fresh ones on the day. It is that they are still there in March. A fresh bouquet given for an anniversary is in the bin within the week; these go into a vase and stay. Red is the default for anniversaries and Valentine\'s, pink reads softer and gets bought for mothers and friends, and yellow is the friendship and get-well choice. Each is twelve individual flowers rather than a printed spray.',
      },
      {
        heading: 'Buying mogra buds by weight',
        text: 'The 50 g pack holds loose white mogra buds, sorted by hand so the pack does not arrive half crushed. People buy it to string their own gajras and venis, to fill out a toran, for hair styling at salons, and for craft and school projects. If you are making gajras, 50 g goes further than it looks, because a single bun gajra uses only a small handful. Buy the finished gajras instead if you want them strung and ready.',
      },
      {
        heading: 'Keeping artificial flowers looking new',
        text: 'Dust is what ages artificial flowers, not time. Once a month, a hairdryer on cool at low speed lifts it off without touching the petals. Keep bouquets out of a window that gets hard afternoon sun, because that is what fades the reds first. Fabric petals that have been packed flat will open out if you hold them in kettle steam for a few seconds at a distance.',
      },
    ],
    faqs: [
      {
        q: 'How many flowers are in a bouquet?',
        a: 'Twelve individual flowers, arranged and ready to give. It is a finished bouquet rather than loose stems you have to assemble.',
      },
      {
        q: 'What is the loose mogra pack used for?',
        a: 'It is 50 g of loose white mogra buds sold as raw material: for stringing your own gajras and venis, filling out torans, salon hair work, and craft or school projects. It is not a finished garland.',
      },
      {
        q: 'Do artificial flowers have a smell?',
        a: 'No. They are fabric and have no fragrance, which is exactly why some people prefer them at crowded functions where fresh jasmine can be overpowering.',
      },
      {
        q: 'Will the colors fade?',
        a: 'Not in normal indoor use. Direct afternoon sun through a window will fade reds over months, so move the vase rather than the flowers.',
      },
      {
        q: 'Can I order a specific color in bulk?',
        a: 'For events and decorators, yes. Message us on WhatsApp with the color and quantity. Standard colors are red, pink and yellow for the roses and white for the mogra.',
      },
    ],
    // NOT one of the three rose bouquets: their listing photos are a hand
    // holding the bouquet over astroturf, which is the worst photography in the
    // catalogue and is kept out of every tile and OG card until it is reshot.
    heroAsin: 'B0HC44WKBT',
  },
]

export const collectionBySlug = (slug: string) => COLLECTIONS.find((c) => c.slug === slug)
export const collectionByCategory = (category: string) => COLLECTIONS.find((c) => c.category === category)
/** Path for a category: its landing page if it has one, else the shop filter. */
export const categoryPath = (category: string) => {
  const c = collectionByCategory(category)
  return c ? `/collections/${c.slug}` : `/shop?category=${encodeURIComponent(category)}`
}
