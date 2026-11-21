/**
 * Editorial imagery map
 * ---------------------
 * IMPORTANT: No bakery photography was supplied with this project. Every
 * image below is AI-generated editorial *styling* — a deliberate, neutral
 * placeholder used to establish the art direction. They are flagged with
 * `placeholder: true` and the UI labels them so they can never be mistaken
 * for photographs of actual Cake N Crush products.
 *
 * To swap in real photography:
 *   1. Drop the file into assets-src/ (e.g. `black-forest.jpg`).
 *   2. Run `npm run images`.
 *   3. Point the product / category entry at the new key.
 *   4. Remove the placeholder flag.
 */

export const EDITORIAL_IMAGES = {
  'hero-cake': {
    alt: 'Illustrative editorial styling of a tall ivory celebration cake decorated with fresh cherries',
    placeholder: true,
  },
  'brand-piping': {
    alt: 'Illustrative editorial styling of a baker piping cream rosettes onto a celebration cake',
    placeholder: true,
  },
  'texture-chocolate': {
    alt: 'Illustrative editorial macro styling of glossy dark chocolate ganache',
    placeholder: true,
  },
  'texture-cream': {
    alt: 'Illustrative editorial macro styling of whipped vanilla cream',
    placeholder: true,
  },
  'texture-berries': {
    alt: 'Illustrative editorial styling of berries resting on whipped cream',
    placeholder: true,
  },
  'cat-eggless': {
    alt: 'Illustrative editorial styling of an eggless vanilla cream cake with a strawberry',
    placeholder: true,
  },
  'cat-celebration': {
    alt: 'Illustrative editorial styling of a celebration cake finished with piped borders and berries',
    placeholder: true,
  },
  'cat-1kg': {
    alt: 'Illustrative editorial styling of a large round chocolate celebration cake',
    placeholder: true,
  },
  'cat-plum': {
    alt: 'Illustrative editorial styling of plum cakes on a wooden board',
    placeholder: true,
  },
  'cat-pastries': {
    alt: 'Illustrative editorial styling of pastries arranged on a ceramic platter',
    placeholder: true,
  },
  'cat-brownies': {
    alt: 'Illustrative editorial styling of a stack of fudgy chocolate brownies with walnuts',
    placeholder: true,
  },
  'gallery-blackforest': {
    alt: 'Illustrative editorial styling of a black forest cake with cream rosettes, chocolate shavings and cherries',
    placeholder: true,
  },
  'gallery-redvelvet': {
    alt: 'Illustrative editorial styling of a red velvet cake with cream cheese frosting and a cut slice',
    placeholder: true,
  },
  'gallery-butterscotch': {
    alt: 'Illustrative editorial styling of a butterscotch cake with caramel drip and praline shards',
    placeholder: true,
  },
  'gallery-custom': {
    alt: 'Illustrative editorial styling of a two-tier bespoke cake with piped buttercream, gold leaf and dried florals',
    placeholder: true,
  },
};

/** Placeholder image per catalogue category. */
export const CATEGORY_IMAGE = {
  celebration: 'cat-celebration',
  eggless: 'cat-eggless',
  onekg: 'cat-1kg',
  plum: 'cat-plum',
  pastries: 'cat-pastries',
  brownies: 'cat-brownies',
};

/**
 * Per-product placeholder mapping.
 *
 * These choose the *closest-looking* illustrative frame for each flavour so a
 * grid of cakes does not repeat one photograph. They are still placeholders —
 * not photographs of these specific cakes — which is why every one remains
 * flagged in EDITORIAL_IMAGES and every alt text says "illustrative".
 *
 * When real product photography arrives, add the file to assets-src/, run
 * `npm run images`, and set `image: '<key>'` on the product itself (which
 * takes priority over this map).
 */
export const PRODUCT_IMAGE = {
  'black-forest': 'gallery-blackforest',
  butterscotch: 'gallery-butterscotch',
  'scotch-forest': 'gallery-butterscotch',
  'red-velvet': 'gallery-redvelvet',
  'creamy-vanilla': 'cat-eggless',
  'white-forest': 'cat-eggless',
  strawberry: 'texture-berries',
  blackcurrant: 'texture-berries',
  blueberry: 'texture-berries',
  'chocolate-truffle': 'texture-chocolate',
  'death-by-chocolate': 'texture-chocolate',
  'double-choco-chip': 'cat-1kg',
  'belgium-chocolate': 'cat-1kg',
  'royal-plum-100g': 'cat-plum',
  'royal-plum-250g': 'cat-plum',
  'rich-plum-500g': 'cat-plum',
};

/**
 * Resolves the image key for a product:
 *   1. an explicit `product.image` (real photography),
 *   2. the per-flavour placeholder map,
 *   3. the category fallback.
 */
export function productImageKey(product) {
  if (product.image) return product.image;
  if (PRODUCT_IMAGE[product.id]) return PRODUCT_IMAGE[product.id];
  if (product.categories.includes('plum')) return CATEGORY_IMAGE.plum;
  if (product.categories.includes('celebration')) return CATEGORY_IMAGE.celebration;
  if (product.categories.includes('eggless')) return CATEGORY_IMAGE.eggless;
  return CATEGORY_IMAGE.celebration;
}

/**
 * Alt text for a product image. Built from the *flavour* (what the customer is
 * choosing) rather than describing the placeholder's contents, so it stays
 * truthful when the real photograph replaces it.
 */
export function productImageAlt(product) {
  const placeholder = EDITORIAL_IMAGES[productImageKey(product)]?.placeholder;
  const prefix = placeholder ? 'Illustrative editorial styling of a ' : 'Photograph of the ';
  return `${prefix}${product.name.toLowerCase()} cake`;
}

export function editorialImage(key) {
  return EDITORIAL_IMAGES[key] || null;
}

export function isPlaceholder(key) {
  return Boolean(EDITORIAL_IMAGES[key]?.placeholder);
}
