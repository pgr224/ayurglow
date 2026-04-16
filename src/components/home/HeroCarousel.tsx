"use client"

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const BANNERS = [
  {
    title: "100% Herbal Solutions",
    subtitle: "Dermatologist formulated Ayurvedic skincare specifically made for your glowing skin.",
    code: "AYUR25",
    image: "/images/hero-banner.png",
    color: "bg-[#FFFDF8]",
    buttonLabel: "DISCOVER NOW",
    isLightText: false,
  },
  {
    title: "Ayurvedic Wisdom",
    subtitle: "Experience the pure extracts of Kumkumadi, Turmeric, and Aloe Vera.",
    code: "GLOW10",
    image: "/images/lifestyle-banner.png",
    color: "bg-[#022C22]",
    buttonLabel: "SHOP INGREDIENTS",
    isLightText: true,
  }
]

export function HeroCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6000 })])

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {BANNERS.map((banner, index) => (
          <div key={index} className="relative flex-[0_0_100%] min-w-0">
            <div className={`flex relative h-[350px] md:h-[500px] w-full items-center px-4 md:px-16 ${banner.color}`}>
              {/* Image filling background */}
              <div className="absolute inset-0 z-0">
                <Image 
                  src={banner.image} 
                  alt={banner.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                {/* Gradient overlay for text legibility depending on slide */}
                <div className={`absolute inset-0 ${banner.isLightText ? 'bg-black/50' : 'bg-white/40 md:bg-white/20 bg-gradient-to-r from-white via-white/80 to-transparent'}`} />
              </div>

              <div className={`relative z-10 flex flex-col gap-3 md:gap-5 max-w-[90%] md:max-w-[50%] ${banner.isLightText ? 'text-white' : 'text-slate-900'} drop-shadow-sm`}>
                <span className="text-xs md:text-sm font-bold tracking-widest uppercase opacity-90 drop-shadow">AyurGlow Exclusive</span>
                <h2 className="text-4xl md:text-6xl font-black leading-tight italic text-balance drop-shadow-md">
                  {banner.title}
                </h2>
                <p className={`text-sm md:text-lg opacity-90 drop-shadow ${banner.isLightText ? 'text-white' : 'text-slate-700'}`}>
                  {banner.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                   <Link href="/products">
                     <Button className={`rounded-xl px-8 h-12 text-sm md:text-base font-bold shadow-lg ${banner.isLightText ? 'bg-primary text-white hover:bg-primary/90' : 'bg-[#022C22] text-white hover:bg-[#022C22]/90'}`}>
                       {banner.buttonLabel}
                     </Button>
                   </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
