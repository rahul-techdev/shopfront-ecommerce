import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ShieldCheck, Truck, RefreshCw, Mail, Phone, MapPin } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <div className="brand-logo" style={{ color: '#FFFFFF', marginBottom: 'var(--space-4)' }}>
              <div className="logo-mark" style={{ backgroundColor: '#FFFFFF', color: '#0F172A' }}>
                <Package size={18} strokeWidth={2.5} />
              </div>
              <span>SHOPFRONT</span>
            </div>
            <p style={{ color: '#94A3B8', fontSize: 'var(--font-size-sm)', lineHeight: '1.6', maxWidth: '320px' }}>
              A modern, curated e-commerce storefront showcasing intentional everyday goods, mechanical peripherals, handcrafted homeware, and durable apparel.
            </p>
            <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: 'var(--font-size-xs)', color: '#CBD5E1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} color="#94A3B8" />
                <span>Indiranagar, Bengaluru, Karnataka 560038</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} color="#94A3B8" />
                <span>support@shopfront-demo.store</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} color="#94A3B8" />
                <span>+91 (080) 4920-0010 (Demo Mon-Fri)</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              <li>
                <Link to="/products?category=Electronics">Electronics</Link>
              </li>
              <li>
                <Link to="/products?category=Accessories">Accessories</Link>
              </li>
              <li>
                <Link to="/products?category=Home+%26+Living">Home & Living</Link>
              </li>
              <li>
                <Link to="/products?category=Fashion">Fashion & Apparel</Link>
              </li>
              <li>
                <Link to="/products?category=Lifestyle">Lifestyle & Wellness</Link>
              </li>
              <li>
                <Link to="/products">All Products</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service & Policies */}
          <div>
            <h4 className="footer-heading">Customer Care</h4>
            <ul className="footer-links">
              <li>
                <Link to="/about">About Shopfront</Link>
              </li>
              <li>
                <a href="#shipping" onClick={(e) => { e.preventDefault(); alert('Demo Notice: Standard delivery takes 3-5 business days across India. Free shipping applies on orders over ₹999.'); }}>
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#returns" onClick={(e) => { e.preventDefault(); alert('Demo Notice: 15-day hassle-free exchange & return policy on unworn apparel and unopened hardware.'); }}>
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#track" onClick={(e) => { e.preventDefault(); alert('Demo Notice: Enter your demo order ID generated at checkout to track simulated dispatch.'); }}>
                  Track Order
                </a>
              </li>
              <li>
                <a href="#faqs" onClick={(e) => { e.preventDefault(); alert('Demo Notice: This store is a portfolio project built with React, TypeScript, and Vite.'); }}>
                  Help & FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Portfolio & Architecture Info */}
          <div>
            <h4 className="footer-heading">Student Portfolio</h4>
            <p style={{ color: '#94A3B8', fontSize: 'var(--font-size-xs)', lineHeight: '1.6', marginBottom: 'var(--space-3)' }}>
              Built as a comprehensive frontend engineering showcase. Features React 19, TypeScript, React Router 7, context state management, and LocalStorage persistence.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#CBD5E1' }}>
                <ShieldCheck size={14} color="#34D399" />
                <span>Zero real financial credentials collected</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#CBD5E1' }}>
                <Truck size={14} color="#38BDF8" />
                <span>Simulated delivery fulfillment pipeline</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#CBD5E1' }}>
                <RefreshCw size={14} color="#FBBF24" />
                <span>LocalStorage cart auto-recovery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="footer-bottom">
          <p>© {CURRENT_YEAR} SHOPFRONT Essentials. Created for educational and demonstration purposes.</p>
          <p>Currency: INR (₹) • Responsive E-Commerce Architecture</p>
        </div>
      </div>
    </footer>
  );
};
