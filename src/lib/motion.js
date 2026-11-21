/**
 * Motion primitives
 * -----------------
 * Design rule (learned from a production outage):
 *
 *   Content must never depend on JavaScript animation to be visible.
 *
 * Every reveal therefore renders **visible by default**. Animation is layered
 * on only when we can positively confirm that it will work:
 *
 *   - the browser supports IntersectionObserver, and
 *   - the visitor has not asked for reduced motion.
 *
 * If anything is unavailable the element renders as plain, static, visible
 * markup. A safety timer additionally forces content visible if an element is
 * on screen but its observer never fires.
 */
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export const EASE_SILK = [0.22, 1, 0.36, 1];
export const EASE_SMOOTH = [0.4, 0, 0.2, 1];

/* ---------------------------------------------------------------- variants */

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_SILK } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE_SMOOTH } },
};

export const revealMask = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 1, ease: EASE_SILK } },
};

export const popIn = {
  hidden: { opacity: 0, scale: 0.92, y: 18 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_SILK },
  },
};

export const staggerParent = (stagger = 0.07, delayChildren = 0.04) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

/* ------------------------------------------------- support detection (sync) */

/**
 * Evaluated once, synchronously, on first render — before paint. This avoids
 * the flash of visible → hidden that a post-mount effect would cause.
 */
export function canAnimateNow() {
  if (typeof window === 'undefined') return false;
  if (typeof window.IntersectionObserver === 'undefined') return false;
  return true;
}

/**
 * Returns true only when scroll-triggered animation is both supported and
 * welcome. Everything else falls back to static, visible content.
 */
export function useAnimationReady() {
  const reduce = useReducedMotion();
  const [supported] = useState(canAnimateNow);
  return Boolean(supported && !reduce);
}

/**
 * Safety net: reveals content that is on screen but still marked hidden.
 *
 * Guards against a missed or broken observer (browser quirks, a section inside
 * a zero-height container, a restored bfcache entry). Off-screen elements are
 * left alone so genuine scroll reveals still feel intentional.
 */
export function useVisibilitySafety(isAnimating, delay = 1400) {
  const ref = useRef(null);
  const [forced, setForced] = useState(false);

  useEffect(() => {
    if (!isAnimating || forced) return undefined;
    const timer = window.setTimeout(() => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const onScreen = rect.top < window.innerHeight && rect.bottom > 0;
      if (onScreen) setForced(true);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [isAnimating, forced, delay]);

  return { safetyRef: ref, forceVisible: forced };
}

/** Viewport config for scroll reveals — fire once, slightly before entry. */
export const viewportOnce = { once: true, amount: 0.15, margin: '0px 0px -6% 0px' };

export { useReducedMotion };
