import { motion } from 'framer-motion';
import {
  staggerParent,
  useAnimationReady,
  useVisibilitySafety,
  viewportOnce,
} from '../../lib/motion.js';

/**
 * StaggerGroup — animates direct children in sequence.
 * Falls back to a static, visible container when animation is unavailable.
 */
export default function StaggerGroup({
  as = 'div',
  stagger = 0.07,
  delayChildren = 0.04,
  className = '',
  children,
  ...rest
}) {
  const animate = useAnimationReady();
  const { safetyRef, forceVisible } = useVisibilitySafety(animate);
  const Component = animate ? motion[as] || motion.div : as;

  if (!animate) {
    return (
      <Component className={className} {...rest}>
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
      viewport={viewportOnce}
      variants={staggerParent(stagger, delayChildren)}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
