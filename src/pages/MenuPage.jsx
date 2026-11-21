import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, Search, Info, MessageCircle } from 'lucide-react';
import Seo from '../components/seo/Seo.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import Button from '../components/ui/Button.jsx';
import { CATEGORIES, PRODUCTS, PENDING_CATEGORIES, ALLERGEN_NOTICE } from '../data/products.js';
import { useProductDetail } from '../hooks/useProductDetail.jsx';
import { buildWhatsAppUrl, generalEnquiryMessage } from '../lib/whatsapp.js';
import { menuItemListSchema, bakerySchema } from '../lib/schema.js';
import { cn } from '../lib/cn.js';
import { SITE_URL } from '../data/site.js';
import { MotionDiv } from '../components/ui/Motion.jsx';

const DIETARY_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'Eggless', label: 'Eggless' },
  { id: 'Regular', label: 'Regular' },
];

const WEIGHT_FILTERS = [
  { id: 'all', label: 'Any weight' },
  { id: '500g', label: '500 g' },
  { id: '1kg', label: '1 kg' },
  { id: 'small', label: '100–250 g' },
];

/** Per-collection chip colour, so the nav reads as a palette not a list. */
const CHIP_TONE = {
  all: 'bg-chocolate text-vanilla',
  celebration: 'bg-strawberry',
  eggless: 'bg-pistachio',
  chocolate: 'bg-butter',
  onekg: 'bg-orange',
  plum: 'bg-lavender',
  pastries: 'bg-sky',
  brownies: 'bg-cherry',
};

function matchesWeight(product, weightFilter) {
  if (weightFilter === 'all') return true;
  if (weightFilter === 'small') {
    return product.variants.some((variant) => variant.weightGrams < 500);
  }
  return product.variants.some((variant) => variant.weight === weightFilter);
}

