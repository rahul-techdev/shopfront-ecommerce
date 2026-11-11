import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Check, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import type { CartSummary } from '../../types/cart';
import { formatINR } from '../../utils/formatters';

interface OrderSummaryProps {
  summary: CartSummary;
  onApplyPromo: (code: string) => { success: boolean; message: string };
  onRemovePromo: () => void;
  showCheckoutButton?: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  summary,
  onApplyPromo,
  onRemovePromo,
  showCheckoutButton = true,
}) => {
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;

    const result = onApplyPromo(promoCodeInput);
    setPromoMessage({ text: result.message, isError: !result.success });
    if (result.success) {
      setPromoCodeInput('');
    }
  };

  return (
    <aside className="order-summary-card" aria-label="Order Financial Summary">
      <h3 className="summary-heading">Order Summary</h3>

      {/* Free Delivery Target Indicator */}
      {summary.amountNeededForFreeDelivery > 0 ? (
        <div className="free-delivery-progress">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
            <Truck size={14} />
            <span>Add {formatINR(summary.amountNeededForFreeDelivery)} more for FREE Delivery!</span>
          </div>
          <p style={{ fontSize: '11px', marginTop: '2px', opacity: 0.9 }}>
            Free shipping unlocks on orders over ₹{summary.freeDeliveryThreshold.toLocaleString('en-IN')}.
          </p>
        </div>
      ) : (
        <div
          className="free-delivery-progress"
          style={{ backgroundColor: '#DCFCE7', borderColor: '#BBF7D0', color: '#15803D' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
            <Check size={14} />
            <span>Congratulations! You qualify for FREE Delivery</span>
          </div>
        </div>
      )}

      {/* Cost Breakdown */}
      <div className="summary-row">
        <span>Subtotal ({summary.totalQuantity} items)</span>
        <span style={{ fontWeight: 600 }}>{formatINR(summary.subtotal)}</span>
      </div>

      <div className="summary-row">
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          Delivery Charges
        </span>
        <span style={{ fontWeight: 600, color: summary.deliveryCharge === 0 ? 'var(--color-success)' : 'inherit' }}>
          {summary.deliveryCharge === 0 ? 'FREE' : formatINR(summary.deliveryCharge)}
        </span>
      </div>

      {summary.discount > 0 && (
        <div className="summary-row" style={{ color: 'var(--color-success)' }}>
          <span>Promo Discount ({summary.promoCodeApplied})</span>
          <span style={{ fontWeight: 600 }}>-{formatINR(summary.discount)}</span>
        </div>
      )}

      {/* Promo Code Input */}
      {summary.promoCodeApplied ? (
        <div className="applied-promo-tag">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Tag size={13} />
            <span>Code <strong>{summary.promoCodeApplied}</strong> applied</span>
          </div>
          <button
            type="button"
            onClick={onRemovePromo}
            style={{ fontSize: '11px', color: 'var(--color-error)', textDecoration: 'underline' }}
          >
            Remove
          </button>
        </div>
      ) : (
        <form onSubmit={handleApplyPromo} className="promo-form">
          <input
            type="text"
            placeholder="Promo code (e.g. SHOPFRONT10)"
            value={promoCodeInput}
            onChange={(e) => setPromoCodeInput(e.target.value)}
            style={{ flexGrow: 1 }}
            aria-label="Enter promotional discount code"
          />
          <button type="submit" className="btn btn-secondary btn-sm">
            Apply
          </button>
        </form>
      )}

      {promoMessage && (
        <p
          style={{
            fontSize: '11px',
            color: promoMessage.isError ? 'var(--color-error)' : 'var(--color-success)',
            marginBottom: 'var(--space-3)',
          }}
        >
          {promoMessage.text}
        </p>
      )}

      <div className="summary-row total-row">
        <span>Total Amount</span>
        <span>{formatINR(summary.total)}</span>
      </div>

      {showCheckoutButton && (
        <Link
          to="/checkout"
          className="btn btn-primary btn-block btn-lg"
          style={{ marginBottom: 'var(--space-4)' }}
        >
          <span>Proceed to Checkout</span>
          <ArrowRight size={18} />
        </Link>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--color-text-muted)', justifyContent: 'center' }}>
        <ShieldCheck size={14} color="#10B981" />
        <span>Portfolio Demo • Simulated Sandbox Checkout</span>
      </div>
    </aside>
  );
};

