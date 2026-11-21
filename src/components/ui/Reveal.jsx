import { m as motion } from 'framer-motion';
import { useMotionVariants, viewportOnce, fadeUp } from '../../lib/motion.js';

/**
 * Reveal — a single scroll-triggered fade/translate used across the site.
 * `as` lets us keep semantic markup (section, li, article…) while animating.
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
  const resolved = useMotionVariants(variants);
  const Component = motion[as] || motion.div;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={once ? viewportOnce : { amount: 0.25 }}
      variants={resolved}
      transition={{ delay }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
