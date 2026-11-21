import { useCallback, useMemo, useState } from 'react';
import ProductDetail from '../components/product/ProductDetail.jsx';
import { PRODUCTS } from '../data/products.js';

/**
 * Shared product-detail dialog state.
 * Returns `openProduct(id)` and the dialog element to render once.
 */
export function useProductDetail(products = PRODUCTS) {
  const [activeId, setActiveId] = useState(null);

  const openProduct = useCallback((id) => setActiveId(id), []);
  const closeProduct = useCallback(() => setActiveId(null), []);
  const product = useMemo(
    () => products.find((item) => item.id === activeId) || null,
    [products, activeId],
  );

  const dialog = (
    <ProductDetail product={product} open={Boolean(product)} onClose={closeProduct} />
  );

  return { openProduct, closeProduct, activeProduct: product, dialog };
}
