"use client"

import React, { useState } from 'react'
import { MapPin, CreditCard, Wallet, Landmark, Truck } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI', icons: ['/p-pp.png', '/p-gp.png', '/p-py.png'], extra: 'PhonePe, GPay, Paytm' },
  { id: 'cod', name: 'Cash on Delivery', price: '₹740.00' }, // Example higher price
  { id: 'card', name: 'Debit/Credit Cards' },
  { id: 'wallet', name: 'Wallets', badge: 'Get 5% discount' },
  { id: 'net', name: 'Netbanking', badge: 'Get 5% discount' },
]

export default function CheckoutPage() {
  const [selectedMethod, setSelectedMethod] = useState('upi')

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6] pb-20">
      <div className="bg-white border-b px-4 py-4 sticky top-16 z-30">
        <h1 className="text-xl font-black italic tracking-tight uppercase">Checkout</h1>
      </div>

      <div className="p-4 flex flex-col gap-6">
        {/* 1. Shipping Address */}
        <div className="bg-white rounded-2xl border shadow-sm p-4 flex flex-col gap-4">
           <div className="flex items-center gap-2 text-primary">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-black italic uppercase tracking-wider">Shipping Address</span>
           </div>
           <div className="p-4 border rounded-xl bg-muted/20">
              <p className="text-sm font-bold">John Doe</p>
              <p className="text-xs text-muted-foreground mt-1">123, Beauty Lane, Glamour City, 400001</p>
              <p className="text-xs text-muted-foreground">+91 9876543210</p>
           </div>
           <Button variant="outline" className="text-xs font-bold uppercase tracking-widest border-primary text-primary h-10">
              Change Address
           </Button>
        </div>

        {/* 2. Payment Options */}
        <div className="bg-white rounded-2xl border shadow-sm p-4 flex flex-col gap-4">
           <div className="flex items-center gap-2 text-primary">
              <CreditCard className="h-5 w-5" />
              <span className="text-sm font-black italic uppercase tracking-wider">Payment Method</span>
           </div>

           <div className="flex flex-col border rounded-2xl overflow-hidden divide-y">
              {PAYMENT_METHODS.map((method) => (
                <div 
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={cn(
                    "p-4 flex flex-col gap-4 cursor-pointer transition-colors",
                    selectedMethod === method.id ? "bg-primary/5" : "bg-white"
                  )}
                >
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className={cn(
                          "h-4 w-4 rounded-full border-2 flex items-center justify-center p-1",
                          selectedMethod === method.id ? "border-primary" : "border-muted-foreground"
                        )}>
                           {selectedMethod === method.id && <div className="h-full w-full rounded-full bg-primary" />}
                        </div>
                        <span className="text-sm font-bold">{method.name}</span>
                     </div>
                     {method.price && <span className="text-sm font-black italic">{method.price}</span>}
                  </div>
                  
                  {selectedMethod === method.id && method.id === 'upi' && (
                    <div className="flex flex-col gap-4 pl-7 animate-in slide-in-from-top-2">
                       <div className="flex gap-4 overflow-x-auto justify-start">
                          <div className="h-12 w-16 bg-muted rounded flex items-center justify-center p-2 border">PhonePe</div>
                          <div className="h-12 w-16 bg-muted rounded flex items-center justify-center p-2 border">GPay</div>
                          <div className="h-12 w-16 bg-muted rounded flex items-center justify-center p-2 border">Paytm</div>
                       </div>
                       <div className="relative">
                          <input 
                            placeholder="Enter your UPI ID" 
                            className="w-full border rounded-lg h-10 px-4 text-sm focus:outline-primary"
                          />
                          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-black uppercase text-primary">Pay</button>
                       </div>
                    </div>
                  )}

                  {method.badge && <span className="text-[9px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded w-fit ml-7">{method.badge}</span>}
                </div>
              ))}
           </div>
        </div>

        {/* 3. Safe & Secure Banner */}
        <div className="text-center flex flex-col items-center gap-2 py-4">
           <h4 className="text-sm font-black italic uppercase text-muted-foreground">Safe and Secure payments</h4>
           <div className="flex gap-6 opacity-30 grayscale items-center justify-center scale-75">
             <div className="h-8 w-12 bg-black rounded" />
             <div className="h-8 w-12 bg-black rounded" />
             <div className="h-8 w-12 bg-black rounded" />
           </div>
        </div>
      </div>

      {/* 4. Sticky Payment Bottom */}
      <div className="fixed bottom-16 md:bottom-0 left-0 w-full bg-white border-t p-4 flex items-center justify-between z-40 md:relative md:border-none md:p-0">
         <div className="flex flex-col">
            <span className="text-lg font-black italic uppercase tracking-tighter">₹374.00</span>
            <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Saved ₹125.00</span>
         </div>
         <Button className="w-[60%] h-12 text-sm font-black uppercase tracking-[0.2em] rounded-lg bg-black text-white shadow-xl shadow-black/20 hover:bg-neutral-800 transition-all active:scale-[0.98]">
           PAY NOW
         </Button>
      </div>
    </div>
  )
}
