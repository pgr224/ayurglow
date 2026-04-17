"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { validateAdminLogin, setAdminLoggedIn } from '@/lib/admin'
import { Button } from '@/components/ui/button'
import { ShieldAlert, LogIn, Loader2 } from 'lucide-react'

export const runtime = 'edge'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate small delay
    setTimeout(() => {
      if (validateAdminLogin(email, password)) {
        setAdminLoggedIn(true)
        router.push('/admin')
      } else {
        setError('Invalid email or password')
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#FAF9F6]">
      {/* Left Column: Intro */}
      <div className="hidden lg:flex flex-col justify-center p-20 bg-primary/5 border-r">
        <div className="max-w-md">
          <Image 
            src="/images/ayurglow_font.png" 
            alt="AyurGlow Logo" 
            width={240} 
            height={60} 
            className="mb-12 mix-blend-multiply" 
          />
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-primary leading-none mb-6">
            Admin <br /> Control Panel
          </h1>
          <p className="text-muted-foreground font-medium leading-relaxed">
            Secure access to AyurGlow's product catalog, order management, and store configuration systems.
          </p>
          
          <div className="mt-12 p-6 rounded-2xl bg-white border shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Demo Credentials</p>
            <div className="flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-bold">admin@aayurglow.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Password:</span>
                <span className="font-bold">Admin@1234</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="flex items-center justify-center p-8">
        <div className="max-w-sm w-full">
          <div className="text-center mb-8 lg:hidden">
            <Image src="/images/ayurglow_font.png" alt="Logo" width={180} height={40} className="mx-auto mb-4 mix-blend-multiply" />
            <h2 className="text-xl font-black uppercase tracking-tighter">Admin Login</h2>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@aayurglow.com"
                className="h-12 border rounded-xl px-4 text-sm bg-white focus:outline-primary transition-all shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-12 border rounded-xl px-4 text-sm bg-white focus:outline-primary transition-all shadow-sm"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold border border-red-100 italic">
                <ShieldAlert className="h-4 w-4" />
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              disabled={loading}
              className="h-12 rounded-xl mt-2 font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><LogIn className="h-4 w-4 mr-2" /> Enter Dashboard</>}
            </Button>
          </form>

          <p className="mt-8 text-center text-[10px] text-muted-foreground uppercase font-black tracking-widest opacity-50">
             Property of AyurGlow Skincare
          </p>
        </div>
      </div>
    </div>
  )
}
