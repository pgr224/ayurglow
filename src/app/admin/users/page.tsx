"use client"

import React from 'react'
import { Users, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const runtime = 'edge'

export default function AdminUsers() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black italic tracking-tighter uppercase mb-2">User Management</h1>
          <p className="text-sm text-muted-foreground italic font-medium">Manage administrators and guest customers.</p>
        </div>
        <Button className="rounded-full gap-2 px-6">
          <UserPlus className="h-4 w-4" /> Add Admin
        </Button>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden min-h-[400px] flex flex-col items-center justify-center p-12 text-center">
        <div className="h-16 w-16 bg-muted/30 rounded-full flex items-center justify-center mb-6">
          <Users className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold mb-2 uppercase italic tracking-tight">Active Users</h3>
        <p className="text-sm text-muted-foreground max-w-sm mb-6 underline cursor-pointer">admin@aayurglow.com (Admin)</p>
        <p className="text-xs text-muted-foreground italic">Current user database is localized. Customer accounts will sync here during checkout.</p>
      </div>
    </div>
  )
}
