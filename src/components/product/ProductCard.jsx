import { useId, useState } from 'react';
import { MessageCircle, Plus } from 'lucide-react';
import Picture from '../media/Picture.jsx';
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
 *
 * Bestseller badge is intentionally absent: `product.bestseller` is false
 * until the bakery confirms sales data in writing.
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
    <article className={cn('card-play group flex flex-col overflow-hidden', className)}>
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
          imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 88vw"
          priority={priority}
        />
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-chocolate bg-vanilla text-chocolate transition-all duration-300 group-hover:rotate-90 group-hover:bg-butter">
          <Plus className="h-4 w-4" aria-hidden="true" />
        </span>
      </button>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[1.3rem] leading-tight tracking-[-0.02em] font-semibold text-chocolate">
            <button
              type="button"
              onClick={() => onOpenDetail?.(product.id)}
              className="text-left transition-colors hover:text-cherry"
            >
              {product.name}
            </button>
          </h3>
          <p className="shrink-0 pt-0.5 text-right">
            <span className="block font-display text-[1.0625rem] font-semibold leading-none text-chocolate">
              {formatPrice(activeVariant.price)}
            </span>
            <span className="mt-1 block text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-ink-faint">
              <span className="sr-only">for </span>
              {formatWeight(activeVariant.weight)}
            </span>
          </p>
        </div>

        <p className="mt-1.5 text-[0.75rem] leading-relaxed text-ink-faint">
          {product.dietaryTypes.length > 1 ? 'Eggless & regular' : product.dietaryTypes[0]}
          {' · '}
          {product.weights.map(formatWeight).join(' / ')}
        </p>

        {hasVariantChoice ? (
          <fieldset className="mt-3">
            <legend className="sr-only">Choose a variant for {product.name}</legend>
            <div className="flex flex-wrap gap-1.5">
              {product.variants.map((variant) => {
                const selected = variant.id === activeVariant.id;
                return (
                  <label
                    key={variant.id}
                    className={cn(
                      'inline-flex cursor-pointer items-center rounded-full border-2 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.04em] transition-all duration-200',
                      selected
                        ? 'border-chocolate bg-chocolate text-vanilla'
                        : 'border-line bg-vanilla text-ink-soft hover:border-chocolate/40 hover:text-chocolate',
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
          <p className="mt-3 inline-flex w-fit rounded-full border-2 border-line px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.04em] text-ink-soft">
            {activeVariant.dietaryType} · {formatWeight(activeVariant.weight)}
          </p>
        )}

        <div className="mt-auto pt-3.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-pistachio px-3 py-2.5 text-[0.625rem] font-bold uppercase tracking-[0.1em] text-chocolate transition-colors duration-200 hover:bg-chocolate hover:text-vanilla"
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
