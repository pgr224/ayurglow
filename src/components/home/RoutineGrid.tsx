import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const STEPS = [
  { id: 1, name: 'CLEANSE', color: 'bg-[#F3E8FF]', text: 'text-purple-600', image: '/images/herbal-ubtan.jpg' },
  { id: 2, name: 'CORRECT', color: 'bg-[#D1FAE5]', text: 'text-green-600', image: '/images/kumkumadi-oil.jpg' },
  { id: 3, name: 'MOISTURIZE', color: 'bg-[#DBEAFE]', text: 'text-blue-600', image: '/images/aloe-vera-gel.jpg' },
  { id: 4, name: 'HAIR CARE', color: 'bg-[#FEF3C7]', text: 'text-yellow-600', image: '/images/hair-mask-powder.jpg' }, // Adjusted step for the 4th product
]

export function RoutineGrid() {
  return (
    <section className="py-12 bg-white">
      <div className="container px-4">
        <div className="text-center mb-8">
           <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground italic mb-2">Shop by routine</h2>
           <p className="text-sm md:text-base text-muted-foreground uppercase tracking-widest font-bold">To maintain that healthy glow</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {STEPS.map((step) => (
            <Link key={step.id} href={`/products?category=${step.name.toLowerCase()}`} className="group relative flex flex-col items-center gap-3">
              <div className={`h-40 w-40 rounded-full ${step.color} relative overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm`}>
                 <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                 <Image src={step.image} alt={step.name} fill className="object-cover scale-[0.6] group-hover:scale-[0.65] transition-transform z-10" />
              </div>
              <div className="text-center">
                 <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Step {step.id}</p>
                 <p className={`text-sm md:text-base font-black tracking-widest uppercase ${step.text}`}>{step.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
