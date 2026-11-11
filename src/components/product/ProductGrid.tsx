import React from 'react';
import type { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { PackageOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  onClearFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  emptyMessage = 'No products matched your selected filters.',
  onClearFilters,
}) => {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <PackageOpen size={32} />
        </div>
        <h3 className="empty-state-title">No products found</h3>
        <p className="empty-state-desc">{emptyMessage}</p>
        {onClearFilters ? (
          <button type="button" onClick={onClearFilters} className="btn btn-primary">
            Clear All Filters
          </button>
        ) : (
          <Link to="/products" className="btn btn-primary">
            Explore All Products
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

