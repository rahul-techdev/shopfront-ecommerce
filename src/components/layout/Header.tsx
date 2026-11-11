import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Package } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { DemoNotice } from '../common/DemoNotice';

interface HeaderProps {
  onToggleMobileNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileNav }) => {
  const { summary } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <>
      <DemoNotice />
      <header className="site-header">
        <div className="container">
          <div className="header-inner">
            {/* Logo */}
            <Link to="/" className="brand-logo" aria-label="Shopfront Homepage">
              <div className="logo-mark">
                <Package size={18} strokeWidth={2.5} />
              </div>
              <span>SHOPFRONT</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="main-nav" aria-label="Main Navigation">
              <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
              <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                All Products
              </NavLink>
              <NavLink to="/products?category=Electronics" className="nav-link">
                Electronics
              </NavLink>
              <NavLink to="/products?category=Accessories" className="nav-link">
                Accessories
              </NavLink>
              <NavLink to="/products?category=Home+%26+Living" className="nav-link">
                Home & Living
              </NavLink>
              <NavLink to="/products?category=Fashion" className="nav-link">
                Fashion
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                About
              </NavLink>
            </nav>

            {/* Header Right Actions */}
            <div className="header-actions">
              {/* Desktop Search Bar */}
              <form onSubmit={handleSearchSubmit} className="search-bar-desktop" role="search">
                <div className="search-input-wrapper">
                  <Search size={16} className="search-icon" aria-hidden="true" />
                  <input
                    type="search"
                    placeholder="Search goods, gear..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search products"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="search-clear-btn"
                      aria-label="Clear search"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </form>

              {/* Cart Icon */}
              <Link
                to="/cart"
                className="cart-button-link"
                aria-label={`Shopping cart with ${summary.totalQuantity} items`}
              >
                <ShoppingBag size={20} />
                {summary.totalQuantity > 0 && (
                  <span className="cart-badge">{summary.totalQuantity}</span>
                )}
              </Link>

              {/* Mobile Drawer Toggle */}
              <button
                type="button"
                className="mobile-menu-toggle"
                onClick={onToggleMobileNav}
                aria-label="Open mobile navigation menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
