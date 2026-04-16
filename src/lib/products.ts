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
  category: string
  description: string
  highlights: string[]
  benefits: string[]
  ingredients: string[]
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'ceramide-vitamin-c-sunscreen',
    name: 'Ceramide & Vitamin C Sunscreen - 50 Gm In-Vivo Tested SPF 50+ PA++++',
    price: 499,
    mrp: 599,
    rating: 4.4,
    reviews: 794,
    image: '/images/product-1.jpg',
    badge: 'Bestseller',
    category: 'PROTECT',
    description: 'A lightweight sunscreen with ceramide and vitamin C that protects, moisturizes, and brightens without white cast.',
    highlights: ['SPF 50+ PA++++', 'Non-greasy finish', 'Dermatologist tested'],
    benefits: ['Protects skin from UV damage', 'Helps reduce pigmentation', 'Offers long-lasting hydration'],
    ingredients: ['Ceramide', 'Vitamin C', 'Niacinamide', 'Aloe Vera'],
  },
  {
    id: '2',
    slug: 'haldi-hyaluronic-sunscreen',
    name: 'Haldi & Hyaluronic Acid Sunscreen - 50gm',
    price: 499,
    mrp: 499,
    rating: 4.8,
    reviews: 120,
    image: '/images/product-2.jpg',
    category: 'PROTECT',
    description: 'A turmeric-infused formula with hyaluronic acid for sun defense and skin hydration.',
    highlights: ['SPF 40', 'Hydrating', 'Even skin tone'],
    benefits: ['Soothes skin', 'Improves elasticity', 'Enhances glow'],
    ingredients: ['Turmeric', 'Hyaluronic Acid', 'Squalane'],
  },
  {
    id: '3',
    slug: 'tea-tree-lactic-body-lotion',
    name: 'Tea Tree & Lactic Acid Body Lotion',
    price: 349,
    mrp: 449,
    rating: 4.2,
    reviews: 56,
    image: '/images/product-3.jpg',
    badge: 'B2G1',
    category: 'MOISTURIZE',
    description: 'A calming body lotion with tea tree and lactic acid that nourishes the skin and helps improve texture.',
    highlights: ['Non-sticky', 'Boosts hydration', 'Targets rough patches'],
    benefits: ['Smoothens skin', 'Controls excess oil', 'Light fragrance'],
    ingredients: ['Tea Tree Oil', 'Lactic Acid', 'Shea Butter'],
  },
  {
    id: '4',
    slug: 'kesar-kojic-serum',
    name: 'Kesar & 2% Kojic Acid Ampoule Serum - 30ml',
    price: 599,
    mrp: 699,
    rating: 4.7,
    reviews: 231,
    image: '/images/product-4.jpg',
    badge: 'TRENDING',
    category: 'CORRECT',
    description: 'A brightening ampoule serum with kaser and kojic acid to even skin tone and reduce dark spots.',
    highlights: ['Fast absorption', 'Radiance booster', 'Lightweight'],
    benefits: ['Fades dark spots', 'Improves skin clarity', 'Calms uneven texture'],
    ingredients: ['Kesar', 'Kojic Acid', 'Vitamin E'],
  },
]

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
