"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  clearAdminLoginAttempts,
  getAdminLoginAttemptStatus,
  registerAdminFailedLoginAttempt,
  setAdminLoggedIn,
  validateAdminLogin,
} from '@/lib/admin'
import { Button } from '@/components/ui/button'
import { ShieldAlert, LogIn, Loader2, Github, Mail } from 'lucide-react'


export const runtime = 'edge'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const attemptStatus = getAdminLoginAttemptStatus()
  const lockoutMinutes = Math.ceil(attemptStatus.lockoutRemainingMs / 60000)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (attemptStatus.isLocked) {
      setError(`Too many failed attempts. Try again in ${lockoutMinutes} minute(s).`)
      return
    }

    setLoading(true)
    setError('')

    // Simulate small delay
    setTimeout(() => {
      if (validateAdminLogin(email, password)) {
        clearAdminLoginAttempts()
        setAdminLoggedIn(true)
        router.push('/admin')
      } else {
        const statusAfterFail = registerAdminFailedLoginAttempt()
        if (statusAfterFail.isLocked) {
          const remaining = Math.ceil(statusAfterFail.lockoutRemainingMs / 60000)
          setError(`Too many failed attempts. Try again in ${remaining} minute(s).`)
        } else {
          setError(`Invalid email or password. ${statusAfterFail.remainingAttempts} attempt(s) remaining.`)
        }
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
        <div className="max-w-md w-full">
          <div className="text-center mb-10 lg:hidden">
            <Image src="/images/ayurglow_font.png" alt="Logo" width={180} height={40} className="mx-auto mb-4 mix-blend-multiply" />
            <h2 className="text-xl font-black uppercase tracking-tighter">Admin Access</h2>
          </div>

          <div className="bg-white p-8 lg:p-12 rounded-[2rem] border shadow-2xl shadow-primary/5">
            <div className="mb-8">
              <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Welcome Back</h2>
              <p className="text-sm text-muted-foreground font-medium">Please enter your details or use secure SSO.</p>
            </div>

            {/* SSO Options */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button 
                type="button"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setAdminLoggedIn(true);
                    router.push('/admin');
                  }, 1200);
                }}
                className="flex items-center justify-center gap-2 h-12 border rounded-xl text-xs font-bold hover:bg-muted transition-colors shadow-sm"
              >
                <div className="h-5 w-5 bg-black rounded-lg flex items-center justify-center">
                  <Github className="h-3 w-3 text-white fill-current" />
                </div>
                GitHub
              </button>
              <button 
                type="button"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setAdminLoggedIn(true);
                    router.push('/admin');
                  }, 1200);
                }}
                className="flex items-center justify-center gap-2 h-12 border rounded-xl text-xs font-bold hover:bg-muted transition-colors shadow-sm"
              >
                <div className="h-5 w-5 bg-red-500 rounded-lg flex items-center justify-center">
                  <Mail className="h-3 w-3 text-white" />
                </div>
                Google
              </button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted-foreground/10" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest text-muted-foreground bg-white px-2 italic">
                Secure Credentials
              </div>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Work Email</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aayurglow.com"
                  className="h-14 border-2 border-muted-foreground/5 rounded-2xl px-5 text-sm bg-muted/20 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary/50 transition-all font-medium"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between ml-1">
                   <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Admin Key</label>
                   <button type="button" className="text-[10px] font-black uppercase tracking-tighter text-primary/60 hover:text-primary transition-colors">Forgot?</button>
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-14 border-2 border-muted-foreground/5 rounded-2xl px-5 text-sm bg-muted/20 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white focus:border-primary/50 transition-all font-medium"
                />
              </div>

              {error && (
                <div className="flex items-center gap-3 bg-red-50 text-red-600 p-4 rounded-2xl text-[11px] font-bold border border-red-100 shadow-sm animate-in fade-in slide-in-from-top-2">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {!attemptStatus.isLocked && !error && attemptStatus.remainingAttempts < 5 && (
                <div className="text-[10px] text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 font-bold uppercase tracking-tight">
                  Security notice: {attemptStatus.remainingAttempts} attempts remaining.
                </div>
              )}

              <Button 
                type="submit" 
                disabled={loading || attemptStatus.isLocked}
                className={cn(
                  "h-14 rounded-2xl mt-4 font-black uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95 text-xs",
                  loading ? "bg-muted shadow-none" : "shadow-primary/20"
                )}
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><LogIn className="h-4 w-4 mr-3" /> Authorize Session</>}
              </Button>
            </form>
          </div>

          <p className="mt-12 text-center text-[10px] text-muted-foreground uppercase font-black tracking-[0.3em] opacity-30">
             © 2026 AyurGlow Systems · Restricted Access
          </p>
        </div>

      </div>
    </div>
  )
}
