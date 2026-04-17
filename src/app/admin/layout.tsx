"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Ticket, 
  Image as ImageIcon, 
  Users, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { setAdminLoggedIn } from '@/lib/admin'
import Image from 'next/image'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { label: 'Products', icon: Package, href: '/admin/products' },
  { label: 'Orders', icon: ShoppingCart, href: '/admin/orders' },
  { label: 'Coupons', icon: Ticket, href: '/admin/coupons' },
  { label: 'Banners', icon: ImageIcon, href: '/admin/banners' },
  { label: 'Users', icon: Users, href: '/admin/users' },
  { label: 'Payment Settings', icon: Settings, href: '/admin/settings' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    setAdminLoggedIn(false)
    router.push('/')
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop Always Visible */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-white border-r">
        <div className="h-16 flex items-center px-6 border-b gap-2">
          <Link href="/admin" className="flex items-center gap-2 mix-blend-multiply">
            <Image 
              src="/images/ayurglow_font.png" 
              alt="AyurGlow" 
              width={120} 
              height={30} 
              className="object-contain"
            />
            <span className="text-[9px] font-black bg-primary text-white px-1.5 py-0.5 rounded-sm tracking-widest uppercase">
              Admin
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                  isActive 
                    ? "bg-primary text-white" 
                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors"
           >
              <LogOut className="h-4 w-4" />
              Exit Admin
           </button>
        </div>
      </aside>

      {/* Sidebar - Mobile Collapsible */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-64 z-40 bg-white border-r flex flex-col transition-transform duration-300 md:hidden",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between px-6 border-b gap-2">
          <Link href="/admin" className="flex items-center gap-2 mix-blend-multiply">
            <Image 
              src="/images/ayurglow_font.png" 
              alt="AyurGlow" 
              width={120} 
              height={30} 
              className="object-contain"
            />
            <span className="text-[9px] font-black bg-primary text-white px-1.5 py-0.5 rounded-sm tracking-widest uppercase">
              Admin
            </span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-1 hover:bg-muted rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                  isActive 
                    ? "bg-primary text-white" 
                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors"
           >
              <LogOut className="h-4 w-4" />
              Exit Admin
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:pl-64 flex flex-col">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Menu className="h-5 w-5 text-muted-foreground" />
            </button>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground">Admin Control Panel</h2>
          </div>
          <div className="flex items-center gap-4">
             <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">ADM</div>
          </div>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
