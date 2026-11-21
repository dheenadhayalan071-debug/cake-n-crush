import { useState } from 'react';
import { MapPin, Phone, MessageCircle, Navigation, Check, Copy } from 'lucide-react';
import Reveal from '../ui/Reveal.jsx';
import Button from '../ui/Button.jsx';
import { BUSINESS, PHONE_HREF, MAPS_SEARCH_URL } from '../../data/business.js';
import { buildWhatsAppUrl, generalEnquiryMessage } from '../../lib/whatsapp.js';

/** Location + contact block used on the homepage and the contact page. */
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
    <section id={id} className="bg-cream-deep/50 py-16 md:py-20" aria-labelledby="visit-heading">
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-5">
            <Reveal as="span" className="eyebrow">
              Visit &amp; order
            </Reveal>
            <Reveal as="h2" id="visit-heading" className="display-lg mt-4 max-w-[14ch]">
              Find us in Park Town.
            </Reveal>
            <Reveal as="p" className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
              Collection and ordering are handled directly by the bakery. Call, message
              or drop in — whichever is easiest for you.
            </Reveal>
            <Reveal className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={whatsappUrl} variant="primary">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp us
              </Button>
              <Button href={PHONE_HREF} variant="outline">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call now
              </Button>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:col-span-7">
            <Reveal className="card flex flex-col justify-between p-6">
              <div>
                <MapPin className="h-5 w-5 text-caramel-deep" aria-hidden="true" strokeWidth={1.5} />
                <h3 className="mt-4 font-display text-xl text-ink">Address</h3>
                <address className="mt-2 not-italic text-[0.875rem] leading-relaxed text-ink-soft">
                  {BUSINESS.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                      <span className="sr-only">,</span>
                    </span>
                  ))}
                </address>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={MAPS_SEARCH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-ink hover:text-caramel-deep"
                >
                  <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
                  Directions
                </a>
                <button
                  type="button"
                  onClick={copyAddress}
                  className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-ink-soft hover:text-ink"
                  aria-live="polite"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-caramel-deep" aria-hidden="true" />
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

            <Reveal className="card flex flex-col justify-between p-6" delay={0.08}>
              <div>
                <Phone className="h-5 w-5 text-caramel-deep" aria-hidden="true" strokeWidth={1.5} />
                <h3 className="mt-4 font-display text-xl text-ink">Phone &amp; WhatsApp</h3>
                <a
                  href={PHONE_HREF}
                  className="mt-2 block font-display text-xl text-ink transition-colors hover:text-caramel-deep"
                >
                  {BUSINESS.phoneDisplay}
                </a>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-soft">
                  Same number for calls and WhatsApp enquiries.
                </p>
              </div>
              <div className="mt-5 space-y-2 border-t border-line-soft pt-4 text-[0.75rem] leading-relaxed text-ink-faint">
                <p>
                  <span className="font-semibold text-ink-soft">Hours:</span> not yet
                  confirmed — please call before visiting.
                </p>
                <p>
                  <span className="font-semibold text-ink-soft">Delivery apps:</span>{' '}
                  Swiggy and Zomato listings pending.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
