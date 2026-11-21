import { useState } from 'react';
import { MapPin, Phone, MessageCircle, Navigation, Check, Copy, Clock } from 'lucide-react';
import Reveal from '../ui/Reveal.jsx';
import Button from '../ui/Button.jsx';
import { BUSINESS, PHONE_HREF, MAPS_SEARCH_URL } from '../../data/business.js';
import { buildWhatsAppUrl, generalEnquiryMessage } from '../../lib/whatsapp.js';

/**
 * Location & contact block — homepage + contact page.
 *
 * Everything here is verified or explicitly marked as pending:
 *   · address and phone come from the business brief
 *   · opening hours are NOT displayed (never supplied) — we say so
 *   · delivery-app links are NOT shown (never supplied) — we say so
 */
export default function VisitStrip({ id = 'visit' }) {
  const [copied, setCopied] = useState(false);
  const whatsappUrl = buildWhatsAppUrl(generalEnquiryMessage('website'));

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(BUSINESS.addressOneLine);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      id={id}
      className="relative overflow-hidden bg-vanilla py-16 md:py-24"
      aria-labelledby="visit-heading"
    >
      <div className="container-page">
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          {/* ------------------------- Intro ------------------------- */}
          <div className="md:col-span-5">
            <Reveal as="span" className="eyebrow">
              Visit &amp; order
            </Reveal>
            <Reveal as="h2" id="visit-heading" className="display-lg mt-4 max-w-[14ch]">
              Find us in{' '}
              <span className="display-script text-cherry">Park Town</span>.
            </Reveal>
            <Reveal as="p" className="lede mt-5">
              Collection and ordering are handled directly by the bakery. Call, message
              or drop in — whichever is easiest for you.
            </Reveal>
            <Reveal className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={whatsappUrl} variant="chocolate">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp us
              </Button>
              <Button href={PHONE_HREF} variant="outline">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call the shop
              </Button>
            </Reveal>
          </div>

          {/* ------------------------- Cards ------------------------- */}
          <div className="grid gap-4 sm:grid-cols-2 md:col-span-7">
            <Reveal className="flex flex-col justify-between rounded-2xl border-2 border-chocolate bg-butter p-5 shadow-[0_4px_0_#3A251F] sm:p-6">
              <div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-chocolate bg-vanilla">
                  <MapPin className="h-4 w-4 text-chocolate" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-[1.25rem] font-semibold leading-tight text-chocolate">
                  The shop
                </h3>
                <address className="mt-2 not-italic text-[0.8125rem] leading-relaxed text-chocolate/75">
                  {BUSINESS.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                      <span className="sr-only">,</span>
                    </span>
                  ))}
                </address>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <a
                  href={MAPS_SEARCH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-chocolate underline decoration-2 underline-offset-4 hover:decoration-cherry"
                >
                  <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
                  Directions
                </a>
                <button
                  type="button"
                  onClick={copyAddress}
                  className="inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold text-chocolate/70 hover:text-chocolate"
                  aria-live="polite"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      Copy address
                    </>
                  )}
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="flex flex-col justify-between rounded-2xl border-2 border-chocolate bg-pistachio p-5 shadow-[0_4px_0_#3A251F] sm:p-6">
              <div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-chocolate bg-vanilla">
                  <Phone className="h-4 w-4 text-chocolate" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-[1.25rem] font-semibold leading-tight text-chocolate">
                  Phone &amp; WhatsApp
                </h3>
                <a
                  href={PHONE_HREF}
                  className="mt-2 block font-display text-[1.35rem] font-semibold text-chocolate underline decoration-2 underline-offset-4 hover:decoration-cherry"
                >
                  {BUSINESS.phoneDisplay}
                </a>
                <p className="mt-2 text-[0.75rem] leading-relaxed text-chocolate/75">
                  The same number for calls and WhatsApp enquiries.
                </p>
              </div>

              <ul className="mt-5 space-y-2 border-t-2 border-chocolate/15 pt-4 text-[0.6875rem] leading-relaxed text-chocolate/75">
                <li className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="font-bold text-chocolate">Hours:</strong> not yet
                    confirmed — please call before visiting.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-chocolate/50" aria-hidden="true" />
                  <span>
                    <strong className="font-bold text-chocolate">Delivery apps:</strong>{' '}
                    Swiggy and Zomato listings are pending.
                  </span>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
