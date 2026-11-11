import type { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartSummary {
  subtotal: number;
  deliveryCharge: number;
  freeDeliveryThreshold: number;
  amountNeededForFreeDelivery: number;
  discount: number;
  promoCodeApplied?: string;
  total: number;
  totalQuantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  appliedPromo: string | null;
  summary: CartSummary;
}
