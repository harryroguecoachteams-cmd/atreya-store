// Site-original product copy, keyed by ASIN.
//
// Why this file exists: products.ts carries the Amazon listing description
// verbatim, which means the same paragraph lives on amazon.in and here. Amazon
// has vastly more authority, so Google reads our version as the duplicate and
// the product page never ranks on its own words. These are written for this
// site only and must never be pasted back into a listing.
//
// Anything without an entry falls back to the Amazon description, so a new
// product ships with copy on day one and gets its own later. Keep the voice
// plain: what it is, what it fits, what it is for. House style is no em or en
// dashes anywhere.

export const PRODUCT_COPY: Record<string, string> = {
  // Crochet
  B0GG5BVR7R:
    'A crocheted evil eye worked in blue and white rounds, edged with a scalloped border, finished with pearl-style beads and a soft tassel. It hangs from a door handle, a wall hook, a car mirror or the side of a bookshelf, and it weighs almost nothing, so it does not need a fixing. The motif is the old protective one, though we would rather you bought it because it looks good on a plain wall. Crocheted by us one at a time, so the tension and the tassel fall a little differently on each.',
  B0GDXXM3PR:
    'Twelve mini crochet hearts, each about 1.25 inches, made to be scattered rather than displayed. They fill a bowl, sit on a tiered tray, weigh down the top of a gift hamper, or line up along a shelf edge. Twelve is the number that reads as a handful rather than a set. Because each heart is crocheted individually, the sizes vary slightly, which is what tells a handmade heart from a stamped one.',
  B0GC6KJCSC:
    'Six mini crochet hearts in mixed colors, for people who want the texture without committing to a single shade. They work in a child\'s room, on a bookshelf, in a bowl on a side table, or split up and tucked into six different cards. About 1.25 inches each, cotton yarn, crocheted by hand in our workshop.',
  B0G95YC1T9:
    'Twelve red crochet hearts, the set we make most of in the run up to February and the one that keeps selling through the year for anniversaries and weddings. Red is the shade that holds up in photographs, so these are the ones that end up on favor tables and in bridal hampers. Slightly plumper than they look on screen, and light enough to sit on a stem or a ribbon without dragging it down.',
  B0GDY7RSXY:
    'A pair of crocheted cherries on a clip, sized to hang off a bag zip, a set of keys or a pencil case without swinging into everything. It is a small gift that does not feel like a small gift, which is why it gets bought for return favors, for a friend alongside something bigger, and for office Secret Santa. Cotton yarn, hand crocheted, and each cherry is stuffed by hand so they sit slightly differently.',
  B0GDY4D9FN:
    'A red crochet heart with a white daisy worked into the front, on a keyring. The daisy is stitched separately and attached rather than printed, which is the part that takes the time. It suits keys, a bag, or a gift that needs something to hold the ribbon. Made in our workshop, one at a time.',
  B0GDV4HTRJ:
    'A pair of crocheted rose gajras, also called a hair parandi, for wearing along a braid or around a bun. Unlike the fabric gajras in our Gajras range, these are worked in yarn by hand, so they have weight and texture and read as a made accessory rather than an imitation flower. They suit haldi, mehendi and Navratri, and they survive being packed and re-worn for years. This is the best photographed piece in our catalogue for a reason.',
  B0GDY833NN:
    'A crochet scrunchie worked in the popcorn stitch, which is the bobbly one that holds its shape instead of flattening after a week. Teal and pink, soft enough to sleep in, and thick enough to hold a full bun without needing a second tie. Hand wash and dry it flat and it will outlast every elastic in the drawer.',

  // Festive Décor
  B0B8XR4XNW:
    'Forty eight silver hanging bells at 2.5 inches, which is the pack size for decorating a whole house rather than a doorway. This is what people buy before Diwali when the plan involves the main door, the balcony, the pooja room and the staircase, and it is also the pack craft sellers buy to make torans. Silver sits better than gold against white flowers and cooler palettes. Bright rather than heavy in sound: you hear them when a door opens.',
  B0B8XRDHPW:
    'Twelve silver hanging bells at 2.5 inches, the right count for one door hanging or one toran. Buy this pack if you are decorating a single doorway or repairing a toran that has lost a few bells, and the pack of 24 or 48 if the plan is bigger. The size is deliberately small: 2.5 inches sounds bright and does not pull a light garland out of shape.',
  B09QJVDNFW:
    'Forty eight golden jingle bells at 2.5 inches. Gold is the one that works with marigold, traditional red and anything with zari in it, which makes it the default for weddings and for Diwali in most homes. A pack this size covers a full house or a season of toran making. Metal bells on a cotton loop, so check the loops rather than the bells when you unpack them after storage.',
  B09Y2B4XHL:
    'A set of four jasmine door torans, for a main door, a pooja room, a balcony door and one spare, which is roughly how they get used. The petals are fabric rather than fresh, so they go up before the festival starts and are still white on the last day. Hang them from the top of the frame and let them drop a little at the corners. Stored coiled rather than folded, a set lasts years of Diwalis.',
  B0HC4FD2F4:
    'Four strings of white flower ladi at 5 feet each, 20 feet in total, which is enough for a main door and a pooja room with some left over. One string covers the top of a standard door frame; two lets you run the top and drop both sides. Used for mandaps, pooja rooms, wedding backdrops and Griha Pravesh, and white is the one that photographs cleanly against every wall color. Strung and checked by hand before packing.',
  B0HCCGJKQ4:
    'Four strings of red and white mogra garland at 2.5 feet each. The shorter length is deliberate: this is a shelf, idol, photo frame and railing garland, not a doorway one. Red and white together is the combination used for pooja rooms and for wedding decor where plain white would disappear against a light wall. Fabric mogra buds, so they hold their color through the whole function and go back in the box afterwards.',
  B0HCPKG6HW:
    'Four strings of multicolor pom pom garland at 5 feet each, 20 feet in total. This is the bright, non-floral option: it goes up for birthdays, baby showers, Ganpati, nursery walls and haldi backdrops, anywhere fabric flowers would read as too formal. Soft pom poms on a strong thread, light enough to tape to a wall and sturdy enough to reuse.',
  B0B8XR4W5P:
    'Twenty four silver hanging bells at 2.5 inches, the middle pack, and usually the right one. Twelve covers a single door hanging and forty eight is a whole house, so twenty four is what you want for a door and a window, or a toran with a bell at every drop. Silver reads cooler and works with white flowers and modern palettes.',

  // Gajras
  B0HC48P47S:
    'Three artificial jasmine bun gajras, also called juda gajras or venis, each about 13 inches of strung length, which circles a medium bun once. The pack is assorted rather than matched, so you get more than one look for a wedding week rather than three of the same. Fabric buds instead of fresh mogra means they are ready the day they arrive, they do not brown by evening, and they go back in the box for the next function.',
  B0HC479QXR:
    'Two yellow rose and jasmine hand gajras, one for each wrist, or split the pair with whoever is standing next to you. Yellow is the haldi color, which is what this pair is made for, and the elasticated band opens from about 5 cm to 10 cm so it fits without measuring anyone. The rose is roughly 4 cm across, big enough to read in a photograph and small enough not to catch on a dupatta. Assembled and checked by hand.',
  B0HC49L3MP:
    'A single red rose and pearl hand gajra on an elasticated band. Red with pearl is the evening version of this accessory: it works for sangeet, karva chauth and receptions, and it photographs best against a darker outfit where white jasmine would wash out. Buy the single if you are wearing it yourself and the pack of five if you are dressing a bridal party.',
  B0HC4DHXNK:
    'Five red rose and pearl hand gajras, the bridesmaid pack. Five matching wrists in a row is the reason this exists, because five different gajras look like five people who each bought their own. One size on an elasticated band, so nobody needs measuring in advance, and fabric roses with pearl detailing that survive a full day of functions and go home as a keepsake.',

  // Pooja Essentials
  B0HB16BLTK:
    'A lotus pooja aasan in bright yellow and gold, 24.5 cm across when open, for seating an idol, a kalash or a diya thali in a home mandir. Yellow is the festive one: it lifts a pooja shelf for Diwali, haldi, Griha Pravesh and everyday aarti without needing fresh flowers each time. Each petal is cut and shaped in our workshop and the gold beaded border is stitched by hand around the edge, so no two open exactly alike. Folds flat for cleaning and storage.',
  B0HB4N2JSH:
    'A lotus pooja aasan in rani pink and gold, 24.5 cm across when open, carrying a printed Om, swastik and kalash motif on the center panel. This is the festival one: it gets bought for Diwali, Navratri and Griha Pravesh, where the mandir itself is meant to look dressed. Handmade petal by petal with a hand stitched gold beaded border. It folds flat between festivals and arrives gift boxed, which is why it is given away as often as it is kept.',

  // Artificial Flowers
  B0CMDJR8QM:
    'Twelve red artificial roses, arranged and finished as a bouquet rather than sold as loose stems. The case for these over fresh is simple: a fresh bouquet given for an anniversary is gone within the week and this one is still in the vase in March. Red is the anniversary and Valentine\'s choice. Keep it out of hard afternoon sun, which is the only thing that fades the color.',
  B0CMDK5J4T:
    'Twelve pink artificial roses in a finished bouquet. Pink reads softer than red and is what gets bought for mothers, sisters and friends, and for occasions where red would say something more than intended. Twelve individual flowers, not a printed spray, so the bouquet has depth when you look into it.',
  B0CMDJBYZ4:
    'Twelve yellow artificial roses in a finished bouquet. Yellow is the friendship flower and the one that gets sent to someone recovering or moving house, where a fresh bouquet is one more thing for them to deal with. Bright enough to carry a room on its own, which is why it usually ends up on a dining table rather than a side one.',
  B0HC44WKBT:
    'Fifty grams of loose white artificial mogra buds, sold by weight as raw material rather than as a finished garland. People buy this to string their own gajras and venis, to fill out a thin toran, for salon hair work, and for craft and school projects. Fifty grams goes further than it looks, because a single bun gajra uses only a small handful. Sorted by hand so the pack does not arrive with half the buds crushed.',

  // Home Décor
  B0GDY75WHT:
    'A tall wooden floor vase with brass floral inlay and hand carving, in an antique brown finish. It is a floor piece, so it goes beside a console, in the corner a room never solves, or at the end of a hallway, and it is heavy enough not to be knocked over by a passing bag. Fill it with our dried or artificial stems rather than water. This is a handpicked piece, sourced after going through a lot of vases that were not worth carrying.',

  // Craft Supplies
  B09Y29QS4V:
    'A thousand white pearl beads at 6 mm, the working size for jewelry making, gajra and veni stringing, embroidery, rangoli edges, invitation cards and school craft. Six millimetres is small enough to read as detail and large enough to thread without losing your temper. Sold in bulk because anyone who needs pearl beads needs more than a handful, and running out halfway through a set is worse than over-ordering.',
}
