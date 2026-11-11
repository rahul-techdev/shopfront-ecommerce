# SHOPFRONT — Responsive E-Commerce Storefront

> A production-calibre, fully responsive e-commerce storefront engineered with **React 19**, **TypeScript**, **Vite**, and clean modular CSS. Built as a student software engineering portfolio demonstration of modern frontend development, state management, and accessible UI/UX design.

---

## 📸 Overview & Live Experience

**Shopfront** is modeled after contemporary direct-to-consumer lifestyle brands (such as Mují, Bellroy, and Everlane). Rather than using generic AI-style glassmorphism, oversized neon gradients, or decorative clutter, the interface adheres to authentic retail design principles:
- **Clean white and warm neutral backgrounds** (`#F8F9FA`, `#FFFFFF`)
- **Dark charcoal typography** (`#181A1B`, `#495057`)
- **Restrained brand accents** (Rich slate `#0F172A` paired with subtle warm amber `#D97706` and botanical teal `#0D9488`)
- **Curated product photography** with automatic SVG placeholder fallback for broken links
- **Indian Rupee (INR) localization** with standard Indian number grouping (e.g. `₹1,499`, `₹12,499`)
- **Transparent demonstration ethics** — clear indicators that no real transactions, card numbers, or UPI PINs are processed.

---

## 🚀 Key Features by Milestone

### 1. Storefront & Navigation
- **Sticky Site Header:** Brand mark, category links, instant search bar with clear button, shopping bag icon with live reactive counter badge, and mobile drawer toggle.
- **Hero Promotional Banner:** Seasonal headline, value proposition, quick-shop CTAs, and catalogue metric counters.
- **Featured Categories Grid:** Quick navigation tiles for Electronics, Accessories, Home & Living, Fashion, and Lifestyle.
- **Bestsellers & New Arrivals:** Filtered item highlights with stock badges, demo ratings, and direct add-to-cart buttons.
- **Trust & Benefits Strip:** Free delivery criteria (>₹999), 15-day exchange policy, ethical material guarantees, and warranty info.
- **Site Footer:** Brand philosophy, customer care resources, location details, student portfolio notes, and policy links.

### 2. Product Catalogue (`/products`)
- **Interactive Multi-Factor Filtering:**
  - Category selector (`All`, `Electronics`, `Accessories`, `Home & Living`, `Fashion`, `Lifestyle`).
  - Min/Max numerical price range filtering (computed dynamically from product catalog bounds).
  - In-Stock Only filter toggle.
  - Reset / Clear filters button.
- **Full-Text Instant Search:** Queries across product titles, descriptions, categories, and feature tags.
- **Comprehensive Sorting:**
  - Featured Essentials (default)
  - Price: Low to High
  - Price: High to Low
  - Newest Arrivals
  - Popularity Score (clearly labeled sample benchmark)
- **URL Search Params Synchronization:** Category and search queries synchronize with the browser address bar (`?category=Electronics&search=cordless`), allowing direct linking and browser back/forward history.
- **Responsive Mobile Filter Drawer:** Slide-over modal filter interface for mobile and tablet screens.
- **Graceful Empty State:** Helpful guidance and one-click filter reset when queries yield zero matches.

### 3. Product Detail Page (`/products/:id`)
- **Dynamic Breadcrumbs:** Hierarchical route breadcrumb navigation.
- **Interactive Image Gallery:** Multi-image gallery with selectable thumbnail strip.
- **Pricing & Stock Indicators:** Real-time stock status badge (*In Stock*, *Only X remaining*, or *Out of stock*), original MRP, and calculated discount percentage (`% OFF`).
- **Detailed Specifications:** Technical specs table (materials, dimensions, battery life, weight, warranty).
- **Stepped Quantity Picker:** Controlled increment/decrement buttons clamped to available inventory.
- **Action Buttons:** Working *Add to Cart* (with toast feedback) and *Buy Now* (direct routing to checkout).
- **Related Products:** Automatically showcases similar products from the same department.

### 4. Shopping Cart (`/cart`)
- **Complete Line Item Controls:**
  - Increase/decrease quantity (automatically respects max stock limit).
  - Item removal with trash icon.
  - Line total calculation (`price × quantity`).
  - Clear entire cart option.
