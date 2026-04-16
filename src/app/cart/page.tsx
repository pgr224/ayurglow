"use client"

import React from 'react'
import { Trash2, Plus, Minus, Ticket, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function CartPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6] pb-20">
      <div className="bg-white border-b px-4 py-4 sticky top-16 z-30">
        <h1 className="text-xl font-black italic tracking-tight uppercase">My Cart (1 Item)</h1>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* 1. Cart Items */}
        <div className="bg-white rounded-2xl border shadow-sm p-4 flex gap-4">
           <div className="relative h-24 w-24 bg-muted rounded-xl flex-shrink-0">
             <Image src="/images/product-1.jpg" alt="Product" fill className="object-contain p-2" />
           </div>
           <div className="flex flex-col flex-1 gap-1">
              <div className="flex justify-between items-start">
                 <h3 className="text-sm font-bold leading-tight">Ceramide & Vitamin C Sunscreen - 50 Gm</h3>
                 <button className="text-muted-foreground hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                 </button>
              </div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest italic">Variant: 50g</p>
              
              <div className="flex justify-between items-end mt-2">
                 <div className="flex items-center gap-2">
                   <span className="text-sm font-black italic">₹499</span>
                   <span className="text-[10px] text-muted-foreground line-through decoration-muted-foreground/50">₹599</span>
                 </div>
                 
                 <div className="flex items-center border rounded-lg overflow-hidden h-8">
                    <button className="px-2 bg-muted hover:bg-muted/80 transition-colors"><Minus className="h-3 w-3" /></button>
                    <span className="px-3 text-xs font-bold">1</span>
                    <button className="px-2 bg-muted hover:bg-muted/80 transition-colors"><Plus className="h-3 w-3" /></button>
                 </div>
              </div>
           </div>
        </div>

        {/* 2. Offers & Coupons */}
        <div className="bg-white rounded-2xl border shadow-sm p-4 flex flex-col gap-4">
           <div className="flex items-center gap-2 text-primary">
              <Ticket className="h-5 w-5 rotate-45" />
              <span className="text-sm font-black italic uppercase tracking-wider">Coupons & Offers</span>
           </div>
           <div className="flex items-center justify-between border-2 border-dashed rounded-xl px-4 py-3 bg-primary/5">
              <span className="text-sm font-bold text-primary">SAVE25</span>
              <button className="text-sm font-black text-primary uppercase tracking-widest">Applied</button>
           </div>
           <div className="flex items-center justify-between group cursor-pointer">
              <p className="text-xs text-muted-foreground">Apply more coupons & save more</p>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
           </div>
        </div>

        {/* 3. Free Gift Progress */}
        <div className="bg-white rounded-2xl border shadow-sm p-4 flex flex-col gap-4">
           <div className="flex justify-between items-center text-xs">
              <p className="font-bold">Add Item Worth <span className="text-primary italic font-black">₹200</span> More To Avail</p>
              <span className="text-muted-foreground font-black italic uppercase">FREE GIFT</span>
           </div>
           <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[70%]" />
           </div>
           <p className="text-[10px] text-center text-muted-foreground">Get Body Lotion FREE worth ₹349</p>
        </div>

        {/* 4. Bill Summary */}
        <div className="bg-white rounded-2xl border shadow-sm p-4 flex flex-col gap-3">
           <h3 className="text-sm font-black italic uppercase tracking-tighter mb-1">Order Summary</h3>
           <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-bold">₹499.00</span>
           </div>
           <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-600 font-bold">FREE</span>
           </div>
           <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Discount</span>
              <span className="text-green-600 font-bold">-₹125.00</span>
           </div>
           <div className="pt-2 border-t flex justify-between items-center">
              <span className="text-lg font-black italic uppercase">Grand Total</span>
              <span className="text-lg font-black text-primary italic">₹374.00</span>
           </div>
        </div>
      </div>

      {/* 5. Sticky Footer CTA */}
      <div className="fixed bottom-16 md:bottom-0 left-0 w-full bg-white border-t p-4 flex items-center justify-between z-40 md:relative md:border-none md:p-0 md:bg-transparent">
         <div className="flex flex-col md:hidden">
            <span className="text-sm font-black italic uppercase">₹374.00</span>
            <span className="text-[10px] text-green-600 font-bold">Saved ₹125.00</span>
         </div>
         <Link href="/checkout" className="w-[60%] md:w-full">
           <Button className="w-full h-12 text-sm font-black uppercase tracking-[0.2em] rounded-lg bg-black text-white hover:bg-neutral-800 transition-all active:scale-[0.98]">
             Place Order
           </Button>
         </Link>
      </div>
    </div>
  )
}
