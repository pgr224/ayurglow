"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { MapPin, CreditCard, Shield, ChevronRight, Clock, Check, Lock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCart } from '@/context/cart-context'
import { UPI_APPS, getPaymentSettings, getCodExtraCharge, getUpiId, getMerchantName } from '@/lib/payment-config'
import type { PaymentProvider } from '@/lib/payment-config'

export default function CheckoutPage() {
  const { items, subtotal, discount, grandTotal, itemCount } = useCart()
  const [selectedMethod, setSelectedMethod] = useState('upi')
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay')
  const [upiId, setUpiId] = useState('')
  const [providers, setProviders] = useState<PaymentProvider[]>([])
  const [orderPlaced, setOrderPlaced] = useState(false)

  // Shipping form
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
  })

  useEffect(() => {
    setProviders(getPaymentSettings())
  }, [])

  const codCharge = getCodExtraCharge()
  const merchantUpiId = getUpiId()
  const merchantName = getMerchantName()

  const activeProviders = useMemo(() => providers.filter(p => p.enabled && !p.comingSoon), [providers])
  const comingSoonProviders = useMemo(() => providers.filter(p => p.comingSoon), [providers])

  const finalTotal = selectedMethod === 'cod' ? grandTotal + codCharge : grandTotal
  
  const isAddressValid = address.name && address.phone && address.line1 && address.city && address.state && address.pincode

  const handlePlaceOrder = () => {
    if (!isAddressValid) {
      alert('Please fill in all shipping address fields.')
      return
    }
    if (items.length === 0) {
      alert('Your cart is empty.')
      return
    }
    // In production: create order via API, redirect to payment
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAF9F6] items-center justify-center p-8">
        <div className="bg-white rounded-3xl border shadow-lg p-8 max-w-md w-full text-center flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-black italic uppercase tracking-tight text-primary">Order Placed!</h2>
          <p className="text-muted-foreground text-sm font-medium">
            {selectedMethod === 'upi'
              ? `Please complete your payment of ₹${finalTotal.toFixed(0)} via UPI to`
              : `Your order of ₹${finalTotal.toFixed(0)} has been placed with Cash on Delivery.`}
          </p>
          {selectedMethod === 'upi' && merchantUpiId && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 w-full">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Pay to UPI ID</p>
              <p className="text-lg font-black text-primary">{merchantUpiId}</p>
              <p className="text-xs text-muted-foreground mt-1">{merchantName}</p>
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Order confirmation will be sent to your phone number.
          </p>
          <Link href="/" className="w-full">
            <Button className="w-full h-12 text-sm font-black uppercase tracking-[0.2em] rounded-xl bg-primary hover:bg-primary/90">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6] pb-32 md:pb-8">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 sticky top-16 z-30">
        <div className="container flex items-center gap-3">
          <Link href="/cart" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-black italic tracking-tight uppercase">Checkout</h1>
          <span className="text-xs font-bold text-muted-foreground ml-auto uppercase tracking-widest">
            {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
          </span>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto p-4 flex flex-col gap-6">
        {/* ─── 1. Shipping Address ──────────────────────────────────── */}
        <div className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-primary">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-black italic uppercase tracking-wider">Shipping Address</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              placeholder="Full Name *"
              value={address.name}
              onChange={(e) => setAddress(prev => ({ ...prev, name: e.target.value }))}
              className="border rounded-xl h-11 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            <input
              placeholder="Phone Number *"
              value={address.phone}
              onChange={(e) => setAddress(prev => ({ ...prev, phone: e.target.value }))}
              className="border rounded-xl h-11 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            <input
              placeholder="Address Line 1 *"
              value={address.line1}
              onChange={(e) => setAddress(prev => ({ ...prev, line1: e.target.value }))}
              className="border rounded-xl h-11 px-4 text-sm md:col-span-2 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            <input
              placeholder="Address Line 2 (Optional)"
              value={address.line2}
              onChange={(e) => setAddress(prev => ({ ...prev, line2: e.target.value }))}
              className="border rounded-xl h-11 px-4 text-sm md:col-span-2 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            <input
              placeholder="City *"
              value={address.city}
              onChange={(e) => setAddress(prev => ({ ...prev, city: e.target.value }))}
              className="border rounded-xl h-11 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            <div className="flex gap-3">
              <input
                placeholder="State *"
                value={address.state}
                onChange={(e) => setAddress(prev => ({ ...prev, state: e.target.value }))}
                className="border rounded-xl h-11 px-4 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <input
                placeholder="Pincode *"
                value={address.pincode}
                onChange={(e) => setAddress(prev => ({ ...prev, pincode: e.target.value }))}
                className="border rounded-xl h-11 px-4 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>

        {/* ─── 2. Order Summary ─────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-primary mb-2">
            <CreditCard className="h-5 w-5" />
            <span className="text-sm font-black italic uppercase tracking-wider">Order Summary</span>
          </div>

          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <div className="flex flex-col">
                <span className="text-sm font-bold line-clamp-1">{item.name}</span>
                <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
              </div>
              <span className="text-sm font-black">₹{(item.price * item.quantity).toFixed(0)}</span>
            </div>
          ))}

          <div className="flex flex-col gap-1.5 pt-3 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-bold">₹{subtotal.toFixed(0)}</span>
            </div>
            {discount > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-600 font-bold">Discount</span>
                <span className="text-green-600 font-bold">-₹{discount.toFixed(0)}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-600 font-bold text-xs uppercase tracking-widest">FREE</span>
            </div>
            {selectedMethod === 'cod' && codCharge > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">COD Charge</span>
                <span className="font-bold">+₹{codCharge.toFixed(0)}</span>
              </div>
            )}
            <div className="flex items-center justify-between pt-2 border-t mt-1">
              <span className="text-base font-black uppercase tracking-wider">Total</span>
              <span className="text-xl font-black italic text-primary">₹{finalTotal.toFixed(0)}</span>
            </div>
          </div>
        </div>

        {/* ─── 3. Payment Method ────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-primary">
            <CreditCard className="h-5 w-5" />
            <span className="text-sm font-black italic uppercase tracking-wider">Payment Method</span>
          </div>

          {/* Active Payment Methods */}
          <div className="flex flex-col border rounded-2xl overflow-hidden divide-y">
            {/* UPI Option (Primary) */}
            {activeProviders.find(p => p.id === 'upi') && (
              <div
                onClick={() => setSelectedMethod('upi')}
                className={cn(
                  "p-4 flex flex-col gap-4 cursor-pointer transition-all",
                  selectedMethod === 'upi' ? "bg-primary/5" : "bg-white hover:bg-muted/20"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-5 w-5 rounded-full border-2 flex items-center justify-center",
                      selectedMethod === 'upi' ? "border-primary" : "border-muted-foreground/40"
                    )}>
                      {selectedMethod === 'upi' && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                    </div>
                    <span className="text-sm font-bold">📱 UPI</span>
                    <span className="text-[9px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Recommended</span>
                  </div>
                </div>

                {selectedMethod === 'upi' && (
                  <div className="flex flex-col gap-4 pl-8 animate-in slide-in-from-top-2">
                    {/* UPI App Selection */}
                    <div className="flex gap-2 flex-wrap">
                      {UPI_APPS.map((app) => (
                        <button
                          key={app.id}
                          onClick={(e) => { e.stopPropagation(); setSelectedUpiApp(app.id) }}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all",
                            selectedUpiApp === app.id
                              ? app.color + " shadow-sm"
                              : "bg-white border-border text-muted-foreground hover:border-primary"
                          )}
                        >
                          {app.icon} {app.name}
                        </button>
                      ))}
                    </div>

                    {/* UPI ID Input */}
                    <div className="relative">
                      <input
                        placeholder="Enter your UPI ID (e.g. name@upi)"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full border rounded-xl h-11 px-4 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
                        Verify
                      </button>
                    </div>

                    {merchantUpiId && (
                      <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl">
                        <Check className="h-4 w-4 text-green-600 shrink-0" />
                        <p className="text-xs text-green-700 font-medium">
                          Payment will be collected via UPI to <span className="font-bold">{merchantUpiId}</span>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* COD Option */}
            {activeProviders.find(p => p.id === 'cod') && (
              <div
                onClick={() => setSelectedMethod('cod')}
                className={cn(
                  "p-4 flex flex-col gap-2 cursor-pointer transition-all",
                  selectedMethod === 'cod' ? "bg-primary/5" : "bg-white hover:bg-muted/20"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-5 w-5 rounded-full border-2 flex items-center justify-center",
                      selectedMethod === 'cod' ? "border-primary" : "border-muted-foreground/40"
                    )}>
                      {selectedMethod === 'cod' && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                    </div>
                    <span className="text-sm font-bold">💵 Cash on Delivery</span>
                  </div>
                  {codCharge > 0 && (
                    <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                      +₹{codCharge} COD fee
                    </span>
                  )}
                </div>
                {selectedMethod === 'cod' && (
                  <p className="text-xs text-muted-foreground pl-8">
                    Pay at the time of delivery. An additional ₹{codCharge} will be charged.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Coming Soon Providers */}
          {comingSoonProviders.length > 0 && (
            <div className="flex flex-col gap-2 mt-2">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">More Payment Options — Coming Soon</p>
              <div className="flex flex-col border rounded-2xl overflow-hidden divide-y opacity-60">
                {comingSoonProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className="p-4 flex items-center justify-between bg-muted/10 cursor-not-allowed"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/20 flex items-center justify-center">
                        <Lock className="h-2.5 w-2.5 text-muted-foreground/40" />
                      </div>
                      <span className="text-sm font-bold text-muted-foreground">{provider.icon} {provider.name}</span>
                    </div>
                    <span className="text-[9px] font-bold bg-muted text-muted-foreground px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Coming Soon
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ─── 4. Security Badge ────────────────────────────────────── */}
        <div className="text-center flex flex-col items-center gap-2 py-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span className="text-xs font-black italic uppercase tracking-widest">Safe & Secure Payments</span>
          </div>
          <p className="text-[10px] text-muted-foreground max-w-xs font-medium">
            Your payment information is encrypted and secure. We never store your card details.
          </p>
        </div>
      </div>

      {/* ─── 5. Sticky Bottom CTA ──────────────────────────────────── */}
      <div className="fixed bottom-16 md:bottom-0 left-0 w-full bg-white border-t p-4 flex items-center justify-between z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col">
          <span className="text-lg font-black italic uppercase tracking-tighter">
            ₹{finalTotal.toFixed(0)}
          </span>
          {discount > 0 && (
            <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest">
              Saved ₹{discount.toFixed(0)}
            </span>
          )}
        </div>
        <Button
          onClick={handlePlaceOrder}
          disabled={items.length === 0}
          className="w-[60%] h-12 text-sm font-black uppercase tracking-[0.2em] rounded-xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {selectedMethod === 'upi' ? '💳 PAY VIA UPI' : '📦 PLACE ORDER (COD)'}
        </Button>
      </div>
    </div>
  )
}
