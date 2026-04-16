import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProductCardProps {
  id: string
  name: string
  slug: string
  price: number
  mrp: number
  rating: number
  reviews: number
  image: string
  badge?: string
  category?: string
}

export function ProductCard({ name, price, mrp, rating, reviews, image, badge, category, slug }: ProductCardProps) {
  const discount = Math.round(((mrp - price) / mrp) * 100)
  
  return (
    <div className="group border rounded-2xl bg-white overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/products/${slug}`} className="relative aspect-[4/5] bg-muted/50 overflow-hidden">
        {badge && (
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-[#E53E3E] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              {badge}
            </span>
          </div>
        )}
        
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded-full text-[10px] font-bold border border-black/5 shadow-sm">
          <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
          <span>{rating} | {reviews}</span>
        </div>

        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
        />
        
        <div className="absolute bottom-0 left-0 w-full flex justify-center pb-2">
           <div className="bg-white/80 backdrop-blur-sm px-4 py-0.5 rounded-full text-[10px] font-bold tracking-widest text-primary border border-primary/20">
              {category || 'SKINCARE'}
           </div>
        </div>
      </Link>
      
      <div className="p-3 flex flex-col flex-1 gap-1">
        <Link href={`/products/${slug}`} className="line-clamp-2 text-[13px] font-semibold text-foreground leading-tight hover:text-primary transition-colors min-h-[2.5rem]">
          {name}
        </Link>
        
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-sm font-bold">₹{price}</span>
          {mrp > price && (
            <>
              <span className="text-[10px] text-muted-foreground line-through decoration-muted-foreground/50">₹{mrp}</span>
              <span className="text-[10px] font-black text-green-600">({discount}% OFF)</span>
            </>
          )}
        </div>
        
        <Button className="w-full mt-2 rounded-lg h-9 text-xs font-bold uppercase tracking-wider transition-all active:scale-95" size="sm">
          Add to cart
        </Button>
      </div>
    </div>
  )
}
