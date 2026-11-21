/**
 * Motion wrappers
 * ---------------
 * Thin gates around Framer Motion primitives.
 *
 * Every wrapper checks `useAnimationReady()` first. When animation is not
 * supported (no IntersectionObserver, reduced motion, or a non-browser
 * environment) the wrapper renders the plain semantic element with **no
 * inline hidden state at all**.
 *
 * If a wrapper is given `whileInView`, it also installs the visibility safety
 * net: if the element is on screen but the observer never fires, content is
 * forced visible instead of staying at opacity 0.
 *
 * This is the single place raw `motion.*` elements are allowed to live, so the
 * "content hidden behind a JS animation" class of bug cannot come back.
 */
import { motion } from 'framer-motion';
import { useAnimationReady, useVisibilitySafety } from '../../lib/motion.js';

/**
 * Builds a wrapper for a tag that animates only when safe.
 *   const MotionDiv = createMotion('div')
 */
export function createMotion(tag = 'div') {
  const MotionTag = motion[tag] || motion.div;

  function SafeMotionTag({
    children,
    variants,
    initial,
    animate,
    whileInView,
    viewport,
    transition,
    className,
    ...rest
  }) {
    const ready = useAnimationReady();
    // Only wire the safety net when this element actually waits for a scroll.
    const { safetyRef, forceVisible } = useVisibilitySafety(
      Boolean(ready && whileInView),
    );

    if (!ready) {
      const Tag = tag;
      return (
        <Tag className={className} {...rest}>
          {children}
        </Tag>
      );
    }

    return (
      <MotionTag
        ref={whileInView ? safetyRef : undefined}
        variants={variants}
        initial={whileInView && forceVisible ? undefined : initial}
        animate={whileInView && forceVisible ? 'visible' : animate}
        whileInView={whileInView && !forceVisible ? whileInView : undefined}
        viewport={viewport}
        transition={transition}
        className={className}
        {...rest}
      >
        {children}
      </MotionTag>
    );
  }

  SafeMotionTag.displayName = `SafeMotion(${tag})`;
  return SafeMotionTag;
}

/* Pre-built wrappers for the tags this site uses. */
export const MotionDiv = createMotion('div');
export const MotionLi = createMotion('li');
export const MotionUl = createMotion('ul');
export const MotionP = createMotion('p');
export const MotionH1 = createMotion('h1');
export const MotionH2 = createMotion('h2');
export const MotionH3 = createMotion('h3');
export const MotionFigure = createMotion('figure');
export const MotionSpan = createMotion('span');
