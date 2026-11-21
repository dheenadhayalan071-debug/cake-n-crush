/**
 * Product catalogue
 * -----------------
 * Prices are transcribed exactly from the brief supplied by the business and
 * are PROVISIONAL until the owner signs off. No ingredients, allergens,
 * bestseller flags or availability claims have been invented.
 *
 * To add a product: copy an entry, keep `id` unique and lower-kebab-case.
 * To add a price: add a variant — never a second hard-coded price field.
 *
 * Variant shape:
 *   { id, dietaryType: 'Eggless' | 'Regular', weight, weightGrams, price }
 */

/** @typedef {'celebration'|'eggless'|'onekg'|'plum'|'pastries'|'brownies'} CategoryId */

const regular = (weight, weightGrams, price) => ({
  dietaryType: 'Regular',
  weight,
  weightGrams,
  price,
});

const eggless = (weight, weightGrams, price) => ({
  dietaryType: 'Eggless',
  weight,
  weightGrams,
  price,
});

/**
 * Builds a variant with a stable, human-readable id such as
 * `regular-500g`. Stable ids keep WhatsApp messages and analytics
 * consistent across releases.
 */
function withVariantIds(variants) {
  return variants.map((variant) => ({
    ...variant,
    id: `${variant.dietaryType.toLowerCase()}-${variant.weight}`,
  }));
}

/** @type {Array<object>} */
const catalogue = [
  {
    id: 'black-forest',
    name: 'Black Forest',
    categories: ['celebration', 'eggless', 'onekg'],
    tone: 'chocolate',
    tags: ['Chocolate', 'Cherry'],
    variants: withVariantIds([
      regular('500g', 500, 440),
      regular('1kg', 1000, 840),
      eggless('500g', 500, 390),
    ]),
  },
  {
    id: 'butterscotch',
    name: 'Butterscotch',
    categories: ['celebration', 'eggless', 'onekg'],
    tone: 'caramel',
    tags: ['Caramel', 'Praline'],
    variants: withVariantIds([
      regular('500g', 500, 440),
      regular('1kg', 1000, 800),
      eggless('500g', 500, 390),
    ]),
  },
  {
    id: 'triple-layer',
    name: 'Triple Layer',
    categories: ['celebration', 'eggless'],
    tone: 'cream',
    tags: ['Layered'],
    variants: withVariantIds([regular('500g', 500, 440), eggless('500g', 500, 390)]),
  },
  {
    id: 'creamy-vanilla',
    name: 'Creamy Vanilla',
    categories: ['celebration', 'eggless'],
    tone: 'cream',
    tags: ['Vanilla'],
    variants: withVariantIds([regular('500g', 500, 440), eggless('500g', 500, 390)]),
  },
  {
    id: 'mango',
    name: 'Mango',
    categories: ['celebration', 'eggless'],
    tone: 'caramel',
    tags: ['Fruit'],
    variants: withVariantIds([regular('500g', 500, 440), eggless('500g', 500, 390)]),
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    categories: ['celebration', 'eggless'],
    tone: 'berry',
    tags: ['Fruit'],
    variants: withVariantIds([regular('500g', 500, 440), eggless('500g', 500, 390)]),
  },
  {
    id: 'white-forest',
    name: 'White Forest',
    categories: ['celebration', 'eggless'],
    tone: 'cream',
    tags: ['Cream', 'Cherry'],
    variants: withVariantIds([regular('500g', 500, 480), eggless('500g', 500, 440)]),
  },
  {
    id: 'blackcurrant',
    name: 'Blackcurrant',
    categories: ['celebration', 'eggless'],
    tone: 'berry',
    tags: ['Fruit'],
    variants: withVariantIds([regular('500g', 500, 480), eggless('500g', 500, 440)]),
  },
  {
    id: 'chocolate-truffle',
    name: 'Chocolate Truffle',
    categories: ['celebration', 'eggless'],
    tone: 'chocolate',
    tags: ['Chocolate'],
    variants: withVariantIds([regular('500g', 500, 480), eggless('500g', 500, 450)]),
  },
  {
    id: 'scotch-forest',
    name: 'Scotch Forest',
    categories: ['celebration'],
    tone: 'caramel',
    tags: ['Caramel', 'Chocolate'],
    variants: withVariantIds([regular('500g', 500, 480)]),
  },
  {
    id: 'blueberry',
    name: 'Blueberry',
    categories: ['celebration', 'eggless'],
    tone: 'berry',
    tags: ['Fruit'],
    variants: withVariantIds([regular('500g', 500, 540), eggless('500g', 500, 490)]),
  },
  {
    id: 'double-choco-chip',
    name: 'Double Choco Chip',
    categories: ['celebration', 'eggless'],
    tone: 'chocolate',
    tags: ['Chocolate'],
    variants: withVariantIds([regular('500g', 500, 540), eggless('500g', 500, 490)]),
  },
  {
    id: 'death-by-chocolate',
    name: 'Death By Chocolate',
    categories: ['celebration', 'eggless'],
    tone: 'chocolate',
    tags: ['Chocolate'],
    variants: withVariantIds([regular('500g', 500, 540), eggless('500g', 500, 490)]),
  },
  {
    id: 'red-velvet',
    name: 'Red Velvet',
    categories: ['celebration', 'eggless'],
    tone: 'berry',
    tags: ['Cream cheese'],
    variants: withVariantIds([regular('500g', 500, 580), eggless('500g', 500, 580)]),
  },
  {
    id: 'belgium-chocolate',
    name: 'Belgium Chocolate',
    categories: ['celebration'],
    tone: 'chocolate',
    tags: ['Chocolate'],
    variants: withVariantIds([regular('500g', 500, 580)]),
  },
  {
    id: 'royal-plum-100g',
    name: 'Royal Plum',
    categories: ['plum'],
    tone: 'plum',
    tags: ['Plum', 'Fruit & nut'],
    variants: withVariantIds([regular('100g', 100, 90)]),
  },
  {
    id: 'royal-plum-250g',
    name: 'Royal Plum',
    categories: ['plum'],
    tone: 'plum',
    tags: ['Plum', 'Fruit & nut'],
    variants: withVariantIds([regular('250g', 250, 249)]),
  },
  {
    id: 'rich-plum-500g',
    name: 'Rich Plum',
    categories: ['plum'],
    tone: 'plum',
    tags: ['Plum', 'Fruit & nut'],
    variants: withVariantIds([regular('500g', 500, 500)]),
  },
];