- **Real-Time Financial Calculations:**
  - Subtotal computation.
  - Automatic delivery fee calculation (₹0 if subtotal ≥ ₹999, else ₹99).
  - Free delivery target tracker ("Add ₹X more for FREE delivery").
  - Final total calculation (`subtotal + delivery - discount`).
- **Promotional Coupon System:**
  - `SHOPFRONT10`: Grants 10% off entire subtotal.
  - `WELCOME50`: Grants flat ₹50 welcome discount.
  - Interactive apply and remove states.
- **State Persistence:** LocalStorage synchronization (`shopfront_cart_v1`) ensures items and applied coupons persist across browser refreshes.

### 5. Checkout & Order Simulation (`/checkout`)
- **Customer Shipping Address Form:**
  - Full Name, Email, 10-digit Indian Mobile Number, Street Address, City, State (dropdown of Indian states), and 6-digit Indian PIN Code.
- **Form Validation & Accessibility:** Real-time and submit-time validation rules with inline helper messages and aria attributes.
- **Simulated Payment Selection:**
  - *Cash on Delivery (Demo)*
  - *Simulated Instant UPI / Net Banking (Sandbox Test)*
- **Prominent Demonstration Notice:** Highlights that no real banking information or cards are collected.
- **Order Placement:** Generates a unique order ID (`SPF-YYYY-XXXXX`), records order details in storage, empties the active cart, and redirects to confirmation.

### 6. Order Confirmation (`/order-confirmation/:orderId`)
- Success confirmation banner with unique demo order ID.
- Estimated delivery date (3–5 business days).
- Shipping address recap and payment method badge.
- Itemized purchase breakdown with line totals and final amount paid.
- Working *Print Receipt* button (`window.print()`).

---

## 🛠️ Complete Folder Structure

```
shopfront-ecommerce/
├── dist/                          # Production build output
├── public/                        # Public static assets & favicon
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/                    # Project images & icons
│   ├── components/                # Reusable UI components
│   │   ├── cart/
│   │   │   ├── CartItemRow.tsx    # Single cart line item row
│   │   │   └── OrderSummary.tsx   # Financial breakdown & coupon form
│   │   ├── common/
│   │   │   ├── DemoNotice.tsx     # Student portfolio disclaimer banner
│   │   │   ├── ImageWithFallback.tsx # Resilient image loader with SVG placeholder
│   │   │   └── RatingBadge.tsx    # Star rating with sample demo tag
│   │   ├── layout/
│   │   │   ├── Footer.tsx         # Comprehensive site footer
│   │   │   ├── Header.tsx         # Sticky header with search & bag counter
│   │   │   ├── Layout.tsx         # Root layout with scroll-to-top effect
│   │   │   └── MobileNav.tsx      # Slide-over mobile drawer navigation
│   │   └── product/
│   │       ├── ProductCard.tsx    # Retail product card with badges
│   │       ├── ProductFilters.tsx # Price range, category, & stock sidebar
│   │       ├── ProductGrid.tsx    # Responsive grid with empty state
│   │       └── ProductSort.tsx    # Sort dropdown controller
│   ├── context/                   # Context State Providers
│   │   ├── CartContext.tsx        # Cart state & localStorage sync
│   │   ├── cartContextDef.ts      # Cart context definition & typing
│   │   ├── ToastContext.tsx       # Toast notifications provider
│   │   └── toastContextDef.ts     # Toast context definition
│   ├── data/                      # Demo catalogues & seed data
│   │   ├── categories.ts          # Category definitions & imagery
│   │   └── products.ts            # 19 curated products across 5 categories
│   ├── hooks/                     # Custom React hooks
│   │   ├── useCart.ts             # Consumer hook for CartContext
│   │   ├── useDebounce.ts         # Input debouncer hook
│   │   └── useToast.ts            # Consumer hook for Toast notifications
│   ├── pages/                     # Routed view components
│   │   ├── AboutPage.tsx          # Architecture & project background
│   │   ├── CartPage.tsx           # Cart view & line item modifier
│   │   ├── CataloguePage.tsx      # Filterable catalogue & search view
│   │   ├── CheckoutPage.tsx       # Shipping form & simulated payment
│   │   ├── HomePage.tsx           # Hero, categories, bestsellers, new arrivals
│   │   ├── NotFoundPage.tsx       # 404 handler
│   │   ├── OrderConfirmationPage.tsx # Receipt & order recap
│   │   └── ProductDetailPage.tsx  # Product specs, gallery, & buy flow
│   ├── styles/                    # Modular CSS design system
│   │   ├── base.css               # Reset, typography, buttons, containers
│   │   ├── components.css         # Component-level stylesheets
│   │   └── variables.css          # Color tokens, typography, radii, shadows
│   ├── types/                     # TypeScript Interfaces
│   │   ├── cart.ts                # CartItem, CartSummary, CartContextType
│   │   ├── order.ts               # ShippingAddress, OrderConfirmationDetails
│   │   └── product.ts             # Product, ProductCategory, ProductFiltersState
│   ├── utils/                     # Helper utilities
│   │   ├── formatters.ts          # formatINR (₹), formatDate, discounts
│   │   ├── orderId.ts             # Demo order reference generator
│   │   ├── storage.ts             # Safe try/catch localStorage helpers
│   │   └── validation.ts          # Indian phone, PIN code, email validation
│   ├── App.tsx                    # React Router configuration
│   ├── index.css                  # Master CSS imports
│   └── main.tsx                   # React root entry point
├── .gitignore                     # Git ignore rules
├── index.html                     # HTML5 template with fonts & metadata
├── netlify.toml                   # Netlify build configuration & SPA redirect
├── package.json                   # Dependencies & build scripts
├── tsconfig.app.json              # TypeScript application compiler options
├── tsconfig.json                  # TypeScript project root references
└── vite.config.ts                 # Vite bundler configuration
```

