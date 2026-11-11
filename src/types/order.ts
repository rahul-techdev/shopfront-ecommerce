import type { CartItem, CartSummary } from './cart';

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pinCode: string;
}

export type DemoPaymentMethod = 'cod' | 'simulated-upi' | 'simulated-netbanking';

export interface OrderConfirmationDetails {
  orderId: string;
  orderDate: string;
  estimatedDelivery: string;
  items: CartItem[];
  summary: CartSummary;
  shippingAddress: ShippingAddress;
  paymentMethod: DemoPaymentMethod;
  paymentStatus: 'Paid (Simulated)' | 'Pending COD';
}

