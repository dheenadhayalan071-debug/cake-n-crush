/**
 * Gallery content.
 *
 * ⚠️ No original bakery photography was supplied. Every item below uses
 * clearly labelled illustrative styling imagery. Replace `image` with real
 * photo keys after adding files to assets-src/ and running `npm run images`,
 * then remove the disclaimer note in GalleryPage.
 */
import { EDITORIAL_IMAGES } from './imagery.js';

export const MUSINGS_NOTE =
  'These are illustrative editorial images, used to show the visual direction of our cakes.';

export const GALLERY_FILTERS = [
  { id: 'celebration', label: 'Celebration' },
  { id: 'chocolate', label: 'Chocolate' },
  { id: 'eggless', label: 'Eggless' },
  { id: 'custom', label: 'Special creations' },
  { id: 'bakery', label: 'Bakery highlights' },
];

export const GALLERY_ITEMS = [
  {
    id: 'ivory-cherry',
    image: 'hero-cake',
    title: 'Pink & cherry',
    kicker: 'Special creation',
    categories: ['celebration', 'custom'],
    alt: EDITORIAL_IMAGES['hero-cake'].alt,
    span: 'tall',
  },
  {
    id: 'black-forest',
    image: 'gallery-blackforest',
    title: 'Black Forest',
    kicker: 'Celebration',
    categories: ['celebration', 'chocolate'],
    alt: EDITORIAL_IMAGES['gallery-blackforest'].alt,
  },
  {
    id: 'piping',
    image: 'brand-piping',
    title: 'Hand piped',
    kicker: 'Bakery highlight',
    categories: ['bakery', 'custom'],
    alt: EDITORIAL_IMAGES['brand-piping'].alt,
  },
  {
    id: 'red-velvet',
    image: 'gallery-redvelvet',
    title: 'Red Velvet',
    kicker: 'Celebration',
    categories: ['celebration', 'custom'],
    alt: EDITORIAL_IMAGES['gallery-redvelvet'].alt,
    span: 'tall',
  },
  {
    id: 'butterscotch',
    image: 'gallery-butterscotch',
    title: 'Butterscotch & praline',
    kicker: 'Celebration',
    categories: ['celebration'],
    alt: EDITORIAL_IMAGES['gallery-butterscotch'].alt,
  },
  {
    id: 'eggless-vanilla',
    image: 'cat-eggless',
    title: 'Eggless vanilla',
    kicker: 'Eggless',
    categories: ['eggless'],
    alt: EDITORIAL_IMAGES['cat-eggless'].alt,
  },
  {
    id: 'chocolate-ganache',
    image: 'texture-chocolate',
    title: 'Dark chocolate',
    kicker: 'Chocolate',
    categories: ['chocolate'],
    alt: EDITORIAL_IMAGES['texture-chocolate'].alt,
  },
  {
    id: 'plum',
    image: 'cat-plum',
    title: 'Plum cake',
    kicker: 'Bakery highlight',
    categories: ['bakery'],
    alt: EDITORIAL_IMAGES['cat-plum'].alt,
  },
  {
    id: 'custom-gold',
    image: 'gallery-custom',
    title: 'Bespoke detailing',
    kicker: 'Special creation',
    categories: ['custom', 'celebration'],
    alt: EDITORIAL_IMAGES['gallery-custom'].alt,
    span: 'tall',
  },
  {
    id: 'cream',
    image: 'texture-cream',
    title: 'Whipped cream',
    kicker: 'Bakery highlight',
    categories: ['bakery'],
    alt: EDITORIAL_IMAGES['texture-cream'].alt,
  },
  {
    id: 'berries',
    image: 'texture-berries',
    title: 'Berry finishes',
    kicker: 'Eggless',
    categories: ['eggless', 'celebration'],
    alt: EDITORIAL_IMAGES['texture-berries'].alt,
  },
  {
    id: 'one-kg',
    image: 'cat-1kg',
    title: 'The one-kilogram centrepiece',
    kicker: 'Celebration',
    categories: ['celebration', 'chocolate'],
    alt: EDITORIAL_IMAGES['cat-1kg'].alt,
  },
  {
    id: 'pastry-platter',
    image: 'cat-pastries',
    title: 'The pastry platter',
    kicker: 'Bakery highlight',
    categories: ['bakery'],
    alt: EDITORIAL_IMAGES['cat-pastries'].alt,
  },
  {
    id: 'brownie-stack',
    image: 'cat-brownies',
    title: 'Brownie stack',
    kicker: 'Chocolate',
    categories: ['chocolate', 'bakery'],
    alt: EDITORIAL_IMAGES['cat-brownies'].alt,
  },
  {
    id: 'strawberry-arch',
    image: 'cat-celebration',
    title: 'Strawberry celebration',
    kicker: 'Celebration',
    categories: ['celebration', 'custom'],
    alt: EDITORIAL_IMAGES['cat-celebration'].alt,
  },
];
