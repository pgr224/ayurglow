"use client"

import React from 'react'
import { Home, LayoutGrid, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useCart } from '@/context/cart-context'

const navItems = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Collection', icon: LayoutGrid, href: '/products' },
  { label: 'Cart', icon: ShoppingCart, href: '/cart' },
  { label: 'Profile', icon: User, href: '/account' },
]

export function BottomNav() {
  const pathname = usePathname()
  const { itemCount } = useCart()

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 md:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.05)] pt-1 pb-safe">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center gap-1 transition-all duration-300 w-16 h-14 justify-center rounded-2xl",
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-slate-50"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "fill-primary/20")} />
              <span className="text-[10px] uppercase font-bold tracking-wider">{item.label}</span>
              
              {item.href === '/cart' && itemCount > 0 && (
                <span className="absolute 1 top-1 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary font-bold text-[9px] text-primary-foreground border-2 border-white">
                  {itemCount}
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
