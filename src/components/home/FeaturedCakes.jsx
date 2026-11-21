import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import StaggerGroup from '../ui/StaggerGroup.jsx';
import StaggerItem from '../ui/StaggerItem.jsx';
import ProductCard from '../product/ProductCard.jsx';
import { PRODUCTS } from '../../data/products.js';
import { useProductDetail } from '../../hooks/useProductDetail.jsx';

/** Editorial selection of four catalogue cakes (not a sales claim). */
export default function FeaturedCakes() {
  const featured = PRODUCTS.filter((product) => product.featured).slice(0, 4);
  const { openProduct, dialog } = useProductDetail();

  return (
    <section className="bg-cream-deep/50 py-16 md:py-24" aria-labelledby="featured-heading">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Selected from the counter"
            title="The cakes we are known for."
            lede="An editorial selection from our catalogue — each with its own weights, dietary options and prices."
            className="max-w-2xl"
          />
          <Link
            to="/menu"
            className="group inline-flex shrink-0 items-center gap-2 border-b border-ink/25 pb-1 text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:border-caramel hover:text-caramel-deep"
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
          stagger={0.09}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-12"
        >
          {featured.map((product) => (
            <StaggerItem as="li" key={product.id}>
              <ProductCard product={product} onOpenDetail={openProduct} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <p className="mt-8 max-w-2xl text-[0.75rem] leading-relaxed text-ink-faint">
          Selection reflects the published catalogue, not sales rankings. Bestseller
          labelling is reserved for products the bakery confirms.
        </p>
      </div>
      {dialog}
    </section>
  );
}
