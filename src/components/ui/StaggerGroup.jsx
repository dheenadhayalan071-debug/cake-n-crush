import { m as motion } from 'framer-motion';
import { useMotionVariants, viewportOnce, staggerParent } from '../../lib/motion.js';

/**
 * StaggerGroup — animates direct children in sequence on scroll.
 * Children should be <StaggerItem> (or any motion element using the
 * inherited variants).
 */
export default function StaggerGroup({
  as = 'div',
  stagger = 0.08,
  delayChildren = 0.05,
  className = '',
  children,
  ...rest
}) {
  const variants = useMotionVariants(staggerParent(stagger, delayChildren));
  const Component = motion[as] || motion.div;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
