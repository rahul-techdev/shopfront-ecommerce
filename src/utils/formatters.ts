/**
 * Formats a number as Indian Rupee (INR) currency.
 * e.g. 1299 -> "₹1,299", 124500 -> "₹1,24,500"
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculates discount percentage between original MRP and current price.
 */
export function calculateDiscount(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/**
 * Formats a date string or timestamp in a clean readable Indian format.
 */
export function formatDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

/**
 * Generates an estimated delivery date (3-5 business days from now).
 */
export function getEstimatedDeliveryDate(daysFromNow = 4): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(date);
}
