import React from 'react';
import type { ProductCategory, ProductFiltersState } from '../../types/product';
import { RotateCcw } from 'lucide-react';

interface ProductFiltersProps {
  filters: ProductFiltersState;
  onFilterChange: (newFilters: Partial<ProductFiltersState>) => void;
  onClearFilters: () => void;
  minPossiblePrice: number;
  maxPossiblePrice: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  minPossiblePrice,
  maxPossiblePrice,
}) => {
  const categoriesList: (ProductCategory | 'All')[] = [
    'All',
    'Electronics',
    'Accessories',
    'Home & Living',
    'Fashion',
    'Lifestyle',
  ];

  return (
    <aside className="filter-sidebar" aria-label="Product Catalogue Filters">
      <div className="filter-sidebar-header">
        <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700 }}>Filters</h3>
        <button
          type="button"
          onClick={onClearFilters}
          className="btn btn-outline btn-sm"
          style={{ fontSize: '11px', padding: '3px 8px' }}
          title="Reset all filters"
        >
          <RotateCcw size={12} />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="filter-section">
        <h4 className="filter-heading">Category</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {categoriesList.map((cat) => {
            const isSelected = filters.category === cat;
            return (
              <label
                key={cat}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: 'var(--font-size-sm)',
                  cursor: 'pointer',
                  color: isSelected ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  fontWeight: isSelected ? 600 : 400,
                }}
              >
                <input
                  type="radio"
                  name="product-category"
                  checked={isSelected}
                  onChange={() => onFilterChange({ category: cat })}
                  style={{ accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                />
                <span>{cat}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="filter-section">
        <h4 className="filter-heading">Price Range (INR)</h4>
        <div className="price-filter-inputs">
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '2px' }}>
              Min (₹)
            </label>
            <input
              type="number"
              min={minPossiblePrice}
              max={filters.maxPrice}
              value={filters.minPrice || ''}
              onChange={(e) => {
                const val = e.target.value === '' ? minPossiblePrice : Number(e.target.value);
                onFilterChange({ minPrice: val });
              }}
              placeholder={`₹${minPossiblePrice}`}
            />
          </div>
          <span style={{ color: 'var(--color-text-muted)', paddingTop: '16px' }}>–</span>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '2px' }}>
              Max (₹)
            </label>
            <input
              type="number"
              min={filters.minPrice}
              max={maxPossiblePrice}
              value={filters.maxPrice || ''}
              onChange={(e) => {
                const val = e.target.value === '' ? maxPossiblePrice : Number(e.target.value);
                onFilterChange({ maxPrice: val });
              }}
              placeholder={`₹${maxPossiblePrice}`}
            />
          </div>
        </div>
        <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
          Showing ₹{filters.minPrice.toLocaleString('en-IN')} to ₹{filters.maxPrice.toLocaleString('en-IN')}
        </p>
      </div>

      {/* Stock Availability */}
      <div className="filter-section">
        <h4 className="filter-heading">Availability</h4>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: 'var(--font-size-sm)',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange({ inStockOnly: e.target.checked })}
            style={{ accentColor: 'var(--color-primary)', cursor: 'pointer' }}
          />
          <span>In Stock Only</span>
        </label>
      </div>
    </aside>
  );
};
