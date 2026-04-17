"use client"

import React from 'react'
import Link from 'next/link'

const CONCERNS = [
  { id: 'ageing', name: 'Ageing Skin', bg: 'bg-[#F3E8FF]', textColor: 'text-purple-700', icon: '✨' },
  { id: 'dryness', name: 'Dry & Damaged Skin', bg: 'bg-[#DBEAFE]', textColor: 'text-blue-700', icon: '💧' },
  { id: 'acne', name: 'Acne', bg: 'bg-[#D1FAE5]', textColor: 'text-green-700', icon: '🌿' },
  { id: 'pigmentation', name: 'Pigmentation', bg: 'bg-[#FEF3C7]', textColor: 'text-yellow-700', icon: '☀️' },
]

export function ShopByConcern() {
  return (
    <section className="py-12 bg-white">
      <div className="container px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground italic mb-2">Shop by concern</h2>
          <p className="text-sm md:text-base text-muted-foreground uppercase tracking-widest font-bold">For a better and perfect regimen</p>
        </div>

        <div className="flex flex-col gap-4 max-w-sm mx-auto">
          {CONCERNS.map((concern, i) => (
            <Link 
              key={i} 
              href={`/products?concern=${concern.id}`}
              className="flex items-center bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all group overflow-hidden"
            >
              <div className={`h-16 w-20 ${concern.bg} flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform origin-left`}>
                {concern.icon}
              </div>
              <div className="flex flex-col py-2 px-4 flex-grow border-l-2 border-white relative -left-1 bg-white z-10 rounded-l-2xl">
                <span className="text-xs uppercase font-bold text-muted-foreground tracking-wider leading-none">Solutions For</span>
                <span className={`text-lg font-black uppercase tracking-tight ${concern.textColor}`}>{concern.name}</span>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
           <Link href="/products" className="text-xs font-bold uppercase tracking-widest border border-primary text-primary px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-colors">
              View All
           </Link>
        </div>
      </div>
    </section>
  )
}
