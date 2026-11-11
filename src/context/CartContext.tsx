import React, { useEffect, useState, useMemo } from 'react';
import type { CartContextType, CartItem, CartSummary } from '../types/cart';
import type { Product } from '../types/product';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { CartContext } from './cartContextDef';

const CART_STORAGE_KEY = 'shopfront_cart_v1';
const PROMO_STORAGE_KEY = 'shopfront_applied_promo_v1';
const FREE_DELIVERY_THRESHOLD = 999;
const STANDARD_DELIVERY_FEE = 99;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    return loadFromStorage<CartItem[]>(CART_STORAGE_KEY, []);
  });

  const [appliedPromo, setAppliedPromo] = useState<string | null>(() => {
    return loadFromStorage<string | null>(PROMO_STORAGE_KEY, null);
  });

  // Sync to local storage on change
  useEffect(() => {
    saveToStorage(CART_STORAGE_KEY, items);
  }, [items]);

  useEffect(() => {
    if (appliedPromo) {
      saveToStorage(PROMO_STORAGE_KEY, appliedPromo);
    } else {
      localStorage.removeItem(PROMO_STORAGE_KEY);
    }
  }, [appliedPromo]);

  const addToCart = (product: Product, quantity = 1) => {
    if (quantity <= 0) return;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id);

      if (existingIndex > -1) {
        const existingItem = prevItems[existingIndex];
        const newQuantity = Math.min(
          existingItem.quantity + quantity,
          product.stockQuantity
        );

        const updated = [...prevItems];
        updated[existingIndex] = {
          ...existingItem,
          quantity: newQuantity,
        };
        return updated;
      }

      const initialQty = Math.min(quantity, product.stockQuantity);
      return [...prevItems, { product, quantity: initialQty }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.product.id === productId) {
          const maxStock = item.product.stockQuantity;
          const validQuantity = Math.min(Math.max(1, Math.floor(quantity)), maxStock);
          return { ...item, quantity: validQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code: string): { success: boolean; message: string } => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      return { success: false, message: 'Please enter a coupon code' };
    }

    if (trimmed === 'SHOPFRONT10') {
      setAppliedPromo('SHOPFRONT10');
      return { success: true, message: '10% discount applied successfully!' };
    }

    if (trimmed === 'WELCOME50') {
      setAppliedPromo('WELCOME50');
      return { success: true, message: '₹50 welcome discount applied!' };
    }

    return {
      success: false,
      message: 'Invalid code. Try "SHOPFRONT10" for 10% off or "WELCOME50" for ₹50 off.',
    };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  // Cart summary calculations
  const summary: CartSummary = useMemo(() => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const deliveryCharge =
      items.length === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;

    const amountNeededForFreeDelivery =
      subtotal < FREE_DELIVERY_THRESHOLD && items.length > 0
        ? FREE_DELIVERY_THRESHOLD - subtotal
        : 0;

    let discount = 0;
    if (appliedPromo === 'SHOPFRONT10') {
      discount = Math.round(subtotal * 0.1);
    } else if (appliedPromo === 'WELCOME50') {
      discount = Math.min(50, subtotal);
    }

    const total = Math.max(0, subtotal + deliveryCharge - discount);

    return {
      subtotal,
      deliveryCharge,
      freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
      amountNeededForFreeDelivery,
      discount,
      promoCodeApplied: appliedPromo ?? undefined,
      total,
      totalQuantity,
    };
  }, [items, appliedPromo]);

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyPromoCode,
    removePromoCode,
    appliedPromo,
    summary,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