/**
 * Curation used on the homepage. This is an editorial selection by the
 * designer — not a claim about sales performance or popularity.
 */
const FEATURED_IDS = ['black-forest', 'death-by-chocolate', 'red-velvet', 'butterscotch'];

export const PRODUCTS = catalogue.map((product) => {
  const prices = product.variants.map((variant) => variant.price);
  const categories =
    product.tone === 'chocolate' && !product.categories.includes('chocolate')
      ? [...product.categories, 'chocolate']
      : product.categories;
  return {
    ...product,
    categories,
    /** Lowest price across variants — never presented as "from" without notes. */
    priceFrom: Math.min(...prices),
    priceTo: Math.max(...prices),
    dietaryTypes: [...new Set(product.variants.map((v) => v.dietaryType))],
    weights: [...new Set(product.variants.map((v) => v.weight))],
    featured: FEATURED_IDS.includes(product.id),
    /**
     * Bestseller status requires written owner confirmation. Do not set this
     * to true without it — the UI and structured data rely on this flag.
     */
    bestseller: false,
    bestsellerStatus: 'pending-owner-confirmation',
    availability: 'in-catalogue',
    image: null,
    /** No ingredient copy is claimed until the owner supplies it. */
    description: null,
  };
});

export const CATEGORIES = [
  {
    id: 'celebration',
    name: 'Celebration Cakes',
    shortName: 'Celebration',
    kicker: '500 g · 1 kg',
    blurb:
      'Our celebration range — the cakes that arrive at birthdays, anniversaries and every moment in between.',
  },
  {
    id: 'eggless',
    name: 'Eggless Cakes',
    shortName: 'Eggless',
    kicker: '500 g',
    blurb:
      'The same celebration flavours, made eggless. Prices shown per flavour and weight.',
  },
  {
    id: 'chocolate',
    name: 'Chocolate Cakes',
    shortName: 'Chocolate',
    kicker: 'Truffle · ganache',
    blurb:
      'The chocolate-led half of the counter — truffle, ganache and layered chocolate cakes, priced per weight and dietary option.',
  },
  {
    id: 'onekg',
    name: '1 kg Cakes',
    shortName: '1 kg',
    kicker: '1 kg',
    blurb: 'A larger centrepiece for bigger tables. Available in our Black Forest and Butterscotch.',
  },
  {
    id: 'plum',
    name: 'Plum Cakes',
    shortName: 'Plum',
    kicker: '100 g · 250 g · 500 g',
    blurb: 'Dense, slow-ripened plum cakes in three sizes — the small tin worth keeping a few of.',
  },
  {
    id: 'pastries',
    name: 'Pastries',
    shortName: 'Pastries',
    kicker: 'Menu pending',
    blurb:
      'Pastries are part of our counter offer. The full selection and prices are being confirmed with the bakery.',
  },
  {
    id: 'brownies',
    name: 'Brownies',
    shortName: 'Brownies',
    kicker: 'Menu pending',
    blurb:
      'Brownies are part of our counter offer. The full selection and prices are being confirmed with the bakery.',
  },
];

/** Categories whose menu has not been supplied — rendered with an honest empty state. */
export const PENDING_CATEGORIES = ['pastries', 'brownies'];

export const ALLERGEN_NOTICE =
  'Our kitchen handles wheat, dairy, eggs and nuts. If you have an allergy, please tell us on WhatsApp before ordering and we will confirm what is possible.';
