"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { 
  ImageIcon, Plus, Eye, Edit, Trash2, CheckCircle2, 
  XSquare, ArrowUp, ArrowDown, ExternalLink, RefreshCw, X, 
  Loader2, Check, LayoutTemplate, SplitSquareHorizontal, ToggleLeft, ToggleRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getBannersAction, upsertBannerAction, deleteBannerAction } from '../actions'
import Image from 'next/image'

export const runtime = 'edge'

// ─── Types ──────────────────────────────────────────────────
interface Banner {
  id: string
  title: string | null
  subtitle: string | null
  image: string
  ctaText: string | null
  ctaLink: string | null
  couponCode: string | null
  sortOrder: number | null
  isActive: boolean | null
}

// ─── Banner Form Slide-over ─────────────────────────────────
function BannerFormPanel({ 
  banner, 
  onClose, 
  onSave,
  totalBanners
}: { 
  banner: Banner | null
  onClose: () => void
  onSave: (data: any) => Promise<void>
  totalBanners: number
}) {
  const isEditing = !!banner
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: banner?.title || '',
    subtitle: banner?.subtitle || '',
    image: banner?.image || '',
    ctaText: banner?.ctaText || '',
    ctaLink: banner?.ctaLink || '',
    couponCode: banner?.couponCode || '',
    sortOrder: banner?.sortOrder !== null && banner?.sortOrder !== undefined ? banner.sortOrder.toString() : totalBanners.toString(),
    isActive: banner?.isActive !== false
  })

  // Basic validation
  const isValid = form.image.trim() !== ''

  const handleSave = async () => {
    if (!isValid) return
    setSaving(true)
    await onSave({
      ...(banner?.id ? { id: banner.id } : {}),
      title: form.title || null,
      subtitle: form.subtitle || null,
      image: form.image,
      ctaText: form.ctaText || null,
      ctaLink: form.ctaLink || null,
      couponCode: form.couponCode || null,
      sortOrder: parseInt(form.sortOrder) || 0,
      isActive: form.isActive
    })
    setSaving(false)
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-2xl z-[70] flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-primary/5 to-transparent">
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight">{isEditing ? 'Edit Banner' : 'Create Banner'}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isEditing ? 'Update the graphic and copy' : 'Add a new promotional hero slide'}
            </p>
          </div>
          <button onClick={onClose} className="h-9 w-9 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Live Preview Miniature */}
          {form.image && (
            <div className="rounded-xl overflow-hidden border shadow-sm relative h-48 bg-muted group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.image} alt="Preview" className="w-full h-full object-cover select-none" />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center text-white pointer-events-none">
                {form.title && <h3 className="text-xl font-bold uppercase tracking-wider mb-2">{form.title}</h3>}
                {form.subtitle && <p className="text-xs mb-4 max-w-sm">{form.subtitle}</p>}
                {form.ctaText && (
                  <div className="bg-primary px-6 py-2 rounded text-xs font-bold uppercase tracking-widest">
                    {form.ctaText}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Image Source */}
          <fieldset className="space-y-4">
             <legend className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 mb-3">
              <ImageIcon className="h-3.5 w-3.5 text-primary" /> Visual Asset
            </legend>
            <div>
              <label className="text-xs font-bold mb-1.5 block">Image URL *</label>
              <input
                value={form.image}
                onChange={(e) => setForm(p => ({ ...p, image: e.target.value }))}
                placeholder="https://example.com/hero-banner-1.jpg"
                className="w-full h-11 border rounded-xl px-4 text-sm bg-white focus:outline-primary transition-all shadow-sm font-mono"
              />
              <p className="text-[10px] text-muted-foreground mt-1.5 ml-1">Must be an absolute URL. Recommended size: 1920x800px.</p>
            </div>
          </fieldset>

          {/* Copywriting */}
          <fieldset className="space-y-4">
            <legend className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 mb-3">
              <LayoutTemplate className="h-3.5 w-3.5 text-primary" /> Overlay Content
            </legend>
            <div>
              <label className="text-xs font-bold mb-1.5 block">Heading Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))}
                placeholder="e.g., Summer Skincare Sale"
                className="w-full h-11 border rounded-xl px-4 text-sm bg-white focus:outline-primary transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold mb-1.5 block">Subheading / Description</label>
              <textarea
                value={form.subtitle}
                onChange={(e) => setForm(p => ({ ...p, subtitle: e.target.value }))}
                placeholder="e.g., Get glowing skin with 100% natural Ayurvedic formulations."
                rows={2}
                className="w-full border rounded-xl px-4 py-3 text-sm bg-white focus:outline-primary transition-all shadow-sm resize-none"
              />
            </div>
          </fieldset>

          {/* Call to Action */}
          <fieldset className="space-y-4">
             <legend className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 mb-3">
              <ExternalLink className="h-3.5 w-3.5 text-primary" /> Call to Action
            </legend>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold mb-1.5 block">Button Text</label>
                <input
                  value={form.ctaText}
                  onChange={(e) => setForm(p => ({ ...p, ctaText: e.target.value }))}
                  placeholder="e.g., Shop Now"
                  className="w-full h-11 border rounded-xl px-4 text-sm bg-white focus:outline-primary transition-all shadow-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold mb-1.5 block">Button Link</label>
                <input
                  value={form.ctaLink}
                  onChange={(e) => setForm(p => ({ ...p, ctaLink: e.target.value }))}
                  placeholder="e.g., /products?category=cleanser"
                  className="w-full h-11 border rounded-xl px-4 text-sm bg-white focus:outline-primary transition-all shadow-sm font-mono"
                />
              </div>
            </div>
          </fieldset>

           {/* Coupon & Placement */}
           <fieldset className="space-y-4">
             <legend className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 mb-3">
              <SplitSquareHorizontal className="h-3.5 w-3.5 text-primary" /> Advanced
            </legend>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold mb-1.5 block">Promotional Code</label>
                <input
                  value={form.couponCode}
                  onChange={(e) => setForm(p => ({ ...p, couponCode: e.target.value }))}
                  placeholder="e.g., SUMMER25"
                  className="w-full h-11 border rounded-xl px-4 text-sm font-black uppercase bg-white focus:outline-primary transition-all shadow-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold mb-1.5 block">Display Order</label>
                <input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) => setForm(p => ({ ...p, sortOrder: e.target.value }))}
                  placeholder="0"
                  className="w-full h-11 border rounded-xl px-4 text-sm bg-white focus:outline-primary transition-all shadow-sm"
                />
              </div>
            </div>
            
            <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors mt-2 ${form.isActive ? 'bg-primary/5 border-primary/40' : 'bg-muted/10 border-dashed'}`}>
              <div>
                <span className="text-sm font-bold block">Status: {form.isActive ? 'Active' : 'Draft / Hidden'}</span>
                <span className="text-[10px] text-muted-foreground">Inactive banners won't appear on the homepage</span>
              </div>
              <input
                 type="checkbox"
                 checked={form.isActive}
                 onChange={(e) => setForm(p => ({ ...p, isActive: e.target.checked }))}
                 className="sr-only" // Hidden, we just use UI
              />
              {form.isActive ? (
                <ToggleRight className="h-8 w-8 text-primary" />
              ) : (
                <ToggleLeft className="h-8 w-8 text-muted-foreground opacity-50" />
              )}
            </label>
          </fieldset>

        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-muted/20 flex items-center justify-between gap-4">
          <Button variant="outline" onClick={onClose} className="px-6">Discard</Button>
          <Button onClick={handleSave} disabled={saving || !isValid} className="px-8 gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            {isEditing ? 'Save Changes' : 'Publish Banner'}
          </Button>
        </div>
      </div>
    </>
  )
}

// ─── Main Banner Management Page ────────────────────────────
export default function AdminBanners() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    const data = await getBannersAction()
    // Sort primarily by sortOrder
    const sorted = (data as Banner[]).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
    setBanners(sorted)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Permanently delete this banner? This cannot be undone.')) return
    setDeleteLoading(id)
    await deleteBannerAction(id)
    await loadData()
    setDeleteLoading(null)
  }

  async function handleSaveBanner(data: any) {
    await upsertBannerAction(data)
    await loadData()
    setShowForm(false)
    setEditingBanner(null)
  }

  const activeCount = banners.filter(b => b.isActive).length

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black italic tracking-tighter uppercase mb-1 flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <ImageIcon className="h-5 w-5 text-primary" />
            </div>
            Hero Banners
          </h1>
          <p className="text-sm text-muted-foreground font-medium ml-12">
            Manage the hero carousel graphics displayed on the homepage
          </p>
        </div>
        <div className="flex items-center gap-3 ml-12 md:ml-0">
          <Button variant="outline" size="sm" onClick={loadData} className="gap-2 text-xs font-bold">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </Button>
          <Button 
            onClick={() => { setEditingBanner(null); setShowForm(true) }}
            className="gap-2 px-5 rounded-xl shadow-lg shadow-primary/20 text-xs font-black uppercase tracking-wider"
          >
            <Plus className="h-4 w-4" /> Add Banner
          </Button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden min-h-[500px] flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b bg-muted/5 flex items-center justify-between">
           <div className="text-sm font-bold text-muted-foreground">
             <span className="text-foreground">{banners.length}</span> Total Slides • <span className="text-primary">{activeCount}</span> Active
           </div>
           {banners.length > 0 && <span className="text-[10px] uppercase font-black tracking-widest text-[#94A3B8] italic">Ordered by sort index</span>}
        </div>

        {/* Dynamic List */}
        <div className="flex-1 p-6 bg-muted/10">
          {loading ? (
             <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground min-h-[300px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="font-medium text-sm">Loading carousel slides...</span>
             </div>
          ) : banners.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-full gap-4 text-center min-h-[300px]">
                <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border">
                  <LayoutTemplate className="h-8 w-8 text-primary/40" />
                </div>
                <div>
                   <h3 className="text-lg font-black uppercase italic tracking-tight mb-1">No Custom Banners</h3>
                   <p className="text-sm text-muted-foreground max-w-sm mb-6">
                     Add a banner to override the default AyurGlow aesthetic carousel on the homepage.
                   </p>
                   <Button onClick={() => { setEditingBanner(null); setShowForm(true) }} className="gap-2 rounded-xl text-xs font-black uppercase tracking-wider">
                     <Plus className="h-4 w-4" /> Create First Slide
                   </Button>
                </div>
             </div>
          ) : (
             <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
               {banners.map((banner, index) => (
                 <div key={banner.id} className="bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all">
                    
                    {/* Visual Preview */}
                    <div className="h-48 relative bg-black flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={banner.image} alt={banner.title || 'Banner Image'} className="w-full h-full object-cover opacity-60 mix-blend-screen scale-105 group-hover:scale-100 transition-transform duration-500" />
                      
                      {/* Overlay Elements */}
                      <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center">
                         {banner.title && <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-[#FFFDF8] mb-2 font-serif">{banner.title}</h3>}
                         {banner.subtitle && <p className="text-sm text-[#F8FAFC] max-w-md drop-shadow mb-4">{banner.subtitle}</p>}
                         {banner.ctaText && (
                           <div className="px-6 py-2.5 bg-[#FFFDF8] text-[#022C22] text-xs font-black uppercase tracking-[0.2em] rounded">
                             {banner.ctaText}
                           </div>
                         )}
                      </div>

                      {/* Overlays / Badges */}
                      <div className="absolute top-4 left-4">
                        <span className="flex items-center justify-center h-8 w-8 bg-black/50 backdrop-blur rounded-lg text-white font-black text-sm border border-white/20">
                          {banner.sortOrder}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        {banner.couponCode && (
                          <span className="bg-[#B45309] text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded shadow drop-shadow-md">
                            Code: {banner.couponCode}
                          </span>
                        )}
                        {!banner.isActive && (
                          <span className="bg-red-600/90 backdrop-blur text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded shadow">
                            Hidden
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Admin Actions Bar */}
                    <div className="p-4 border-t flex items-center justify-between bg-white text-sm">
                       <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          Slide #{index + 1}
                       </div>
                       
                       <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 gap-2 text-xs" 
                            onClick={() => { setEditingBanner(banner); setShowForm(true) }}
                          >
                            <Edit className="h-3.5 w-3.5" /> Edit
                          </Button>
                          <div className="w-px h-4 bg-border mx-1" />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:bg-red-50"
                            onClick={() => handleDelete(banner.id)}
                            disabled={deleteLoading === banner.id}
                          >
                            {deleteLoading === banner.id 
                              ? <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                              : <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
                            }
                          </Button>
                       </div>
                    </div>

                 </div>
               ))}
             </div>
          )}
        </div>
      </div>

      {showForm && (
        <BannerFormPanel
          banner={editingBanner}
          totalBanners={banners.length}
          onClose={() => { setShowForm(false); setEditingBanner(null) }}
          onSave={handleSaveBanner}
        />
      )}
    </div>
  )
}
