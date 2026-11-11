import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import type { CartItem } from '../../types/cart';
import { formatINR } from '../../utils/formatters';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const { product, quantity } = item;
  const lineTotal = product.price * quantity;

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(product.id, quantity - 1);
    } else {
      onRemove(product.id);
    }
  };

  const handleIncrease = () => {
    if (quantity < product.stockQuantity) {
      onUpdateQuantity(product.id, quantity + 1);
    }
  };

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value, 10);
    if (!isNaN(parsed)) {
      onUpdateQuantity(product.id, parsed);
    }
  };

  return (
    <div className="cart-item-row" role="row">
      {/* Thumbnail */}
      <Link to={`/products/${product.id}`} className="cart-item-image">
        <ImageWithFallback src={product.images[0]} alt={product.name} />
      </Link>

      {/* Details */}
      <div className="cart-item-details">
        <span className="cart-item-category">{product.category}</span>
        <h4 className="cart-item-title">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h4>
        <span className="cart-item-unit-price">
          Unit: {formatINR(product.price)} each
        </span>
        {product.stockQuantity < 5 && (
          <span style={{ fontSize: '11px', color: 'var(--color-warning)', marginTop: '4px' }}>
            Only {product.stockQuantity} remaining in stock
          </span>
        )}
      </div>

      {/* Quantity Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div className="quantity-picker" role="group" aria-label={`Quantity for ${product.name}`}>
          <button
            type="button"
            className="quantity-btn"
            onClick={handleDecrease}
            aria-label="Decrease quantity"
            title="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <input
            type="number"
            className="quantity-input"
            value={quantity}
            onChange={handleManualInput}
            min={1}
            max={product.stockQuantity}
            aria-label={`Current quantity of ${product.name}`}
          />
          <button
            type="button"
            className="quantity-btn"
            onClick={handleIncrease}
            disabled={quantity >= product.stockQuantity}
            aria-label="Increase quantity"
            title={quantity >= product.stockQuantity ? 'Maximum stock reached' : 'Increase quantity'}
          >
            <Plus size={14} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => onRemove(product.id)}
          style={{
            padding: '8px',
            color: 'var(--color-text-muted)',
            transition: 'color var(--transition-fast)',
            display: 'flex',
            alignItems: 'center',
          }}
          title="Remove item from cart"
          aria-label={`Remove ${product.name} from cart`}
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Line Total */}
      <div className="cart-item-line-total">
        {formatINR(lineTotal)}
      </div>
    </div>
  );
};

