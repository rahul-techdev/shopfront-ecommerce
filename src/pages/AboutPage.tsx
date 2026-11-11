import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  Shield,
  Smartphone,
  Database,
  ArrowRight,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: 'var(--space-8) var(--space-4) var(--space-16)' }}>
      {/* Breadcrumbs */}
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">About Project</span>
      </nav>

      <div style={{ maxWidth: '840px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <span className="section-eyebrow">Student Software Engineering Portfolio</span>
          <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 800, marginTop: 'var(--space-2)' }}>
            About Shopfront
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-lg)', marginTop: 'var(--space-3)', lineHeight: '1.6' }}>
            A production-calibre responsive e-commerce storefront engineered from first principles with React 19, TypeScript, Vite, and modern CSS architecture.
          </p>
        </div>

        {/* Project Mission & Design Principles */}
        <section style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
            Design Philosophy
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7', marginBottom: 'var(--space-4)' }}>
            Unlike generic AI-generated templates with oversaturated gradients, heavy glassmorphism, and cartoonish animations, <strong>Shopfront</strong> is styled to mirror the authentic aesthetic of a curated, high-craft online merchant.
          </p>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>
            The visual design employs a clean white and warm neutral surface palette, dark charcoal typography, restrained slate and amber brand accents, balanced typographic hierarchy, and responsive grid layouts tested for fluid behavior across smartphones, tablets, and desktop displays.
          </p>
        </section>

        {/* Technical Architecture Highlights */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, marginBottom: 'var(--space-6)' }}>
            Key Architecture & Technical Highlights
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)' }}>
            <div style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-5)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-3)' }}>
                <Code size={20} />
              </div>
              <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, marginBottom: '6px' }}>
                Strict TypeScript Typing
              </h3>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                Exhaustive domain models for products, cart line items, discounts, order fulfillment, and form validations with compile-time type safety.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-5)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-3)' }}>
                <Database size={20} />
              </div>
              <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, marginBottom: '6px' }}>
                Resilient LocalStorage Sync
              </h3>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                Cart state, quantity modifications, applied coupons, and demo order receipts are automatically persisted with fail-safe error handling.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-5)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-3)' }}>
                <Smartphone size={20} />
              </div>
              <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, marginBottom: '6px' }}>
                Mobile-First Fluid UX
              </h3>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                Dedicated mobile navigation drawer, collapsible filter drawer, touch-friendly hit areas, and zero unwanted horizontal overflow.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-5)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: '#F3E8FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-3)' }}>
                <Shield size={20} />
              </div>
              <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, marginBottom: '6px' }}>
                Responsible Demo Ethics
              </h3>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                Does not fabricate fake customer reviews, never asks for card numbers or banking secrets, and clearly states simulated execution.
              </p>
            </div>
          </div>
        </section>

        {/* Currency & Localization */}
        <section style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-8)', marginBottom: 'var(--space-12)' }}>
          <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
            Indian Rupee (INR) Formatting & Validation
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: '1.7', marginBottom: 'var(--space-3)' }}>
            All commercial prices conform to the official Indian Numbering System using native <code style={{ backgroundColor: 'var(--color-bg-subtle)', padding: '2px 6px', borderRadius: '4px' }}>Intl.NumberFormat('en-IN')</code> (e.g., ₹1,499, ₹12,499).
          </p>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: '1.7' }}>
            Checkout validation implements strict regex checking for 10-digit Indian mobile numbers and 6-digit postal PIN codes with informative inline validation feedback.
          </p>
        </section>

        <div style={{ textAlign: 'center' }}>
          <Link to="/products" className="btn btn-primary btn-lg">
            <span>Explore Storefront Catalogue</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};
