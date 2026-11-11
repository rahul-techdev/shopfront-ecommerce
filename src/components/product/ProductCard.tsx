import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Check } from 'lucide-react';
import type { Product } from '../../types/product';
import { formatINR, calculateDiscount } from '../../utils/formatters';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../../hooks/useToast';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { RatingBadge } from '../common/RatingBadge';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, items } = useCart();
  const { showToast } = useToast();

  const discountPercent = calculateDiscount(product.price, product.originalPrice);
  const isInCart = items.some((item) => item.product.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;

    addToCart(product, 1);
    showToast(`Added "${product.name}" to cart`);
  };

  return (
    <article className="product-card" aria-label={product.name}>
      {/* Product Image Link */}
      <Link to={`/products/${product.id}`} className="product-card-media" tabIndex={-1}>
        <ImageWithFallback
          src={product.images[0]}
          alt={product.name}
        />
        {/* Badges */}
        <div className="product-card-badges">
          {product.isBestSeller && <span className="badge badge-dark">Bestseller</span>}
          {product.isNewArrival && <span className="badge badge-new">New Arrival</span>}
          {discountPercent > 0 && (
            <span className="badge badge-sale">{discountPercent}% OFF</span>
          )}
        </div>
      </Link>

      {/* Product Information */}
      <div className="product-card-content">
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-title">
          <Link to={`/products/${product.id}`} title={product.name}>
            {product.name}
          </Link>
        </h3>
        <p className="product-card-tagline">{product.tagline}</p>

        {/* Demo Rating */}
        <RatingBadge rating={product.rating} ratingCount={product.ratingCount} />

        {/* Price Row */}
        <div className="product-card-pricing">
          <span className="product-card-price">{formatINR(product.price)}</span>
          {product.originalPrice && (
            <span className="product-card-original-price">
              {formatINR(product.originalPrice)}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="product-card-discount">{discountPercent}% off</span>
          )}
        </div>

        {/* Action Button */}
        <div className="product-card-footer">
          <button
            type="button"
            className={`btn ${isInCart ? 'btn-secondary' : 'btn-primary'} product-card-add-btn`}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to cart`}
          >
            {isInCart ? (
              <>
                <Check size={16} />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