---

## ⚙️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern UI component rendering, hooks, and context |
| **TypeScript 7** | Static type safety, strict compile-time interface enforcement |
| **Vite 8** | Ultra-fast development server and optimized Rolldown production bundler |
| **React Router 7** | Client-side routing, URL search parameter synchronization, nested layouts |
| **Lucide React** | Lightweight, clean SVG iconography |
| **CSS3 Custom Properties** | Design token architecture (colors, spacing, shadows, responsive layout) |
| **LocalStorage API** | Browser-level persistence for shopping cart items and demo orders |

---

## 📦 Dependencies

From `package.json`:
```json
{
  "dependencies": {
    "lucide-react": "^1.16.0",
    "react": "^19.3.1",
    "react-dom": "^19.3.1",
    "react-router-dom": "^7.13.0"
  },
  "devDependencies": {
    "@types/node": "^24.19.2",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@vitejs/plugin-react": "^6.1.2",
    "oxlint": "^1.90.0",
    "typescript": "~7.0.2",
    "vite": "^8.3.6"
  }
}
```

---

## 🧪 Testing Performed

1. **Compilation & Type Checking:**
   - Ran `tsc -b` with strict settings (`noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`).
   - Verified 0 TypeScript errors.
2. **Linting Verification:**
   - Ran `npm run lint` via `oxlint`.
   - Verified 0 warnings and 0 errors across all 40 files.
3. **Cart Operations & LocalStorage Persistence:**
   - Added items with various quantities.
   - Verified quantity capping when reaching `stockQuantity`.
   - Tested decreasing quantity to 1 and removing item.
   - Refreshed the page and verified the cart restored with identical quantities and applied coupons.
4. **Calculations Accuracy:**
   - Subtotal calculated correctly (`unitPrice × quantity`).
   - Delivery fee applies ₹99 when subtotal < ₹999; automatically changes to ₹0 (FREE) when subtotal reaches ₹999.
   - Coupon codes `SHOPFRONT10` (10% off subtotal) and `WELCOME50` (flat ₹50) applied and subtracted accurately.
5. **Checkout & Form Validation:**
   - Tested invalid email, missing name, incomplete address.
   - Tested phone validation (rejects strings <10 digits or invalid starting digits).
   - Tested PIN code validation (strictly requires 6 digits).
   - Successful submission generates unique `SPF-YYYY-XXXXX` order ID, stores receipt locally, and clears cart.
