import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from '../product/ProductCard.jsx';
import { PRODUCTS } from '../../data/products.js';

const blackForest = PRODUCTS.find((product) => product.id === 'black-forest');

describe('ProductCard', () => {
  it('shows the first variant price and weight', () => {
    render(<ProductCard product={blackForest} />);
    expect(screen.getByText('₹440')).toBeInTheDocument();
    expect(screen.getByText('500 g')).toBeInTheDocument();
  });

  it('updates the price when a different variant is selected', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={blackForest} />);

    await user.click(screen.getByText(/^Regular 1 kg$/));
    expect(screen.getByText('₹840')).toBeInTheDocument();
    expect(screen.queryByText('₹440')).not.toBeInTheDocument();

    await user.click(screen.getByText(/^Eggless 500 g$/));
    expect(screen.getAllByText('₹390').length).toBeGreaterThan(0);
  });

  it('builds a WhatsApp link containing the selected variant and price', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={blackForest} />);

    await user.click(screen.getByText(/^Regular 1 kg$/));

    const link = screen.getByRole('link', { name: /enquire on whatsapp/i });
    const href = decodeURIComponent(link.getAttribute('href'));
    expect(href).toContain('https://wa.me/918838159344');
    expect(href).toContain('Black Forest');
    expect(href).toContain('1 kg');
    expect(href).toContain('₹840');
  });

  it('opens the detail dialog from the image and the title', async () => {
    const user = userEvent.setup();
    const onOpenDetail = vi.fn();
    render(<ProductCard product={blackForest} onOpenDetail={onOpenDetail} />);

    await user.click(screen.getByRole('button', { name: /view details for black forest/i }));
    expect(onOpenDetail).toHaveBeenCalledWith('black-forest');

    await user.click(screen.getByRole('button', { name: 'Black Forest' }));
    expect(onOpenDetail).toHaveBeenCalledTimes(2);
  });

  it('hides the variant picker for single-variant products', () => {
    const plum = PRODUCTS.find((product) => product.id === 'royal-plum-100g');
    render(<ProductCard product={plum} />);
    expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
    expect(screen.getByText('₹90')).toBeInTheDocument();
  });
});
