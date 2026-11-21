import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, m as motion } from 'framer-motion';
import { X, MessageCircle, Phone, Info, Minus, Plus } from 'lucide-react';
import Picture from '../media/Picture.jsx';
import Button from '../ui/Button.jsx';
import Tag from '../ui/Tag.jsx';
import { productImageKey, productImageAlt } from '../../data/imagery.js';
import { BUSINESS, PHONE_HREF } from '../../data/business.js';
import { formatPrice, formatWeight } from '../../lib/format.js';
import { buildWhatsAppUrl, productEnquiryMessage } from '../../lib/whatsapp.js';
import { EASE_SILK } from '../../lib/motion.js';
import { cn } from '../../lib/cn.js';

/**
 * ProductDetail — accessible modal for a single catalogue item.
 * Shows variant matrix (weight × dietary × exact price), quantity and a
 * WhatsApp enquiry that names the chosen variant.
 */
export default function ProductDetail({ product, open, onClose }) {
  const [variantId, setVariantId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (open && product) {
      setVariantId(product.variants[0].id);
      setQuantity(1);
    }
  }, [open, product]);

  useEffect(() => {
    if (!open) return undefined;

    const previousFocus = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', onKeyDown);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [open, onClose]);

  const activeVariant =
    product?.variants.find((variant) => variant.id === variantId) || product?.variants[0];

  if (!product) return null;

  const whatsappUrl = buildWhatsAppUrl(
    productEnquiryMessage({ product, variant: activeVariant, quantity }),
  );

  const groupedByWeight = product.variants.reduce((acc, variant) => {
    acc[variant.weight] = acc[variant.weight] || [];
    acc[variant.weight].push(variant);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Close product details"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-cocoa/62 backdrop-blur-[3px]"
            tabIndex={-1}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            initial={{ y: '6%', opacity: 0, scale: 0.99 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '4%', opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_SILK }}
            className="relative z-10 flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden bg-cream shadow-2xl sm:max-h-[88dvh]"
          >
            <div className="flex items-center justify-between border-b border-line-soft px-5 py-3.5 sm:px-7">
              <span className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-caramel-deep">
                {product.categories.includes('plum') ? 'Plum Cake' : 'Cake Catalogue'}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="-mr-1.5 flex h-10 w-10 items-center justify-center text-ink-soft transition-colors hover:text-ink"
                aria-label="Close"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="grid flex-1 overflow-y-auto sm:grid-cols-2">
              <div className="relative">
                <Picture
                  name={productImageKey(product)}
                  alt={productImageAlt(product)}
                  className="aspect-[4/3] w-full sm:aspect-auto sm:h-full sm:min-h-[24rem]"
                  sizes="(min-width: 640px) 50vw, 100vw"
                  showPlaceholderNote
                />
              </div>

              <div className="flex flex-col p-5 sm:p-8">
                <h2 id={titleId} className="display-md text-ink">
                  {product.name}
                </h2>
                <p id={descId} className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {product.description ||
                    'Ingredient details for this cake have not been published by the bakery yet, so nothing is claimed here. Ask us for the full flavour and allergen details on WhatsApp.'}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>

                <div className="mt-6 border-t border-line-soft pt-5">
                  <p className="field-label mb-2">Available variants</p>
                  <div className="space-y-4">
                    {Object.entries(groupedByWeight).map(([weight, variants]) => (
                      <div key={weight}>
                        <p className="mb-1.5 flex items-center gap-2 text-[0.75rem] font-medium text-ink-soft">
                          <span className="inline-block h-1 w-1 rounded-full bg-caramel" aria-hidden="true" />
                          {formatWeight(weight)}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {variants.map((variant) => {
                            const selected = variant.id === activeVariant.id;
                            return (
                              <button
                                key={variant.id}
                                type="button"
                                onClick={() => setVariantId(variant.id)}
                                aria-pressed={selected}
                                className={cn(
                                  'flex min-w-[7.5rem] flex-1 flex-col items-start gap-0.5 border px-3 py-2.5 text-left transition-all duration-300 sm:min-w-[8.5rem]',
                                  selected
                                    ? 'border-ink bg-ink text-cream'
                                    : 'border-line bg-shell text-ink hover:border-ink/50',
                                )}
                              >
                                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em]">
                                  {variant.dietaryType === 'Eggless' ? 'Eggless' : 'Regular'}
                                </span>
                                <span
                                  className={cn(
                                    'font-display text-lg leading-tight',
                                    selected ? 'text-cream' : 'text-ink',
                                  )}
                                >
                                  {formatPrice(variant.price)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-line-soft pt-5">
                  <p className="text-sm text-ink-soft">
                    Selected:{' '}
                    <span className="font-medium text-ink">
                      {activeVariant.dietaryType} · {formatWeight(activeVariant.weight)}
                    </span>
                  </p>
                  <div className="flex items-center border border-line">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="flex h-9 w-9 items-center justify-center text-ink disabled:opacity-30"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    <span className="w-8 text-center text-sm tabular-nums" aria-live="polite">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                      disabled={quantity >= 20}
                      className="flex h-9 w-9 items-center justify-center text-ink disabled:opacity-30"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex items-end justify-between gap-4">
                  <p className="font-display text-2xl text-ink">
                    {formatPrice(activeVariant.price * quantity)}
                    <span className="ml-2 align-middle text-[0.6875rem] font-sans uppercase tracking-[0.12em] text-ink-faint">
                      indicative
                    </span>
                  </p>
                </div>

                <div className="mt-5 flex flex-col gap-2.5">
                  <Button href={whatsappUrl} variant="caramel" className="w-full">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Enquire about this variant
                  </Button>
                  <Button href={PHONE_HREF} variant="outline" className="w-full" size="sm">
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    Call {BUSINESS.phoneDisplay}
                  </Button>
                </div>

                <p className="mt-4 flex gap-2 text-[0.6875rem] leading-relaxed text-ink-faint">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  Prices are provisional and awaiting owner approval. Availability and final price are
                  confirmed by the bakery on WhatsApp — opening the chat does not place an order.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
