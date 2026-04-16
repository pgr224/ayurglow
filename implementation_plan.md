# AyurGlow — Premium Storefront Redesign

Transform the existing skeleton storefront into a world-class Ayurvedic skincare e-commerce experience, on par with Dr. Sheth's, Shopify beauty stores, and Magento premium themes. Wire in all real product images from the `assets/` folder and generate hero/lifestyle imagery.

## User Review Required

> [!IMPORTANT]
> **Brand Identity**: The brand is **AyurGlow — Ayurvedic Aesthetics** by **Dr. Bina G. Rabadia** (BAMS, PGDACC, ADHM, CCH — Aesthetician & Cosmetologist). The teal/green brand color (#009688) from the visiting card will be the primary accent, paired with a warm cream/off-white background for a luxurious, clean feel.

> [!IMPORTANT]
> **Product Line**: 4 real products will be wired in from `assets/`:
> 1. Aloe Vera Gel (Enriched with Vitamin C)
> 2. Kumkumadi Oil
> 3. Herbal Ubtan Powder
> 4. Hair Mask Powder (100% Herbal, No Chemicals)

## Proposed Changes

### 1. Asset Pipeline — Copy & Organize Product Images

#### [MODIFY] public/images/ directory
- Copy the 4 WhatsApp product images from `assets/` into `public/images/` with clean filenames:
  - `aloe-vera-gel.jpg`, `kumkumadi-oil.jpg`, `herbal-ubtan.jpg`, `hair-mask-powder.jpg`
- Copy the visiting card (logo source) to `public/images/ayurglow-logo.jpg`

---

### 2. Generate Hero & Lifestyle Assets

#### [NEW] Generated images via AI image generation
- **Hero banner**: Luxurious Ayurvedic skincare hero image with teal/gold tones, botanicals, and premium feel
- **Lifestyle banner**: Ingredients/nature lifestyle shot for secondary carousel slide
- **Brand story section**: Feature image for "Made with Ayurvedic Wisdom" section

---

### 3. Global Design System Overhaul

#### [MODIFY] globals.css
- Refine color palette to match the AyurGlow visiting card:
  - Primary: deep teal `#009688` / warm teal
  - Accent: golden/saffron for luxury touches  
  - Background: warm cream `#FFFDF8`
  - Rich typography scale with premium heading fonts
- Add custom utility classes for glassmorphism, shimmer effects, section gradients
- Premium animations: fade-in-up on scroll, scale hover, floating elements

---

### 4. Layout Components

#### [MODIFY] Header.tsx
- Integrate the AyurGlow brand logo image from the visiting card
- Add desktop navigation links (Home, Shop, Routine, About, Contact)
- Premium announcement bar at top (ongoing offer ticker)
- Glassmorphism sticky header on scroll
- Animated search expansion
- Cart badge with count from CartProvider

#### [MODIFY] BottomNav.tsx
- Refined icons with micro-animation on active state
- Pill-shaped active indicator
- Wire to cart context for live badge count

#### [MODIFY] layout.tsx
- Wrap children with `CartProvider`
- Add a top announcement bar component
- Add a premium Footer component

#### [NEW] Footer.tsx
- Full-width luxury footer with brand story, quick links, contact info from the visiting card
- Address: Shop No 1,2 Ground Floor, Hotel Amreli Inn, Station Road, Amreli – 365601
- Phone: +91 91060 20550
- Email: binaaesthetic05@gmail.com
- Social links, newsletter signup, trust badges

#### [NEW] AnnouncementBar.tsx
- Scrolling marquee ticker: "FLAT 25% OFF on orders above ₹799 | Use code SAVE25 | FREE Shipping on all orders"

---

### 5. Home Page Components (Complete Overhaul)

#### [MODIFY] HeroCarousel.tsx
- Full-bleed hero with generated AI imagery
- Animated text overlays with staggered entrance
- Swipe indicators with premium dot navigation
- Gradient overlays for text readability
- Real promo codes and CTAs wired in

#### [MODIFY] CategoryCircles.tsx → [RENAMED] ShopByConcern.tsx
- Redesigned as premium "Solutions For..." cards (matching Dr. Sheth's reference)
- Each concern gets a colored icon badge + hover grow animation
- Categories: Ageing Skin, Dry & Damaged Skin, Acne, Pigmentation, Oily Skin, Combination Skin

#### [MODIFY] BestsellerGrid.tsx
- Wire in the **actual 4 real products** with correct images, names, and prices
- Add horizontal scroll on mobile, grid on desktop
- Animated "Add to Cart" button wired to CartProvider
- Product badges with gradient backgrounds

#### [MODIFY] RoutineGrid.tsx
- 4-step routine (Cleanse → Correct → Moisturize → Protect)
- Each step uses the actual product images
- Colored circular backgrounds with hover expand
- Numbered step indicators

#### [NEW] BrandStory.tsx
- "Ayurvedic Wisdom Meets Modern Science" section
- Split layout: generated lifestyle image + brand text
- Dr. Bina G. Rabadia credentials callout
- Trust badges: 100% Herbal, No Chemicals, Dermatologist Formulated

#### [NEW] Testimonials.tsx
- Customer reviews carousel with star ratings
- Glassmorphic review cards with fade animations

#### [NEW] IngredientsShowcase.tsx
- "Powered by Nature's Finest" section
- Animated ingredient cards: Kumkumadi, Aloe Vera, Turmeric/Haldi, Hibiscus
- Each with a gradient background matching the ingredient color

#### [NEW] TrustBanner.tsx
- Horizontal strip: Free Shipping | 100% Herbal | Certified | Secure Payments
- Icons + micro-animations

---

### 6. Product Data & Shared Components

#### [MODIFY] src/lib/products.ts
- Replace placeholder products with the **real AyurGlow product line**:
  1. Aloe Vera Gel — Enriched with Vitamin C (₹299, MRP ₹399)
  2. Kumkumadi Oil (₹599, MRP ₹749)
  3. Herbal Ubtan Powder (₹249, MRP ₹349)
  4. Hair Mask Powder — 100% Herbal (₹199, MRP ₹299)

#### [MODIFY] ProductCard.tsx
- Refined card with:
  - Soft shadow + scale hover animation
  - Gradient badge system
  - Heart/wishlist icon
  - Animated "Add to Cart" button wired to context
  - Price with discount percentage

---

### 7. Products Collection Page

#### [MODIFY] src/app/products/page.tsx
- Full product grid with filter sidebar
- Category filter chips at top
- Sort options (Price, Rating, Newest)
- All 4 real products displayed

---

### 8. Home Page Assembly

#### [MODIFY] src/app/page.tsx
- Assemble all new sections in premium order:
  1. HeroCarousel
  2. TrustBanner
  3. BestsellerGrid
  4. ShopByConcern
  5. RoutineGrid
  6. BrandStory
  7. IngredientsShowcase
  8. Testimonials

---

## Open Questions

> [!NOTE]
> Product prices are estimated based on typical Ayurvedic product pricing. Please confirm the actual prices for each product if different.

## Verification Plan

### Automated Tests
- Run `npm run build` to verify zero compilation errors
- Run the dev server and visually inspect all pages in browser

### Manual Verification
- Verify all product images load correctly
- Check responsive layout on mobile and desktop
- Confirm cart functionality works end-to-end
- Test all navigation links
