import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageCircle, MapPin, ArrowRight } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import Button from '../ui/Button.jsx';
import { NAV_LINKS } from '../../data/site.js';
import { BUSINESS, PHONE_HREF, MAPS_SEARCH_URL } from '../../data/business.js';
import { buildWhatsAppUrl, generalEnquiryMessage } from '../../lib/whatsapp.js';
import { cn } from '../../lib/cn.js';
import { EASE_SILK } from '../../lib/motion.js';
import { MotionDiv, MotionLi } from '../ui/Motion.jsx';

/**
 * Header
 * ------
 * A compact butter-yellow announcement strip (location · phone · a brand
 * line, no invented offers) sits above a sticky nav that earns its shadow
 * only once the page scrolls. The mobile drawer is a full-height panel with
 * large serif links — built for thumbs, not a squeezed desktop bar.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const location = useLocation();
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const whatsappUrl = buildWhatsAppUrl(generalEnquiryMessage('website'));

  return (
    <>
      {/* ---------------------- Announcement strip ---------------------- */}
      {!bannerDismissed ? (
        <div className="relative z-50 border-b-2 border-chocolate/10 bg-butter">
          <div className="container-page flex items-center justify-between gap-3 py-2">
            <p className="flex min-w-0 items-center gap-2 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-chocolate sm:text-[0.6875rem]">
              <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
              <span className="truncate">Park Town, Madurai</span>
              <span aria-hidden="true" className="hidden h-1 w-1 shrink-0 rounded-full bg-chocolate/40 sm:block" />
              <span className="hidden truncate font-semibold normal-case tracking-[0.02em] text-chocolate/80 sm:inline">
                Little moments, big celebrations — baked to order.
              </span>
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-1.5 text-[0.625rem] font-bold tracking-[0.06em] text-chocolate transition-opacity hover:opacity-70 sm:text-[0.6875rem]"
              >
                <Phone className="h-3 w-3" aria-hidden="true" />
                <span className="hidden xs:inline sm:inline">{BUSINESS.phoneDisplay}</span>
                <span className="sm:hidden">Call</span>
              </a>
              <button
                type="button"
                onClick={() => setBannerDismissed(true)}
                className="-mr-1 rounded-full p-1.5 text-chocolate/60 transition-colors hover:bg-chocolate/10 hover:text-chocolate"
                aria-label="Dismiss announcement"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* ------------------------------ Nav ----------------------------- */}
      <header
        className={cn(
          'sticky top-0 z-40 border-b-2 transition-all duration-300',
          scrolled
            ? 'border-chocolate/10 bg-vanilla/95 shadow-[0_6px_24px_-12px_rgba(58,37,31,0.35)] backdrop-blur-md'
            : 'border-transparent bg-vanilla',
        )}
      >
        <div className="container-page flex h-[4.25rem] items-center justify-between gap-4 md:h-[4.75rem]">
          <Link
            to="/"
            className="group flex shrink-0 items-center py-2"
            aria-label="Cake N Crush — home"
          >
            <Logo className="transition-transform duration-300 group-hover:-rotate-2" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'relative block rounded-full px-3.5 py-2 text-[0.8125rem] font-semibold transition-colors duration-200',
                        isActive
                          ? 'bg-chocolate text-vanilla'
                          : 'text-ink-soft hover:bg-butter-soft hover:text-chocolate',
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full border-2 border-chocolate px-4 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-chocolate transition-colors duration-200 hover:bg-pistachio md:inline-flex"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              WhatsApp
            </a>
            <Button to="/custom-cakes" variant="cherry" size="sm" className="hidden sm:inline-flex">
              Custom cake
            </Button>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-chocolate text-chocolate transition-colors hover:bg-butter lg:hidden"
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* --------------------------- Mobile nav ------------------------- */}
      <AnimatePresence>
        {open ? (
          <MotionDiv
            key="mobile-menu"
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 overflow-hidden bg-vanilla lg:hidden"
          >
            <div className="flex h-full flex-col overflow-y-auto pb-10 pt-[5.25rem]">
              <nav aria-label="Mobile" className="container-page">
                <ul className="border-t-2 border-chocolate/10">
                  {NAV_LINKS.map((link, index) => (
                    <MotionLi
                      key={link.to}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.03 * index + 0.04, duration: 0.35, ease: EASE_SILK }}
                      className="border-b-2 border-chocolate/10"
                    >
                      <NavLink
                        to={link.to}
                        end={link.to === '/'}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center justify-between gap-4 py-3.5',
                            isActive ? 'text-cherry' : 'text-chocolate',
                          )
                        }
                      >
                        <span className="display-md">{link.label}</span>
                        <ArrowRight className="h-4 w-4 shrink-0 opacity-40" aria-hidden="true" />
                      </NavLink>
                    </MotionLi>
                  ))}
                </ul>
              </nav>

              <MotionDiv
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.4, ease: EASE_SILK }}
                className="container-page mt-7 flex flex-col gap-3"
              >
                <Button href={whatsappUrl} variant="chocolate" className="w-full">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Chat on WhatsApp
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button href={PHONE_HREF} variant="outline">
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    Call
                  </Button>
                  <Button href={MAPS_SEARCH_URL} variant="outline">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    Directions
                  </Button>
                </div>

                <address className="mt-4 not-italic text-center text-[0.6875rem] leading-relaxed text-ink-soft">
                  {BUSINESS.addressOneLine}
                </address>
              </MotionDiv>
            </div>
          </MotionDiv>
        ) : null}
      </AnimatePresence>
    </>
  );
}