export default function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const productParam = searchParams.get('product');

  const [category, setCategory] = useState(
    CATEGORIES.some((c) => c.id === categoryParam) ? categoryParam : 'all',
  );
  const [dietary, setDietary] = useState('all');
  const [weight, setWeight] = useState('all');
  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const resultsRef = useRef(null);

  const { openProduct, dialog } = useProductDetail();

  useEffect(() => {
    if (!productParam) return;
    if (PRODUCTS.some((product) => product.id === productParam)) {
      openProduct(productParam);
    }
  }, [productParam, openProduct]);

  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    if (category === 'all') next.delete('category');
    else next.set('category', category);
    next.delete('product');
    if (next.toString() !== searchParams.toString()) {
      setSearchParams(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    if (categoryParam && CATEGORIES.some((c) => c.id === categoryParam)) {
      setCategory(categoryParam);
    }
  }, [categoryParam]);

  const activeCategory = CATEGORIES.find((c) => c.id === category) || null;
  const isPendingCategory = activeCategory && PENDING_CATEGORIES.includes(activeCategory.id);

  const results = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      if (category !== 'all' && !product.categories.includes(category)) return false;
      if (dietary !== 'all' && !product.dietaryTypes.includes(dietary)) return false;
      if (!matchesWeight(product, weight)) return false;
      if (normalisedQuery && !product.name.toLowerCase().includes(normalisedQuery)) return false;
      return true;
    });
  }, [category, dietary, weight, query]);

  const activeFilterCount =
    (dietary !== 'all' ? 1 : 0) + (weight !== 'all' ? 1 : 0) + (query ? 1 : 0);

  function resetFilters() {
    setDietary('all');
    setWeight('all');
    setQuery('');
    setCategory('all');
  }

  function selectCategory(id) {
    setCategory(id);
    // On mobile the nav is a long horizontal scroller; nudge the results into
    // view so the tap feels like it did something.
    if (window.matchMedia('(max-width: 1023px)').matches) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const whatsappUrl = buildWhatsAppUrl(
    generalEnquiryMessage('menu page — I could not find what I was looking for'),
  );

  const jsonLd = useMemo(() => [bakerySchema(), menuItemListSchema()], []);

  return (
    <>
      <Seo
        title="Our Menu — Cakes, Eggless Cakes & Plum Cakes in Madurai"
        description="Browse the Cake N Crush catalogue: celebration cakes, eggless cakes, chocolate cakes, 1kg cakes and plum cakes in Madurai, with the exact price for every weight and dietary variant."
        path="/menu"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Our Menu', path: '/menu' },
        ]}
        jsonLd={jsonLd}
      />

      <PageHeader
        tone="butter"
        eyebrow="The catalogue"
        title={
          <>
            Every cake, every variant,{' '}
            <span className="display-script text-cherry">every price</span>.
          </>
        }
        lede="Pick a collection, then choose the exact weight and dietary option. The price updates with your selection — and the WhatsApp button carries it for you."
        aside={
          <div className="rounded-2xl border-2 border-chocolate bg-vanilla p-4 text-[0.75rem] leading-relaxed text-ink-soft shadow-[0_4px_0_#3A251F]">
            <p className="flex items-start gap-2">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-cherry" aria-hidden="true" />
              <span>
                Prices are provisional and awaiting owner approval. Availability is
                confirmed by the bakery on WhatsApp.
              </span>
            </p>
          </div>
        }
      />

      {/* --------------------------- Category nav --------------------------- */}
      <section
        className="sticky top-[4.25rem] z-20 border-b-2 border-chocolate/10 bg-vanilla/95 backdrop-blur-md md:top-[4.75rem]"
        aria-label="Catalogue filters"
      >
        <div className="container-page">
          <div className="no-scrollbar flex gap-2 overflow-x-auto py-3">
            <button
              type="button"
              onClick={() => selectCategory('all')}
              aria-pressed={category === 'all'}
              className={cn(
                'shrink-0 rounded-full border-2 border-chocolate px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.06em] transition-transform',
                category === 'all'
                  ? CHIP_TONE.all
                  : 'bg-vanilla text-chocolate hover:bg-butter-soft',
              )}
            >
              All cakes
            </button>
            {CATEGORIES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => selectCategory(item.id)}
                aria-pressed={category === item.id}
                className={cn(
                  'shrink-0 rounded-full border-2 border-chocolate px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.06em] transition-transform',
                  category === item.id
                    ? CHIP_TONE[item.id]
                    : 'bg-vanilla text-chocolate hover:bg-butter-soft',
                )}
              >
                {item.shortName}
                {PENDING_CATEGORIES.includes(item.id) ? (
                  <span className="ml-1.5 text-[0.5rem] font-black tracking-[0.1em] opacity-60">
                    pending
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div ref={resultsRef} className="bg-vanilla pb-20 pt-8 md:pb-24">
        <div className="container-page">
          {/* ------------------------ Header + search ------------------------ */}
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="display-md">
                {activeCategory ? activeCategory.name : 'All cakes'}
              </h2>
              <p className="mt-2 max-w-xl text-[0.875rem] leading-relaxed text-ink-soft">
                {activeCategory
                  ? activeCategory.blurb
                  : 'The complete Cake N Crush catalogue — celebration, eggless, chocolate, 1kg and plum cakes.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:flex-none">
                <label htmlFor="menu-search" className="sr-only">
                  Search cakes by name
                </label>
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
                  aria-hidden="true"
                />
                <input
                  id="menu-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search cakes"
                  className="field h-10 w-full rounded-full py-2 pl-9 pr-3 text-[0.8125rem] md:w-52"
                />
              </div>
              <button
                type="button"
                onClick={() => setFiltersOpen((open) => !open)}
                aria-expanded={filtersOpen}
                aria-controls="advanced-filters"
                className="relative inline-flex h-10 shrink-0 items-center gap-2 rounded-full border-2 border-chocolate bg-vanilla px-3.5 text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-chocolate transition-colors hover:bg-butter-soft"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                Filters
                {activeFilterCount > 0 ? (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-cherry px-1 text-[0.5625rem] text-white">
                    {activeFilterCount}
                  </span>
                ) : null}
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {filtersOpen ? (
              <MotionDiv
                id="advanced-filters"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-5 grid gap-5 rounded-2xl border-2 border-chocolate/10 bg-butter-soft/60 p-5 sm:grid-cols-2 lg:grid-cols-3">
                  <fieldset>
                    <legend className="field-label">Dietary</legend>
                    <div className="flex flex-wrap gap-1.5">
                      {DIETARY_FILTERS.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setDietary(option.id)}
                          aria-pressed={dietary === option.id}
                          className={cn(
                            'rounded-full border-2 px-3 py-1.5 text-[0.75rem] font-semibold transition-colors',
                            dietary === option.id
                              ? 'border-chocolate bg-chocolate text-vanilla'
                              : 'border-chocolate/20 bg-vanilla text-ink-soft hover:border-chocolate/50',
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className="field-label">Weight</legend>
                    <div className="flex flex-wrap gap-1.5">
                      {WEIGHT_FILTERS.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setWeight(option.id)}
                          aria-pressed={weight === option.id}
                          className={cn(
                            'rounded-full border-2 px-3 py-1.5 text-[0.75rem] font-semibold transition-colors',
                            weight === option.id
                              ? 'border-chocolate bg-chocolate text-vanilla'
                              : 'border-chocolate/20 bg-vanilla text-ink-soft hover:border-chocolate/50',
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <div className="flex flex-col justify-between gap-3">
                    <p className="text-[0.75rem] leading-relaxed text-ink-faint">
                      Filters combine. Prices always reflect the variant you select on
                      each card.
                    </p>
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="inline-flex w-fit items-center gap-1.5 rounded-full border-2 border-chocolate/25 px-3 py-1.5 text-[0.75rem] font-semibold text-chocolate transition-colors hover:border-chocolate"
                    >
                      <X className="h-3 w-3" aria-hidden="true" />
                      Reset all
                    </button>
                  </div>
                </div>
              </MotionDiv>
            ) : null}
          </AnimatePresence>

          <p
            className="mt-6 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink-faint"
            aria-live="polite"
          >
            {results.length} {results.length === 1 ? 'cake' : 'cakes'}
            {activeCategory ? ` in ${activeCategory.name}` : ''}
          </p>

          {isPendingCategory ? (
            <div className="mt-6 rounded-2xl border-2 border-dashed border-chocolate/30 bg-butter-soft/40 px-6 py-14 text-center">
              <p className="eyebrow justify-center">Menu pending</p>
              <h3 className="display-md mx-auto mt-3 max-w-lg">
                {activeCategory.name} are available at the counter.
              </h3>
              <p className="mx-auto mt-3 max-w-md text-[0.875rem] leading-relaxed text-ink-soft">
                The full selection and prices for {activeCategory.name.toLowerCase()} have
                not been confirmed yet, so they are not listed here. Ask us on WhatsApp
                for today&rsquo;s options.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href={whatsappUrl} variant="chocolate">
                  Ask on WhatsApp
                </Button>
                <Button onClick={() => setCategory('all')} variant="outline">
                  Back to all cakes
                </Button>
              </div>
            </div>
          ) : results.length > 0 ? (
            <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence>
                {results.map((product, index) => (
                  <MotionDiv
                    key={product.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.32, delay: Math.min(index * 0.018, 0.16) }}
                    className="h-full"
                  >
                    <ProductCard
                      product={product}
                      onOpenDetail={openProduct}
                      priority={index < 4}
                      className="h-full"
                    />
                  </MotionDiv>
                ))}
              </AnimatePresence>
            </ul>
          ) : (
            <div className="mt-6 rounded-2xl border-2 border-dashed border-chocolate/30 bg-butter-soft/40 px-6 py-14 text-center">
              <h3 className="display-md">No cakes match those filters.</h3>
              <p className="mx-auto mt-3 max-w-md text-[0.875rem] leading-relaxed text-ink-soft">
                Try a different collection or weight — or message the bakery and we
                will help you find the right cake.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button onClick={resetFilters} variant="chocolate">
                  Reset filters
                </Button>
                <Button href={whatsappUrl} variant="outline">
                  Ask on WhatsApp
                </Button>
              </div>
            </div>
          )}

          {/* --------------------------- Allergens --------------------------- */}
          <div className="mt-12 grid gap-3 rounded-2xl border-2 border-chocolate/10 bg-sky-soft/60 p-5 md:grid-cols-12 md:gap-6">
            <p className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-chocolate md:col-span-3">
              Allergens &amp; dietary notes
            </p>
            <p className="text-[0.8125rem] leading-relaxed text-ink-soft md:col-span-9">
              {ALLERGEN_NOTICE}
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border-2 border-chocolate bg-lavender p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="display-md max-w-[20ch]">
                  Looking for something not listed?
                </h2>
                <p className="mt-2 max-w-xl text-[0.875rem] leading-relaxed text-chocolate/75">
                  Custom flavours, themed designs and celebration cakes are handled
                  through the Custom Cake Studio.
                </p>
              </div>
              <Button to="/custom-cakes" variant="chocolate" className="shrink-0">
                Custom cake enquiry
              </Button>
            </div>
          </div>

          <p className="mt-6 flex items-center gap-2 text-[0.75rem] text-ink-faint">
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            Every enquiry opens a pre-filled WhatsApp message to the bakery.
          </p>
        </div>
      </div>

      {dialog}
      <p className="sr-only">Canonical catalogue source: {SITE_URL}/menu</p>
    </>
  );
}
