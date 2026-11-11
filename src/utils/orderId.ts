/**
 * Generates a realistic unique order reference ID for demonstrations.
 * Format: SPF-YYYY-XXXXX
 */
export function generateDemoOrderId(): string {
  const year = new Date().getFullYear();
  const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `SPF-${year}-${randomChars}`;
}

