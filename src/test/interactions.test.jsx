/**
 * Interaction tests for the two most complex UI surfaces:
 * the product detail dialog and the mobile navigation drawer.
 */
import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ProductDetail from '../components/product/ProductDetail.jsx';
import Header from '../components/layout/Header.jsx';
import { PRODUCTS } from '../data/products.js';

const blackForest = PRODUCTS.find((p) => p.id === 'black-forest');

function renderDialog(product = blackForest, onClose = vi.fn()) {
  const utils = render(
    <MemoryRouter>
      <ProductDetail product={product} open onClose={onClose} />
    </MemoryRouter>,
  );
  return { ...utils, onClose };
}

describe('product detail dialog', () => {
  it('exposes an accessible modal dialog', () => {
    renderDialog();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAccessibleName('Black Forest');
  });

  it('lists every variant with its own price', () => {
    renderDialog();
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('button', { name: /regular\r?\n?.*₹440/i })).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: /regular\r?\n?.*₹840/i })).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: /eggless\r?\n?.*₹390/i })).toBeInTheDocument();
  });

  it('updates the selected variant, totals and WhatsApp message', async () => {
    const user = userEvent.setup();
    renderDialog();

    await user.click(screen.getByRole('button', { name: /eggless[\s\S]*₹390/i }));

    const link = screen.getByRole('link', { name: /enquire about this variant/i });
    const href = decodeURIComponent(link.getAttribute('href'));
    expect(href).toContain('Eggless');
    expect(href).toContain('₹390');
    expect(screen.getByText(/Eggless · 500 g/)).toBeInTheDocument();
  });

  it('calculates an indicative total for the chosen quantity', async () => {
    const user = userEvent.setup();
    renderDialog();
    await user.click(screen.getByRole('button', { name: /increase quantity/i }));
    expect(screen.getByText('₹880')).toBeInTheDocument();
  });

  it('never allows quantity below 1', async () => {
    const user = userEvent.setup();
    renderDialog();
    expect(screen.getByRole('button', { name: /decrease quantity/i })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: /increase quantity/i }));
    await user.click(screen.getByRole('button', { name: /decrease quantity/i }));
    // The variant pill and the indicative total both show ₹440 — assert the total.
    expect(screen.getAllByText('₹440').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('₹440', { selector: 'p' })).toBeInTheDocument();
  });

  it('closes on Escape and on the close button', async () => {
    const user = userEvent.setup();
    const { onClose } = renderDialog();

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: /^close$/i }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('states that prices are provisional and that opening chat is not an order', () => {
    renderDialog();
    expect(
      screen.getByText(/prices are provisional and awaiting owner approval/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/opening the chat does not place an order/i)).toBeInTheDocument();
  });

  it('shows no element at all when closed', () => {
    render(
      <MemoryRouter>
        <ProductDetail product={blackForest} open={false} onClose={() => {}} />
      </MemoryRouter>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('falls back honestly when a product has no description', () => {
    renderDialog();
    expect(screen.getByText(/have not been published by the bakery yet/i)).toBeInTheDocument();
  });
});

describe('mobile navigation drawer', () => {
  it('toggles with correct aria state and closes on escape', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const toggle = screen.getByRole('button', { name: /open menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);
    expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    );

    const mobileNav = screen.getByRole('navigation', { name: /mobile/i });
    expect(within(mobileNav).getByRole('link', { name: /menu/i })).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });
});
