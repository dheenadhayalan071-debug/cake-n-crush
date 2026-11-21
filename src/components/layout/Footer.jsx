import { Link } from 'react-router-dom';
import { MessageCircle, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import { FOOTER_LINKS } from '../../data/site.js';
import { BUSINESS, PHONE_HREF, MAPS_SEARCH_URL } from '../../data/business.js';
import { buildWhatsAppUrl, generalEnquiryMessage } from '../../lib/whatsapp.js';

/**
 * Footer
 * ------
 * The one place on the site where the full colour system appears at once:
 * a row of flavour chips, then chocolate-brown columns. Business details are
 * identical to the header and contact page — one source (`data/business.js`).
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const whatsappUrl = buildWhatsAppUrl(generalEnquiryMessage('website'));

  const chips = [
    { label: 'Eggless', className: 'bg-pistachio' },
    { label: 'Celebration', className: 'bg-strawberry' },
    { label: 'Chocolate', className: 'bg-butter' },
    { label: 'Plum', className: 'bg-lavender' },
    { label: 'Pastries', className: 'bg-sky' },
    { label: 'Brownies', className: 'bg-orange' },
  ];

  return (
    <footer className="bg-chocolate text-vanilla">
      <div className="container-page">
        {/* Flavour chips — the whole palette, once */}
        <div className="flex flex-wrap items-center gap-2 border-b-2 border-vanilla/10 py-7">
          <span className="mr-1 text-[0.5625rem] font-bold uppercase tracking-[0.2em] text-vanilla/45">
            We bake
          </span>
          {chips.map((chip) => (
            <Link
              key={chip.label}
              to={`/menu?category=${chip.label.toLowerCase()}`}
              className={`rounded-full border-2 border-chocolate px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.08em] text-chocolate transition-transform hover:-translate-y-0.5 ${chip.className}`}
            >
              {chip.label}
            </Link>
          ))}
        </div>

        <div className="grid gap-10 py-14 md:grid-cols-12 md:gap-8 md:py-16">
          <div className="md:col-span-5">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-[0.875rem] leading-relaxed text-vanilla/65">
              A patisserie and cake shop in Park Town, Madurai — eggless cakes,
              celebration cakes, plum cakes and bespoke designs, made for your moment.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-butter px-4 py-2.5 text-[0.625rem] font-bold uppercase tracking-[0.12em] text-chocolate transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Enquire on WhatsApp
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full border-2 border-vanilla/25 px-4 py-2.5 text-[0.625rem] font-bold uppercase tracking-[0.12em] text-vanilla transition-colors hover:border-vanilla hover:bg-vanilla hover:text-chocolate"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                Call
              </a>
            </div>
          </div>

          <nav className="md:col-span-3" aria-label="Footer navigation">
            <h2 className="text-[0.5625rem] font-bold uppercase tracking-[0.22em] text-vanilla/45">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.explore.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[0.8125rem] text-vanilla/70 transition-colors hover:text-butter"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="text-[0.5625rem] font-bold uppercase tracking-[0.22em] text-vanilla/45">
              Collections
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.collections.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[0.8125rem] text-vanilla/70 transition-colors hover:text-butter"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-[0.5625rem] font-bold uppercase tracking-[0.22em] text-vanilla/45">
              Visit
            </h2>
            <address className="mt-4 not-italic">
              <a
                href={MAPS_SEARCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-2 text-[0.8125rem] leading-relaxed text-vanilla/70 transition-colors hover:text-butter"
              >
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-butter/70" aria-hidden="true" />
                <span>
                  {BUSINESS.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                      <span className="sr-only">,</span>
                    </span>
                  ))}
                </span>
              </a>
              <a
                href={PHONE_HREF}
                className="mt-3.5 flex items-center gap-2 text-[0.8125rem] text-vanilla/70 transition-colors hover:text-butter"
              >
                <Phone className="h-3.5 w-3.5 text-butter/70" aria-hidden="true" />
                {BUSINESS.phoneDisplay}
              </a>
              <p className="mt-3.5 flex items-start gap-2 text-[0.75rem] leading-relaxed text-vanilla/50">
                <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Hours not yet confirmed — please call ahead.</span>
              </p>
            </address>
          </div>
        </div>

        {/* Honesty row — the disclosures the brand requires */}
        <div className="grid gap-3 border-t-2 border-vanilla/10 py-6 text-[0.6875rem] leading-relaxed text-vanilla/50 md:grid-cols-12">
          <p className="md:col-span-5">
            © {year} <span className="font-semibold text-vanilla/70">{BUSINESS.name}</span>.
            All rights reserved.
          </p>
          <p className="md:col-span-7 md:text-right">
            Menu prices are provisional pending owner approval. Photography is
            illustrative editorial styling, not actual product photography.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 pb-sticky-safe md:pb-8">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-1.5 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-vanilla/40 transition-colors hover:text-butter"
          >
            Contact &amp; location
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </Link>
          <span className="font-display text-[0.8125rem] italic text-vanilla/30">
            Life is better with cake.
          </span>
        </div>
      </div>
    </footer>
  );
}
