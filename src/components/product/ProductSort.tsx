import React from 'react';
import type { ProductSortOption } from '../../types/product';

interface ProductSortProps {
  value: ProductSortOption;
  onChange: (value: ProductSortOption) => void;
}

export const ProductSort: React.FC<ProductSortProps> = ({ value, onChange }) => {
  return (
    <div className="catalogue-sort-wrapper">
      <label htmlFor="sort-select">Sort by:</label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as ProductSortOption)}
        aria-label="Sort products by criteria"
        style={{ height: '38px', padding: '0 10px', minWidth: '175px' }}
      >
        <option value="featured">Featured Essentials</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="newest">Newest Arrivals</option>
        <option value="popularity">Popularity (Sample Score)</option>
      </select>
    </div>
  );
};
