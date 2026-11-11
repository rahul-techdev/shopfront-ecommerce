import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { X, Search, ChevronRight, Package, ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { summary } = useCart();

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      onClose();
    }
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      <div className="mobile-drawer-overlay" onClick={onClose} aria-hidden="true" />
      <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
        <div className="mobile-drawer-header">
          <div className="brand-logo" style={{ fontSize: '1.125rem' }}>
            <div className="logo-mark" style={{ width: '28px', height: '28px' }}>
              <Package size={16} />
            </div>
            <span>SHOPFRONT</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ padding: '6px', color: 'var(--color-text-secondary)' }}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} style={{ marginBottom: 'var(--space-5)' }}>
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>

        {/* Navigation Links */}
        <div className="mobile-nav-links">
          <NavLink to="/" onClick={handleLinkClick} className="mobile-nav-link">
            <span>Home</span>
            <ChevronRight size={16} color="var(--color-text-muted)" />
          </NavLink>
          <NavLink to="/products" onClick={handleLinkClick} className="mobile-nav-link">
            <span>All Products</span>
            <ChevronRight size={16} color="var(--color-text-muted)" />
          </NavLink>
          <NavLink to="/products?category=Electronics" onClick={handleLinkClick} className="mobile-nav-link">
            <span>Electronics</span>
            <ChevronRight size={16} color="var(--color-text-muted)" />
          </NavLink>
          <NavLink to="/products?category=Accessories" onClick={handleLinkClick} className="mobile-nav-link">
            <span>Accessories</span>
            <ChevronRight size={16} color="var(--color-text-muted)" />
          </NavLink>
          <NavLink to="/products?category=Home+%26+Living" onClick={handleLinkClick} className="mobile-nav-link">
            <span>Home & Living</span>
            <ChevronRight size={16} color="var(--color-text-muted)" />
          </NavLink>
          <NavLink to="/products?category=Fashion" onClick={handleLinkClick} className="mobile-nav-link">
            <span>Fashion</span>
            <ChevronRight size={16} color="var(--color-text-muted)" />
          </NavLink>
          <NavLink to="/products?category=Lifestyle" onClick={handleLinkClick} className="mobile-nav-link">
            <span>Lifestyle</span>
            <ChevronRight size={16} color="var(--color-text-muted)" />
          </NavLink>
          <NavLink to="/about" onClick={handleLinkClick} className="mobile-nav-link">
            <span>About Store</span>
            <ChevronRight size={16} color="var(--color-text-muted)" />
          </NavLink>
        </div>

        {/* Mobile Cart Quick CTA */}
        <div style={{ marginTop: 'auto', paddingTop: 'var(--space-6)' }}>
          <NavLink
            to="/cart"
            onClick={handleLinkClick}
            className="btn btn-primary btn-block"
            style={{ justifyContent: 'center' }}
          >
            <ShoppingBag size={18} />
            <span>View Cart ({summary.totalQuantity} items)</span>
          </NavLink>

          <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '12px' }}>
            Student Software Engineering Demo Project
          </p>
        </div>
      </div>
    </>
  );
};
