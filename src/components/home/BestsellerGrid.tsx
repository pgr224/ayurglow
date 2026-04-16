import React from 'react'
import { ProductCard } from '@/components/shared/ProductCard'
import { Button } from '@/components/ui/button'
import { products } from '@/lib/products'

export function BestsellerGrid() {
  const bestsellers = products.slice(0, 4) // For now, just grab all 4 products

  return (
    <section className="py-12 bg-[#FAF9F6]">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black tracking-tight italic uppercase">Bestsellers</h2>
          <Button variant="link" className="text-xs font-bold uppercase tracking-widest text-primary p-0 h-auto">View All</Button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible no-scrollbar snap-x snap-mandatory">
          {bestsellers.map((product) => (
            <div key={product.id} className="min-w-[70vw] md:min-w-0 snap-start">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
