"use client"

import React from 'react'

const INGREDIENTS = [
  { name: 'Kumkumadi', desc: 'Saffron-infused elixir for radiant glow', color: 'bg-orange-100', text: 'text-orange-700', icon: '🌸' },
  { name: 'Aloe Vera', desc: 'Deep soothing and hydration', color: 'bg-green-100', text: 'text-green-700', icon: '🌿' },
  { name: 'Turmeric (Haldi)', desc: 'Natural antiseptic and brightener', color: 'bg-yellow-100', text: 'text-yellow-700', icon: '✨' },
  { name: 'Hibiscus', desc: 'Strengthens roots and conditions', color: 'bg-rose-100', text: 'text-rose-700', icon: '🌺' },
]

export function IngredientsShowcase() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black tracking-tight mb-4 text-foreground italic">Powered by Nature&apos;s Finest</h2>
          <p className="text-[#64748B]">Authentic ingredients revered in Ayurveda, extracted with modern precision for maximum efficacy.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INGREDIENTS.map((item, i) => (
            <div key={i} className={`group relative p-6 rounded-3xl ${item.color} overflow-hidden transition-all hover:scale-105 cursor-pointer shadow-sm`}>
              <div className="absolute -right-4 -top-4 text-7xl opacity-20 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="relative z-10">
                <span className={`text-4xl shadow-sm mb-4 block`}>{item.icon}</span>
                <h3 className={`text-xl font-bold mb-2 ${item.text}`}>{item.name}</h3>
                <p className={`text-sm opacity-80 ${item.text}`}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
