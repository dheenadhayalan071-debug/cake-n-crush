import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, m as motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import Seo from '../components/seo/Seo.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import Picture from '../components/media/Picture.jsx';
import Button from '../components/ui/Button.jsx';
import { GALLERY_ITEMS, GALLERY_FILTERS, MUSINGS_NOTE } from '../data/gallery.js';
import { bakerySchema } from '../lib/schema.js';
import { cn } from '../lib/cn.js';
import { EASE_SILK } from '../lib/motion.js';

export default function GalleryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get('category');
  const [filter, setFilter] = useState(
    GALLERY_FILTERS.some((f) => f.id === initial) ? initial : 'all',
  );
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const items = useMemo(
    () => (filter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.categories.includes(filter))),
    [filter],
  );

  useEffect(() => {
    if (filter === 'all') setSearchParams({}, { replace: true });
    else setSearchParams({ category: filter }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setLightboxIndex(null);
      if (event.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % items.length);
      if (event.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + items.length) % items.length);
    };
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxIndex, items.length]);

  const active = lightboxIndex === null ? null : items[lightboxIndex];

  const jsonLd = useMemo(() => bakerySchema(), []);

  return (
    <>
      <Seo
        title="Gallery — Cakes & Creations from Cake N Crush, Madurai"
        description="A visual look at the Cake N Crush style: celebration cakes, chocolate cakes, eggless cakes and bespoke designs in Madurai. Illustrative styling imagery until the bakery's own photographs are supplied."
        path="/gallery"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Gallery', path: '/gallery' },
        ]}
        jsonLd={jsonLd}
      />

      <PageHeader
        eyebrow="Gallery"
        title="The look of a Cake N Crush celebration."
        lede="An editorial moodboard of our cake styles — celebration, chocolate, eggless and bespoke. Each frame represents a direction we work in."
        aside={
          <div className="border border-caramel/30 bg-caramel/5 p-4 text-[0.75rem] leading-relaxed text-ink-soft">
            <p className="font-semibold uppercase tracking-[0.1em] text-caramel-deep">
              A note on these images
            </p>
            <p className="mt-2">
              {MUSINGS_NOTE} They are not photographs of specific cakes we have made.
            </p>
          </div>
        }
      />

      <section className="border-b border-line-soft bg-cream" aria-label="Gallery filters">
        <div className="container-page">
          <div className="no-scrollbar flex gap-1 overflow-x-auto py-4">
            <button
              type="button"
              onClick={() => setFilter('all')}
              aria-pressed={filter === 'all'}
              className={cn(
                'shrink-0 border px-4 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] transition-all duration-300',
                filter === 'all'
                  ? 'border-ink bg-ink text-cream'
                  : 'border-line text-ink-soft hover:border-ink/40 hover:text-ink',
              )}
            >
              All
            </button>
            {GALLERY_FILTERS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setFilter(option.id)}
                aria-pressed={filter === option.id}
                className={cn(
                  'shrink-0 border px-4 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] transition-all duration-300',
                  filter === option.id
                    ? 'border-ink bg-ink text-cream'
                    : 'border-line text-ink-soft hover:border-ink/40 hover:text-ink',
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-cream pb-20 pt-8 md:pb-24">
        <div className="container-page">
          <p className="text-[0.75rem] uppercase tracking-[0.12em] text-ink-faint" aria-live="polite">
            {items.length} {items.length === 1 ? 'image' : 'images'}
          </p>

          <motion.ul
            className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {items.map((item, index) => {
                const tall = item.span === 'tall';
                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.2), ease: EASE_SILK }}
                    className={cn(tall && 'sm:row-span-2')}
                  >
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      className="group relative block h-full w-full overflow-hidden bg-cocoa text-left"
                      aria-label={`Open larger view: ${item.title}`}
                    >
                      <Picture
                        name={item.image}
                        alt={item.alt}
                        className={cn('w-full', tall ? 'aspect-[3/4] sm:h-full' : 'aspect-[4/3]')}
                        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 96vw"
                        objectPosition={item.focus}
                        imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-cocoa/75 via-transparent to-transparent opacity-90"
                      />
                      <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-cream/90 text-ink opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                        <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <span className="absolute inset-x-0 bottom-0 p-4">
                        <span className="block text-[0.5625rem] font-semibold uppercase tracking-[0.16em] text-caramel-tint">
                          {item.kicker}
                        </span>
                        <span className="mt-1 block font-display text-xl leading-tight text-cream">
                          {item.title}
                        </span>
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>

          <div className="mt-14 flex flex-col items-center border-t border-line-soft pt-12 text-center">
            <h2 className="display-md max-w-xl">Have a design in mind?</h2>
            <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">
              Send it to us — a photo, a colour palette or just a description. We will tell
              you what can be created.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button to="/custom-cakes" variant="primary">
                Start a custom enquiry
              </Button>
              <Button to="/menu" variant="outline">
                Browse the menu
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center text-cream/80 transition-colors hover:text-cream"
              aria-label="Close image viewer"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setLightboxIndex((lightboxIndex - 1 + items.length) % items.length)}
              className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center text-cream/70 transition-colors hover:text-cream sm:left-6"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-7 w-7" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setLightboxIndex((lightboxIndex + 1) % items.length)}
              className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center text-cream/70 transition-colors hover:text-cream sm:right-6"
              aria-label="Next image"
            >
              <ChevronRight className="h-7 w-7" aria-hidden="true" />
            </button>

            <motion.figure
              key={active.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE_SILK }}
              className="max-h-[86dvh] w-full max-w-3xl"
            >
              <Picture
                name={active.image}
                alt={active.alt}
                className="max-h-[72dvh] w-full"
                fit="contain"
                sizes="(min-width: 768px) 70vw, 96vw"
              />
              <figcaption className="mt-3 flex flex-col gap-1 text-center">
                <span className="font-display text-xl text-cream">{active.title}</span>
                <span className="text-[0.6875rem] uppercase tracking-[0.14em] text-cream/65">
                  Illustrative styling · not an actual product photograph
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
