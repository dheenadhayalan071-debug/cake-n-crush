import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Picture from '../media/Picture.jsx';
import StaggerGroup from '../ui/StaggerGroup.jsx';
import StaggerItem from '../ui/StaggerItem.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import { CATEGORIES, PRODUCTS, PENDING_CATEGORIES } from '../../data/products.js';
import { CATEGORY_IMAGE } from '../../data/imagery.js';
import { cn } from '../../lib/cn.js';

/**
 * Explore Collections
 * -------------------
 * Six collections, six different colour treatments, one shared card grammar
 * (so it reads as a system rather than six unrelated tiles). The first card
 * spans two columns on desktop to break the grid out of a plain 3×2.
 *
 * Counts and price ranges are derived from the real catalogue. Collections
 * whose menu has not been confirmed (pastries, brownies) link to the honest
 * empty state instead of inventing products.
 */

const COLLECTIONS = [
  {
    id: 'eggless',
    image: 'cat-eggless',
    bg: 'bg-pistachio',
    chip: 'bg-vanilla',
    text: 'text-chocolate',
    span: 'lg:col-span-2',
    aspect: 'aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]',
  },
  {
    id: 'celebration',
    image: 'cat-celebration',
    bg: 'bg-strawberry',
    chip: 'bg-vanilla',
    text: 'text-chocolate',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'chocolate',
    image: 'cat-1kg',
    bg: 'bg-chocolate',
    chip: 'bg-butter',
    text: 'text-vanilla',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'plum',
    image: 'cat-plum',
    bg: 'bg-butter',
    chip: 'bg-vanilla',
    text: 'text-chocolate',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'pastries',
    image: 'cat-pastries',
    bg: 'bg-sky',
    chip: 'bg-vanilla',
    text: 'text-chocolate',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'brownies',
    image: 'cat-brownies',
    bg: 'bg-lavender',
    chip: 'bg-vanilla',
    text: 'text-chocolate',
    aspect: 'aspect-[4/5]',
  },
];

export default function CategoryGrid() {
  const known = COLLECTIONS.filter((entry) => CATEGORIES.some((c) => c.id === entry.id));

  return (
    <section className="bg-vanilla py-16 md:py-24" aria-labelledby="categories-heading">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Explore collections"
            title="Pick a mood. Pick a cake."
            lede="Six counter collections, every weight and dietary option listed with its own price."
            className="max-w-2xl"
          />
          <Link
            to="/menu"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border-2 border-chocolate px-4 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-chocolate transition-colors hover:bg-chocolate hover:text-vanilla md:self-auto"
          >
            All 18 cakes
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <StaggerGroup
          as="ul"
          stagger={0.06}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-12"
        >
          {known.map((entry) => {
            const category = CATEGORIES.find((c) => c.id === entry.id);
            const members = PRODUCTS.filter((p) => p.categories.includes(entry.id));
            const pending = PENDING_CATEGORIES.includes(entry.id);
            const isDark = entry.text === 'text-vanilla';

            return (
              <StaggerItem as="li" key={entry.id} className={entry.span}>
                <Link
                  to={`/menu?category=${entry.id}`}
                  className={cn(
                    'group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border-2 border-chocolate p-4 shadow-[0_4px_0_#3A251F] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_0_#3A251F]',
                    entry.bg,
                    entry.text,
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p
                        className={cn(
                          'text-[0.5625rem] font-bold uppercase tracking-[0.18em]',
                          isDark ? 'text-vanilla/65' : 'text-chocolate/55',
                        )}
                      >
                        {pending ? 'At the counter' : category?.kicker}
                      </p>
                      <h3 className="mt-1.5 font-display text-[1.5rem] leading-[1.05] font-semibold tracking-[-0.02em] sm:text-[1.65rem]">
                        {category?.name ?? entry.id}
                      </h3>
                    </div>
                    <span
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-chocolate transition-transform duration-300 group-hover:rotate-45',
                        entry.chip,
                      )}
                    >
                      <ArrowUpRight className="h-4 w-4 text-chocolate" aria-hidden="true" />
                    </span>
                  </div>

                  <div className="relative mt-4 flex-1 overflow-hidden rounded-xl border-2 border-chocolate">
                    <Picture
                      name={entry.image ?? CATEGORY_IMAGE[entry.id]}
                      alt={`Illustrative editorial styling for the ${category?.name.toLowerCase() ?? entry.id} collection`}
                      className={cn('w-full', entry.aspect)}
                      imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                    />
                  </div>

                  <p
                    className={cn(
                      'mt-3.5 text-[0.75rem] leading-snug',
                      isDark ? 'text-vanilla/70' : 'text-chocolate/70',
                    )}
                  >
                    {pending
                      ? 'Selection and prices being confirmed — ask on WhatsApp.'
                      : `${members.length} ${members.length === 1 ? 'cake' : 'cakes'} · from ₹${Math.min(...members.map((m) => m.priceFrom))}`}
                  </p>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <p className="mt-6 max-w-2xl text-[0.6875rem] leading-relaxed text-ink-faint">
          Pastries and brownies are available at the counter; their full selection is
          being confirmed with the bakery and is not priced on this site yet.
        </p>
      </div>
    </section>
  );
}
