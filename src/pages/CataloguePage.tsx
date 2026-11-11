import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import type { ProductCategory, ProductFiltersState, ProductSortOption } from '../types/product';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductFilters } from '../components/product/ProductFilters';
import { ProductSort } from '../components/product/ProductSort';

export const CataloguePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Compute price bounds from the product catalogue
  const minPossiblePrice = useMemo(() => {
    return Math.min(...PRODUCTS.map((p) => p.price));
  }, []);

  const maxPossiblePrice = useMemo(() => {
    return Math.max(...PRODUCTS.map((p) => p.price));
  }, []);

  // Price & availability local state
  const [minPrice, setMinPrice] = useState<number>(minPossiblePrice);
  const [maxPrice, setMaxPrice] = useState<number>(maxPossiblePrice);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Directly derive category, search query, and sort criteria from searchParams (Single Source of Truth)
  const categoryParam = (searchParams.get('category') as ProductCategory | null) || 'All';
  const searchQuery = searchParams.get('search') || '';
  const sortBy = (searchParams.get('sort') as ProductSortOption) || 'featured';

  const filters: ProductFiltersState = useMemo(() => ({
    category: categoryParam,
    searchQuery,
    minPrice,
    maxPrice,
    inStockOnly,
    sortBy,
  }), [categoryParam, searchQuery, minPrice, maxPrice, inStockOnly, sortBy]);

  const handleFilterChange = (newFilters: Partial<ProductFiltersState>) => {
    if (newFilters.minPrice !== undefined) setMinPrice(newFilters.minPrice);
    if (newFilters.maxPrice !== undefined) setMaxPrice(newFilters.maxPrice);
    if (newFilters.inStockOnly !== undefined) setInStockOnly(newFilters.inStockOnly);

    const newParams = new URLSearchParams(searchParams);

    if (newFilters.category !== undefined) {
      if (newFilters.category === 'All') {
        newParams.delete('category');
      } else {
        newParams.set('category', newFilters.category);
      }
    }

    if (newFilters.searchQuery !== undefined) {
      if (!newFilters.searchQuery.trim()) {
        newParams.delete('search');
      } else {
        newParams.set('search', newFilters.searchQuery.trim());
      }
    }

    if (newFilters.sortBy !== undefined) {
      if (newFilters.sortBy === 'featured') {
        newParams.delete('sort');
      } else {
        newParams.set('sort', newFilters.sortBy);
      }
    }

    setSearchParams(newParams, { replace: true });
  };

  const handleClearFilters = () => {
    setMinPrice(minPossiblePrice);
    setMaxPrice(maxPossiblePrice);
    setInStockOnly(false);
    setSearchParams({}, { replace: true });
  };

  // Filter and sort the products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }

      // Search Query filter (matches name, description, category, tags)
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesTag = product.tagline.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat && !matchesTag) {
          return false;
        }
      }

      // Price filter
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // Stock availability filter
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Sort logic
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        case 'popularity':
          return b.popularity - a.popularity;
        case 'featured':
        default:
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      }
    });
  }, [filters]);

  const isFiltered =
    filters.category !== 'All' ||
    filters.searchQuery.trim() !== '' ||
    filters.minPrice > minPossiblePrice ||
    filters.maxPrice < maxPossiblePrice ||
    filters.inStockOnly ||
    filters.sortBy !== 'featured';

  return (
    <div className="container" style={{ paddingBottom: 'var(--space-16)' }}>
      {/* Breadcrumbs */}
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Catalogue</span>
        {filters.category !== 'All' && (
          <>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{filters.category}</span>
          </>
        )}
      </nav>

      {/* Catalogue Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800 }}>
          {filters.category === 'All' ? 'All Products' : filters.category}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: '4px' }}>
          {filters.searchQuery
            ? `Search results for "${filters.searchQuery}"`
            : 'Browse our complete catalog of durable essentials and curated tools.'}
        </p>
      </div>

      {/* Quick Category Tabs Bar */}
      <div className="category-pills" style={{ marginBottom: 'var(--space-6)' }}>
        {(['All', 'Electronics', 'Accessories', 'Home & Living', 'Fashion', 'Lifestyle'] as const).map(
          (cat) => (
            <button
              key={cat}
              type="button"
              className={`category-pill ${filters.category === cat ? 'active' : ''}`}
              onClick={() => handleFilterChange({ category: cat })}
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/* Mobile Filter Toggle & Controls */}
      <div className="catalogue-controls">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setMobileFilterOpen(true)}
            style={{ display: 'inline-flex' }}
            id="mobile-filter-btn"
          >
            <SlidersHorizontal size={14} />
            <span>Filter Criteria</span>
          </button>

          <span className="catalogue-count">
            Showing <strong>{filteredProducts.length}</strong> of {PRODUCTS.length} products
          </span>

          {isFiltered && (
            <button
              type="button"
              onClick={handleClearFilters}
              style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Clear filters
            </button>
          )}
        </div>

        <ProductSort
          value={filters.sortBy}
          onChange={(newSort) => handleFilterChange({ sortBy: newSort })}
        />
      </div>

      {/* Main Catalogue Grid Layout */}
      <div className="catalogue-layout">
        {/* Desktop Sidebar Filters */}
        <div style={{ display: 'none' }} className="desktop-filters-wrapper">
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            minPossiblePrice={minPossiblePrice}
            maxPossiblePrice={maxPossiblePrice}
          />
        </div>

        {/* Product Grid Area */}
        <section aria-label="Product List">
          <ProductGrid
            products={filteredProducts}
            emptyMessage={
              filters.searchQuery
                ? `No products found matching "${filters.searchQuery}". Try checking your spelling or clearing filters.`
                : 'No products in this price range or category match your current filter settings.'
            }
            onClearFilters={handleClearFilters}
          />
        </section>
      </div>

      {/* Mobile Filters Modal Drawer */}
      {mobileFilterOpen && (
        <div
          className="mobile-drawer-overlay"
          onClick={() => setMobileFilterOpen(false)}
        >
          <div
            className="mobile-drawer"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '360px', width: '85%' }}
          >
            <div className="mobile-drawer-header">
              <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700 }}>
                Filter Catalogue
              </h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                style={{ padding: '6px' }}
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              minPossiblePrice={minPossiblePrice}
              maxPossiblePrice={maxPossiblePrice}
            />

            <div style={{ marginTop: 'var(--space-6)' }}>
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => setMobileFilterOpen(false)}
              >
                Apply & View ({filteredProducts.length} items)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline style helper for desktop filter visibility */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-filters-wrapper {
            display: block !important;
          }
          #mobile-filter-btn {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
