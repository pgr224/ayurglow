"use client"

import { useEffect, useMemo, useState } from 'react'
import QRCode from 'qrcode'

interface QRGeneratorProps {
  upiId: string
  name: string
  amount: number
  note?: string
}

export function QRGenerator({ upiId, name, amount, note }: QRGeneratorProps) {
  const [src, setSrc] = useState<string | null>(null)

  const payload = useMemo(() => {
    const params = new URLSearchParams({
      pa: upiId,
      pn: name,
      am: amount.toFixed(2),
      cu: 'INR',
    })
    if (note) params.set('tn', note)
    return `upi://pay?${params.toString()}`
  }, [upiId, name, amount, note])

  useEffect(() => {
    let mounted = true
    QRCode.toDataURL(payload, { margin: 2, scale: 12 })
      .then((url) => {
        if (mounted) setSrc(url)
      })
      .catch(() => {
        if (mounted) setSrc(null)
      })

    return () => {
      mounted = false
    }
  }, [payload])

  if (!src) {
    return (
      <div className="rounded-3xl border border-dashed border-muted/50 bg-white p-6 text-center">
        <p className="text-sm font-medium text-muted-foreground">Generating your QR code...</p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-muted-foreground font-bold">Pay with UPI</p>
          <p className="text-sm font-medium">{upiId}</p>
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">₹{amount.toFixed(2)}</p>
      </div>
      <div className="rounded-3xl bg-muted/10 p-4 flex items-center justify-center">
        <img src={src} alt="UPI QR Code" className="h-56 w-56 rounded-3xl object-contain" />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">Open your UPI app and scan the QR code to complete the payment.</p>
    </div>
  )
}
