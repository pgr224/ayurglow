"use client"

import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, Ticket, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getCouponsAction } from '../actions'

export const runtime = 'edge'

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCoupons()
  }, [])

  async function loadCoupons() {
    setLoading(true)
    const data = await getCouponsAction()
    setCoupons(data)
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Promotions & Coupons</h1>
          <p className="text-sm text-muted-foreground italic font-medium">Create and manage discounts for your Ayurvedic store.</p>
        </div>
        <Button className="rounded-full gap-2 px-6">
          <Plus className="h-4 w-4" /> New Coupon
        </Button>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between gap-4">
           <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                placeholder="Search coupons..." 
                className="w-full pl-10 pr-4 h-10 rounded-lg border bg-muted/20 text-sm focus:outline-primary"
              />
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                <th className="px-6 py-4">Code</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Value</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Usage</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground italic">Loading coupons...</td>
                </tr>
              ) : coupons.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground italic">No active coupons found.</td>
                </tr>
              ) : coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-3">
                        <Ticket className="h-4 w-4 text-amber-500" />
                        <span className="font-black tracking-widest">{coupon.code}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className="text-[10px] font-bold bg-muted px-2 py-0.5 rounded uppercase tracking-wider">
                        {coupon.type}
                     </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-primary">
                    {coupon.type === 'percentage' ? `${coupon.value}%` : `₹${coupon.value}`}
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-1.5">
                        {coupon.isActive ? (
                          <><CheckCircle className="h-3 w-3 text-green-500" /> <span className="text-[10px] font-bold text-green-600 uppercase">Active</span></>
                        ) : (
                          <><XCircle className="h-3 w-3 text-red-500" /> <span className="text-[10px] font-bold text-red-600 uppercase">Inactive</span></>
                        )}
                     </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{coupon.usageCount} / {coupon.maxUsage || '∞'}</td>
                  <td className="px-6 py-4 text-right">
                     <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
