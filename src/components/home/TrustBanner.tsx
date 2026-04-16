"use client"

import React from 'react'
import { ShieldCheck, Truck, Leaf, Award } from 'lucide-react'

const BENEFITS = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹799' },
  { icon: Leaf, title: '100% Herbal', desc: 'No harmful chemicals' },
  { icon: Award, title: 'Dermatologist Formulated', desc: 'By Dr. Bina G. Rabadia' },
  { icon: ShieldCheck, title: 'Secure Payments', desc: '100% safe & trusted' },
]

export function TrustBanner() {
  return (
    <div className="w-full bg-[#E8F5E9] py-6 border-y border-primary/10">
      <div className="container px-4">
        <ul className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between gap-6 md:gap-4">
          {BENEFITS.map((benefit, i) => (
            <li key={i} className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
              <div className="h-10 w-10 shrink-0 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                <benefit.icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground leading-none">{benefit.title}</span>
                <span className="text-xs text-muted-foreground mt-1">{benefit.desc}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
