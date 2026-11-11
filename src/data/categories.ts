import type { ProductCategory } from '../types/product';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  description: string;
  tagline: string;
  image: string;
  itemCount: number;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'Electronics',
    name: 'Electronics',
    description: 'Precision engineered audio, desktop peripherals, and power essentials for modern productivity.',
    tagline: 'Precision & Performance',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    itemCount: 4,
  },
  {
    id: 'Accessories',
    name: 'Accessories',
    description: 'Everyday carry items crafted from full-grain leather, brass, and premium textiles.',
    tagline: 'Timeless Everyday Carry',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    itemCount: 4,
  },
  {
    id: 'Home & Living',
    name: 'Home & Living',
    description: 'Thoughtfully designed objects, handcrafted ceramics, and ambient lighting for peaceful spaces.',
    tagline: 'Warmth & Craftsmanship',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    itemCount: 4,
  },
  {
    id: 'Fashion',
    name: 'Fashion',
    description: 'Essential wardrobe staples made with organic cotton, natural linen, and heritage denim.',
    tagline: 'Quiet, Enduring Style',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    itemCount: 4,
  },
  {
    id: 'Lifestyle',
    name: 'Lifestyle',
    description: 'Daily wellness goods, sustainable drinkware, and journals for creative living.',
    tagline: 'Mindful Daily Rituals',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
    itemCount: 3,
  },
];

