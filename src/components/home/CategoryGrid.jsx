import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Picture from '../media/Picture.jsx';
import StaggerGroup from '../ui/StaggerGroup.jsx';
import StaggerItem from '../ui/StaggerItem.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import { CATEGORIES, PRODUCTS } from '../../data/products.js';
import { CATEGORY_IMAGE } from '../../data/imagery.js';

/**
 * Explore categories — asymmetric editorial grid.
 * Counts are derived from real catalogue data, never hard-coded.
 */
export default function CategoryGrid() {
  const visible = CATEGORIES.filter((category) =>
    ['celebration', 'eggless', 'onekg', 'plum'].includes(category.id),
  );

  return (
    <section className="bg-cream py-16 md:py-24" aria-labelledby="categories-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="Explore"
          title="Find your cake by collection."
          lede="Four collections, each with clearly listed weights and variants. No hidden pricing."
          className="max-w-2xl"
        />

        <StaggerGroup
          as="ul"
          stagger={0.08}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {visible.map((category) => {
            const count = PRODUCTS.filter((p) => p.categories.includes(category.id)).length;
            return (
              <StaggerItem as="li" key={category.id}>
                <Link
                  to={`/menu?category=${category.id}`}
                  className="group relative block h-full overflow-hidden bg-cocoa"
                >
                  <Picture
                    name={CATEGORY_IMAGE[category.id]}
                    alt={`Illustrative styling for the ${category.name.toLowerCase()} collection`}
                    className="aspect-[3/4] w-full"
                    imgClassName="opacity-90 transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:opacity-100"
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 92vw"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-cocoa/85 via-cocoa/25 to-cocoa/5 transition-opacity duration-500 group-hover:from-cocoa/90"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[0.5625rem] font-semibold uppercase tracking-[0.18em] text-caramel-tint">
                      {category.kicker}
                    </p>
                    <h3 className="mt-2 font-display text-[1.5rem] leading-tight text-cream">
                      {category.name}
                    </h3>
                    <div className="mt-3 flex items-center justify-between border-t border-cream/20 pt-3">
                      <span className="text-[0.6875rem] uppercase tracking-[0.12em] text-cream/60">
                        {count} {count === 1 ? 'cake' : 'cakes'}
                      </span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/30 text-cream transition-all duration-500 group-hover:border-cream group-hover:bg-cream group-hover:text-cocoa">
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <p className="mt-6 text-[0.75rem] leading-relaxed text-ink-faint">
          Pastries and brownies are available at the counter; their full selection is
          being confirmed with the bakery and is not priced on this site yet.
        </p>
      </div>
    </section>
  );
}
