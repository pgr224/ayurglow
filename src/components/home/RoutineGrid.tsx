import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const STEPS = [
  { id: 1, name: 'CLEANSE', color: 'bg-purple-100', text: 'text-purple-600', image: '/images/cleanse.png' },
  { id: 2, name: 'CORRECT', color: 'bg-green-100', text: 'text-green-600', image: '/images/correct.png' },
  { id: 3, name: 'MOISTURIZE', color: 'bg-blue-100', text: 'text-blue-600', image: '/images/moisturize.png' },
  { id: 4, name: 'PROTECT', color: 'bg-yellow-100', text: 'text-yellow-600', image: '/images/protect.png' },
]

export function RoutineGrid() {
  return (
    <section className="py-12 bg-white">
      <div className="container px-4">
        <h2 className="text-2xl font-bold text-center mb-2 tracking-tight">Shop by Routine</h2>
        <p className="text-center text-muted-foreground mb-8 text-sm uppercase tracking-widest font-bold">To maintain that healthy glow</p>
        
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          {STEPS.map((step) => (
            <Link key={step.id} href={`/products?routine=${step.name.toLowerCase()}`} className="group relative flex flex-col items-center gap-2">
              <div className={`h-32 w-32 rounded-full ${step.color} relative overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105`}>
                 <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                 {/* Product image would go here */}
                 <div className="w-20 h-24 bg-white/40 rounded-lg shadow-sm" />
              </div>
              <div className="text-center">
                 <p className="text-[10px] font-bold text-muted-foreground uppercase">Step {step.id}</p>
                 <p className={`text-xs font-black tracking-widest ${step.text}`}>{step.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
