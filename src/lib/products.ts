export interface Product {
  id: string
  slug: string
  name: string
  price: number
  mrp: number
  rating: number
  reviews: number
  image: string
  badge?: string
  category: string        // display label (e.g. "MOISTURIZER")
  productType: string     // filter key matching PRODUCT_TYPES id
  skinType: string[]      // filter keys matching SKIN_TYPES id
  concern: string[]       // filter keys matching CONCERNS id
  keyIngredients: string[]// filter keys matching INGREDIENTS id
  description: string
  highlights: string[]
  benefits: string[]
  ingredients: string[]   // full ingredient list for display
}

export const products: Product[] = [
  // ─── 1. Aloevera Gel with Vitamin C ───────────────────────────────
  {
    id: '1',
    slug: 'aloe-vera-gel',
    name: 'Aloevera Gel Enriched with Vitamin C',
    price: 299,
    mrp: 399,
    rating: 4.8,
    reviews: 524,
    image: '/images/aloe-vera-gel.jpg',
    badge: 'Bestseller',
    category: 'MOISTURIZER',
    productType: 'moisturizer',
    skinType: ['dry', 'normal', 'combination'],
    concern: ['dryness', 'dullness'],
    keyIngredients: ['aloevera', 'vitaminc'],
    description: 'A soothing and hydrating aloe vera gel enriched with Vitamin C to brighten and nourish your skin. Perfect for daily use.',
    highlights: ['Deep Hydration', 'Vitamin C Boost', 'Soothing Formula'],
    benefits: ['Calms irritated skin', 'Provides a natural glow', 'Lightweight and non-sticky'],
    ingredients: ['Pure Aloe Vera', 'Vitamin C', 'Glycerin', 'Rose Water'],
  },

  // ─── 2. Kumkumadi Oil ─────────────────────────────────────────────
  {
    id: '2',
    slug: 'kumkumadi-oil',
    name: 'Kumkumadi Oil — Ayurvedic Elixir',
    price: 599,
    mrp: 749,
    rating: 4.9,
    reviews: 312,
    image: '/images/kumkumadi-oil.jpg',
    category: 'SERUM & OIL',
    productType: 'serum',
    badge: 'Premium',
    skinType: ['dry', 'normal', 'sensitive'],
    concern: ['pigmentation', 'ageing', 'darkspots'],
    keyIngredients: ['saffron', 'sandalwood'],
    description: 'An authentic Ayurvedic Kumkumadi oil formulated to improve skin complexion and texture, reducing signs of aging.',
    highlights: ['Radiance Booster', 'Anti-aging', 'Evens Skin Tone'],
    benefits: ['Reduces dark spots', 'Improves skin luminosity', 'Nourishes deeply'],
    ingredients: ['Kesar (Saffron)', 'Sandalwood', 'Lotus Extracts', 'Sesame Oil'],
  },

  // ─── 3. Herbal Ubtan Powder ───────────────────────────────────────
  {
    id: '3',
    slug: 'herbal-ubtan-powder',
    name: 'Herbal Ubtan Powder',
    price: 249,
    mrp: 349,
    rating: 4.7,
    reviews: 185,
    image: '/images/herbal-ubtan.jpg',
    badge: '100% Natural',
    category: 'CLEANSER',
    productType: 'cleanser',
    skinType: ['normal', 'oily', 'combination'],
    concern: ['dullness', 'tan'],
    keyIngredients: ['turmeric', 'sandalwood'],
    description: 'A traditional herbal Ubtan powder for gentle exfoliation and natural skin brightening.',
    highlights: ['Gentle Exfoliant', 'Chemical Free', 'Traditional Recipe'],
    benefits: ['Removes dead skin cells', 'Leaves skin soft and supple', 'Enhances natural glow'],
    ingredients: ['Turmeric', 'Gram Flour', 'Sandalwood Powder', 'Herbal Extracts'],
  },

  // ─── 4. Hair Mask Powder ──────────────────────────────────────────
  {
    id: '4',
    slug: 'hair-mask-powder',
    name: 'Hair Mask Powder — 100% Herbal',
    price: 199,
    mrp: 299,
    rating: 4.6,
    reviews: 204,
    image: '/images/hair-mask-powder.jpg',
    badge: 'Trending',
    category: 'HAIR CARE',
    productType: 'haircare',
    skinType: ['normal'],
    concern: ['hairfall', 'dandruff'],
    keyIngredients: ['bhringraj', 'amla'],
    description: 'A 100% herbal hair mask powder blending traditional Ayurvedic herbs for strong, healthy, and shiny hair.',
    highlights: ['Strengthens Roots', 'Adds Shine', 'Chemical Free'],
    benefits: ['Reduces hair fall', 'Conditions hair naturally', 'Soothes scalp'],
    ingredients: ['Hibiscus', 'Amla', 'Shikakai', 'Bhringraj', 'Fenugreek'],
  },

  // ─── 5. Neem & Tulsi Face Wash ────────────────────────────────────
  {
    id: '5',
    slug: 'neem-tulsi-face-wash',
    name: 'Neem & Tulsi Purifying Face Wash',
    price: 199,
    mrp: 279,
    rating: 4.5,
    reviews: 341,
    image: '/images/neem-facewash.png',
    badge: 'New',
    category: 'CLEANSER',
    productType: 'cleanser',
    skinType: ['oily', 'combination'],
    concern: ['acne', 'blackheads'],
    keyIngredients: ['neem', 'tulsi'],
    description: 'A deep-cleansing face wash powered by Neem and Tulsi to fight acne, reduce excess oil, and purify skin from within.',
    highlights: ['Anti-bacterial', 'Oil Control', 'Pore Minimizer'],
    benefits: ['Fights acne-causing bacteria', 'Controls sebum production', 'Keeps pores clean'],
    ingredients: ['Neem Extract', 'Tulsi Extract', 'Charcoal Beads', 'Aloe Vera'],
  },

  // ─── 6. Rose & Saffron Toner ──────────────────────────────────────
  {
    id: '6',
    slug: 'rose-saffron-toner',
    name: 'Rose & Saffron Hydrating Toner',
    price: 349,
    mrp: 449,
    rating: 4.7,
    reviews: 178,
    image: '/images/rose-toner.png',
    category: 'TONER',
    productType: 'toner',
    skinType: ['dry', 'normal', 'sensitive'],
    concern: ['pigmentation', 'dullness'],
    keyIngredients: ['rosewater', 'saffron'],
    description: 'A luxurious hydrating toner with Rose Water and Saffron that balances pH, tightens pores, and imparts a natural glow.',
    highlights: ['pH Balancing', 'Pore Tightening', 'Natural Glow'],
    benefits: ['Restores skin pH', 'Prepares skin for serum', 'Adds luminosity'],
    ingredients: ['Rose Water', 'Saffron Extract', 'Witch Hazel', 'Glycerin'],
  },

  // ─── 7. Turmeric Brightening Cream ────────────────────────────────
  {
    id: '7',
    slug: 'turmeric-brightening-cream',
    name: 'Turmeric & Manjistha Brightening Cream',
    price: 449,
    mrp: 599,
    rating: 4.6,
    reviews: 256,
    image: '/images/sunscreen.png',
    badge: 'Bestseller',
    category: 'MOISTURIZER',
    productType: 'moisturizer',
    skinType: ['normal', 'dry', 'combination'],
    concern: ['darkspots', 'dullness', 'ageing'],
    keyIngredients: ['turmeric'],
    description: 'A powerful brightening cream infused with Turmeric and Manjistha to fade dark spots, even skin tone, and restore radiance.',
    highlights: ['Brightening', 'Anti-inflammatory', 'Deep Nourishment'],
    benefits: ['Fades dark spots visibly', 'Evens skin tone', 'Rich Ayurvedic formula'],
    ingredients: ['Turmeric Extract', 'Manjistha', 'Shea Butter', 'Jojoba Oil'],
  },

  // ─── 8. Tea Tree Anti-Acne Gel ────────────────────────────────────
  {
    id: '8',
    slug: 'tea-tree-anti-acne-gel',
    name: 'Tea Tree & Neem Anti-Acne Spot Gel',
    price: 179,
    mrp: 249,
    rating: 4.4,
    reviews: 412,
    image: '/images/neem-facewash.png',
    badge: 'Best for Acne',
    category: 'TREATMENT',
    productType: 'treatment',
    skinType: ['oily', 'combination'],
    concern: ['acne', 'blackheads'],
    keyIngredients: ['teatree', 'neem'],
    description: 'A targeted spot treatment gel with Tea Tree Oil and Neem to reduce acne, shrink pimples, and prevent breakouts.',
    highlights: ['Spot Treatment', 'Quick Absorption', 'Non-Comedogenic'],
    benefits: ['Dries pimples overnight', 'Reduces inflammation', 'Prevents scarring'],
    ingredients: ['Tea Tree Oil', 'Neem Extract', 'Salicylic Acid', 'Zinc'],
  },

  // ─── 9. Sandalwood Sunscreen SPF 50 ───────────────────────────────
  {
    id: '9',
    slug: 'sandalwood-sunscreen-spf50',
    name: 'Sandalwood & Zinc Sunscreen SPF 50',
    price: 399,
    mrp: 549,
    rating: 4.8,
    reviews: 289,
    image: '/images/sunscreen.png',
    badge: 'SPF 50',
    category: 'SUNSCREEN',
    productType: 'sunscreen',
    skinType: ['normal', 'oily', 'sensitive', 'combination'],
    concern: ['tan', 'pigmentation'],
    keyIngredients: ['sandalwood'],
    description: 'A broad-spectrum SPF 50 sunscreen with Sandalwood and Zinc Oxide that protects from UV damage while soothing the skin.',
    highlights: ['SPF 50 PA+++', 'No White Cast', 'Matte Finish'],
    benefits: ['Complete UV protection', 'Lightweight and non-greasy', 'Soothing Sandalwood aroma'],
    ingredients: ['Zinc Oxide', 'Sandalwood Extract', 'Aloe Vera', 'Vitamin E'],
  },

  // ─── 10. Bhringraj Hair Oil ───────────────────────────────────────
  {
    id: '10',
    slug: 'bhringraj-hair-oil',
    name: 'Bhringraj & Amla Hair Growth Oil',
    price: 349,
    mrp: 449,
    rating: 4.7,
    reviews: 367,
    image: '/images/rose-toner.png',
    badge: 'Ayurvedic',
    category: 'HAIR CARE',
    productType: 'haircare',
    skinType: ['normal'],
    concern: ['hairfall'],
    keyIngredients: ['bhringraj', 'amla'],
    description: 'A potent Ayurvedic hair oil combining Bhringraj and Amla to stimulate hair growth, reduce hair fall, and add shine.',
    highlights: ['Hair Growth', 'Scalp Nourishment', 'Anti-Hair Fall'],
    benefits: ['Strengthens hair follicles', 'Reduces premature greying', 'Adds natural shine'],
    ingredients: ['Bhringraj Oil', 'Amla Extract', 'Coconut Oil', 'Brahmi'],
  },

  // ─── 11. Ashwagandha Night Cream ──────────────────────────────────
  {
    id: '11',
    slug: 'ashwagandha-night-cream',
    name: 'Ashwagandha & Shatavari Night Cream',
    price: 499,
    mrp: 649,
    rating: 4.8,
    reviews: 198,
    image: '/images/sunscreen.png',
    badge: 'Premium',
    category: 'MOISTURIZER',
    productType: 'moisturizer',
    skinType: ['dry', 'normal', 'sensitive'],
    concern: ['ageing', 'dryness'],
    keyIngredients: ['ashwagandha'],
    description: 'A rich overnight cream with Ashwagandha and Shatavari that repairs, rejuvenates, and deeply nourishes while you sleep.',
    highlights: ['Overnight Repair', 'Anti-Aging', 'Deep Moisture'],
    benefits: ['Firms and tightens skin', 'Reduces fine lines', 'Wakes up to plump skin'],
    ingredients: ['Ashwagandha Extract', 'Shatavari', 'Shea Butter', 'Vitamin E'],
  },

  // ─── 12. Charcoal & Clay Mask ─────────────────────────────────────
  {
    id: '12',
    slug: 'charcoal-clay-mask',
    name: 'Activated Charcoal & Multani Mitti Mask',
    price: 279,
    mrp: 399,
    rating: 4.5,
    reviews: 231,
    image: '/images/neem-facewash.png',
    badge: 'Deep Cleanse',
    category: 'FACE MASK',
    productType: 'mask',
    skinType: ['oily', 'combination'],
    concern: ['blackheads', 'acne'],
    keyIngredients: ['neem'],
    description: 'A powerful detoxifying mask with Activated Charcoal and Multani Mitti that unclogs pores, absorbs oil, and fights blackheads.',
    highlights: ['Pore Detox', 'Oil Absorbing', 'Deep Cleansing'],
    benefits: ['Extracts impurities', 'Minimizes pore appearance', 'Mattifies skin'],
    ingredients: ['Activated Charcoal', 'Multani Mitti', 'Neem', 'Rose Water'],
  },

  // ─── 13. Vitamin C Brightening Serum ──────────────────────────────
  {
    id: '13',
    slug: 'vitamin-c-brightening-serum',
    name: 'Vitamin C & Amla Brightening Serum',
    price: 549,
    mrp: 699,
    rating: 4.9,
    reviews: 445,
    image: '/images/neem-facewash.png',
    badge: 'Bestseller',
    category: 'SERUM & OIL',
    productType: 'serum',
    skinType: ['normal', 'dry', 'combination'],
    concern: ['dullness', 'pigmentation', 'darkspots'],
    keyIngredients: ['vitaminc', 'amla'],
    description: 'A potent brightening serum with stabilized Vitamin C and Amla extract for visibly radiant, even-toned skin in just 2 weeks.',
    highlights: ['20% Vitamin C', 'Fast Absorbing', 'Clinically Tested'],
    benefits: ['Boosts collagen production', 'Fades hyperpigmentation', 'Antioxidant protection'],
    ingredients: ['Ethyl Ascorbic Acid', 'Amla Extract', 'Ferulic Acid', 'Hyaluronic Acid'],
  },

  // ─── 14. Triphala Eye Cream ───────────────────────────────────────
  {
    id: '14',
    slug: 'triphala-eye-cream',
    name: 'Triphala & Almond Under-Eye Cream',
    price: 379,
    mrp: 499,
    rating: 4.6,
    reviews: 156,
    image: '/images/rose-toner.png',
    category: 'TREATMENT',
    productType: 'treatment',
    skinType: ['normal', 'dry', 'sensitive'],
    concern: ['darkcircles', 'ageing'],
    keyIngredients: [],
    description: 'A nourishing under-eye cream with Triphala and Almond Oil that reduces dark circles, puffiness, and fine lines around the eyes.',
    highlights: ['Dark Circle Reducer', 'Anti-Puffiness', 'Gentle Formula'],
    benefits: ['Lightens under-eye area', 'Reduces puffiness', 'Smooths crow\'s feet'],
    ingredients: ['Triphala Extract', 'Almond Oil', 'Caffeine', 'Peptides'],
  },

  // ─── 15. Coconut & Hibiscus Body Lotion ───────────────────────────
  {
    id: '15',
    slug: 'coconut-hibiscus-body-lotion',
    name: 'Coconut & Hibiscus Body Lotion',
    price: 329,
    mrp: 449,
    rating: 4.7,
    reviews: 278,
    image: '/images/sunscreen.png',
    badge: 'New',
    category: 'BODY CARE',
    productType: 'bodycare',
    skinType: ['dry', 'normal'],
    concern: ['dryness'],
    keyIngredients: [],
    description: 'A deeply moisturizing body lotion with Virgin Coconut Oil and Hibiscus that keeps skin soft, supple, and hydrated all day.',
    highlights: ['24hr Moisture', 'Non-Greasy', 'Natural Fragrance'],
    benefits: ['Intense hydration', 'Improves skin elasticity', 'Silky smooth finish'],
    ingredients: ['Virgin Coconut Oil', 'Hibiscus Extract', 'Shea Butter', 'Vitamin E'],
  },

  // ─── 16. Beetroot & Ghee Lip Balm ─────────────────────────────────
  {
    id: '16',
    slug: 'beetroot-ghee-lip-balm',
    name: 'Lip Balm — Beetroot & Desi Ghee',
    price: 149,
    mrp: 199,
    rating: 4.8,
    reviews: 389,
    image: '/images/neem-facewash.png',
    badge: 'Popular',
    category: 'LIP CARE',
    productType: 'lipcare',
    skinType: ['dry', 'normal', 'sensitive'],
    concern: ['dryness', 'pigmentation'],
    keyIngredients: [],
    description: 'A natural lip balm with Beetroot tint and Desi Ghee that heals chapped lips, adds a subtle rosy color, and nourishes deeply.',
    highlights: ['Natural Tint', 'Deep Nourishment', 'Chemical Free'],
    benefits: ['Heals chapped lips', 'Natural rosy tint', 'Locks in moisture'],
    ingredients: ['Beetroot Extract', 'Desi Ghee', 'Beeswax', 'Kokum Butter'],
  },
]

// ─── Helper: search/filter products ─────────────────────────────────

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function getProductsByCategory(category?: string) {
  if (!category || category === 'all') {
    return products
  }

  const normalized = category.toLowerCase()
  return products.filter((product) => {
    return (
      product.category.toLowerCase().includes(normalized) ||
      product.name.toLowerCase().includes(normalized) ||
      product.badge?.toLowerCase().includes(normalized)
    )
  })
}

export function filterProducts({
  type,
  skinType,
  concern,
  ingredient,
}: {
  type?: string
  skinType?: string
  concern?: string
  ingredient?: string
}) {
  return products.filter((p) => {
    if (type && type !== 'all' && p.productType !== type) return false
    if (skinType && !p.skinType.includes(skinType)) return false
    if (concern && !p.concern.includes(concern)) return false
    if (ingredient && !p.keyIngredients.includes(ingredient)) return false
    return true
  })
}
