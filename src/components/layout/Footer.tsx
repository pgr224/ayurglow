"use client"

import React from 'react'
import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#022C22] text-[#F8FAFC] pt-16 pb-24 md:pb-8">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-primary">AAYURGLOW</h2>
            <p className="text-sm text-[#94A3B8] font-medium leading-relaxed">
              Ayurvedic Aesthetics by Dr. Bina G. Rabadia (BAMS, PGDACC, ADHM, CCH). Dermatologist formulated, 100% herbal skincare solutions.
            </p>
            <div className="flex gap-4 mt-2">
              <Link href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold tracking-widest uppercase text-white">Contact Us</h3>
            <ul className="flex flex-col gap-3 text-sm text-[#94A3B8]">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Shop No 1,2 Ground Floor, Hotel Amreli Inn, Station Road, Amreli – 365601</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+91 91060 20550</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>binaaesthetic05@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold tracking-widest uppercase text-white">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-sm text-[#94A3B8]">
              <li><Link href="/products" className="hover:text-primary transition-colors">Shop All Products</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link href="/routine" className="hover:text-primary transition-colors">Build Routine</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Consult Dr. Bina</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold tracking-widest uppercase text-white">Policies</h3>
            <ul className="flex flex-col gap-3 text-sm text-[#94A3B8]">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-xs text-[#64748B] flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} AyurGlow. All rights reserved.</p>
          <div className="flex gap-2 items-center opacity-50 grayscale">
            {/* Payment icons placeholder */}
            <div className="h-6 w-10 bg-white/20 rounded" />
            <div className="h-6 w-10 bg-white/20 rounded" />
            <div className="h-6 w-10 bg-white/20 rounded" />
          </div>
        </div>
      </div>
    </footer>
  )
}
