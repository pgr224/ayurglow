"use client"

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Star } from 'lucide-react'

const TESTIMONIALS = [
  { text: "The Kumkumadi Oil has completely transformed my skin texture. My dark spots are fading and the glow is real!", author: "Priya S.", rating: 5, variant: "Verified Buyer" },
  { text: "I love that it's 100% herbal. The aloe vera gel is so soothing and non-sticky. Perfect for my oily skin.", author: "Neha M.", rating: 5, variant: "Verified Buyer" },
  { text: "Dr. Bina's formulation actually works. The ubtan powder gives an instant brightness before events.", author: "Anjali R.", rating: 4, variant: "Verified Buyer" },
  { text: "Finally an ayurvedic brand I can trust. The ingredients are transparent and the results speak for themselves.", author: "Megha K.", rating: 5, variant: "Verified Buyer" },
]

export function Testimonials() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 4000 })])

  return (
    <section className="py-16 bg-[#FAF9F6]">
      <div className="container px-4">
        <h2 className="text-3xl font-black italic tracking-tight text-center mb-10">Real Results From Real People</h2>
        
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_30%] min-w-0">
                <div className="bg-white p-6 rounded-2xl border shadow-sm h-full flex flex-col gap-4">
                  <div className="flex gap-1 text-[#FDE68A]">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="h-5 w-5 fill-current text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-[#64748B] italic leading-relaxed flex-grow">"{t.text}"</p>
                  <div className="mt-4 pt-4 border-t flex flex-col">
                    <span className="font-bold text-foreground">{t.author}</span>
                    <span className="text-xs text-green-600 font-bold uppercase tracking-wider">{t.variant}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
