import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import {
  CheckCircle2,
  MapPin,
  Printer,
  ArrowRight,
} from 'lucide-react';
import type { OrderConfirmationDetails } from '../types/order';
import { formatINR } from '../utils/formatters';
import { loadFromStorage } from '../utils/storage';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();

  // Retrieve order details from navigation state or local storage
  const stateOrder = location.state?.order as OrderConfirmationDetails | undefined;
  const storedOrder = orderId
    ? loadFromStorage<OrderConfirmationDetails | null>(`order_${orderId}`, null)
    : null;

  const order = stateOrder || storedOrder;

  if (!order) {
    return (
      <div className="container" style={{ padding: 'var(--space-16) 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
          Order Record Not Found
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          Could not locate simulated order details for reference ID #{orderId}.
        </p>
        <Link to="/products" className="btn btn-primary">
          <span>Return to Storefront</span>
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container" style={{ paddingBottom: 'var(--space-16)' }}>
      <div className="confirmation-card">
        {/* Header with success check */}
        <div className="confirmation-header">
          <div className="confirmation-check-icon">
            <CheckCircle2 size={32} />
          </div>
          <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, marginBottom: 'var(--space-1)' }}>
            Thank You for Your Order!
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            Your simulated order has been registered in the sandbox testing environment.
          </p>
          <div className="order-id-badge">Order ID: {order.orderId}</div>
        </div>

        {/* Order Meta Highlights */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-4)',
            backgroundColor: 'var(--color-bg-subtle)',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-6)',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          <div>
            <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-muted)' }}>
              Order Date
            </span>
            <strong>{order.orderDate}</strong>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-muted)' }}>
              Estimated Delivery
            </span>
            <strong style={{ color: 'var(--color-accent)' }}>{order.estimatedDelivery}</strong>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-muted)' }}>
              Payment Method
            </span>
            <strong>{order.paymentMethod === 'cod' ? 'Cash on Delivery (Demo)' : 'Simulated UPI'}</strong>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-muted)' }}>
              Payment Status
            </span>
            <strong style={{ color: 'var(--color-success)' }}>{order.paymentStatus}</strong>
          </div>
        </div>

        {/* Shipping Address Recap */}
        <div style={{ marginBottom: 'var(--space-6)', padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
            <MapPin size={16} color="var(--color-primary)" />
            <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>
              Shipping Destination
            </h3>
          </div>
          <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
            <p><strong>{order.shippingAddress.fullName}</strong></p>
            <p>{order.shippingAddress.addressLine}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} – {order.shippingAddress.pinCode}</p>
            <p>Phone: +91 {order.shippingAddress.phone} • Email: {order.shippingAddress.email}</p>
          </div>
        </div>

        {/* Ordered Items Table */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
            Ordered Items ({order.items.length})
          </h3>

          <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            {order.items.map((item) => (
              <div
                key={item.product.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--color-border)', flexShrink: 0 }}>
                  <ImageWithFallback src={item.product.images[0]} alt={item.product.name} />
                </div>
                <div style={{ flexGrow: 1 }}>
                  <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>
                    {item.product.name}
                  </h4>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                    Qty: {item.quantity} × {formatINR(item.product.price)}
                  </span>
                </div>
                <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>
                  {formatINR(item.product.price * item.quantity)}
                </span>
              </div>
            ))}

            {/* Financial Totals */}
            <div style={{ padding: '16px', backgroundColor: 'var(--color-bg-subtle)' }}>
              <div className="summary-row" style={{ marginBottom: '6px' }}>
                <span>Subtotal</span>
                <span>{formatINR(order.summary.subtotal)}</span>
              </div>
              <div className="summary-row" style={{ marginBottom: '6px' }}>
                <span>Delivery Charges</span>
                <span>{order.summary.deliveryCharge === 0 ? 'FREE' : formatINR(order.summary.deliveryCharge)}</span>
              </div>
              {order.summary.discount > 0 && (
                <div className="summary-row" style={{ color: 'var(--color-success)', marginBottom: '6px' }}>
                  <span>Discount ({order.summary.promoCodeApplied})</span>
                  <span>-{formatINR(order.summary.discount)}</span>
                </div>
              )}
              <div className="summary-row" style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, borderTop: '1px solid var(--color-border)', paddingTop: '8px', marginTop: '8px', marginBottom: 0 }}>
                <span>Final Paid Amount</span>
                <span>{formatINR(order.summary.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handlePrint}
            className="btn btn-secondary"
            style={{ flexGrow: 1 }}
          >
            <Printer size={16} />
            <span>Print Receipt</span>
          </button>

          <Link
            to="/products"
            className="btn btn-primary"
            style={{ flexGrow: 1 }}
          >
            <span>Continue Shopping</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: 'var(--space-6)' }}>
          Portfolio Demonstration • No monetary debits occurred • Order data saved locally
        </p>
      </div>
    </div>
  );
};
