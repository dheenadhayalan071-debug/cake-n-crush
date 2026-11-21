import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn.js';

const VARIANTS = {
  chocolate: 'btn btn-chocolate',
  cherry: 'btn btn-cherry',
  butter: 'btn btn-butter',
  outline: 'btn btn-outline',
  light: 'btn btn-outline-light',
  // Legacy aliases kept so existing pages keep working unchanged.
  primary: 'btn btn-chocolate',
  caramel: 'btn btn-cherry',
  ghost: 'btn btn-outline',
};

/**
 * Button — one control, three destinations:
 *   `to`   → internal React Router link
 *   `href` → external or protocol link (tel:, https://wa.me …)
 *   none   → <button>
 * Every variant is a real, functioning control; there are no decorative
 * buttons on this site.
 */
const Button = forwardRef(function Button(
  { variant = 'chocolate', size, to, href, external, className = '', children, ...rest },
  ref,
) {
  const classes = cn(VARIANTS[variant] || VARIANTS.chocolate, size === 'sm' && 'btn-sm', className);

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    const externalProps =
      external === false
        ? {}
        : {
            target: href.startsWith('http') ? '_blank' : undefined,
            rel: href.startsWith('http') ? 'noopener noreferrer' : undefined,
          };
    return (
      <a ref={ref} href={href} className={classes} {...externalProps} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button ref={ref} type="button" className={classes} {...rest}>
      {children}
    </button>
  );
});

export default Button;
