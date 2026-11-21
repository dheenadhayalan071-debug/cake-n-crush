/**
 * Motion system
 * -------------
 * Shared Framer Motion variants + hooks that collapse every animation to a
 * static end state when the visitor prefers reduced motion.
 */
import { useReducedMotion } from 'framer-motion';

export const EASE_SILK = [0.22, 1, 0.36, 1];
export const EASE_SMOOTH = [0.4, 0, 0.2, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_SILK },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: EASE_SMOOTH } },
};

export const revealMask = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 1.15, ease: EASE_SILK },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: EASE_SILK },
  },
};

export const staggerParent = (stagger = 0.08, delayChildren = 0.05) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** The single "already settled" state every variant collapses to. */
const STILL = Object.freeze({
  opacity: 1,
  y: 0,
  x: 0,
  scale: 1,
  clipPath: 'inset(0 0 0% 0)',
  transition: { duration: 0 },
});

/**
 * Collapses any variant set to its resting state.
 * Use this (not `prefers-reduced-motion` CSS alone) for Framer variants,
 * which bypass CSS transitions.
 */
export function stillVariants() {
  return { hidden: { ...STILL }, visible: { ...STILL } };
}

/** Hook form for component-level variant sets. */
export function useMotionVariants(variants) {
  const reduce = useReducedMotion();
  return reduce ? stillVariants() : variants;
}

/** Hook form for staggers — no cascade when motion is reduced. */
export function useStagger(stagger = 0.08, delayChildren = 0.05) {
  const reduce = useReducedMotion();
  return reduce ? stillVariants() : staggerParent(stagger, delayChildren);
}

/** Viewport config used by scroll reveals — fire once, slightly before entry. */
export const viewportOnce = { once: true, amount: 0.25, margin: '0px 0px -8% 0px' };

/** Convenience re-export so components import reduced-motion state from one place. */
export { useReducedMotion };
