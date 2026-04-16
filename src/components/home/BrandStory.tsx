"use client"

import React from 'react'
import Image from 'next/image'

export function BrandStory() {
  return (
    <section className="py-16 bg-[#022C22] text-[#F8FAFC] overflow-hidden">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden relative">
              <Image 
                src="/images/brand-story.png"
                alt="Ayurvedic wisdom meets modern science"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#022C22]/80 to-transparent" />
            </div>
            {/* Decorator */}
            <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-primary rounded-full blur-3xl opacity-50" />
            <div className="absolute -top-6 -left-6 h-32 w-32 bg-accent rounded-full blur-3xl opacity-20" />
          </div>
          
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <span className="text-sm font-bold tracking-widest text-primary uppercase">Our Philosophy</span>
            <h2 className="text-3xl md:text-5xl font-black leading-tight italic text-white text-balance">
              Ayurvedic Wisdom Meets Modern Science
            </h2>
            <p className="text-lg text-[#94A3B8] leading-relaxed">
              Curated by <strong className="text-white">Dr. Bina G. Rabadia</strong>, a passionate Aesthetician and Cosmetologist. AyurGlow isn't just skincare; it's a holistic regimen formulated with 100% natural herbs to bring out your healthiest self.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div className="flex flex-col gap-2">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                  🌿
                </div>
                <h4 className="font-bold text-white">100% Herbal</h4>
                <p className="text-sm text-[#94A3B8]">Pure, potent ingredients sourced directly from nature.</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                  🔬
                </div>
                <h4 className="font-bold text-white">Dermat Tested</h4>
                <p className="text-sm text-[#94A3B8]">Safe, effective, and free from harmful chemicals.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
