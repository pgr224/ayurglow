"use client"

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const BANNERS = [
  {
    title: "FLAT 25% OFF",
    subtitle: "On orders above ₹799+",
    code: "SAVE25",
    image: "/images/banner-1.jpg", // Placeholder path
    color: "bg-[#FFF8F0]"
  },
  {
    title: "BUY 2 GET 1 FREE",
    subtitle: "On all Bestsellers",
    code: "B2G1",
    image: "/images/banner-2.jpg", // Placeholder path
    color: "bg-[#F0FAFF]"
  }
]

export function HeroCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {BANNERS.map((banner, index) => (
          <div key={index} className="relative flex-[0_0_100%] min-w-0">
            <div className={`flex h-[200px] md:h-[400px] w-full items-center justify-between px-8 ${banner.color}`}>
              <div className="flex flex-col gap-2 md:gap-4 max-w-[60%]">
                <span className="text-sm font-bold tracking-widest text-primary uppercase">Special Offer</span>
                <h2 className="text-2xl md:text-5xl font-black text-foreground leading-tight italic">{banner.title}</h2>
                <p className="text-sm md:text-lg text-muted-foreground">{banner.subtitle}</p>
                <div className="flex items-center gap-4 mt-2">
                   <div className="border-2 border-dashed border-primary px-3 py-1 text-xs md:text-sm font-bold bg-white">
                     USE CODE: <span className="text-primary">{banner.code}</span>
                   </div>
                   <Button className="rounded-full px-6">SHOP NOW</Button>
                </div>
              </div>
              <div className="w-[30%] h-full relative">
                {/* Image placeholder - in a real app this would be a high res shot */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-2xl transform scale-150" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
