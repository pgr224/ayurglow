"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { MapPin, CreditCard, Shield, ChevronRight, Clock, Check, Lock, ArrowLeft, XCircle, AlertCircle, RefreshCw, RefreshCcw } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCart } from '@/context/cart-context'
import { UPI_APPS, getPaymentSettings, getCodExtraCharge, getUpiId, getMerchantName } from '@/lib/payment-config'
import type { PaymentProvider } from '@/lib/payment-config'
import Image from 'next/image'

export default function CheckoutPage() {
  const { items, subtotal, discount, grandTotal, itemCount } = useCart()
  const [selectedMethod, setSelectedMethod] = useState('upi')
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay')
  const [upiId, setUpiId] = useState('')
  const [providers, setProviders] = useState<PaymentProvider[]>([])
  const [checkoutState, setCheckoutState] = useState<'form' | 'processing' | 'success' | 'failed'>('form')
  const [errorMessage, setErrorMessage] = useState('')

  // Shipping form
  const [address, setAddress] = useState({
    name: 'Test Customer',
    phone: '9876543210',
    line1: '123 MG Road',
    line2: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
  })

  useEffect(() => {
    setProviders(getPaymentSettings())
  }, [])

  const codCharge = getCodExtraCharge()
  const merchantUpiId = getUpiId()
  const merchantName = getMerchantName()

  const activeProviders = useMemo(() => providers.filter(p => p.enabled && !p.comingSoon), [providers])
  
  // Find individual active configurations
  const upiActive = activeProviders.find(p => p.id === 'upi')
  const razorpayActive = activeProviders.find(p => p.id === 'razorpay')
  const codActive = activeProviders.find(p => p.id === 'cod')
  const customActive = activeProviders.find(p => p.id === 'custom')

  const finalTotal = selectedMethod === 'cod' ? grandTotal + codCharge : grandTotal
  
  const isAddressValid = address.name && address.phone && address.line1 && address.city && address.state && address.pincode

  const simulatePayment = async () => {
    if (!isAddressValid) {
      alert('Please fill in all shipping address fields.')
      return
    }
    if (items.length === 0) {
      alert('Your cart is empty.')
      return
    }

    setCheckoutState('processing')

    // Simulate Razorpay / Payment Gateway latency
    await new Promise(r => setTimeout(r, 2000))

    if (selectedMethod === 'razorpay') {
      // Simulate 20% failure rate for Razorpay to demonstrate error handling
      const isFailed = Math.random() < 0.2
      if (isFailed) {
        setErrorMessage("Payment was declined by the bank network. Please try another method or retry.")
        setCheckoutState('failed')
        return
      }
    } else if (selectedMethod === 'upi') {
      if (!upiId && selectedUpiApp === 'upi') {
        setErrorMessage("Invalid UPI ID provided.")
        setCheckoutState('failed')
        return
      }
    }

    setCheckoutState('success')
  }

  // Render Success UI
  if (checkoutState === 'success') {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAF9F6] items-center justify-center p-8 animate-in fade-in duration-500">
        <div className="bg-white rounded-3xl border shadow-lg p-10 max-w-md w-full text-center flex flex-col items-center gap-5">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 animate-ping rounded-full opacity-20" />
            <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center relative z-10 border-4 border-white shadow-sm">
              <Check className="h-12 w-12 text-green-600" strokeWidth={3} />
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-primary">Order Confirmed</h2>
            <p className="text-muted-foreground text-sm font-medium mt-1">Order #ORD-{Math.floor(1000 + Math.random() * 9000)}-AYUR</p>
          </div>

          <div className="bg-muted/10 border p-4 rounded-xl w-full text-left space-y-2 text-sm">
             <div className="flex justify-between">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-black italic text-primary">₹{finalTotal.toFixed(0)}</span>
             </div>
             <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Mode</span>
                <span className="font-bold uppercase">{selectedMethod}</span>
             </div>
          </div>
          
          <p className="text-xs text-muted-foreground leading-relaxed px-4">
             We've received your order and are processing it. An SMS update will be sent to {address.phone}.
          </p>

          <Link href="/" className="w-full mt-4">
            <Button className="w-full h-12 text-sm font-black uppercase tracking-[0.2em] rounded-xl bg-primary hover:bg-primary/90">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Render Failed UI
  if (checkoutState === 'failed') {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAF9F6] items-center justify-center p-8 animate-in fade-in duration-300">
        <div className="bg-white rounded-3xl border border-red-100 shadow-lg p-8 max-w-md w-full text-center flex flex-col items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>
          
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tight text-red-600">Payment Failed</h2>
            <p className="text-red-800/70 text-sm font-medium mt-2">{errorMessage}</p>
          </div>

          <div className="w-full flex flex-col gap-3 mt-4">
            <Button onClick={() => setCheckoutState('form')} className="w-full h-12 text-sm font-black uppercase tracking-[0.1em] rounded-xl bg-red-600 hover:bg-red-700">
               <RefreshCcw className="h-4 w-4 mr-2" /> Retry Payment
            </Button>
            <Button variant="outline" onClick={() => { setCheckoutState('form'); setSelectedMethod('cod') }} className="w-full h-12 text-sm font-bold uppercase tracking-[0.1em] rounded-xl">
               Switch to Cash on Delivery
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Render Processing UI
  if (checkoutState === 'processing') {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAF9F6] items-center justify-center p-8">
        <div className="bg-white rounded-3xl border shadow-lg p-10 max-w-sm w-full text-center flex flex-col items-center gap-6">
           <RefreshCw className="h-12 w-12 text-primary animate-spin" />
           <div>
              <h2 className="text-xl font-bold uppercase tracking-widest text-primary animate-pulse">Processing...</h2>
              <p className="text-sm text-muted-foreground mt-2">Connecting securely to {selectedMethod === 'razorpay' ? 'Razorpay' : selectedMethod.toUpperCase()} gateway.</p>
           </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-32 md:pb-8">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 sticky top-0 z-30 shadow-sm relative">
        <div className="container max-w-6xl mx-auto flex items-center justify-center md:justify-start gap-4">
          <Link href="/cart" className="absolute left-4 md:static text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2 rounded-full hover:bg-slate-100">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex flex-col items-center md:items-start text-primary">
            <h1 className="text-xl font-black italic tracking-tighter uppercase relative select-none">
              <span className="mix-blend-multiply">Secure Checkout</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Address & Payment */}
        <div className="w-full lg:w-[60%] flex flex-col gap-6">
          
          {/* Swiggy Style Address Card */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden p-6 relative">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500" />
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                 <div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-slate-600" />
                 </div>
                 <div>
                    <h3 className="text-base font-bold flex items-center gap-2">Delivery Address <Check className="h-4 w-4 text-green-500" /></h3>
                    <p className="text-sm font-medium mt-1">{address.name} • {address.phone}</p>
                    <p className="text-sm text-muted-foreground">{address.line1}, {address.city}, {address.state} - {address.pincode}</p>
                 </div>
              </div>
              <Button variant="ghost" className="text-primary font-bold text-xs uppercase tracking-wider">Change</Button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
            <div className="p-6 border-b bg-slate-50/50">
              <h2 className="text-lg font-black uppercase tracking-tight text-primary flex items-center gap-2">
                 💳 Payment Options
              </h2>
            </div>
            
            {/* Swiggy Style Payment List (Left logic, combined visually) */}
            <div className="flex flex-col md:flex-row">
               
               {/* Categories Tab (Desktop) */}
               <div className="hidden md:flex flex-col w-1/3 border-r bg-slate-50/80 p-2 gap-1 h-full">
                  {upiActive && (
                    <button 
                      onClick={() => setSelectedMethod('upi')}
                      className={cn("p-4 text-left rounded-xl text-sm font-bold transition-all flex items-center gap-3", selectedMethod === 'upi' ? "bg-white shadow-sm border text-primary" : "text-muted-foreground hover:bg-slate-100 border border-transparent")}
                    >
                      <Image src="https://cdn.iconscout.com/icon/free/png-256/free-upi-logo-icon-download-in-svg-png-gif-file-formats--unified-payments-interface-payment-money-transfer-logos-icons-1747946.png" width={20} height={20} alt="UPI" />
                      UPI
                    </button>
                  )}
                  {razorpayActive && (
                    <button 
                      onClick={() => setSelectedMethod('razorpay')}
                      className={cn("p-4 text-left rounded-xl text-sm font-bold transition-all flex items-center gap-3", selectedMethod === 'razorpay' ? "bg-white shadow-sm border text-primary" : "text-muted-foreground hover:bg-slate-100 border border-transparent")}
                    >
                      <CreditCard className="h-5 w-5" /> Cards / Netbanking
                    </button>
                  )}
                  {customActive && (
                    <button 
                      onClick={() => setSelectedMethod('custom')}
                      className={cn("p-4 text-left rounded-xl text-sm font-bold transition-all flex items-center gap-3", selectedMethod === 'custom' ? "bg-white shadow-sm border text-primary" : "text-muted-foreground hover:bg-slate-100 border border-transparent")}
                    >
                      <Lock className="h-5 w-5" /> Direct Transfer
                    </button>
                  )}
                  {codActive && (
                    <button 
                      onClick={() => setSelectedMethod('cod')}
                      className={cn("p-4 text-left rounded-xl text-sm font-bold transition-all flex items-center gap-3", selectedMethod === 'cod' ? "bg-white shadow-sm border text-primary" : "text-muted-foreground hover:bg-slate-100 border border-transparent")}
                    >
                      <div className="h-5 w-5 rounded-full border-2 border-current flex items-center justify-center font-black text-[10px]">₹</div>
                      Pay on Delivery
                    </button>
                  )}
               </div>

               {/* Right Side Content Pane */}
               <div className="flex-1 p-6 md:min-h-[400px]">
                 
                 {/* Mobile Selector Header */}
                 <div className="md:hidden pb-4 mb-4 border-b">
                   <select 
                     value={selectedMethod} 
                     onChange={(e) => setSelectedMethod(e.target.value)}
                     className="w-full p-3 font-bold border rounded-xl appearance-none bg-slate-50 focus:outline-primary shadow-sm"
                   >
                     {upiActive && <option value="upi">UPI (GPay, PhonePe, Paytm)</option>}
                     {razorpayActive && <option value="razorpay">Credit/Debit Cards, Netbanking (Razorpay)</option>}
                     {customActive && <option value="custom">Direct Transfer / Payment Link</option>}
                     {codActive && <option value="cod">Cash on Delivery</option>}
                   </select>
                 </div>

                 <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    {/* UPI UI */}
                    {selectedMethod === 'upi' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-4">Pay via UPI</h3>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {UPI_APPS.map((app) => (
                              <button
                                key={app.id}
                                onClick={() => setSelectedUpiApp(app.id)}
                                className={cn(
                                  "flex flex-col items-center gap-2 p-3 rounded-xl border transition-all hover:bg-slate-50",
                                  selectedUpiApp === app.id ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-slate-200"
                                )}
                              >
                                <span className="text-2xl">{app.icon}</span>
                                <span className="text-[10px] font-bold">{app.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {selectedUpiApp === 'upi' && (
                          <div className="space-y-2">
                             <label className="text-xs font-bold text-slate-600">Enter UPI ID</label>
                             <input 
                               placeholder="e.g. 9876543210@ybl" 
                               value={upiId}
                               onChange={(e) => setUpiId(e.target.value)}
                               className="w-full border rounded-xl h-12 px-4 shadow-sm focus:outline-primary transition-all" 
                             />
                          </div>
                        )}

                        <Button onClick={simulatePayment} className="w-full h-12 rounded-xl text-sm font-black uppercase tracking-[0.2em] shadow-lg bg-primary">
                          Pay ₹{finalTotal.toFixed(0)}
                        </Button>
                      </div>
                    )}

                    {/* Razorpay UI */}
                    {selectedMethod === 'razorpay' && (
                      <div className="space-y-6 flex flex-col items-center justify-center py-8 text-center border-2 border-dashed rounded-2xl bg-slate-50/50">
                        <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                          <CreditCard className="h-8 w-8" />
                        </div>
                        <div>
                          <h3 className="font-bold">Pay via Razorpay Secure</h3>
                          <p className="text-xs text-muted-foreground mt-1 px-4">You will be redirected to Razorpay to securely complete your payment using Cards, Netbanking or Wallet.</p>
                        </div>
                        <Button onClick={simulatePayment} className="w-full max-w-[250px] h-12 rounded-xl text-sm font-black uppercase tracking-[0.2em] shadow-lg bg-[rgb(51,149,255)] hover:bg-[rgb(41,139,245)]">
                          Proceed to Pay
                        </Button>
                      </div>
                    )}

                    {/* Custom URL UI */}
                    {selectedMethod === 'custom' && (
                      <div className="space-y-6 flex flex-col items-center justify-center py-6 text-center">
                        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-800 w-full mb-2">
                           <AlertCircle className="h-5 w-5 mx-auto mb-2 text-amber-600" />
                           <p className="text-xs font-medium">
                             {customActive?.fields.find(f => f.key === 'custom_instructions')?.value || "Please pay via our official portal and retain your transaction ID."}
                           </p>
                        </div>
                        
                        <Button onClick={simulatePayment} className="w-full h-12 rounded-xl text-sm font-black text-white hover:bg-slate-800 uppercase tracking-widest bg-slate-900 shadow-md">
                          Confirm Order & Transfer
                        </Button>
                      </div>
                    )}

                    {/* COD UI */}
                    {selectedMethod === 'cod' && (
                      <div className="space-y-6">
                        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-4">
                           <div className="h-10 w-10 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0">
                              <span className="text-lg">💵</span>
                           </div>
                           <div>
                              <h3 className="font-bold text-orange-900 text-sm mb-1">Pay on Delivery</h3>
                              <p className="text-xs text-orange-800 leading-relaxed">
                                Please keep exact change ready. Note that a non-refundable COD handling fee of ₹{codCharge.toFixed(0)} is applied to this order.
                              </p>
                           </div>
                        </div>
                        <Button onClick={simulatePayment} className="w-full h-14 rounded-xl text-sm font-black uppercase tracking-[0.2em] shadow-lg shadow-green-600/20 bg-green-600 hover:bg-green-700">
                          Confirm Order • ₹{finalTotal.toFixed(0)}
                        </Button>
                      </div>
                    )}
                 </div>

               </div>
               
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary (Sticky) */}
        <div className="w-full lg:w-[40%] sticky top-24">
          <div className="bg-white rounded-3xl border shadow-sm p-6 flex flex-col gap-5">
            <h2 className="text-lg font-black uppercase tracking-tight border-b pb-4">
              Order Summary
            </h2>
            
            <div className="flex flex-col gap-4 max-h-[30vh] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-start gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold leading-tight">{item.name}</span>
                    <span className="text-xs text-muted-foreground mt-0.5">Qty: {item.quantity}</span>
                  </div>
                  <span className="text-sm font-black">₹{(item.price * item.quantity).toFixed(0)}</span>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 p-4 rounded-xl space-y-3 mt-2">
              <div className="flex justify-between text-sm text-slate-600 font-medium">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-primary font-bold">
                  <span>Product Discount</span>
                  <span>-₹{discount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-slate-600 font-medium">
                <span>Delivery Charge</span>
                <span className="text-green-600 font-bold uppercase tracking-widest text-[10px] bg-green-100 px-2 py-0.5 rounded">Free</span>
              </div>
              {selectedMethod === 'cod' && codCharge > 0 && (
                <div className="flex justify-between text-sm text-orange-600 font-bold animate-in fade-in duration-300">
                  <span>COD Fee</span>
                  <span>₹{codCharge.toFixed(0)}</span>
                </div>
              )}
              <div className="border-t border-slate-200 pt-3 mt-1 flex justify-between items-center">
                <span className="font-black uppercase tracking-widest text-slate-800">To Pay</span>
                <span className="text-2xl font-black italic text-primary">₹{finalTotal.toFixed(0)}</span>
              </div>
            </div>

            <div className="text-center flex items-center justify-center gap-2 pt-2 text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">End-to-End Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
