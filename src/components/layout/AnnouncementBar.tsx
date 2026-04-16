"use client"

import React from 'react'

export function AnnouncementBar() {
  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 text-xs font-bold tracking-widest uppercase text-center overflow-hidden whitespace-nowrap">
      <div className="inline-block animate-[marquee_20s_linear_infinite]">
        ✨ FLAT 25% OFF on orders above ₹799 | Use code SAVE25 | FREE Shipping on all orders ✨
      </div>
    </div>
  )
}
