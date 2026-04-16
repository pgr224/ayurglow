import React from 'react'
import { ProductCard } from '@/components/shared/ProductCard'
import { Button } from '@/components/ui/button'

const BESTSELLERS = [
  {
    id: '1',
    name: 'Ceramide & Vitamin C Sunscreen - 50 Gm In-Vivo Tested Spf 50+ PA++++',
    slug: 'ceramide-vitamin-c-sunscreen',
    price: 499,
    mrp: 599,
    rating: 4.4,
    reviews: 794,
    image: '/images/product-1.jpg',
    badge: 'Bestseller',
    category: 'PROTECT'
  },
  {
    id: '2',
    name: 'Haldi & Hyaluronic Acid Sunscreen - 50gm',
    slug: 'haldi-hyaluronic-sunscreen',
    price: 499,
    mrp: 499,
    rating: 4.8,
    reviews: 120,
    image: '/images/product-2.jpg',
    category: 'PROTECT'
  },
  {
    id: '3',
    name: 'Tea Tree & Lactic Acid Body Lotion',
    slug: 'tea-tree-lactic-body-lotion',
    price: 349,
    mrp: 449,
    rating: 4.2,
    reviews: 56,
    image: '/images/product-3.jpg',
    badge: 'B2G1',
    category: 'MOISTURIZE'
  },
  {
    id: '4',
    name: 'Kesar & 2% Kojic Acid Ampoule Serum - 30ml',
    slug: 'kesar-kojic-serum',
    price: 599,
    mrp: 699,
    rating: 4.7,
    reviews: 231,
    image: '/images/product-4.jpg',
    badge: 'TRENDING',
    category: 'CORRECT'
  }
]

export function BestsellerGrid() {
  return (
    <section className="py-12 bg-[#FAF9F6]">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold tracking-tight uppercase">Bestsellers</h2>
          <Button variant="link" className="text-xs font-bold uppercase tracking-widest text-primary p-0 h-auto">View All</Button>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {BESTSELLERS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}
