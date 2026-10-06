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
// plain: what it is, what it fits, what it is for. Every fact here has to be
// traceable to the listing bullets or specs. House style is no em or en
// dashes anywhere.
//
// Entries for products in HELD_OUT (out of stock) stay here so the copy is
// ready the day they come back.

export const PRODUCT_COPY: Record<string, string> = {
  // Gajras
  B0HC48P47S:
    'Three artificial jasmine bun gajras, also called juda gajras or venis, each about 13 inches of strung length, which circles a medium bun once. The pack is assorted rather than matched, so you get more than one look for a wedding week rather than three of the same. Fabric buds instead of fresh mogra means they are ready the day they arrive, they do not brown by evening, and they go back in the box for the next function.',
  B0HGFMB8JJ:
    'Two white jasmine bun gajras in the full wreath style, dense with mogra buds all the way round. The wreath is elasticated, so it stretches over the bun and grips without a single pin, on a tight juda or a loose low bun, and comes off at night without pulling hair. White goes with every outfit color, which makes it the one to own if you only buy one. Both come from the same batch, so the white matches when two of you are in the same photograph.',
  B0HF9ZT32L:
    'Two hair gajras, each a deep red fabric rose set against dense white jasmine buds. Red against white is the combination that reads clearly in pictures, where an all white gajra can disappear against a light outfit. An elasticated loop stretches over the bun and holds without pins. Made for the wedding day and the reception, and worn again at a temple, a pooja or a dance performance. Wear one and keep one, or wear both on a bigger bun.',
  B0HFBKJ8Q6:
    'Two long strands of white jasmine gajra, cut long on purpose so each one runs the length of a plait instead of stopping halfway down. Two is what a full braid actually takes. It ties into the braid as you plait it, or pins along a finished one, and carries no weight at the roots through a long evening. The length classical dance needs, and just as much at home on a wedding braid, a temple visit or a South Indian function.',
  B0HC479QXR:
    'Two yellow rose and jasmine hand gajras, one for each wrist, or split the pair with whoever is standing next to you. Yellow is the haldi color, which is what this pair is made for, and the elasticated band opens from about 5 cm to 10 cm so it fits without measuring anyone. The rose is roughly 4 cm across, big enough to read in a photograph and small enough not to catch on a dupatta. Assembled and checked by hand.',
  B0HFB5PHDK:
    'Two red rose hand gajras, a fabric rose about 4 cm across set on white flowers, on an elasticated band that opens from about 5 cm to 10 cm. No clasp, no knot, nothing to tie, and it fits a slim wrist and a wider one alike. This is the wedding day pair, worn again for the reception and the family photographs afterwards. Real jasmine bruises within hours under function lights; this holds its color until the end of the evening.',
  B0HFBN6VKM:
    'Two rani pink rose hand gajras for the mehndi, each a fabric rose about 4 cm across set on white flowers. The elasticated band opens from about 5 cm to 10 cm, so it slips on and stays on without anyone measuring a wrist. Rani pink sits well with mehndi greens and with the brighter outfits of the week, and it comes out again for the reception and the next wedding in the family, because nothing about it is single use.',
  B0HC49L3MP:
    'A single red rose and pearl hand gajra on an elasticated band. Red with pearl is the evening version of this accessory: it works for sangeet, karva chauth and receptions, and it photographs best against a darker outfit where white jasmine would wash out. Buy the single if you are wearing it yourself and the pack of five if you are dressing a bridal party.',
  B0HC4DHXNK:
    'Five red rose and pearl hand gajras, the bridesmaid pack. Five matching wrists in a row is the reason this exists, because five different gajras look like five people who each bought their own. One size on an elasticated band, so nobody needs measuring in advance, and fabric roses with pearl detailing that survive a full day of functions and go home as a keepsake.',

  // Hair Accessories
  B0HD2V6K1M:
    'Two bright yellow fabric roses on straight pins, the haldi pair. A straight pin pushes into a bun and holds, with no clip to dig in and no elastic to stretch, so you can put them in without a mirror behind you. Placed one on each side of a juda they look deliberate, which is why they come as two. Sized to sit in the hair rather than on top of it, on a small tight bun or a loose one, and on a child as well as an adult.',
  B0HD2H3LF4:
    'Two rani pink fabric roses on straight pins, made for the sangeet and worn again at the next mehndi, pooja or wedding. Push them into either side of a bun and they hold, no clip and no elastic. Both pins are cut from one batch so the pink matches exactly. Small enough to be subtle on a tight juda and still read clearly in photographs against dark hair.',
  B0HGFHN4BR:
    'Two baby pink fabric roses on straight pins, the softest shade in the set and the one bought for engagements. A straight pin pushes into a bun and holds without a clip or an elastic, and two placed either side look intentional where one looks dropped. Cut from one batch so the color matches, and small enough to sit in the hair rather than on it, on an adult or a child.',
  B0HGFKDXZD:
    'Two deep red fabric roses on straight pins, the wedding pair, a little fuller than the other colors in the range. Red holds against dark hair and against a light outfit in photographs. Push one into each side of the bun and they stay put through the function, then go back in the box for the next one. Both from the same batch, so the red matches. No fragrance, no wilting.',
  B0HGFJ5DD1:
    'Two red fabric rose hair clips, each finished with fine pearl sprays and small gold accents worked around the rose, so they read as hair ornaments rather than plain fabric flowers. Properly sprung clips that hold fine and thick hair alike and let go without dragging. Wear one on each side, both on one side for a fuller look, or split the pair between a mother and a daughter.',
  B0HGFJRY4C:
    'A single pink rose hair clip with pearl sprays and gold detail around the flower. It clips into open hair, a half tie or a bun with one hand, which also makes it the easy choice for a child who will not sit still. Small enough for a girl and dressy enough for an adult, so it is often bought twice for a mother and daughter to match at a function.',
  B0HGFLGL4V:
    'A rani pink rose on a juda comb, edged with fine pearl sprays and small gold accents. The comb slides into a finished bun in one movement and its teeth bite into the hair instead of sitting on top, so it stays through dancing and comes out cleanly at the end. Dressy enough for a sangeet, a reception or an engagement, and restrained enough for a family function where you are not the bride.',

  // Festive Décor
  B09Y2B4XHL:
    'A set of four jasmine door torans, for a main door, a pooja room, a balcony door and one spare, which is roughly how they get used. The petals are fabric rather than fresh, so they go up before the festival starts and are still white on the last day. Hang them from the top of the frame and let them drop a little at the corners. Stored coiled rather than folded, a set lasts years of Diwalis.',
  B0HGFSRC4W:
    'Four mogra jasmine torans in red and white, each about 2.5 feet, sized as a bandarwar for the main door rather than a small ornament, so the entrance looks dressed instead of decorated in one corner. They arrive ready to hang on a door or a hook, with no wire or fittings to buy. Up before the function, down after it, and back up for the next one: Diwali, Navratri, Ganpati, a Griha Pravesh or an ordinary week.',
  B0HC4FD2F4:
    'Four strings of white flower ladi at 5 feet each, 20 feet in total, which is enough for a main door and a pooja room with some left over. One string covers the top of a standard door frame; two lets you run the top and drop both sides. Used for mandaps, pooja rooms, wedding backdrops and Griha Pravesh, and white is the one that photographs cleanly against every wall color. Strung and checked by hand before packing.',
  B09MD5M6YP:
    'Four strings of off white mogra garland at about 5 feet each, finished with golden bells. The bells are the difference: a silent flower string stops being noticed by the second day, and one that sounds when a door or a curtain moves keeps announcing itself. Hang them separately on a mandir, an idol, a doorway and a stair rail, or join them into one 20 foot run. No fragrance, and no browning by the next morning.',
  B0HCCGJKQ4:
    'Four strings of red and white mogra garland at 2.5 feet each. The shorter length is deliberate: this is a shelf, idol, photo frame and railing garland, not a doorway one. Red and white together is the combination used for pooja rooms and for wedding decor where plain white would disappear against a light wall. Fabric mogra buds, so they hold their color through the whole function and go back in the box afterwards.',
  B0HCPKG6HW:
    'Four strings of multicolor pom pom garland at 5 feet each, 20 feet in total. This is the bright, non-floral option: it goes up for birthdays, baby showers, Ganpati, nursery walls and haldi backdrops, anywhere fabric flowers would read as too formal. Soft pom poms on a strong thread, light enough to tape to a wall and sturdy enough to reuse.',
  B0HFQDY4K3:
    'Twelve golden filigree bells at about 2.5 inches, with the hanging cord already attached, so they go up in a moment without hooks or wire. Twelve is the count for one doorway or one toran. The warm gold reads against a wooden door and a painted wall alike, and the bells ring rather than clunk when a door moves. Lightweight decorative bells, not solid brass temple bells, which is why they hang from anything.',
  B09QJV7VXZ:
    'Twenty four golden jingle bells at 2.5 inches, moulded in an openwork lattice of small heart shaped cut-outs over a flared, ringed skirt, so they catch light from every side. Each has a hole in the base, ready to thread onto a garland, a toran or a tree branch. Light plastic in a warm gold finish rather than brass, so they hang safely from paper torans and curtain rods that would not take metal. Enough for a full toran run.',
  B09QJVDNFW:
    'Forty eight golden jingle bells at 2.5 inches. Gold is the one that works with marigold, traditional red and anything with zari in it, which makes it the default for weddings and for Diwali in most homes. A pack this size covers a full house or a season of toran making. Check the loops rather than the bells when you unpack them after storage.',
  B0B8XRDHPW:
    'Twelve silver hanging bells at 2.5 inches, the right count for one door hanging or one toran. Buy this pack if you are decorating a single doorway or repairing a toran that has lost a few bells, and the pack of 24 or 48 if the plan is bigger. The size is deliberately small: 2.5 inches sounds bright and does not pull a light garland out of shape.',
  B0B8XR4W5P:
    'Twenty four silver hanging bells at 2.5 inches, the middle pack, and usually the right one. Twelve covers a single door hanging and forty eight is a whole house, so twenty four is what you want for a door and a window, or a toran with a bell at every drop. Silver reads cooler and works with white flowers and modern palettes.',
  B0B8XR4XNW:
    'Forty eight silver hanging bells at 2.5 inches, which is the pack size for decorating a whole house rather than a doorway. This is what people buy before Diwali when the plan involves the main door, the balcony, the pooja room and the staircase, and it is also the pack craft sellers buy to make torans. Silver sits better than gold against white flowers and cooler palettes. Bright rather than heavy in sound: you hear them when a door opens.',

  // Door Hangings
  B0HJ8HKMWC:
    'Four matching Ganesh ji door hangings, each about 10 inches: a string of pearl style and gold beads, a yellow pom pom, a gold finish Ganesha resting in a ring of leaves, a red pom pom and a filigree bell to close it. Two frame the main door and two go on the mandir, or all four dress one wide entrance. The loop at the top takes a nail, a hook or a length of thread. Lightweight and gold finished rather than brass, and the bells are decorative, not made to ring.',
  B0HJ8P8NBY:
    'Four matching Ganesh ji latkans, each about 10 inches long: pearl style and gold beads, a gold finish Ganesha face in an arched ring, a collar of small white mogra buds, a textured gold ball, and a red satin lotus bud on a fan of buds and green leaves. The fabric flowers do not wilt or need water. Four reaches the main door and the pooja room in one order, for Ganesh Chaturthi, Diwali or a Griha Pravesh.',
  B0HJ8S6WZZ:
    'Four red lotus latkans, each about 7 inches: two short pearl strings, a flat lotus about 13 cm across faced in mirror bright gold with a deep red inlay showing through the petal outlines, and two small pink silk thread jhumkas ringed with pearls beneath it. Hung two at the main door and two at the mandir, they catch diya light in the evening. Board faced in gold finish, not brass, and light enough to hang from a thread.',
  B0HJ8KSPP7:
    'A matching pair of green parrot hangings, each about 10 inches, made to frame a main door, a mandir arch or a window grill one on each side. Each parrot perches on a gold finish crescent ring with layered leaf cut wings and a long tail, between strings of white pearl style beads that end in gold cones with soft pink petal skirts. Parrots over a doorway are one of the oldest shapes in Indian entrance decor, right for a festival, a mehendi or a wedding.',
  B0HJ8Z86C8:
    'A single wooden toran, about 12 inches across and 12 deep, made to hang across the top of a main door or on the wall above a home mandir. The yellow bar is hand painted with Shubh Labh in red Devanagari and flower rosettes at both ends. Five strands hang beneath it, a parrot, a kalash, a Ganesha plaque, a second kalash and a second parrot, each finished with a wool pom pom and a painted bell, the center one lowest so the piece reads as an arch. The cord is already attached.',
  B0HHGC9GYV:
    'Four matching mandir door hangings, each 14 inches from the loop to the tip: a dense run of ivory mogra style fabric flowers, a collar of green leaves, and a deep pink lotus bud finished with a small pearl. It is the strand you already know from a temple doorway. Two frame the main door and two go on the mandir. Nothing wilts and nothing needs water; wipe with a dry cloth and store flat between festivals.',
  B0HFPM5MZB:
    'A pair of gold mirror lotus latkans, each about 30 cm long: a lotus cut from board and faced in mirror bright gold over a deep colored inlay, hanging from white pearl beads and finishing in a tassel of gold and pearl strands with three small pom poms. The lotus is Lakshmi\'s seat, which is why it is the Diwali doorway shape. Two frame one entrance, or split them between the mandir and a window.',
  B0HFPJJSW4:
    'Four gold mirror lotus latkans in an assorted mix of colors, each about 30 cm of pearl strand, mirror gold lotus and beaded pom pom tassel. Four is the count for a main door and a mandir, two on each side. The mirror finish throws diya light back the way foil does, which a flat printed hanging never manages. Board, beads and thread, so it lies flat in a drawer between festivals and comes out looking the same.',
  B0HFQC184J:
    'Six gold mirror lotus latkans, each about 30 cm long, with a lotus faced in mirror bright gold, a white pearl string above and a gold and pearl tassel ending in pom poms below. Six covers the main door and the mandir with a pair left for a window grill or the back of a chair at a function, enough to make a room look decorated rather than dotted. Reusable year after year and stored flat.',
  B0HFPJTFVH:
    'A pair of gota patti bangle latkans: strips of flat gold gota lace stretched across a wool wrapped ring in blue, magenta, orange, yellow and green, meeting at a star in the middle, with an embossed golden bell at the bottom. The bell sounds when the door opens, which is what a bandhanwar is supposed to do. Two identical strands frame one doorway properly, about 35 cm each, from a nail, a hook or a length of thread.',
  B0HFQ8KM5T:
    'Four gota patti bangle latkans, each a wool wrapped ring in five bright colors with gold gota lace meeting at a star in the center and a golden bell below that rings when the door moves. A pair frames the main door and a pair goes on the mandir or the balcony, so the decoration reads as deliberate instead of dotted about. Fabric, lace and beads, so it comes out again for Ganpati, Navratri, Diwali and the next wedding.',
  B0HFQMDHJX:
    'Six gota patti bangle latkans, enough to do the whole house: a pair for the main door, a pair for the mandir and a pair for a window or the balcony. Each is a bright wool wrapped ring spoked with gold gota lace, with an embossed golden bell that sounds as the door moves. Light enough for a door edge or a window grill, and packed away in a box after the function rather than thrown out.',

  // Pooja Essentials
  B0HB4N2JSH:
    'A lotus pooja aasan in rani pink and gold, 24.5 cm across when open, carrying a printed Om, swastik and kalash motif on the center panel. This is the festival one: it gets bought for Diwali, Navratri and Griha Pravesh, where the mandir itself is meant to look dressed. Handmade petal by petal with a hand stitched gold beaded border. It folds flat between festivals, which is why it is given away as often as it is kept.',
  B0HF4N37JD:
    'A lotus pooja aasan in bright yellow and gold, 24.5 cm across when open, for seating an idol, a kalash, a shaligram or a diya thali in a home mandir. Eight padded satin petals rise around a printed Om, swastik and kalash center, so the idol sits on a raised seat rather than a flat cloth. Each petal is shaped in our workshop and the gold beaded border is stitched by hand, so no two open exactly alike. Yellow is the everyday and haldi color, cheerful on a daily mandir.',
  B0HF4PXH7S:
    'Two lotus pooja aasans, one rani pink and one yellow, each 24.5 cm across with padded satin petals and a hand stitched gold beaded border. The pair suits a mandir holding two deities, or two mandirs in one home, and it is the set people give at a Griha Pravesh or a wedding. Handmade in our workshop petal by petal, so the two will not open exactly alike.',
  B0HF9ZSQY3:
    'A gold finish puja thali with meenakari enamel work and two small lidded katori. The lids are the point: most thali sets have open bowls, so the roli and the akshat spill in the cupboard and get refilled every time. These close. About 16 cm across, sized for the daily aarti in a home mandir and presentable enough for Diwali, Karwa Chauth, Rakhi and a housewarming. Decorative metal, not solid gold or silver.',
  B0HF9ZJXT3:
    'A meenakari puja thali with colored enamel peacocks worked in the traditional style, and two katori, one for roli and one for akshat or mithai, which is what the rakhi tikka needs. About 13 cm across, big enough for the tikka things and the rakhi, small enough to live in the mandir. Bought for Raksha Bandhan and then used all year for the aarti, Bhai Dooj and Karwa Chauth. Decorative brassware, not solid silver.',
  B0HGFGMKDY:
    'The whole rakhi tikka set in one order: a steel thali about 10.5 inches across, two katori and a rakhi, so nothing is missing on the morning. Steel rather than a decorated plate, which means it washes, stacks and lasts instead of chipping after two seasons. Large enough to hold the sweets and the rakhi at once and still easy to carry in one hand, and kept for Bhai Dooj and the daily aarti afterwards.',
  B0HFBM7WZG:
    'A small hanging Krishna matki, worked by hand with mirrors and beads that catch the diya light in the evening, with the hanging cord already attached. It goes up for Janmashtami and the dahi handi in a minute, and usually stays up in the mandir, on a balcony or over a doorway, because it does not read as seasonal. Sized for a home rather than a hall. Colors vary slightly from piece to piece.',

  // Crochet
  B0GDXXM3PR:
    'Twelve mini crochet hearts, each about 1.25 inches, made to be scattered rather than displayed. They fill a bowl, sit on a tiered tray, weigh down the top of a gift hamper, or line up along a shelf edge. Twelve is the number that reads as a handful rather than a set. Because each heart is crocheted individually, the sizes vary slightly, which is what tells a handmade heart from a stamped one.',
  B0GC6KJCSC:
    'Six mini crochet hearts in mixed colors, for people who want the texture without committing to a single shade. They work in a child\'s room, on a bookshelf, in a bowl on a side table, or split up and tucked into six different cards. About 1.25 inches each, cotton yarn, crocheted by hand in our workshop.',
  B0GG5BVR7R:
    'A crocheted evil eye worked in blue and white rounds, edged with a scalloped border, finished with pearl-style beads and a soft tassel. It hangs from a door handle, a wall hook, a car mirror or the side of a bookshelf, and it weighs almost nothing, so it does not need a fixing. The motif is the old protective one, though we would rather you bought it because it looks good on a plain wall. Crocheted by us one at a time, so the tension and the tassel fall a little differently on each.',
  B0G95YC1T9:
    'Twelve red crochet hearts, the set we make most of in the run up to February and the one that keeps selling through the year for anniversaries and weddings. Red is the shade that holds up in photographs, so these are the ones that end up on favor tables and in bridal hampers. Slightly plumper than they look on screen, and light enough to sit on a stem or a ribbon without dragging it down.',
  B0GDY7RSXY:
    'A pair of crocheted cherries on a clip, sized to hang off a bag zip, a set of keys or a pencil case without swinging into everything. It is a small gift that does not feel like a small gift, which is why it gets bought for return favors, for a friend alongside something bigger, and for office Secret Santa. Cotton yarn, hand crocheted, and each cherry is stuffed by hand so they sit slightly differently.',
  B0GDY4D9FN:
    'A red crochet heart with a white daisy worked into the front, on a keyring. The daisy is stitched separately and attached rather than printed, which is the part that takes the time. It suits keys, a bag, or a gift that needs something to hold the ribbon. Made in our workshop, one at a time.',
  B0GDV4HTRJ:
    'A pair of crocheted rose gajras, also called a hair parandi, for wearing along a braid or around a bun. Unlike the fabric gajras in our Gajras range, these are worked in yarn by hand, so they have weight and texture and read as a made accessory rather than an imitation flower. They suit haldi, mehendi and Navratri, and they survive being packed and re-worn for years.',
  B0GDY833NN:
    'A crochet scrunchie worked in the popcorn stitch, which is the bobbly one that holds its shape instead of flattening after a week. Teal and pink, soft enough to sleep in, and thick enough to hold a full bun without needing a second tie. Hand wash and dry it flat and it will outlast every elastic in the drawer.',

  // Artificial Flowers
  B0HC44WKBT:
    'Fifty grams of loose white artificial mogra buds, sold by weight as raw material rather than as a finished garland. People buy this to string their own gajras and venis, to fill out a thin toran, for salon hair work, and for craft and school projects. Fifty grams goes further than it looks, because a single bun gajra uses only a small handful. Sorted by hand so the pack does not arrive with half the buds crushed.',
  B0HGM61K1N:
    'Twelve artificial lotus buds in a deep pink, each about 5 cm across and 6 cm tall, with soft foam petals over a paper wrapped stem you can trim to length. That is the scale for a pooja thali, an urli or a small vase. Ring a thali with them, set a few in the mandir, or float them in a water bowl for Janmashtami, Diwali and Navratri. No water, no sunlight and no upkeep; a dry cloth keeps them clean.',
  B0CMDJR8QM:
    'Twelve red artificial roses, arranged and finished as a bouquet rather than sold as loose stems. The case for these over fresh is simple: a fresh bouquet given for an anniversary is gone within the week and this one is still in the vase in March. Red is the anniversary and Valentine\'s choice. Keep it out of hard afternoon sun, which is the only thing that fades the color.',
  B0CMDK5J4T:
    'Twelve pink artificial roses in a finished bouquet. Pink reads softer than red and is what gets bought for mothers, sisters and friends, and for occasions where red would say something more than intended. Twelve individual flowers, not a printed spray, so the bouquet has depth when you look into it.',
  B0CMDJBYZ4:
    'Twelve yellow artificial roses in a finished bouquet. Yellow is the friendship flower and the one that gets sent to someone recovering or moving house, where a fresh bouquet is one more thing for them to deal with. Bright enough to carry a room on its own, which is why it usually ends up on a dining table rather than a side one.',

  // Kids
  B0HGFFKH66:
    'Pink bear sunglasses with round bear ears, plus two bow hair clips, so the whole look arrives in one parcel. Children take ordinary sunglasses off; the ears make these a toy she has chosen, so they stay on for the birthday, the holiday or the shoot. A light frame sized for 3 to 8 years that does not slide down a small nose. A dress up and photograph accessory, not certified UV protection eyewear.',
  B0HGF9GXPP:
    'Brown bear sunglasses with round bear ears and two lace bow hair clips, the quieter of the two colors and the one that suits a day out as much as a party. Sized for 3 to 8 years, with a light frame that does not leave marks behind the ears. Bought for the photograph as much as for the day: birthdays, the beach, a family trip. Fashion eyewear for dress up, not certified UV protection.',
  B0HF9XYGT7:
    'Two pairs of bear sunglasses, one pink and one brown, with bow hair clips to go with them. The set for siblings, cousins or best friends who will otherwise argue over one pair, and the one parents buy for a joint birthday photograph. Sized for 3 to 8 years with light frames that stay on a small face. A dress up accessory, not certified UV protection eyewear.',

  // Travel Essentials
  B0HFPS29NW:
    'Two screw cap tubes of strawberry scented paper soap, each about 14 cm tall and under 3 cm across, holding a stack of thin flakes cut as little flowers and rounds. Take one flake, wet your palms and rub: it dissolves into a real lather and rinses away clean. Dry sheets, so nothing leaks in a bag or counts against a cabin liquids limit. One tube for a handbag and one for the car.',
  B0HFQ1KFPJ:
    'Four tubes of strawberry scented paper soap flakes, so there is one in the school bag, one in the handbag, one in the car and one in the suitcase. A single soft pink flake and a little water make a proper lather that rinses away completely. Nothing liquid to burst or leak. The light strawberry scent and the flower shapes are what get children to wash their hands without an argument.',
  B0HFPLPKXM:
    'Six tubes of strawberry scented paper soap, enough for every bag in the house: school bags, office bags, the car, the trekking pack. Each 14 cm tube holds thin pink flakes in flower and round shapes; one flake and a splash of water is a full hand wash. For trains, treks and public washrooms where the soap has run out, or where you would rather not touch the one that is there.',

  // Home Décor
  B0GDY75WHT:
    'A tall wooden floor vase with brass floral inlay and hand carving, in an antique brown finish. It is a floor piece, so it goes beside a console, in the corner a room never solves, or at the end of a hallway, and it is heavy enough not to be knocked over by a passing bag. Fill it with dried or artificial stems rather than water. This is a handpicked piece, sourced after going through a lot of vases that were not worth carrying.',

  // Craft Supplies
  B09Y29QS4V:
    'A thousand white pearl beads at 6 mm, the working size for jewelry making, gajra and veni stringing, embroidery, rangoli edges, invitation cards and school craft. Six millimeters is small enough to read as detail and large enough to thread without losing your temper. Sold in bulk because anyone who needs pearl beads needs more than a handful, and running out halfway through a set is worse than over-ordering.',
  B0HM3GW6VM:
    'A matching pair of green fabric parrots, each built leaf by leaf from small cut pieces of lime-green cotton layered like feathers, with a red collar set with small clear stones and a glossy maroon beak. Each is about 22 cm from beak to tail. They have no stand or base, so they are made to be tied, laid or glued: a few turns of thread fix them onto a toran or the posts of a Janmashtami jhula, they lie on a shagun or trousseau tray or nestle into a gift hamper, and craft glue sets them into wreaths and wall hangings. Fabric rather than carved wood, so keep them dry and box them between festivals.',
  B0HM3J4BCW:
    'Four green fabric parrots, two matching pairs, each made of small leaf-cut pieces of lime-green cotton layered like feathers, finished with a stone-set red collar and a glossy maroon beak, about 22 cm from beak to tail. With no stand or base they are tied, laid or glued rather than stood up: four covers a toran and a jhula in one order, or a whole wedding tray. Thread and glue are not included. Fabric, light in the hand: keep them dry and store them boxed.',
  B0HM382PGK:
    'Twelve deep red velvet rose heads, about 5 cm across and 3 cm deep, with no stems, so each one sits face up exactly where you place it. Ring a diya on a pooja thali, line the posts of a Janmashtami jhula, top a gift box or finish a wedding hamper, or glue them into a toran, a wreath or hair work. The velvet has a soft sheen that reads as real flowers across a room. Nothing wilts and nothing needs water; velvet must stay dry, so these are for placing, never for floating.',
}
