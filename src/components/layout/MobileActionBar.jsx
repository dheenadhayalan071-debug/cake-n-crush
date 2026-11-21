import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, CalendarHeart } from 'lucide-react';
import { BUSINESS, PHONE_HREF } from '../../data/business.js';
import { buildWhatsAppUrl, generalEnquiryMessage } from '../../lib/whatsapp.js';

/**
 * Sticky mobile conversion bar.
 * Hidden on the custom-cake page (the form is the conversion) and on
 * desktop, where the header carries the same actions.
 */
export default function MobileActionBar() {
  const { pathname } = useLocation();
  const hiddenRoutes = ['/custom-cakes'];
  if (hiddenRoutes.includes(pathname)) return null;

  const whatsappUrl = buildWhatsAppUrl(generalEnquiryMessage('website'));

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-cocoa/40 bg-cocoa/97 backdrop-blur-md md:hidden safe-bottom"
      role="region"
      aria-label="Quick contact"
    >
      <div className="grid grid-cols-3 divide-x divide-cream/10">
        <a
          href={PHONE_HREF}
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-cream/85 transition-colors active:bg-cream/10"
          aria-label={`Call ${BUSINESS.name} on ${BUSINESS.phoneDisplay}`}
        >
          <Phone className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
          <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.16em]">Call</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 bg-caramel/95 py-2.5 text-white transition-colors active:bg-caramel-deep"
          aria-label="Enquire on WhatsApp"
        >
          <MessageCircle className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
          <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.16em]">WhatsApp</span>
        </a>
        <Link
          to="/custom-cakes"
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-cream/85 transition-colors active:bg-cream/10"
        >
          <CalendarHeart className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
          <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.16em]">Custom</span>
        </Link>
      </div>
    </div>
  );
}
