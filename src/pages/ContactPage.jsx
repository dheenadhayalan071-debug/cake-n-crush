import { useMemo } from 'react';
import { Phone, MessageCircle, MapPin, Navigation, Clock, Utensils } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '../components/ui/SocialIcons.jsx';
import Seo from '../components/seo/Seo.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Button from '../components/ui/Button.jsx';
import VisitStrip from '../components/home/VisitStrip.jsx';
import { BUSINESS, PHONE_HREF, MAPS_SEARCH_URL } from '../data/business.js';
import { buildWhatsAppUrl, generalEnquiryMessage } from '../lib/whatsapp.js';
import { bakerySchema } from '../lib/schema.js';

/** Honest placeholder for links the owner has not supplied yet. */
function PendingRow({ icon: Icon, label, detail }) {
  return (
    <div className="flex items-start gap-3 py-4">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" aria-hidden="true" />
      <div>
        <p className="text-[0.8125rem] font-semibold text-ink">{label}</p>
        <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-ink-faint">{detail}</p>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const whatsappUrl = buildWhatsAppUrl(generalEnquiryMessage('contact page'));
  const jsonLd = useMemo(() => bakerySchema(), []);

  const hasSocial = Boolean(BUSINESS.instagramUrl || BUSINESS.facebookUrl);

  return (
    <>
      <Seo
        title="Contact & Location — Cake N Crush, Park Town, Madurai"
        description="Find Cake N Crush at RPK Complex, Thirupathi Nagar, Park Town, Madurai. Call +91 88381 59344 or send a WhatsApp enquiry about cakes and custom orders."
        path="/contact"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
        jsonLd={jsonLd}
      />

      <PageHeader
        tone="sky"
        eyebrow="Contact & location"
        title={
          <>
            Come in, call, or{}
            <span className="display-script text-cherry">message</span>.
          </>
        }
        lede="The quickest way to reach the bakery is a call or a WhatsApp message — both go to the same number."
        aside={
          <div className="flex flex-col gap-2.5 sm:flex-row md:flex-col">
            <Button href={whatsappUrl} variant="chocolate">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp enquiry
            </Button>
            <Button href={PHONE_HREF} variant="outline">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {BUSINESS.phoneDisplay}
            </Button>
          </div>
        }
      />

      <div className="bg-vanilla">
        <div className="container-page">
          <div className="grid gap-10 py-12 md:grid-cols-12 md:gap-14 md:py-16">
            <div className="md:col-span-6">
              <Reveal as="h2" className="display-md">
                The shop
              </Reveal>
              <div className="mt-6 rounded-2xl border-2 border-chocolate/10 bg-butter-soft/50 px-5 py-2">
                <div className="flex items-start gap-3 py-4">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cherry-deep" aria-hidden="true" />
                  <div>
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                      Address
                    </p>
                    <address className="mt-1.5 not-italic text-[0.9375rem] leading-relaxed text-ink">
                      {BUSINESS.address.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                          <span className="sr-only">,</span>
                        </span>
                      ))}
                    </address>
                    <a
                      href={MAPS_SEARCH_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-cherry-deep hover:text-ink"
                    >
                      <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
                      Get directions
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-line-soft py-4">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-cherry-deep" aria-hidden="true" />
                  <div>
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                      Phone &amp; WhatsApp
                    </p>
                    <a
                      href={PHONE_HREF}
                      className="mt-1.5 block font-display text-xl text-ink transition-colors hover:text-cherry-deep"
                    >
                      {BUSINESS.phoneDisplay}
                    </a>
                  </div>
                </div>

                <PendingRow
                  icon={Clock}
                  label="Opening hours"
                  detail="Not yet published. Please call before visiting so we can confirm counter timings for the day."
                />

                <div className="border-t border-line-soft">
                  <PendingRow
                    icon={Utensils}
                    label="Swiggy & Zomato"
                    detail="Official listing links have not been supplied yet. Once verified, ordering links will appear here. Until then, please order directly with the bakery."
                  />
                </div>

                <div className="border-t border-line-soft">
                  {hasSocial ? (
                    <div className="flex flex-wrap gap-4 py-4">
                      {BUSINESS.instagramUrl ? (
                        <a
                          href={BUSINESS.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-ink hover:text-cherry-deep"
                        >
                          <InstagramIcon className="h-4 w-4" />
                          Instagram
                        </a>
                      ) : null}
                      {BUSINESS.facebookUrl ? (
                        <a
                          href={BUSINESS.facebookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-ink hover:text-cherry-deep"
                        >
                          <FacebookIcon className="h-4 w-4" />
                          Facebook
                        </a>
                      ) : null}
                    </div>
                  ) : (
                    <PendingRow
                      icon={InstagramIcon}
                      label="Social media"
                      detail="Instagram and Facebook handles were not supplied. They will be added here once confirmed."
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="md:col-span-6">
              <Reveal as="h2" className="display-md">
                Getting here
              </Reveal>
              <div className="mt-6 aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 border-chocolate bg-butter-soft">
                <iframe
                  title="Map showing the Cake N Crush address in Park Town, Madurai"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.addressOneLine)}&output=embed`}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <p className="mt-3 text-[0.75rem] leading-relaxed text-ink-faint">
                The map shows the supplied address. Directions open in Google Maps for
                the most accurate route from your location.
              </p>

              <div className="mt-8 rounded-2xl border-2 border-chocolate bg-sky-soft p-5 shadow-[0_4px_0_#3A251F]">
                <h3 className="font-display text-[1.25rem] font-semibold text-chocolate">Ordering channels</h3>
                <ul className="mt-3 space-y-2.5 text-[0.875rem] leading-relaxed text-ink-soft">
                  <li className="flex gap-2">
                    <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-cherry" aria-hidden="true" />
                    <span><strong className="font-semibold text-ink">WhatsApp</strong> — cake enquiries, variants and custom designs.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-cherry" aria-hidden="true" />
                    <span><strong className="font-semibold text-ink">Phone</strong> — quick questions and same-day availability.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-cherry" aria-hidden="true" />
                    <span><strong className="font-semibold text-ink">Swiggy / Zomato</strong> — links pending verification; not active on this site yet.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <VisitStrip id="visit-again" />
      </div>
    </>
  );
}
