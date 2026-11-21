import { m as motion } from 'framer-motion';
import { useMotionVariants, fadeUp } from '../../lib/motion.js';

/** Child of <StaggerGroup>. Inherits the parent's timeline. */
export default function StaggerItem({ as = 'div', className = '', children, variants = fadeUp, ...rest }) {
  const Component = motion[as] || motion.div;
  const resolved = useMotionVariants(variants);
  return (
    <Component variants={resolved} className={className} {...rest}>
      {children}
    </Component>
  );
}
