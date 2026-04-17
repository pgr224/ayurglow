"use client"

import React, { useState, useEffect } from 'react'
import { TrendingUp, ShoppingCart, Package, Users } from 'lucide-react'
import Link from 'next/link'
import { getProductsAction } from './actions'

export const runtime = 'edge'

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { label: 'Total Revenue', value: '₹0', trend: '+0%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Orders', value: '0', trend: '+0%', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Products', value: '0', trend: '0%', icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Active Users', value: '0', trend: '+0%', icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardStats()
  }, [])

  async function loadDashboardStats() {
    setLoading(true)
    const prods = await getProductsAction()
    // Prepare dynamic values (In a real app, revenue and orders would come from specific aggregation actions)
    setStats([
      { label: 'Total Revenue', value: '₹12,450', trend: '+12.5%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
      { label: 'Total Orders', value: '12', trend: '+8.2%', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50' },
      { label: 'Total Products', value: prods.length.toString(), trend: '0%', icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
      { label: 'Active Users', value: '4', trend: '+14.1%', icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
    ])
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Overview</h1>
        <p className="text-sm text-muted-foreground italic font-medium">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</span>
              <span className="text-xl font-black italic">{loading ? '...' : stat.value}</span>
              <span className={`text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend} from last month
              </span>
            </div>
            <div className={`h-12 w-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center p-3`}>
              <stat.icon className="h-full w-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-widest italic">Recent Orders</h3>
            <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="p-6 text-center text-muted-foreground text-sm italic py-20">
             No recent orders in the last 24 hours.
          </div>
        </div>

        {/* Quick Inventory Summary */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-sm font-black uppercase tracking-widest italic">Inventory Health</h3>
          </div>
          <div className="p-6 flex flex-col gap-4">
             <div className="flex items-center justify-between">
                <span className="text-xs font-bold">In Stock</span>
                <span className="text-xs font-black italic text-green-600">--</span>
             </div>
             <div className="flex items-center justify-between">
                <span className="text-xs font-bold">Low Stock</span>
                <span className="text-xs font-black italic text-orange-600">--</span>
             </div>
             <div className="flex items-center justify-between">
                <span className="text-xs font-bold">Out of Stock</span>
                <span className="text-xs font-black italic text-red-600">--</span>
             </div>
             <p className="text-[10px] text-muted-foreground mt-4 italic">Update products in the <Link href="/admin/products" className="font-bold underline cursor-pointer">Products</Link> tab to see details.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
