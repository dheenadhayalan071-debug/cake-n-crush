import { motion } from 'framer-motion';
import {
  fadeUp,
  useAnimationReady,
  useVisibilitySafety,
  viewportOnce,
} from '../../lib/motion.js';

/**
 * Reveal — scroll-triggered entrance with a hard guarantee of visibility.
 *
 * Without animation support this renders a plain, fully visible element.
 * With support it animates once, and a safety timer forces it visible if the
 * observer never fires while the element is on screen.
 */
export default function Reveal({
  as = 'div',
  variants = fadeUp,
  delay = 0,
  className = '',
  children,
  once = true,
  ...rest
}) {
  const animate = useAnimationReady();
  const { safetyRef, forceVisible } = useVisibilitySafety(animate);
  const Component = animate ? motion[as] || motion.div : as;
  const extra = animate ? { ref: safetyRef } : {};

  if (!animate) {
    return (
      <Component className={className} {...extra} {...rest}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={safetyRef}
      initial="hidden"
      animate={forceVisible ? 'visible' : undefined}
      whileInView={forceVisible ? undefined : 'visible'}
      viewport={once ? viewportOnce : { amount: 0.15 }}
      variants={variants}
      transition={{ delay }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
