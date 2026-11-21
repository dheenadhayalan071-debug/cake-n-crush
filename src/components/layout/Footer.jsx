import { Link } from 'react-router-dom';
import { MessageCircle, Phone, MapPin } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import { FOOTER_LINKS, SITE_URL_IS_PLACEHOLDER } from '../../data/site.js';
import { BUSINESS, PHONE_HREF } from '../../data/business.js';
import { buildWhatsAppUrl, generalEnquiryMessage } from '../../lib/whatsapp.js';

export default function Footer() {
  const year = new Date().getFullYear();
  const whatsappUrl = buildWhatsAppUrl(generalEnquiryMessage('website'));

  return (
    <footer className="bg-cocoa text-cream">
      <div className="container-page">
        <div className="grid gap-12 py-16 md:grid-cols-12 md:gap-8 md:py-20">
          <div className="md:col-span-5">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/60">
              A bakery and cake shop in Park Town, Madurai — eggless cakes, celebration
              cakes, plum cakes and bespoke celebration designs, made for your moment.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 border border-cream/25 px-4 py-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:border-cream hover:bg-cream hover:text-cocoa"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Enquire on WhatsApp
            </a>
          </div>

          <nav className="md:col-span-3" aria-label="Footer navigation">
            <h2 className="text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-caramel-tint">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {FOOTER_LINKS.explore.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-cream/65 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-caramel-tint">
              Collections
            </h2>
            <ul className="mt-5 space-y-3">
              {FOOTER_LINKS.collections.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-cream/65 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-caramel-tint">
              Visit
            </h2>
            <address className="mt-5 not-italic">
              <p className="flex gap-2 text-sm leading-relaxed text-cream/65">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cream/40" aria-hidden="true" />
                <span>
                  {BUSINESS.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                      <span className="sr-only">,</span>
                    </span>
                  ))}
                </span>
              </p>
              <a
                href={PHONE_HREF}
                className="mt-4 flex items-center gap-2 text-sm text-cream/65 transition-colors hover:text-cream"
              >
                <Phone className="h-3.5 w-3.5 text-cream/40" aria-hidden="true" />
                {BUSINESS.phoneDisplay}
              </a>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-cream/12 py-7 text-[0.6875rem] leading-relaxed text-cream/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} <span className="font-semibold text-cream/70">{BUSINESS.name}</span>. All
            rights reserved.
          </p>
          <p className="max-w-xl md:text-right">
            Menu prices shown are provisional pending owner approval. Photography is
            illustrative editorial styling, not actual product photography.
          </p>
        </div>

        {SITE_URL_IS_PLACEHOLDER ? null : (
          <p className="sr-only">Canonical site configured.</p>
        )}
      </div>
    </footer>
  );
}
