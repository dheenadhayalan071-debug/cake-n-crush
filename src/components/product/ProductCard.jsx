import { useId, useState } from 'react';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import Picture from '../media/Picture.jsx';
import Tag from '../ui/Tag.jsx';
import { productImageKey, productImageAlt } from '../../data/imagery.js';
import { formatPrice, formatWeight } from '../../lib/format.js';
import { buildWhatsAppUrl, productEnquiryMessage } from '../../lib/whatsapp.js';
import { cn } from '../../lib/cn.js';

/**
 * ProductCard
 * -----------
 * Every card exposes the real variant choice: dietary type + weight + the
 * exact price for that combination. The WhatsApp CTA is built from the
 * *currently selected* variant — never a generic "price on request".
 */
export default function ProductCard({ product, onOpenDetail, className = '', priority = false }) {
  const [activeVariantId, setActiveVariantId] = useState(product.variants[0].id);
  const groupId = useId();
  const activeVariant =
    product.variants.find((variant) => variant.id === activeVariantId) || product.variants[0];

  const whatsappUrl = buildWhatsAppUrl(
    productEnquiryMessage({ product, variant: activeVariant }),
  );

  const hasVariantChoice = product.variants.length > 1;

  return (
    <article
      className={cn(
        'group relative flex flex-col bg-shell',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onOpenDetail?.(product.id)}
        className="relative block w-full overflow-hidden text-left"
        aria-label={`View details for ${product.name}`}
      >
        <Picture
          name={productImageKey(product)}
          alt={productImageAlt(product)}
          className="aspect-[4/5] w-full"
          imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
          sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 88vw"
          priority={priority}
        />
        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream/92 text-ink opacity-0 shadow-sm transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="absolute bottom-3 left-3">
          <Tag tone="neutral" className="border-transparent bg-cream/92 text-ink-soft backdrop-blur-sm">
            {product.categories.includes('plum') ? 'Plum cake' : 'Celebration'}
          </Tag>
        </span>
      </button>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[1.375rem] leading-tight tracking-[-0.02em] text-ink">
            <button
              type="button"
              onClick={() => onOpenDetail?.(product.id)}
              className="text-left transition-colors hover:text-caramel-deep"
            >
              {product.name}
            </button>
          </h3>
          <p className="shrink-0 pt-1 text-right">
            <span className="block font-display text-[1.125rem] leading-none text-ink">
              {formatPrice(activeVariant.price)}
            </span>
            <span className="mt-1 block text-[0.625rem] uppercase tracking-[0.12em] text-ink-faint">
              <span className="sr-only">for </span>
              {formatWeight(activeVariant.weight)}
            </span>
          </p>
        </div>

        <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-faint">
          {product.dietaryTypes.length > 1 ? 'Eggless & regular' : product.dietaryTypes[0]}
          {' · '}
          {product.weights.map(formatWeight).join(' / ')}
        </p>

        {hasVariantChoice ? (
          <fieldset className="mt-4">
            <legend className="sr-only">Choose a variant for {product.name}</legend>
            <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={`Variants for ${product.name}`}>
              {product.variants.map((variant) => {
                const selected = variant.id === activeVariant.id;
                return (
                  <label
                    key={variant.id}
                    className={cn(
                      'inline-flex cursor-pointer items-center gap-1.5 border px-2.5 py-1.5 text-[0.6875rem] font-medium transition-all duration-300',
                      selected
                        ? 'border-ink bg-ink text-cream'
                        : 'border-line text-ink-soft hover:border-ink/40 hover:text-ink',
                    )}
                  >
                    <input
                      type="radio"
                      name={`variant-${groupId}`}
                      value={variant.id}
                      checked={selected}
                      onChange={() => setActiveVariantId(variant.id)}
                      className="sr-only"
                    />
                    <span>
                      {variant.dietaryType === 'Eggless' ? 'Eggless' : 'Regular'}{' '}
                      {formatWeight(variant.weight)}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ) : (
          <p className="mt-4 inline-flex w-fit border border-line px-2.5 py-1.5 text-[0.6875rem] font-medium text-ink-soft">
            {activeVariant.dietaryType} · {formatWeight(activeVariant.weight)}
          </p>
        )}

        <div className="mt-auto pt-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 border border-ink/15 bg-transparent px-3 py-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink transition-colors duration-300 hover:border-caramel hover:bg-caramel hover:text-white"
            aria-label={`Enquire on WhatsApp about ${product.name}, ${activeVariant.dietaryType} ${formatWeight(activeVariant.weight)} at ${formatPrice(activeVariant.price)}`}
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            Enquire — {formatPrice(activeVariant.price)}
          </a>
        </div>
      </div>
    </article>
  );
}
