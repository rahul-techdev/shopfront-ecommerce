import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { CartItemRow } from '../components/cart/CartItemRow';
import { OrderSummary } from '../components/cart/OrderSummary';

export const CartPage: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    summary,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: 'var(--space-16) 0' }}>
        <div className="empty-state">
          <div className="empty-state-icon">
            <ShoppingBag size={32} />
          </div>
          <h2 className="empty-state-title">Your shopping bag is empty</h2>
          <p className="empty-state-desc">
            Explore our curated departments of electronics, leather accessories, ceramic homeware, and durable apparel to find something you love.
          </p>
          <Link to="/products" className="btn btn-primary btn-lg">
            <span>Explore Products</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingBottom: 'var(--space-16)' }}>
      {/* Breadcrumbs */}
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Shopping Cart</span>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800 }}>
            Shopping Cart
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: '4px' }}>
            Review your selected items before proceeding to checkout.
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="btn btn-outline btn-sm"
          style={{ color: 'var(--color-error)', borderColor: '#FECACA' }}
          title="Remove all items from shopping cart"
        >
          <Trash2 size={14} />
          <span>Clear Shopping Bag</span>
        </button>
      </div>

      <div className="cart-layout">
        {/* Left: Cart Items List */}
        <section className="cart-items-card" aria-label="Cart Items List">
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--color-border)', fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
            <span>Item Details</span>
            <span style={{ display: 'none' }} className="qty-heading">Quantity</span>
            <span>Subtotal</span>
          </div>

          <div>
            {items.map((item) => (
              <CartItemRow
                key={item.product.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
            <Link to="/products" className="btn btn-outline btn-sm">
              <ArrowLeft size={16} />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </section>

        {/* Right: Order Summary */}
        <OrderSummary
          summary={summary}
          onApplyPromo={applyPromoCode}
          onRemovePromo={removePromoCode}
          showCheckoutButton={true}
        />
      </div>
    </div>
  );
};