6. **Responsive Screen Testing:**
   - Desktop screens (1200px+): full 4-column product grid and multi-column footer.
   - Tablet screens (768px – 1024px): 2–3 column grid, desktop search bar.
   - Mobile screens (375px – 640px): 1–2 column grid, mobile hamburger drawer, touch-friendly touch targets, zero horizontal scroll.

---

## ⚠️ Known Limitations

- **Simulated Payment Gateway:** As required for a student portfolio demonstration, no real payment processors (Stripe, Razorpay, UPI QR) are connected.
- **In-Memory Catalogue:** Product data is loaded from a strongly-typed TypeScript array (`src/data/products.ts`) rather than a remote database server.
- **Client-Side Image Assets:** Product imagery is curated via Unsplash CDN with direct image fallback handling.

---

## 🏃 How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended; tested on v24)
- npm (v9 or higher)

### Installation Steps

1. **Clone or enter the project directory:**
   ```bash
   cd shopfront-ecommerce
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173/`.

4. **Verify production build:**
   ```bash
   npm run build
   ```
   This compiles TypeScript and builds production-ready bundles inside the `/dist` directory.

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

6. **Run linter:**
   ```bash
   npm run lint
   ```

---

## ☁️ How to Deploy on Netlify

This project is fully configured for deployment on Netlify using the included `netlify.toml`.

### Option A: Via Netlify CLI
1. Install Netlify CLI globally (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```
2. Link or create your Netlify project:
   ```bash
   netlify init
   ```
3. Deploy to production:
   ```bash
   netlify deploy --prod
   ```

### Option B: Via GitHub / Netlify Web UI
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete shopfront e-commerce storefront"
   git branch -M main
   git remote add origin https://github.com/<your-username>/shopfront-ecommerce.git
   git push -u origin main
   ```
2. Log in to [Netlify Dashboard](https://app.netlify.com/).
3. Click **"Add new site"** → **"Import an existing project"** → select **GitHub**.
4. Select the repository `shopfront-ecommerce`.
5. Netlify will auto-detect settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **Deploy Site**.

### Netlify SPA Redirect Configuration
Because this is a Single Page Application using React Router, direct navigation to routes like `/products/sp-elec-01` or `/cart` requires Netlify to serve `index.html`. This is already configured in `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 💡 Important React and TypeScript Concepts to Learn

For software engineering interviews and real-world frontend development, mastering the following concepts demonstrated in this project is crucial:

1. **React State Management with Context & Hooks (`createContext`, `useContext`):**
   - Understanding how to manage application-wide state (like cart items, notifications) without prop drilling.
   - Separating context definitions from provider components to support React Fast Refresh.
2. **Single Source of Truth & URL State Synchronization:**
   - Keeping search queries, selected categories, and sort options in `URLSearchParams` rather than duplicative React state. This enables shareable URLs, bookmarking, and native browser history navigation.
3. **Derived State vs. Synced State:**
   - Avoiding anti-patterns like calling `setState` inside `useEffect` to sync props. Computing values (like cart totals, filtered lists, delivery fee) on-the-fly during render or with `useMemo`.
4. **TypeScript Domain Modeling:**
   - Using discriminated unions and strict interfaces (`Product`, `CartItem`, `CartSummary`, `ShippingAddress`) to catch data inconsistencies at build time rather than at runtime.
5. **Fail-Safe Web APIs & Side Effects:**
   - Wrapping `localStorage.getItem` and `localStorage.setItem` in `try...catch` blocks to protect against private browsing restrictions, security exceptions, and JSON parse errors.
6. **Accessible Component Design (a11y):**
   - Leveraging semantic HTML elements (`<article>`, `<header>`, `<main>`, `<nav>`, `<aside>`), meaningful `aria-label` attributes on icon buttons, `:focus-visible` focus outlines, and accessible form labels.
7. **Production Build Optimization:**
   - Understanding bundle chunking, asset caching, code minification, and SPA redirect handling on static hosts like Netlify.

---

**Developed with precision for the modern web.**
