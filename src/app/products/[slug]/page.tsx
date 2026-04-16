"use client"

import React, { useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { Star, Share2, ShieldCheck, Truck, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const VARIANTS = [
  { id: '1', name: '50g', price: 499, mrp: 599, perUnit: '₹9.98 /g' },
  { id: '2', name: '80g', price: 699, mrp: 899, perUnit: '₹8.74 /g' },
  { id: '3', name: '125g', price: 839, mrp: 1199, perUnit: '₹6.71 /g', discount: '30% off' },
]

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [selectedVariant, setSelectedVariant] = useState(VARIANTS[0])
  const [emblaRef] = useEmblaCarousel({ loop: true })
  
  return (
    <div className="flex flex-col pb-20 md:pb-8">
      {/* 1. Header (Mobile - Back Button) - Handled by app layout */}
      
      {/* 2. Image Gallery */}
      <div className="bg-white border-b overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {[1, 2, 3].map((i) => (
             <div key={i} className="flex-[0_0_100%] min-w-0 aspect-[4/5] relative">
               <Image 
                 src={`/images/product-1.jpg`} 
                 alt="Product Image" 
                 fill 
                 className="object-contain p-8"
               />
               <div className="absolute top-4 left-4">
                  <div className="bg-[#E53E3E] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
                    In-Vivo Tested
                  </div>
               </div>
             </div>
          ))}
        </div>
      </div>

      <div className="container px-4 py-6 bg-white flex flex-col gap-6">
        {/* 3. Product Info */}
        <div className="flex flex-col gap-2">
           <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold leading-tight">Ceramide & Vitamin C Sunscreen - 50 Gm In-Vivo Tested Spf 50+ PA++++</h1>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Share2 className="h-5 w-5" />
              </Button>
           </div>
           <p className="text-sm text-muted-foreground">In-Vivo Tested | Protects, Moisturizes & Brightens Skin | SPF 50+ PA++++ | Lightweight, Leaves No White Cast</p>
           
           <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1.5 bg-yellow-400/10 text-yellow-500 font-black text-xs px-2 py-1 rounded">
                <Star className="h-3 w-3 fill-yellow-400" />
                <span>4.4 (794)</span>
              </div>
           </div>
        </div>

        {/* 4. Pricing & Variants */}
        <div className="flex flex-col gap-4">
           <div className="flex items-center gap-4">
              <span className="text-2xl font-black italic text-primary">₹{selectedVariant.price}</span>
              {selectedVariant.mrp > selectedVariant.price && (
                <span className="text-muted-foreground line-through">₹{selectedVariant.mrp}</span>
              )}
           </div>

           <div className="flex flex-col gap-3">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">Select Variant:</p>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                 {VARIANTS.map((v) => (
                   <button
                     key={v.id}
                     onClick={() => setSelectedVariant(v)}
                     className={cn(
                       "flex flex-col items-center justify-center min-w-[100px] border-2 rounded-xl p-3 transition-all",
                       selectedVariant.id === v.id ? "border-primary bg-primary/5" : "border-border bg-white"
                     )}
                   >
                     <span className="text-sm font-bold">{v.name}</span>
                     <span className="text-xs font-black">₹{v.price}</span>
                     <span className="text-[9px] text-muted-foreground mt-1 uppercase italic tracking-tighter">{v.perUnit}</span>
                     {v.discount && <span className="text-[9px] font-bold text-red-500 mt-1">{v.discount}</span>}
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* 5. Key Highlights */}
        <div className="grid grid-cols-2 gap-3 py-4 border-y border-dashed">
           <div className="flex items-center gap-2 text-xs font-bold text-green-700">
             <ShieldCheck className="h-4 w-4" />
             <span>Dermatologist Formulated</span>
           </div>
           <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
             <Truck className="h-4 w-4" />
             <span>Eligible for Cash on Delivery</span>
           </div>
        </div>

        {/* 6. Sticky Bottom CTA */}
        <div className="fixed bottom-16 md:bottom-0 left-0 w-full bg-white border-t p-4 z-40 md:relative md:border-none md:p-0">
           <Button className="w-full h-12 text-sm font-black uppercase tracking-[0.2em] rounded-lg bg-black text-white hover:bg-neutral-800 transition-all active:scale-[0.98]">
             Add to cart
           </Button>
        </div>
      </div>

      {/* 7. Product Details Accordions / Sections */}
      <div className="bg-[#FAF9F6] py-8 px-4 flex flex-col gap-8 mb-20">
         <div className="flex flex-col gap-4">
            <h3 className="text-lg font-black tracking-tight italic uppercase">Offers & Benefits</h3>
            <div className="bg-white border-2 border-dashed border-primary/30 p-4 rounded-2xl flex items-center justify-between">
               <div className="flex flex-col gap-1">
                  <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded w-fit">CERAMIDE699</span>
                  <p className="text-sm font-bold">2 Free Product(s) will be added!</p>
                  <p className="text-xs text-muted-foreground">Shop for ₹699 and Get 2 Bestsellers FREE</p>
               </div>
               <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
         </div>
      </div>
    </div>
  )
}
