import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Truck,
  ShieldCheck,
  RefreshCw,
  Plus,
  Minus,
  Check,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { formatINR, calculateDiscount } from '../utils/formatters';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { RatingBadge } from '../components/common/RatingBadge';
import { ProductCard } from '../components/product/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, items } = useCart();
  const { showToast } = useToast();

  const product = PRODUCTS.find((p) => p.id === id);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // If product not found
  if (!product) {
    return (
      <div className="container" style={{ padding: 'var(--space-16) 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
          Product Not Found
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          The product item you are looking for does not exist in our demo inventory or has been relocated.
        </p>
        <Link to="/products" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Return to Catalogue</span>
        </Link>
      </div>
    );
  }

  const discountPercent = calculateDiscount(product.price, product.originalPrice);
  const isInCart = items.some((item) => item.product.id === product.id);

  // Related products from the same category (excluding current item)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < product.stockQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product, quantity);
    showToast(`Added ${quantity} × "${product.name}" to your cart`);
  };

  const handleBuyNow = () => {
    if (!product.inStock) return;
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="container" style={{ paddingBottom: 'var(--space-16)' }}>
      {/* Breadcrumbs */}
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-sep">/</span>
        <Link to="/products">Catalogue</Link>
        <span className="breadcrumb-sep">/</span>
        <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="product-detail-layout">
        {/* Left: Gallery */}
        <div className="gallery-container">
          <div className="gallery-main-image">
            <ImageWithFallback
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="gallery-thumbs">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  className={`gallery-thumb-btn ${selectedImageIndex === index ? 'active' : ''}`}
                  onClick={() => setSelectedImageIndex(index)}
                  aria-label={`View image thumbnail ${index + 1}`}
                >
                  <ImageWithFallback src={img} alt={`${product.name} photo ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Information */}
        <div className="product-detail-info">
          <span className="product-detail-category">{product.category}</span>
          <h1 className="product-detail-title">{product.name}</h1>
          <p className="product-detail-tagline">{product.tagline}</p>

          {/* Rating with demo indicator */}
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <RatingBadge
              rating={product.rating}
              ratingCount={product.ratingCount}
              showSampleLabel={true}
            />
          </div>

          {/* Price & Discount */}
          <div className="product-detail-pricing">
            <span className="detail-price">{formatINR(product.price)}</span>
            {product.originalPrice && (
              <span className="detail-mrp">{formatINR(product.originalPrice)}</span>
            )}
            {discountPercent > 0 && (
              <span className="detail-discount-tag">{discountPercent}% OFF</span>
            )}
          </div>

          {/* Stock Availability Indicator */}
          <div>
            {product.inStock ? (
              product.stockQuantity < 5 ? (
                <div className="stock-status-pill stock-low">
                  <span className="stock-dot" />
                  <span>Only {product.stockQuantity} items left in stock</span>
                </div>
              ) : (
                <div className="stock-status-pill stock-in">
                  <span className="stock-dot" />
                  <span>In Stock (Ready to dispatch)</span>
                </div>
              )
            ) : (
              <div className="stock-status-pill stock-out">
                <span className="stock-dot" />
                <span>Currently Out of Stock</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.65', marginBottom: 'var(--space-6)' }}>
            {product.description}
          </p>

          {/* Key Features Bullet Points */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
              Key Highlights
            </h4>
            <ul style={{ paddingLeft: 'var(--space-5)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: '1.7' }}>
              {product.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Quantity and Actions */}
          {product.inStock && (
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: '6px' }}>
                Quantity
              </label>
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
                <div className="quantity-picker" role="group" aria-label="Select quantity">
                  <button
                    type="button"
                    className="quantity-btn"
                    onClick={handleDecreaseQuantity}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={quantity}
                    readOnly
                    aria-label="Selected quantity"
                  />
                  <button
                    type="button"
                    className="quantity-btn"
                    onClick={handleIncreaseQuantity}
                    disabled={quantity >= product.stockQuantity}
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  className={`btn ${isInCart ? 'btn-secondary' : 'btn-primary'} btn-lg`}
                  onClick={handleAddToCart}
                  style={{ flexGrow: 1 }}
                >
                  {isInCart ? (
                    <>
                      <Check size={18} />
                      <span>Add More to Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={handleBuyNow}
                >
                  <span>Buy Now</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Trust Guarantees */}
          <div
            style={{
              padding: 'var(--space-4)',
              backgroundColor: 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--space-2)',
              textAlign: 'center',
              fontSize: '11px',
              color: 'var(--color-text-secondary)',
              marginTop: 'var(--space-2)',
            }}
          >
            <div>
              <Truck size={16} style={{ margin: '0 auto 4px' }} />
              <div>Free Delivery &gt;₹999</div>
            </div>
            <div>
              <RefreshCw size={16} style={{ margin: '0 auto 4px' }} />
              <div>15-Day Exchange</div>
            </div>
            <div>
              <ShieldCheck size={16} style={{ margin: '0 auto 4px' }} />
              <div>{product.warranty || 'Brand Warranty'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Table Section */}
      <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--color-border)' }}>
        <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
          Technical Specifications
        </h3>
        <table className="specs-table">
          <tbody>
            {Object.entries(product.specifications).map(([key, value]) => (
              <tr key={key}>
                <th>{key}</th>
                <td>{value}</td>
              </tr>
            ))}
            {product.warranty && (
              <tr>
                <th>Warranty Coverage</th>
                <td>{product.warranty}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div style={{ marginTop: 'var(--space-12)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--color-border)' }}>
          <div className="section-header" style={{ marginBottom: 'var(--space-6)' }}>
            <span className="section-eyebrow">Similar Items</span>
            <h3 className="section-title">You might also appreciate</h3>
          </div>
          <div className="product-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
