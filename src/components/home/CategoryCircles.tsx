"use client"

import React from 'react'
import { Droplets, Flame, Sparkles, Wind, Microscope, Zap, ShieldCheck, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const CATEGORIES = [
  { name: 'Oily Skin', color: 'bg-[#FFF8F0]' },
  { name: 'Combination', color: 'bg-[#F0FAFF]' },
  { name: 'Dry Skin', color: 'bg-[#F5F5F5]' },
  { name: 'Acne', color: 'bg-[#F0FFF4]' },
  { name: 'Pigmentation', color: 'bg-[#FFF5F7]' },
  { name: 'Ageing', color: 'bg-[#F5F3FF]' },
]

export function CategoryCircles({ title }: { title: string }) {
  return (
    <section className="py-8 px-4">
      <h3 className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-6 text-center">{title}</h3>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
        {CATEGORIES.map((cat, i) => (
          <Link key={i} href={`/products?category=${cat.name.toLowerCase()}`} className="flex flex-col items-center gap-2 min-w-[80px]">
            <div className={`h-20 w-20 rounded-full border border-border flex items-center justify-center transition-transform hover:scale-110`}>
                <div className="h-14 w-14 rounded-full border border-black/5 flex items-center justify-center p-3">
                   {/* Icons would be custom SVGs from images in real site */}
                   <span className="text-xs text-center font-medium line-clamp-2">{cat.name}</span>
                </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
