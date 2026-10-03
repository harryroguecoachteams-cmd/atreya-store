// Category landing pages.
//
// Why these exist: /shop?category=X is a query parameter that canonicalises to
// /shop, so no category view could ever rank on its own. All of the search
// demand is at category level ("artificial gajra for hair", "door latkan",
// "lotus pooja aasan"), and we had nothing pointed at it. These are real,
// prerendered, individually indexable routes.
//
// A collection page needs enough distinct products to be worth a buying guide.
// Kids, Travel Essentials and Craft Supplies are one product each in a few pack
// sizes, so they keep pointing at the /shop filter until they grow. Crochet
// and Artificial Flowers are down to two products each while the rest of their
// range is out of stock (see HELD_OUT in scripts/fetch-products.mjs); their
// pages stay up because Google already has them, and the copy below covers
// only what is actually on the shelf. Widen it again when stock returns.
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
  /** ASIN whose photo is the OG card for the collection. */
  heroAsin: string
  /** Lifestyle photo in public/story, without the size suffix. */
  image: string
  imageAlt: string
}

export const COLLECTIONS: Collection[] = [
  {
    slug: 'gajras',
    category: 'Gajras',
    heading: 'Artificial gajras for hair, bun, braid and wrist',
    title: 'Artificial Gajra for Hair, Bun & Hand | Atreya',
    description:
      'Artificial jasmine and rose gajras for haldi, mehendi, sangeet and the wedding. Bun gajras, long braid gajras and hand gajras that keep their shape all day, from Rs 149. Ships via Amazon.in.',
    intro:
      'A gajra is the one accessory that has to survive an entire function. Real mogra browns within hours of being pinned, usually somewhere between the haldi and the photographs. Ours are made from fabric and satin, so they look the same at midnight as they did at nine in the morning, and they go back in the box for the next wedding in the family.',
    body: [
      {
        heading: 'Bun, braid or wrist: which one you need',
        text: 'A bun gajra, also called a juda gajra or veni, wraps around a bun or a low knot. The jasmine strings run about 13 inches, enough to circle a medium bun once, and the wreath style is elasticated, so it stretches over the bun and grips without pins. For a plait, the long jasmine gajra runs the length of the braid and comes as two strands, because one rarely covers a braid from top to bottom. A hand gajra sits on the wrist on an elasticated band and is what most of the bridal party wears for haldi and mehendi. If you are buying for a group, the hand gajras are the safer choice, because a wrist band fits everybody and a bun size does not.',
      },
      {
        heading: 'Matching the flowers to the function',
        text: 'Yellow rose and jasmine reads as haldi. Rani pink is the mehendi shade. Red rose, with jasmine or with pearl, reads as the wedding, the sangeet, karva chauth or a reception, and it is the one that photographs best against a darker outfit. White jasmine is the neutral of the set and works for daily wear, temple visits, classical dance and Navratri as easily as for a wedding. Buying for a bridal party is usually several packs in one color rather than a mix, so the row of hands matches in photographs.',
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
        a: 'The jasmine bun gajra measures about 13 inches, roughly 33 cm, of strung length. That circles a medium bun once. For a larger bun or a thicker knot, use two and pin them so the joins sit underneath. The white wreath gajra is elasticated instead, and works on a tight juda and a loose low bun alike.',
      },
      {
        q: 'Are the hand gajras one size?',
        a: 'Yes. The band is elasticated and opens from about 5 cm to 10 cm across, which covers adult wrists and most teenagers. That is why they work for a bridal party where you cannot measure everyone in advance.',
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
    image: 'col-gajras',
    imageAlt: 'A white jasmine wreath gajra circling a low bun',
  },
  {
    slug: 'hair-accessories',
    category: 'Hair Accessories',
    heading: 'Rose hair pins, flower clips and a juda comb',
    title: 'Rose Hair Pins, Flower Hair Clips & Juda Comb | Atreya',
    description:
      'Fabric rose hair pins in yellow, rani pink, baby pink and red, plus pearl trimmed rose hair clips and a juda comb for haldi, sangeet and weddings. From Rs 139, ships via Amazon.in.',
    intro:
      'A gajra circles the whole bun and sets the tone of the outfit. These are the smaller decision. A pair of rose pins pushed into either side of a juda, a clip in open hair, or a comb slid into a finished bun takes a few seconds, needs no second person, and works for a function where you want flowers in your hair without being dressed as the bride.',
    body: [
      {
        heading: 'Pins, clips or a comb: which holds what',
        text: 'The rose pins are straight pins with a fabric rose on top. They push into a bun and hold, which makes them the choice for a juda, tight or loose, and they come in pairs because two placed either side of the bun look deliberate where one looks dropped. The clips are sprung and grip open hair, a half tie or the side of a braid, so they suit hair that is not tied up at all. The comb has proper teeth that bite into a finished bun rather than sitting on top of it, and it is the one that stays put through an evening of dancing.',
      },
      {
        heading: 'Matching the color to the function',
        text: 'Yellow is the haldi color and rani pink is the sangeet one, which is how most people buy the pins: a pair per function rather than one pair for the week. Baby pink is the softer shade for an engagement. Red is the wedding and reception color, and it holds up against dark hair in photographs where a pastel quietly disappears. Both pins in a pack are cut from one batch, so the two roses match.',
      },
      {
        heading: 'For mothers and daughters',
        text: 'The pins are sized to sit in the hair rather than on top of it, so they work on a small tight juda and on a child as well as an adult. The pink clip is small enough for a girl and dressy enough for her mother, which is why it gets bought in twos for the two of them to match at a function. The clips and the comb carry fine pearl sprays and small gold accents around the rose, so they read as hair ornaments in a photograph rather than as plain fabric flowers.',
      },
    ],
    faqs: [
      {
        q: 'How do rose hair pins stay in?',
        a: 'They are straight pins: push them into a bun and they hold, the same way a regular juda pin does. On very fine or slippery hair, put them in after the bun is secured with an elastic so they have something to grip.',
      },
      {
        q: 'Why do the pins come in a pair?',
        a: 'Because that is how they are worn. One rose in a bun looks like it fell there; two, one on each side, look intentional. Both pins in a pack come from the same batch so the color matches.',
      },
      {
        q: 'Will the clips hold thick hair?',
        a: 'Yes. They are properly sprung clips that hold fine and thick hair and release without dragging. For a very heavy bun the comb grips better, because its teeth go into the bun rather than clamping the outside.',
      },
      {
        q: 'Do the roses have a fragrance?',
        a: 'No. They are fabric roses, so there is no scent, which some people prefer at a crowded function. They also do not wilt, so the pair you wear at the haldi is the pair you wear at the next wedding.',
      },
      {
        q: 'Can I buy matching pins for a bridal party?',
        a: 'Yes. Several packs in one color is how most bridal party orders look. For larger counts, message us on WhatsApp with the color and the quantity and we will quote.',
      },
    ],
    heroAsin: 'B0HGFJ5DD1',
    image: 'col-hair',
    imageAlt: 'Two yellow rose hair pins set into a low bun',
  },
  {
    slug: 'pooja-essentials',
    category: 'Pooja Essentials',
    heading: 'For the home mandir: lotus aasans, puja thalis and a Krishna matki',
    title: 'Lotus Pooja Aasan, Puja Thali Sets & Krishna Matki | Atreya',
    description:
      'Handmade 24.5 cm lotus pooja aasans in rani pink and yellow, meenakari puja thalis with katori, a rakhi thali set and a Krishna matki for Janmashtami. From Rs 199, ships via Amazon.in.',
    intro:
      'Everything here goes in or around the home mandir. The lotus aasans are ours, stitched petal by petal in our workshop to seat an idol, a kalash or a diya thali. The thalis and the matki we choose: a meenakari thali with lidded katori for the daily aarti, a peacock thali and a steel rakhi set for Raksha Bandhan, and a mirror work matki for Janmashtami.',
    body: [
      {
        heading: 'What the aasan fits',
        text: 'At 24.5 cm across when open, the aasan seats a small to medium idol, a standard steel or copper kalash, or a diya thali. If your idol is over about 9 inches wide at the base, measure before ordering, because a base that overhangs the petals loses the effect. Two aasans side by side is the usual arrangement for a mandir holding a pair of deities, which is what the pack of two is for.',
      },
      {
        heading: 'Made by us, petal by petal',
        text: 'This is one of the two things on this site that comes out of our own workshop rather than the market. Each petal is cut and shaped individually, the gold beaded border is stitched by hand around the edge, and the center panel carries a printed Om, swastik and kalash motif. Because they are shaped by hand, no two open exactly alike, and a petal sitting a degree off from its neighbor is a sign of the method rather than a fault.',
      },
      {
        heading: 'Choosing between rani pink and yellow',
        text: 'Rani pink with gold is the festival choice, bought for Diwali and Navratri, when the mandir itself is meant to look dressed. Yellow is the brighter, everyday one, for the daily aarti, a haldi setup or a Griha Pravesh where the mandir should look cheerful rather than formal. The pack of two holds one of each. They are bought as housewarming and wedding gifts as often as for the buyer\'s own home.',
      },
      {
        heading: 'Thalis for the aarti and for Rakhi',
        text: 'The gold meenakari thali comes with two lidded katori, and the lids are the point: the roli and akshat stay put between one aarti and the next instead of spilling in the cupboard. The peacock meenakari thali has two open katori and is the one bought for Raksha Bandhan and then kept out all year for Bhai Dooj, Diwali and Karwa Chauth. The rakhi set is a plain 10.5 inch steel plate with two katori and a rakhi included, the practical choice that washes, stacks and goes on being useful long after August.',
      },
      {
        heading: 'A matki that stays up after Janmashtami',
        text: 'The Krishna matki is a small hanging pot worked by hand with mirrors and beads, with the cord already attached. It goes up for Janmashtami and the dahi handi and tends to stay up afterward, in the mandir, over a doorway or on a balcony, because it does not read as seasonal. It is sized for a flat rather than a hall.',
      },
    ],
    faqs: [
      {
        q: 'What size idol does the 24.5 cm aasan fit?',
        a: 'It seats a small to medium idol comfortably, up to roughly 9 inches across at the base. Measure the widest point of your idol\'s base rather than its height, since height does not matter here.',
      },
      {
        q: 'Can the aasan be washed?',
        a: 'No, and this is worth knowing before you buy. It is a satin piece with a beaded border, so it is spot cleaned with a dry or barely damp cloth. Keeping it out of direct contact with oil lamps and kumkum does more good than any cleaning method.',
      },
      {
        q: 'Does it fold for storage?',
        a: 'Yes, the petals fold in toward the center so it stores flat, and it keeps its shape between festivals.',
      },
      {
        q: 'Are the two aasan colors the same design?',
        a: 'Yes. Same shape, same 24.5 cm size, the same printed Om, swastik and kalash center and the same hand stitched gold beaded border. Only the satin color differs, and the pack of two gives you one of each.',
      },
      {
        q: 'Are the thalis real silver or gold?',
        a: 'No. The gold and peacock thalis are decorative metal with meenakari enamel work, not solid silver or gold, and they are priced that way. The rakhi set is a plain steel plate.',
      },
      {
        q: 'Is the aasan suitable as a Griha Pravesh or wedding gift?',
        a: 'It is one of the most common reasons people buy it. It is the kind of gift that gets used rather than stored, and the pack of two covers a couple setting up their first mandir.',
      },
    ],
    heroAsin: 'B0HB4N2JSH',
    image: 'col-pooja',
    imageAlt: 'A rani pink lotus pooja aasan among marigold petals',
  },
  {
    slug: 'door-hangings',
    category: 'Door Hangings',
    heading: 'Latkans and door hangings for the main door and the mandir',
    title: 'Door Latkan & Wall Hanging for Main Door & Mandir | Atreya',
    description:
      'Ganesh ji, lotus, parrot and gota patti bangle latkans, a wooden Shubh Labh toran and mogra lotus mandir hangings, sold in matched sets. From Rs 129, ships via Amazon.in.',
    intro:
      'A toran runs across the top of a door. A latkan hangs down the side of it, one piece on each side of the frame, and that is why everything here is sold in pairs, fours and sixes. Two frame one doorway; four reach the main door and the mandir in one order. They are what turns a decorated entrance from a strip along the top into a frame.',
    body: [
      {
        heading: 'How many pieces a house actually needs',
        text: 'One pair covers one doorway, one hanging on each side. Most homes want the main door and the pooja room done together, which is a set of four. Six adds a window grill or a balcony, or covers a wide double door with a pair to spare. Buying two at a time is how people end up with a single lonely latkan and a door that looks half finished, so it is worth counting the doorways before ordering.',
      },
      {
        heading: 'Choosing a design',
        text: 'The Ganesh ji latkans are the choice for Ganesh Chaturthi and a Griha Pravesh, where the entrance is meant to carry the blessing. The gold mirror lotus latkans pick up diya light at Diwali; the lotus is Lakshmi\'s seat, which is why it is the shape on so many doorways that week. The gota patti bangle latkans are the brightest of the set, a wheel of gold lace on a wool wrapped ring with a bell that sounds when the door opens. The green parrots are one of the oldest motifs in Indian entrance decor and suit a mehendi or a wedding as easily as a festival. For one statement piece above the door rather than at the sides, the wooden Shubh Labh toran hangs across the top with five strands and a Ganesha plaque at the center.',
      },
      {
        heading: 'Hanging and storing them',
        text: 'Every piece has a loop at the top that takes a nail, a hook, a door handle or a length of thread, and they are light enough that nothing pulls. Nothing needs water and nothing wilts: these are board, fabric, beads, painted wood and gold finish trim. Wipe them with a dry cloth, lay them flat in a drawer between festivals, and they come out looking the same for the next one. They are decorative pieces in a gold finish, not brass, and they are priced that way.',
      },
    ],
    faqs: [
      {
        q: 'What is a latkan?',
        a: 'A latkan is a hanging ornament that drops down the side of a door frame, a mandir or a window, usually finishing in a tassel or a bell. It is hung in pairs, one on each side, and goes alongside a toran across the top rather than instead of one.',
      },
      {
        q: 'How do I hang them without drilling?',
        a: 'Each piece has a loop at the top, so a door handle, an existing hook, an adhesive hook or a length of thread tied to a grill all work. They are light, so a small adhesive hook is enough.',
      },
      {
        q: 'Do the bells ring?',
        a: 'On the gota patti bangle latkans, yes: the bell sounds when the door moves. On the Ganesh ji latkans and the Shubh Labh toran the bells are decorative and are not made to ring.',
      },
      {
        q: 'Are they brass?',
        a: 'No. They are lightweight decorative pieces in board, fabric, painted wood and gold finish metal, which is why they hang from a loop of thread without pulling, and why they cost what they do.',
      },
      {
        q: 'Can I order matching sets for a wedding venue?',
        a: 'Yes. Venue and mandap quantities are a WhatsApp conversation rather than an Amazon order. Tell us the number of doorways and pillars and the date and we will quote.',
      },
    ],
    heroAsin: 'B0HJ8S6WZZ',
    image: 'col-door',
    imageAlt: 'A home mandir framed by a pair of Ganesh ji latkans with golden bells',
  },
  {
    slug: 'festive-decor',
    category: 'Festive Décor',
    heading: 'Festive decor: torans, flower ladis, garlands and bells',
    title: 'Toran, Flower Ladi, Garlands & Hanging Bells | Atreya',
    description:
      'Artificial flower ladis, mogra and pom pom garlands, jasmine torans and golden and silver hanging bells for Diwali, pooja rooms, mandaps and wedding decor. From Rs 189, ships via Amazon.in.',
    intro:
      'Everything on this page hangs. Door frames, mandap poles, pooja room shelves, staircase railings and the back of a photo booth are the places these end up, and the reason people buy artificial rather than fresh is simple: a marigold ladi strung on the morning of Diwali is brown by the third day, and the decoration has to last the whole festival.',
    body: [
      {
        heading: 'How much length you actually need',
        text: 'This is where most orders go wrong. A standard Indian door frame needs about 7 feet to run across the top and drop a little down each side. A single-door pooja room shelf takes 2 to 3 feet. A mandap pole, depending on height, takes 8 to 12 feet per pole. The flower ladis and the mogra garland with golden bells both come as four strings of 5 feet, 20 feet in total, so one pack covers a main door and a pooja room with some left over. The 2.5 foot mogra strings suit shelves, idols, photo frames and a single door rather than a mandap.',
      },
      {
        heading: 'Bells: pack sizes and where they go',
        text: 'Hanging bells at 2.5 inches are the size used on torans, door hangings and jhoolas, small enough to sound bright rather than heavy. A pack of 12 covers one door hanging. A pack of 24 does a door and a window. The pack of 48 is for people decorating a whole house for Diwali or making torans to sell, and works out cheapest per bell by a distance. Silver suits cooler palettes and white flowers; gold sits better with marigold and traditional red. Both come in all three pack sizes.',
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
    image: 'col-festive',
    imageAlt: 'Golden filigree jingle bells resting among marigolds and brass lamps',
  },
  {
    slug: 'crochet',
    category: 'Crochet',
    heading: 'Handmade crochet hearts and keepsakes',
    title: 'Handmade Crochet Hearts & Bowl Fillers | Atreya',
    description:
      'Mini crochet hearts in sets of 6 and 12, crocheted one at a time in our own workshop. Bowl fillers, hamper toppers and favor table pieces that read as handmade because they are.',
    intro:
      'This is the part of the catalogue we actually make. Every piece here is crocheted by hand, one at a time, which is why the sets vary slightly and why we cannot produce a thousand of anything in a week. They are small on purpose: bowl fillers, hamper toppers, favor table pieces, the kind of thing that gets picked up and turned over.',
    body: [
      {
        heading: 'Where the hearts actually get used',
        text: 'Mini crochet hearts started as a Valentine\'s product and are now bought year round for tiered trays, bowl and vase filling, gift hampers, card making and wedding favor tables. The set of 12 is the one for a bowl or a favor table, where you want a handful rather than a few. The set of 6 is the one that ends up in a child\'s room or scattered along a bookshelf. At about 1.25 inches each, they read as texture rather than as objects, which is the point.',
      },
      {
        heading: 'Small gifts that do not feel disposable',
        text: 'Split a set and it becomes six or twelve small gifts: a heart tucked into each card, tied onto the ribbon of a hamper, or left on each plate at a dinner. A gift under a few hundred rupees is usually either forgettable or plastic. A crocheted heart takes time to make and looks it, which is the difference.',
      },
      {
        heading: 'Caring for crochet',
        text: 'Cotton yarn holds up well to handling and badly to a washing machine. If a heart needs cleaning, spot clean it with a barely damp cloth and let it dry flat, because a soaked piece loses its shape. None of these are toys, and the hearts are small enough that they should stay away from children under four and from pets.',
      },
    ],
    faqs: [
      {
        q: 'Are these really handmade?',
        a: 'Yes. The crochet and the lotus pooja aasans are the two things on this site made in our own workshop. Everything else in the catalogue is handpicked, and we say which is which on every product page.',
      },
      {
        q: 'Why do the pieces in my set look slightly different from each other?',
        a: 'Because they are crocheted individually rather than machine stamped. Small variations in size, tension and shade between pieces are normal and are how you can tell handmade crochet from a factory version.',
      },
      {
        q: 'How big is each heart?',
        a: 'About 1.25 inches across, roughly 3 cm. Small enough to scatter in a bowl or tie onto a gift, large enough to read as a heart from across a table.',
      },
      {
        q: 'Are the small pieces safe for children?',
        a: 'They are decor items, not toys. The mini hearts are small parts and should be kept away from children under four and from pets.',
      },
      {
        q: 'Can you crochet something custom?',
        a: 'For quantities that justify it, yes. Custom colors for wedding favors and corporate gifting are worth asking about on WhatsApp. One-off custom pieces usually are not worth it for either of us.',
      },
    ],
    heroAsin: 'B0GDXXM3PR',
    image: 'ch-gifts',
    imageAlt: 'A pair of hands holding a pile of mini crochet hearts in many colors',
  },
  {
    slug: 'artificial-flowers',
    category: 'Artificial Flowers',
    heading: 'Artificial flowers: loose mogra buds and lotus buds',
    title: 'Artificial Mogra Flowers & Lotus Buds for Pooja | Atreya',
    description:
      'Loose white artificial mogra buds by the 50 g pack for gajra making and craft, and deep pink artificial lotus buds in a pack of 12 for the thali, urli and mandir. Ships via Amazon.in.',
    intro:
      'Both things on this page are raw material rather than finished decor. The loose mogra is sold by weight for people who are making something: gajras, torans, hair work and craft. The lotus buds are single stems you place yourself, on a pooja thali, in an urli, in the mandir or floating in a water bowl.',
    body: [
      {
        heading: 'Buying mogra buds by weight',
        text: 'The 50 g pack holds loose white mogra buds, sorted by hand so the pack does not arrive half crushed. People buy it to string their own gajras and venis, to fill out a toran, for hair styling at salons, and for craft and school projects. If you are making gajras, 50 g goes further than it looks, because a single bun gajra uses only a small handful. Buy the finished gajras instead if you want them strung and ready.',
      },
      {
        heading: 'Lotus buds for the thali and the urli',
        text: 'Each bud is about 5 cm across and 6 cm tall, which is the scale for a pooja thali, an urli or a small vase rather than a floor arrangement. The petals are soft foam over a paper wrapped stem that can be trimmed to whatever length the container needs. Twelve is enough to ring a thali or float a handful in a water bowl for Janmashtami, Diwali or Navratri, and they hold their deep pink without water or sunlight.',
      },
      {
        heading: 'Keeping artificial flowers looking new',
        text: 'Dust is what ages artificial flowers, not time. Once a month, a hairdryer on cool at low speed lifts it off without touching the petals, and the lotus buds take a gentle wipe with a dry cloth. Keep them out of hard afternoon sun, which is what fades color first. Fabric buds that have been packed flat will open out if you hold them in kettle steam for a few seconds at a distance.',
      },
    ],
    faqs: [
      {
        q: 'What is the loose mogra pack used for?',
        a: 'It is 50 g of loose white mogra buds sold as raw material: for stringing your own gajras and venis, filling out torans, salon hair work, and craft or school projects. It is not a finished garland.',
      },
      {
        q: 'Can the lotus buds float in water?',
        a: 'Yes. They are made to sit on a thali or float in a water bowl or an urli. Take them out and let them dry after the pooja rather than leaving them in water for days.',
      },
      {
        q: 'Do artificial flowers have a smell?',
        a: 'No. They have no fragrance, which is exactly why some people prefer them at crowded functions where fresh jasmine can be overpowering.',
      },
      {
        q: 'Will the colors fade?',
        a: 'Not in normal indoor use. Direct afternoon sun through a window will fade color over months, so keep them out of it.',
      },
      {
        q: 'Can I order these in bulk?',
        a: 'For events, salons and decorators, yes. Message us on WhatsApp with the quantity. The mogra is white and the lotus buds are deep pink.',
      },
    ],
    heroAsin: 'B0HC44WKBT',
    image: 'col-flowers',
    imageAlt: 'Two cupped hands full of loose white artificial mogra buds',
  },
]

export const collectionBySlug = (slug: string) => COLLECTIONS.find((c) => c.slug === slug)
export const collectionByCategory = (category: string) => COLLECTIONS.find((c) => c.category === category)
/** Path for a category: its landing page if it has one, else the shop filter. */
export const categoryPath = (category: string) => {
  const c = collectionByCategory(category)
  return c ? `/collections/${c.slug}` : `/shop?category=${encodeURIComponent(category)}`
}
