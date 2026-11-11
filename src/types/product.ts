export type ProductCategory =
  | 'Electronics'
  | 'Accessories'
  | 'Home & Living'
  | 'Fashion'
  | 'Lifestyle';

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number; // in INR
  originalPrice?: number; // MRP in INR
  category: ProductCategory;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  rating: number; // Demo rating (e.g., 4.6)
  ratingCount: number; // Demo rating count (e.g., 84)
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  popularity: number; // 1-100 sample popularity score for sorting
  features: string[];
  specifications: Record<string, string>;
  warranty?: string;
}

export type ProductSortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'newest'
  | 'popularity';

export interface ProductFiltersState {
  category: ProductCategory | 'All';
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  sortBy: ProductSortOption;
}

