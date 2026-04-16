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
    slug: 'aloe-vera-gel',
    name: 'Aloevera Gel Enriched with Vitamin C',
    price: 299,
    mrp: 399,
    rating: 4.8,
    reviews: 524,
    image: '/images/aloe-vera-gel.jpg',
    badge: 'Bestseller',
    category: 'MOISTURIZE',
    description: 'A soothing and hydrating aloe vera gel enriched with Vitamin C to brighten and nourish your skin. Perfect for daily use.',
    highlights: ['Deep Hydration', 'Vitamin C Boost', 'Soothing Formula'],
    benefits: ['Calms irritated skin', 'Provides a natural glow', 'Lightweight and non-sticky'],
    ingredients: ['Pure Aloe Vera', 'Vitamin C'],
  },
  {
    id: '2',
    slug: 'kumkumadi-oil',
    name: 'Kumkumadi Oil — Ayurvedic Elixir',
    price: 599,
    mrp: 749,
    rating: 4.9,
    reviews: 312,
    image: '/images/kumkumadi-oil.jpg',
    category: 'CORRECT',
    badge: 'Premium',
    description: 'An authentic Ayurvedic Kumkumadi oil formulated to improve skin complexion and texture, reducing signs of aging.',
    highlights: ['Radiance Booster', 'Anti-aging', 'Evens Skin Tone'],
    benefits: ['Reduces dark spots', 'Improves skin luminosity', 'Nourishes deeply'],
    ingredients: ['Kesar (Saffron)', 'Sandalwood', 'Lotus Extracts', 'Sesame Oil'],
  },
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
    category: 'CLEANSE',
    description: 'A traditional herbal Ubtan powder for gentle exfoliation and natural skin brightening.',
    highlights: ['Gentle Exfoliant', 'Chemical Free', 'Traditional Recipe'],
    benefits: ['Removes dead skin cells', 'Leaves skin soft and supple', 'Enhances natural glow'],
    ingredients: ['Turmeric', 'Gram Flour', 'Sandalwood Powder', 'Herbal Extracts'],
  },
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
    description: 'A 100% herbal hair mask powder blending traditional Ayurvedic herbs for strong, healthy, and shiny hair. No Chemicals, No Preservatives.',
    highlights: ['Strengthens Roots', 'Adds Shine', 'Chemical Free'],
    benefits: ['Reduces hair fall', 'Conditions hair naturally', 'Soothes scalp'],
    ingredients: ['Hibiscus', 'Amla', 'Shikakai', 'Bhringraj', 'Fenugreek'],
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
