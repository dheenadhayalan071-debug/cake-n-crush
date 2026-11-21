import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, m as motion } from 'framer-motion';
import { SlidersHorizontal, X, Search, AlertCircle } from 'lucide-react';
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

  const { openProduct, dialog } = useProductDetail();

  // Deep link: /menu?product=red-velvet opens the detail dialog once.
  useEffect(() => {
    if (!productParam) return;
    if (PRODUCTS.some((product) => product.id === productParam)) {
      openProduct(productParam);
    }
  }, [productParam, openProduct]);

  // Keep the URL shareable when the category changes.
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

  const whatsappUrl = buildWhatsAppUrl(
    generalEnquiryMessage('menu page — I could not find what I was looking for'),
  );

  const jsonLd = useMemo(() => [bakerySchema(), menuItemListSchema()], []);

  return (
    <>
      <Seo
        title="Our Menu — Cakes, Eggless Cakes & Plum Cakes in Madurai"
        description="Browse the Cake N Crush catalogue: celebration cakes, eggless cakes, 1kg cakes and plum cakes in Madurai, with the exact price for every weight and dietary variant."
        path="/menu"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Our Menu', path: '/menu' },
        ]}
        jsonLd={jsonLd}
      />

      <PageHeader
        eyebrow="The catalogue"
        title="Every cake, every variant, every price."
        lede="Select a collection, then choose the exact weight and dietary option. Prices are shown per variant and update with your selection."
        aside={
          <div className="border border-line bg-shell/60 p-4 text-[0.75rem] leading-relaxed text-ink-soft">
            <p className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-caramel-deep" aria-hidden="true" />
              Prices are provisional and awaiting owner approval. Availability is
              confirmed by the bakery on WhatsApp.
            </p>
          </div>
        }
      />

      <section className="border-b border-line-soft bg-cream" aria-label="Catalogue filters">
        <div className="container-page">
          <div className="no-scrollbar flex gap-1 overflow-x-auto py-4 lg:gap-2">
            <button
              type="button"
              onClick={() => setCategory('all')}
              aria-pressed={category === 'all'}
              className={cn(
                'shrink-0 border px-4 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] transition-all duration-300',
                category === 'all'
                  ? 'border-ink bg-ink text-cream'
                  : 'border-line text-ink-soft hover:border-ink/40 hover:text-ink',
              )}
            >
              All cakes
            </button>
            {CATEGORIES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                aria-pressed={category === item.id}
                className={cn(
                  'shrink-0 border px-4 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] transition-all duration-300',
                  category === item.id
                    ? 'border-ink bg-ink text-cream'
                    : 'border-line text-ink-soft hover:border-ink/40 hover:text-ink',
                )}
              >
                {item.shortName}
                {PENDING_CATEGORIES.includes(item.id) ? (
                  <>
                    {' '}
                    <span className="ml-1 rounded-full bg-caramel/15 px-1.5 py-0.5 text-[0.5625rem] tracking-[0.08em] text-caramel-deep">
                      Menu pending
                    </span>
                  </>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-cream pb-20 pt-8 md:pb-24">
        <div className="container-page">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-2xl text-ink">
                {activeCategory ? activeCategory.name : 'All cakes'}
              </h2>
              <p className="mt-2 max-w-xl text-[0.875rem] leading-relaxed text-ink-soft">
                {activeCategory
                  ? activeCategory.blurb
                  : 'The complete Cake N Crush catalogue — celebration, eggless, 1kg and plum cakes.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
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
                  className="field h-10 w-full py-2 pl-9 pr-3 text-[0.8125rem] sm:min-w-[11rem] md:w-52"
                />
              </div>
              <button
                type="button"
                onClick={() => setFiltersOpen((open) => !open)}
                aria-expanded={filtersOpen}
                aria-controls="advanced-filters"
                className="relative inline-flex h-10 items-center gap-2 border border-line bg-shell px-3.5 text-[0.75rem] font-semibold text-ink transition-colors hover:border-ink/40"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                Filters
                {activeFilterCount > 0 ? (
                  <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-caramel px-1 text-[0.5625rem] text-white">
                    {activeFilterCount}
                  </span>
                ) : null}
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {filtersOpen ? (
              <motion.div
                id="advanced-filters"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-5 grid gap-5 border border-line-soft bg-shell/60 p-5 sm:grid-cols-2 lg:grid-cols-3">
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
                            'border px-3 py-1.5 text-[0.75rem] transition-colors',
                            dietary === option.id
                              ? 'border-ink bg-ink text-cream'
                              : 'border-line text-ink-soft hover:border-ink/40',
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
                            'border px-3 py-1.5 text-[0.75rem] transition-colors',
                            weight === option.id
                              ? 'border-ink bg-ink text-cream'
                              : 'border-line text-ink-soft hover:border-ink/40',
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
                      className="inline-flex w-fit items-center gap-1.5 border border-line px-3 py-1.5 text-[0.75rem] font-medium text-ink-soft transition-colors hover:border-ink/40 hover:text-ink"
                    >
                      <X className="h-3 w-3" aria-hidden="true" />
                      Reset all
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <p className="mt-6 text-[0.75rem] uppercase tracking-[0.12em] text-ink-faint" aria-live="polite">
            {results.length} {results.length === 1 ? 'cake' : 'cakes'}
            {activeCategory ? ` in ${activeCategory.name}` : ''}
          </p>

          {isPendingCategory ? (
            <div className="mt-6 border border-dashed border-line bg-shell/50 px-6 py-14 text-center">
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
                <Button href={whatsappUrl} variant="caramel">
                  Ask on WhatsApp
                </Button>
                <Button onClick={() => setCategory('all')} variant="outline">
                  Back to all cakes
                </Button>
              </div>
            </div>
          ) : results.length > 0 ? (
            <motion.ul
              className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence>
                {results.map((product, index) => (
                  <motion.li
                    key={product.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.24), ease: [0.22, 1, 0.36, 1] }}
                    className="border border-line-soft bg-shell"
                  >
                    <ProductCard
                      product={product}
                      onOpenDetail={openProduct}
                      priority={index < 4}
                    />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          ) : (
            <div className="mt-6 border border-dashed border-line bg-shell/50 px-6 py-14 text-center">
              <h3 className="display-md">No cakes match those filters.</h3>
              <p className="mx-auto mt-3 max-w-md text-[0.875rem] leading-relaxed text-ink-soft">
                Try a different collection or weight — or message the bakery and we
                will help you find the right cake.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button onClick={resetFilters} variant="primary">
                  Reset filters
                </Button>
                <Button href={whatsappUrl} variant="outline">
                  Ask on WhatsApp
                </Button>
              </div>
            </div>
          )}

          <div className="mt-12 grid gap-4 border-t border-line-soft pt-8 md:grid-cols-12">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink-soft md:col-span-3">
              Allergens &amp; dietary notes
            </p>
            <p className="text-[0.8125rem] leading-relaxed text-ink-faint md:col-span-9">
              {ALLERGEN_NOTICE}
            </p>
          </div>

          <div className="mt-8 rounded-[2px] bg-cream-deep/60 p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-display text-2xl leading-tight text-ink">
                  Looking for something not listed?
                </h2>
                <p className="mt-2 max-w-xl text-[0.875rem] leading-relaxed text-ink-soft">
                  Custom flavours, themed designs and celebration cakes are handled
                  through the Custom Cake Studio.
                </p>
              </div>
              <Button to="/custom-cakes" variant="primary" className="shrink-0">
                Custom cake enquiry
              </Button>
            </div>
          </div>
        </div>
      </div>

      {dialog}
      <p className="sr-only">Canonical catalogue source: {SITE_URL}/menu</p>
    </>
  );
}
