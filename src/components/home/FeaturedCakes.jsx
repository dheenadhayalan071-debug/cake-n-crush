import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import StaggerGroup from '../ui/StaggerGroup.jsx';
import StaggerItem from '../ui/StaggerItem.jsx';
import ProductCard from '../product/ProductCard.jsx';
import { PRODUCTS } from '../../data/products.js';
import { useProductDetail } from '../../hooks/useProductDetail.jsx';

/**
 * Featured collection — an editorial selection of four catalogue cakes.
 * Explicitly NOT a bestseller claim; see the footnote and the
 * `bestseller: false` flag in the data layer.
 */
export default function FeaturedCakes() {
  const featured = PRODUCTS.filter((product) => product.featured).slice(0, 4);
  const { openProduct, dialog } = useProductDetail();

  return (
    <section
      className="relative overflow-hidden bg-strawberry-soft/60 py-16 md:py-24"
      aria-labelledby="featured-heading"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-butter/50" />
        <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-sky/30" />
      </div>

      <div className="container-page relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="From the counter"
            title="Featured collection."
            lede="Four cakes we love making — each with its own weights, dietary options and prices."
            className="max-w-2xl"
          />
          <Link
            to="/menu"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-chocolate px-4 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-chocolate transition-colors hover:bg-chocolate hover:text-vanilla"
          >
            Full menu
            <ArrowRight
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <StaggerGroup
          as="ul"
          stagger={0.08}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-12"
        >
          {featured.map((product) => (
            <StaggerItem as="li" key={product.id}>
              <ProductCard product={product} onOpenDetail={openProduct} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <p className="mt-8 max-w-2xl text-[0.6875rem] leading-relaxed text-ink-faint">
          An editorial selection from the published catalogue — not a sales ranking.
          Bestseller labelling is reserved for products the bakery confirms.
        </p>
      </div>
      {dialog}
    </section>
  );
}
