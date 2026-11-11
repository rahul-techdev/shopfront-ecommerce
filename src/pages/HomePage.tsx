import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Award,
  Zap,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductGrid } from '../components/product/ProductGrid';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const HomePage: React.FC = () => {
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <div>
      {/* Hero Promotional Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <Sparkles size={14} color="#D97706" />
                <span>Spring/Summer 2026 Collection Live</span>
              </div>
              <h1 className="hero-title">
                Everyday essentials, <br />
                thoughtfully crafted.
              </h1>
              <p className="hero-subtitle">
                A conscious retail catalogue of mechanical peripherals, solid brass & leather accessories, high-fire ceramic homeware, and durable organic textiles.
              </p>
              <div className="hero-actions">
                <Link to="/products" className="btn btn-primary btn-lg">
                  <span>Shop All Products</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/products?category=Electronics" className="btn btn-secondary btn-lg">
                  <span>Explore Peripherals</span>
                </Link>
              </div>

              {/* Store Performance Highlights */}
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-value">19+</div>
                  <div className="stat-label">Curated Items</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">5</div>
                  <div className="stat-label">Core Categories</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">4.8★</div>
                  <div className="stat-label">Catalogue Rating</div>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-visual-card">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80"
                  alt="Aura Pro Wireless ANC Headphones showcase"
                />
                <div className="hero-visual-caption">
                  <div>
                    <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>
                      Featured Item of the Week
                    </h4>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                      Aura Pro Wireless ANC Headphones
                    </p>
                  </div>
                  <Link
                    to="/products/sp-elec-01"
                    className="btn btn-outline btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section style={{ padding: 'var(--space-12) 0' }}>
        <div className="container">
          <div className="section-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="section-eyebrow">Explore Collections</span>
              <h2 className="section-title">Shop by Category</h2>
              <p className="section-subtitle">
                Select a department to view specialized tools, homeware, and everyday lifestyle gear.
              </p>
            </div>
            <Link
              to="/products"
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 600,
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>View All 5 Categories</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="category-cards-grid">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="category-card"
              >
                <div className="category-card-image">
                  <ImageWithFallback src={category.image} alt={category.name} />
                </div>
                <div className="category-card-body">
                  <h3 className="category-card-title">{category.name}</h3>
                  <span className="category-card-count">{category.itemCount} items</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best-Selling Products Section */}
      <section style={{ padding: 'var(--space-12) 0', backgroundColor: 'var(--color-bg-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Top Rated Essentials</span>
            <h2 className="section-title">Best-Selling Products</h2>
            <p className="section-subtitle">
              Our most popular customer favorites, proven for everyday utility, build quality, and lasting satisfaction.
            </p>
          </div>

          <ProductGrid products={bestSellers} />

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link to="/products" className="btn btn-secondary">
              <span>View Entire Best-Seller Collection</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Offers Strip */}
      <section className="promo-strip-section">
        <div className="container">
          <div className="promo-benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon-wrapper">
                <Truck size={20} />
              </div>
              <div>
                <h4 className="benefit-title">Complimentary Shipping</h4>
                <p className="benefit-desc">Free pan-India delivery on orders above ₹999.</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon-wrapper">
                <RotateCcw size={20} />
              </div>
              <div>
                <h4 className="benefit-title">15-Day Exchange</h4>
                <p className="benefit-desc">Hassle-free return & replacement demo guarantee.</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon-wrapper">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="benefit-title">Ethical Sourcing</h4>
                <p className="benefit-desc">Solid woods, organic cotton & recyclable packaging.</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon-wrapper">
                <Award size={20} />
              </div>
              <div>
                <h4 className="benefit-title">Hardware Warranty</h4>
                <p className="benefit-desc">Up to 2-year manufacturer coverage on electronics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Added Products */}
      <section style={{ padding: 'var(--space-12) 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Fresh Catalogue Arrivals</span>
            <h2 className="section-title">Recently Added</h2>
            <p className="section-subtitle">
              Discover the latest product designs added to our inventory this season.
            </p>
          </div>

          <ProductGrid products={newArrivals} />
        </div>
      </section>

      {/* Special Promotional Coupon Callout */}
      <section style={{ padding: '0 0 var(--space-16) 0' }}>
        <div className="container">
          <div
            style={{
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-8) var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#FBBF24', fontSize: 'var(--font-size-xs)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>
              <Zap size={16} />
              <span>Limited Promotional Code</span>
            </div>
            <h3 style={{ color: '#FFFFFF', fontSize: 'var(--font-size-2xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
              Get 10% Off Your Entire Order
            </h3>
            <p style={{ color: '#94A3B8', fontSize: 'var(--font-size-sm)', maxWidth: '540px', marginBottom: 'var(--space-4)' }}>
              Use checkout demo coupon code <code style={{ backgroundColor: '#1E293B', padding: '2px 8px', borderRadius: '4px', color: '#F8FAFC', fontWeight: 700 }}>SHOPFRONT10</code> to unlock an instant 10% discount on any cart subtotal.
            </p>
            <Link to="/products" className="btn btn-secondary" style={{ backgroundColor: '#FFFFFF', color: '#0F172A', borderColor: '#FFFFFF' }}>
              <span>Shop & Claim Coupon</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

