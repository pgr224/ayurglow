"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'
import type { Product } from '@/lib/products'

export function ProductCard(product: Product) {
  const { name, price, mrp, rating, reviews, image, badge, category, slug } = product
  const discount = Math.round(((mrp - price) / mrp) * 100)
  const { addItem } = useCart()
  
  return (
    <div className="group rounded-3xl bg-white overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 hover:-translate-y-1">
      <Link href={`/products/${slug}`} className="relative aspect-square bg-[#FAF9F6] overflow-hidden">
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {badge}
            </span>
          </div>
        )}
        
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <button className="h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors">
            <Heart className="h-4 w-4" />
          </button>
        </div>
        
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-bold shadow-sm">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span>{rating} | {reviews}</span>
        </div>

        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </Link>
      
      <div className="p-4 flex flex-col flex-1 gap-2">
        <Link href={`/products/${slug}`} className="line-clamp-2 text-sm font-bold text-foreground leading-snug hover:text-primary transition-colors min-h-[2.5rem]">
          {name}
        </Link>
        
        <span className="text-[10px] font-bold tracking-widest text-[#64748B] uppercase">{category || 'SKINCARE'}</span>
        
        <div className="flex items-center gap-2 mt-auto pt-2">
          <span className="text-lg font-black text-primary">₹{price}</span>
          {mrp > price && (
            <>
              <span className="text-xs text-muted-foreground line-through">₹{mrp}</span>
              <span className="text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">-{discount}%</span>
            </>
          )}
        </div>
        
        <Button 
          onClick={(e) => { e.preventDefault(); addItem(product); }}
          className="w-full mt-3 rounded-xl h-10 text-xs font-bold uppercase tracking-widest transition-all active:scale-95 bg-primary hover:bg-primary/90 text-primary-foreground"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4 mr-2" /> Add
        </Button>
      </div>
    </div>
  )
}
