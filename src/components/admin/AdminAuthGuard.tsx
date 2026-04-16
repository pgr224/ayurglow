"use client"

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { isAdminLoggedIn } from '@/lib/admin'

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const loggedIn = isAdminLoggedIn()
    setAuthenticated(loggedIn)
    if (!loggedIn && pathname !== '/admin/login') {
      router.replace('/admin/login')
    }
  }, [pathname, router])

  if (authenticated === null) {
    return null
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] px-4">
        <div className="max-w-md w-full rounded-3xl border border-muted/30 bg-white p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Admin access required</p>
          <p className="mt-4 text-sm text-muted-foreground">Please log in to continue.</p>
          <Link href="/admin/login" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-black uppercase tracking-[0.2em] text-white">
            Go to login
          </Link>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
