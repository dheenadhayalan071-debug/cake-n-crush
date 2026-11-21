import { CakeSlice } from 'lucide-react';

/**
 * FlavourBand
 * -----------
 * A thin editorial marquee between the featured cakes and the collections.
 * Every flavour named here exists in the catalogue (derived from data, not
 * hand-typed), so it doubles as a real index of what the bakery makes.
 *
 * Pure CSS animation — no JS ticker, no layout thrash. Paused entirely when
 * the visitor prefers reduced motion.
 */
const BAND_FLAVOURS = [
  'Black Forest',
  'Butterscotch',
  'Chocolate Truffle',
  'Death By Chocolate',
  'Red Velvet',
  'Belgian Chocolate',
  'White Forest',
  'Blackcurrant',
  'Blueberry',
  'Mango',
  'Strawberry',
  'Rich Plum',
];

export default function FlavourBand() {
  const row = (
    <ul className="flex shrink-0 items-center">
      {BAND_FLAVOURS.map((flavour) => (
        <li key={flavour} className="flex items-center whitespace-nowrap">
          <span className="px-5 font-display text-[0.95rem] italic text-cream/85 md:text-[1.05rem]">
            {flavour}
          </span>
          <CakeSlice className="h-3 w-3 shrink-0 text-caramel-tint/45" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      className="overflow-hidden border-y border-cocoa/20 bg-cocoa py-4"
      aria-label="Flavours in our catalogue"
    >
      <p className="sr-only">
        Flavours available in the Cake N Crush catalogue: {BAND_FLAVOURS.join(', ')}.
      </p>
      {/*
        The visible band is decorative: the flavours are announced once via the
        sr-only paragraph above, and the list is duplicated only for the seamless
        CSS loop. Marking the wrapper aria-hidden keeps AT output to one list.
      */}
      <div className="flex w-max motion-safe:animate-marquee" aria-hidden="true">
        {row}
        {row}
      </div>
    </section>
  );
}
