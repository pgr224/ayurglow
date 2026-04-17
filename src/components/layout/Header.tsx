"use client"

import React from 'react'
import { Search, ShoppingBag, User, Menu } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'

export function Header() {
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="container flex h-[72px] items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden hover:bg-slate-100">
            <Menu className="h-6 w-6" />
          </Button>
          <Link href="/" className="flex items-center overflow-hidden mix-blend-multiply w-[140px] md:w-[180px]">
            <Image
              src="/images/ayurglow_font.png"
              alt="AyurGlow - Ayurvedic Aesthetics"
              width={200}
              height={50}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        <div className="flex-1 px-8 max-w-xl hidden md:block">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="search"
              placeholder="Search for Ayurveda Skincare & Haircare..."
              className="w-full rounded-full bg-slate-100 pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-3">
          <Link href="/admin">
            <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-slate-100">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative hover:bg-slate-100">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary font-bold text-[10px] text-primary-foreground border-2 border-white shadow-sm">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar Visibility */}
      <div className="px-4 py-3 bg-white border-t border-slate-100 md:hidden">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="search"
            placeholder="Search products..."
            className="w-full rounded-full bg-slate-100 pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-inner"
          />
        </div>
      </div>
    </header>
  )
}
