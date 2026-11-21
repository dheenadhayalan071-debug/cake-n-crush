import { motion } from 'framer-motion';
import { fadeUp, useAnimationReady } from '../../lib/motion.js';

/**
 * StaggerItem — child of <StaggerGroup>. Inherits the parent timeline.
 * When animation is unavailable the wrapper disappears entirely so no hidden
 * state can exist.
 */
export default function StaggerItem({
  as = 'div',
  className = '',
  children,
  variants = fadeUp,
  ...rest
}) {
  const animate = useAnimationReady();

  if (!animate) {
    const Component = as;
    return (
      <Component className={className} {...rest}>
        {children}
      </Component>
    );
  }

  const Component = motion[as] || motion.div;
  return (
    <Component variants={variants} className={className} {...rest}>
      {children}
    </Component>
  );
}
