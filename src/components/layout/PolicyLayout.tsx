import React from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

interface PolicyLayoutProps {
  title: string
  children: React.ReactNode
  lastUpdated?: string
}

export function PolicyLayout({ title, children, lastUpdated }: PolicyLayoutProps) {
  return (
    <div className="bg-background min-h-screen pt-24 pb-16">
      <div className="container max-w-4xl px-4 mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-border">
          <div className="mb-8 border-b border-border pb-6">
            <h1 className="text-3xl md:text-5xl font-bold text-[#022C22] tracking-tight mb-2">
              {title}
            </h1>
            {lastUpdated && (
              <p className="text-sm text-muted-foreground">
                Last updated: {lastUpdated}
              </p>
            )}
          </div>
          
          <div className="prose prose-slate max-w-none text-[#475569] space-y-6 leading-relaxed">
            {children}
          </div>
          
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AyurGlow Aesthetics. All rights reserved.
            </div>
            <div className="flex gap-4">
              <Link href="/contact" className="text-sm font-medium text-primary hover:underline">
                Need help? Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
