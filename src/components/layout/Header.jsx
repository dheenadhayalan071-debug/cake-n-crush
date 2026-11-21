import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, m as motion } from 'framer-motion';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import Button from '../ui/Button.jsx';
import { NAV_LINKS } from '../../data/site.js';
import { BUSINESS, PHONE_HREF } from '../../data/business.js';
import { buildWhatsAppUrl, generalEnquiryMessage } from '../../lib/whatsapp.js';
import { cn } from '../../lib/cn.js';
import { EASE_SILK } from '../../lib/motion.js';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const location = useLocation();
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  // Close the drawer on navigation.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scroll + trap Escape while the drawer is open.
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
      {!bannerDismissed ? (
        <div className="relative z-50 bg-cocoa text-cream">
          <div className="container-page flex items-center justify-between gap-4 py-2.5">
            <p className="text-[0.6875rem] leading-snug tracking-[0.08em] text-cream/75">
              <span className="font-semibold uppercase tracking-[0.16em] text-caramel-tint">
                Park Town, Madurai
              </span>
              <span className="mx-2 hidden text-cream/30 sm:inline">/</span>
              <span className="hidden sm:inline">
                Cake previews &amp; prices on this site await owner approval
              </span>
            </p>
            <div className="flex shrink-0 items-center gap-3">
              <a
                href={PHONE_HREF}
                className="hidden items-center gap-1.5 text-[0.6875rem] font-medium tracking-wide text-cream/80 transition-colors hover:text-cream sm:flex"
              >
                <Phone className="h-3 w-3" aria-hidden="true" />
                {BUSINESS.phoneDisplay}
              </a>
              <button
                type="button"
                onClick={() => setBannerDismissed(true)}
                className="-mr-1 p-1 text-cream/60 transition-colors hover:text-cream"
                aria-label="Dismiss notice bar"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <header
        className={cn(
          'sticky top-0 z-40 border-b transition-all duration-500',
          scrolled
            ? 'border-line/80 bg-cream/92 backdrop-blur-md'
            : 'border-transparent bg-cream',
        )}
      >
        <div className="container-page flex h-[4.25rem] items-center justify-between gap-6 md:h-[4.75rem]">
          <Link
            to="/"
            className="group flex items-center py-2"
            aria-label="Cake N Crush — home"
          >
            <Logo className="transition-opacity duration-300 group-hover:opacity-80" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'relative py-2 text-[0.8125rem] font-medium tracking-[0.02em] transition-colors duration-300',
                        isActive
                          ? 'text-ink'
                          : 'text-ink-soft hover:text-ink',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <span className="relative">
                        {link.label}
                        <span
                          aria-hidden="true"
                          className={cn(
                            'absolute -bottom-1.5 left-0 h-px bg-caramel transition-all duration-500',
                            isActive ? 'w-full' : 'w-0',
                          )}
                        />
                      </span>
                    )}
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
              className="hidden items-center gap-2 border border-line px-4 py-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-cream md:inline-flex"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              WhatsApp
            </a>
            <Button to="/custom-cakes" className="hidden sm:inline-flex" size="sm">
              Custom Cake
            </Button>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink lg:hidden"
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 bg-cream lg:hidden"
            style={{ top: 0 }}
          >
            <div className="flex h-full flex-col overflow-y-auto pb-8 pt-[5.5rem]">
              <nav aria-label="Mobile" className="container-page">
                <ul className="divide-y divide-line-soft border-y border-line-soft">
                  {NAV_LINKS.map((link, index) => (
                    <motion.li
                      key={link.to}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * index + 0.05, duration: 0.4, ease: EASE_SILK }}
                    >
                      <NavLink
                        to={link.to}
                        end={link.to === '/'}
                        className={({ isActive }) =>
                          cn(
                            'flex items-baseline justify-between py-4 font-display text-[1.75rem] tracking-[-0.02em] transition-colors',
                            isActive ? 'text-caramel-deep' : 'text-ink',
                          )
                        }
                      >
                        {link.label}
                        <span className="font-sans text-[0.625rem] uppercase tracking-[0.2em] text-ink-faint">
                          0{index + 1}
                        </span>
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.45, ease: EASE_SILK }}
                className="container-page mt-8 flex flex-col gap-3"
              >
                <Button to="/custom-cakes" variant="primary">
                  Design a custom cake
                </Button>
                <Button href={whatsappUrl} variant="caramel">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Chat on WhatsApp
                </Button>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <Button href={PHONE_HREF} variant="outline">
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    Call
                  </Button>
                  <Button to="/contact" variant="outline">
                    Find us
                  </Button>
                </div>
                <p className="mt-4 text-center text-[0.6875rem] leading-relaxed text-ink-faint">
                  {BUSINESS.addressOneLine}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
