import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldAlert,
  ArrowLeft,
  Lock,
  CreditCard,
  Truck,
  Building,
} from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatINR } from '../utils/formatters';
import { generateDemoOrderId } from '../utils/orderId';
import { getEstimatedDeliveryDate, formatDate } from '../utils/formatters';
import {
  validateShippingAddress,
  INDIAN_STATES,
  type ValidationErrors,
} from '../utils/validation';
import type { ShippingAddress, DemoPaymentMethod, OrderConfirmationDetails } from '../types/order';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { saveToStorage } from '../utils/storage';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, summary, clearCart } = useCart();

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    addressLine: '',
    city: '',
    state: 'Karnataka',
    pinCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<DemoPaymentMethod>('cod');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, direct back to cart
  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: 'var(--space-16) 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
          Your Shopping Bag is Empty
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link to="/products" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Browse Catalogue</span>
        </Link>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));

    // Clear individual field error on change
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateShippingAddress(address);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      const orderId = generateDemoOrderId();
      const orderDetails: OrderConfirmationDetails = {
        orderId,
        orderDate: formatDate(new Date()),
        estimatedDelivery: getEstimatedDeliveryDate(4),
        items: [...items],
        summary: { ...summary },
        shippingAddress: { ...address },
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'Pending COD' : 'Paid (Simulated)',
      };

      // Persist order details to session storage / local storage for confirmation view
      saveToStorage(`order_${orderId}`, orderDetails);

      // Clear shopping cart
      clearCart();

      // Navigate to order confirmation
      navigate(`/order-confirmation/${orderId}`, { state: { order: orderDetails } });
    }, 600);
  };

  return (
    <div className="container" style={{ paddingBottom: 'var(--space-16)' }}>
      {/* Breadcrumbs */}
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-sep">/</span>
        <Link to="/cart">Cart</Link>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Checkout</span>
      </nav>

      {/* Prominent Demo Notice Callout */}
      <div className="demo-callout-box" role="alert">
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <ShieldAlert size={20} style={{ flexShrink: 0, marginTop: '2px', color: '#B45309' }} />
          <div>
            <strong>Demonstration Checkout Only:</strong> This is an engineering portfolio project. No financial transactions, card details, UPI PINs, or banking passwords will ever be asked or stored. You can test complete ordering with fictional demo shipping details.
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800 }}>
          Checkout
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: '4px' }}>
          Please provide delivery details for your simulated order.
        </p>
      </div>

      <div className="checkout-layout">
        {/* Left Column: Customer & Shipping Form */}
        <div>
          <form onSubmit={handleSubmitOrder} className="checkout-form-card" noValidate>
            <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--color-border)' }}>
              1. Delivery Address
            </h2>

            {/* Full Name */}
            <div className={`form-group ${errors.fullName ? 'has-error' : ''}`}>
              <label htmlFor="fullName">Full Name *</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={address.fullName}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName && <span className="form-error-msg">{errors.fullName}</span>}
            </div>

            {/* Email & Phone Grid */}
            <div className="form-grid-2">
              <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={address.email}
                  onChange={handleChange}
                  placeholder="e.g. rahul@example.com"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <span className="form-error-msg">{errors.email}</span>}
              </div>

              <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
                <label htmlFor="phone">10-Digit Mobile Number *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  maxLength={10}
                  value={address.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
              </div>
            </div>

            {/* Street Address */}
            <div className={`form-group ${errors.addressLine ? 'has-error' : ''}`}>
              <label htmlFor="addressLine">Street Address / Flat / Building *</label>
              <input
                id="addressLine"
                name="addressLine"
                type="text"
                value={address.addressLine}
                onChange={handleChange}
                placeholder="e.g. Flat 302, Green Glen Layout, Bellandur"
                aria-invalid={!!errors.addressLine}
              />
              {errors.addressLine && <span className="form-error-msg">{errors.addressLine}</span>}
            </div>

            {/* City, State, PIN Code Grid */}
            <div className="form-grid-3">
              <div className={`form-group ${errors.city ? 'has-error' : ''}`}>
                <label htmlFor="city">City *</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={address.city}
                  onChange={handleChange}
                  placeholder="e.g. Bengaluru"
                  aria-invalid={!!errors.city}
                />
                {errors.city && <span className="form-error-msg">{errors.city}</span>}
              </div>

              <div className={`form-group ${errors.state ? 'has-error' : ''}`}>
                <label htmlFor="state">State *</label>
                <select
                  id="state"
                  name="state"
                  value={address.state}
                  onChange={handleChange}
                  aria-invalid={!!errors.state}
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                {errors.state && <span className="form-error-msg">{errors.state}</span>}
              </div>

              <div className={`form-group ${errors.pinCode ? 'has-error' : ''}`}>
                <label htmlFor="pinCode">6-Digit PIN Code *</label>
                <input
                  id="pinCode"
                  name="pinCode"
                  type="text"
                  maxLength={6}
                  value={address.pinCode}
                  onChange={handleChange}
                  placeholder="e.g. 560103"
                  aria-invalid={!!errors.pinCode}
                />
                {errors.pinCode && <span className="form-error-msg">{errors.pinCode}</span>}
              </div>
            </div>

            {/* Payment Method (Demo) */}
            <div style={{ marginTop: 'var(--space-8)' }}>
              <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--color-border)' }}>
                2. Simulated Payment Method
              </h2>

              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
                Select a test payment method to finalize the simulated transaction.
              </p>

              <div className="payment-methods-grid">
                {/* Cash on Delivery */}
                <label
                  className={`payment-option-label ${paymentMethod === 'cod' ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    style={{ marginTop: '3px' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>
                      <Truck size={16} />
                      <span>Cash on Delivery (Demo)</span>
                    </div>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                      Pay in cash or UPI upon package arrival at your doorstep.
                    </p>
                  </div>
                </label>

                {/* Simulated UPI */}
                <label
                  className={`payment-option-label ${paymentMethod === 'simulated-upi' ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="simulated-upi"
                    checked={paymentMethod === 'simulated-upi'}
                    onChange={() => setPaymentMethod('simulated-upi')}
                    style={{ marginTop: '3px' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>
                      <CreditCard size={16} />
                      <span>Simulated Instant Payment (Sandbox)</span>
                    </div>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                      Instant mock authorization without entering sensitive UPI PIN or cards.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Place Order CTA */}
            <div style={{ marginTop: 'var(--space-8)' }}>
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Processing Demo Order...</span>
                ) : (
                  <>
                    <Lock size={18} />
                    <span>Confirm & Place Demo Order ({formatINR(summary.total)})</span>
                  </>
                )}
              </button>

              <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '10px' }}>
                By placing this simulated order, you agree this is a non-commercial student portfolio demonstration.
              </p>
            </div>
          </form>
        </div>

        {/* Right Column: Order Review Summary */}
        <aside aria-label="Checkout Order Summary">
          <div className="order-summary-card">
            <h3 className="summary-heading">Items in Order ({summary.totalQuantity})</h3>

            {/* Mini Items List */}
            <div style={{ maxHeight: '280px', overflowY: 'auto', marginBottom: 'var(--space-4)', paddingRight: '4px' }}>
              {items.map((item) => (
                <div
                  key={item.product.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--color-border)',
                  }}
                >
                  <div style={{ width: '48px', height: '48px', flexShrink: 0, borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                    <ImageWithFallback src={item.product.images[0]} alt={item.product.name} />
                  </div>
                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.product.name}
                    </h4>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      Qty: {item.quantity} × {formatINR(item.product.price)}
                    </span>
                  </div>
                  <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700 }}>
                    {formatINR(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financials */}
            <div className="summary-row">
              <span>Items Subtotal</span>
              <span>{formatINR(summary.subtotal)}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Charges</span>
              <span style={{ color: summary.deliveryCharge === 0 ? 'var(--color-success)' : 'inherit', fontWeight: 600 }}>
                {summary.deliveryCharge === 0 ? 'FREE' : formatINR(summary.deliveryCharge)}
              </span>
            </div>

            {summary.discount > 0 && (
              <div className="summary-row" style={{ color: 'var(--color-success)' }}>
                <span>Coupon ({summary.promoCodeApplied})</span>
                <span>-{formatINR(summary.discount)}</span>
              </div>
            )}

            <div className="summary-row total-row">
              <span>Total Payable</span>
              <span>{formatINR(summary.total)}</span>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-subtle)', padding: '10px', borderRadius: 'var(--radius-md)', fontSize: '11px', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building size={14} color="#64748B" />
              <span>Fulfilled by Shopfront Central Warehouse, Bengaluru</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
