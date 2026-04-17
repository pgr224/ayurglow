"use client"

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, Package, 
  TrendingUp, AlertTriangle, CheckCircle2, X, 
  ChevronDown, ChevronLeft, ChevronRight, Star,
  ArrowUpDown, MoreHorizontal, Download, Upload,
  Leaf, Tag, ImageIcon, Loader2, Check, Copy,
  Archive, RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getProductsAction, deleteProductAction, getCategoriesAction, upsertProductAction } from '../actions'
import Image from 'next/image'

export const runtime = 'edge'

// ─── Types ──────────────────────────────────────────────────
interface Product {
  id: string
  name: string
  slug: string
  description?: string
  categoryId?: string
  basePrice: number
  mrp: number
  rating?: number
  reviewCount?: number
  isBestseller?: boolean
  isTrending?: boolean
  badge?: string
  highlights?: string
  benefits?: string
  ingredients?: string
  images?: string
  createdAt?: any
  category?: { id: string; name: string; slug: string }
}

interface Category {
  id: string
  name: string
  slug: string
}

// ─── Status Tag Component ───────────────────────────────────
function StatusBadge({ product }: { product: Product }) {
  const hasImages = product.images && JSON.parse(product.images).length > 0
  const discount = product.mrp > 0 ? Math.round(((product.mrp - product.basePrice) / product.mrp) * 100) : 0

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {product.isBestseller && (
        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
          <Star className="h-2.5 w-2.5 fill-amber-500" /> Best
        </span>
      )}
      {product.isTrending && (
        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full border border-purple-200">
          <TrendingUp className="h-2.5 w-2.5" /> Trend
        </span>
      )}
      {product.badge && !product.isBestseller && (
        <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
          {product.badge}
        </span>
      )}
      {discount > 0 && (
        <span className="text-[10px] font-bold bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-200">
          {discount}% OFF
        </span>
      )}
    </div>
  )
}

// ─── Product Form Slide-over ────────────────────────────────
function ProductFormPanel({ 
  product, 
  categories, 
  onClose, 
  onSave 
}: { 
  product: Product | null
  categories: Category[]
  onClose: () => void
  onSave: (data: any) => Promise<void>
}) {
  const isEditing = !!product
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    description: product?.description || '',
    categoryId: product?.categoryId || '',
    basePrice: product?.basePrice?.toString() || '',
    mrp: product?.mrp?.toString() || '',
    badge: product?.badge || '',
    isBestseller: product?.isBestseller || false,
    isTrending: product?.isTrending || false,
    highlights: product?.highlights || '',
    benefits: product?.benefits || '',
    ingredients: product?.ingredients || '',
    images: product?.images || '[]',
  })

  const autoSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const handleNameChange = (name: string) => {
    setForm(prev => ({
      ...prev,
      name,
      slug: isEditing ? prev.slug : autoSlug(name)
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    await onSave({
      ...(product?.id ? { id: product.id } : {}),
      ...form,
      basePrice: parseFloat(form.basePrice) || 0,
      mrp: parseFloat(form.mrp) || 0,
    })
    setSaving(false)
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] transition-opacity" onClick={onClose} />
      
      {/* Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl z-[70] flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-primary/5 to-transparent">
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isEditing ? `Editing: ${product.name}` : 'Add to your Ayurvedic product catalog'}
            </p>
          </div>
          <button onClick={onClose} className="h-9 w-9 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Basic Information */}
          <fieldset className="space-y-4">
            <legend className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 mb-3">
              <Leaf className="h-3.5 w-3.5 text-primary" /> Product Information
            </legend>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-xs font-bold mb-1.5 block">Product Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g., Kumkumadi Brightening Serum"
                  className="w-full h-11 border rounded-xl px-4 text-sm bg-white focus:outline-primary transition-all shadow-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold mb-1.5 block">URL Slug</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground shrink-0 font-mono">/products/</span>
                  <input
                    value={form.slug}
                    onChange={(e) => setForm(p => ({ ...p, slug: e.target.value }))}
                    placeholder="kumkumadi-brightening-serum"
                    className="flex-1 h-11 border rounded-xl px-4 text-sm font-mono bg-white focus:outline-primary transition-all shadow-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold mb-1.5 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
                  placeholder="Describe this Ayurvedic formulation, its heritage, and how it benefits the skin..."
                  rows={4}
                  className="w-full border rounded-xl px-4 py-3 text-sm bg-white focus:outline-primary transition-all shadow-sm resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold mb-1.5 block">Category</label>
                <select
                  value={form.categoryId}
                  onChange={(e) => setForm(p => ({ ...p, categoryId: e.target.value }))}
                  className="w-full h-11 border rounded-xl px-4 text-sm bg-white focus:outline-primary transition-all shadow-sm appearance-none"
                >
                  <option value="">Select category...</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          {/* Pricing */}
          <fieldset className="space-y-4">
            <legend className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 mb-3">
              <Tag className="h-3.5 w-3.5 text-primary" /> Pricing
            </legend>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold mb-1.5 block">Base Price (₹) *</label>
                <input
                  type="number"
                  value={form.basePrice}
                  onChange={(e) => setForm(p => ({ ...p, basePrice: e.target.value }))}
                  placeholder="499"
                  className="w-full h-11 border rounded-xl px-4 text-sm bg-white focus:outline-primary transition-all shadow-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold mb-1.5 block">MRP (₹) *</label>
                <input
                  type="number"
                  value={form.mrp}
                  onChange={(e) => setForm(p => ({ ...p, mrp: e.target.value }))}
                  placeholder="699"
                  className="w-full h-11 border rounded-xl px-4 text-sm bg-white focus:outline-primary transition-all shadow-sm"
                />
              </div>
            </div>
            {form.basePrice && form.mrp && parseFloat(form.mrp) > 0 && (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl p-3">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-xs font-bold text-green-700">
                  Customer saves ₹{(parseFloat(form.mrp) - parseFloat(form.basePrice)).toFixed(0)} ({Math.round(((parseFloat(form.mrp) - parseFloat(form.basePrice)) / parseFloat(form.mrp)) * 100)}% off)
                </span>
              </div>
            )}
          </fieldset>

          {/* Badges & Flags */}
          <fieldset className="space-y-4">
            <legend className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 mb-3">
              <Star className="h-3.5 w-3.5 text-primary" /> Visibility & Tags
            </legend>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-primary/5 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                <input
                  type="checkbox"
                  checked={form.isBestseller}
                  onChange={(e) => setForm(p => ({ ...p, isBestseller: e.target.checked }))}
                  className="accent-primary h-4 w-4"
                />
                <div>
                  <span className="text-sm font-bold block">⭐ Bestseller</span>
                  <span className="text-[10px] text-muted-foreground">Show in homepage bestsellers</span>
                </div>
              </label>
              <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-purple-50 transition-colors has-[:checked]:border-purple-400 has-[:checked]:bg-purple-50">
                <input
                  type="checkbox"
                  checked={form.isTrending}
                  onChange={(e) => setForm(p => ({ ...p, isTrending: e.target.checked }))}
                  className="accent-purple-600 h-4 w-4"
                />
                <div>
                  <span className="text-sm font-bold block">🔥 Trending</span>
                  <span className="text-[10px] text-muted-foreground">Feature as trending</span>
                </div>
              </label>
            </div>
            <div>
              <label className="text-xs font-bold mb-1.5 block">Custom Badge</label>
              <input
                value={form.badge}
                onChange={(e) => setForm(p => ({ ...p, badge: e.target.value }))}
                placeholder="e.g., B2G1, New Arrival, Limited Edition"
                className="w-full h-11 border rounded-xl px-4 text-sm bg-white focus:outline-primary transition-all shadow-sm"
              />
            </div>
          </fieldset>

          {/* Ayurvedic Details */}
          <fieldset className="space-y-4">
            <legend className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 mb-3">
              <Leaf className="h-3.5 w-3.5 text-primary" /> Ayurvedic Details
            </legend>
            <div>
              <label className="text-xs font-bold mb-1.5 block">Key Highlights</label>
              <textarea
                value={form.highlights}
                onChange={(e) => setForm(p => ({ ...p, highlights: e.target.value }))}
                placeholder="One highlight per line. e.g.,&#10;100% Natural Herbs&#10;Paraben Free&#10;Dermatologist Tested"
                rows={3}
                className="w-full border rounded-xl px-4 py-3 text-sm bg-white focus:outline-primary transition-all shadow-sm resize-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold mb-1.5 block">Benefits</label>
              <textarea
                value={form.benefits}
                onChange={(e) => setForm(p => ({ ...p, benefits: e.target.value }))}
                placeholder="e.g., Brightens skin, Reduces pigmentation..."
                rows={3}
                className="w-full border rounded-xl px-4 py-3 text-sm bg-white focus:outline-primary transition-all shadow-sm resize-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold mb-1.5 block">Ingredients</label>
              <textarea
                value={form.ingredients}
                onChange={(e) => setForm(p => ({ ...p, ingredients: e.target.value }))}
                placeholder="e.g., Kumkumadi Tailam, Saffron, Sandalwood, Turmeric..."
                rows={3}
                className="w-full border rounded-xl px-4 py-3 text-sm bg-white focus:outline-primary transition-all shadow-sm resize-none"
              />
            </div>
          </fieldset>

          {/* Images */}
          <fieldset className="space-y-4">
            <legend className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 mb-3">
              <ImageIcon className="h-3.5 w-3.5 text-primary" /> Product Images
            </legend>
            <div>
              <label className="text-xs font-bold mb-1.5 block">Image URLs (JSON array)</label>
              <textarea
                value={form.images}
                onChange={(e) => setForm(p => ({ ...p, images: e.target.value }))}
                placeholder='["https://example.com/image1.jpg", "https://example.com/image2.jpg"]'
                rows={3}
                className="w-full border rounded-xl px-4 py-3 text-sm font-mono bg-white focus:outline-primary transition-all shadow-sm resize-none"
              />
            </div>
          </fieldset>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t bg-muted/20 flex items-center justify-between gap-4">
          <Button variant="outline" onClick={onClose} className="px-6">Cancel</Button>
          <Button onClick={handleSave} disabled={saving || !form.name || !form.slug} className="px-8 gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            {isEditing ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </div>
    </>
  )
}


// ─── Main Products Page ─────────────────────────────────────
export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterFlag, setFilterFlag] = useState('all')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'date'>('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)
  const pageSize = 10

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    const [prods, cats] = await Promise.all([getProductsAction(), getCategoriesAction()])
    setProducts(prods as Product[])
    setCategories(cats as Category[])
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Permanently delete this product? This cannot be undone.')) return
    setDeleteLoading(id)
    await deleteProductAction(id)
    await loadData()
    setDeleteLoading(null)
    setSelectedIds(prev => { const n = new Set(prev); n.delete(id); return n; })
  }

  async function handleBulkDelete() {
    if (!confirm(`Delete ${selectedIds.size} selected products? This cannot be undone.`)) return
    for (const id of selectedIds) {
      await deleteProductAction(id)
    }
    setSelectedIds(new Set())
    await loadData()
  }

  async function handleSaveProduct(data: any) {
    await upsertProductAction(data)
    await loadData()
    setShowForm(false)
    setEditingProduct(null)
  }

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.slug.toLowerCase().includes(q) ||
        p.category?.name?.toLowerCase().includes(q)
      )
    }

    // Category
    if (filterCategory !== 'all') {
      result = result.filter(p => p.categoryId === filterCategory)
    }

    // Flags
    if (filterFlag === 'bestseller') result = result.filter(p => p.isBestseller)
    else if (filterFlag === 'trending') result = result.filter(p => p.isTrending)
    else if (filterFlag === 'no-image') result = result.filter(p => !p.images || JSON.parse(p.images).length === 0)

    // Sort
    result.sort((a, b) => {
      let cmp = 0
      if (sortBy === 'name') cmp = a.name.localeCompare(b.name)
      else if (sortBy === 'price') cmp = a.basePrice - b.basePrice
      else cmp = 0 // date - keep db order
      return sortDir === 'desc' ? -cmp : cmp
    })

    return result
  }, [products, searchQuery, filterCategory, filterFlag, sortBy, sortDir])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Stats
  const stats = useMemo(() => {
    const total = products.length
    const bestsellers = products.filter(p => p.isBestseller).length
    const trending = products.filter(p => p.isTrending).length
    const noImages = products.filter(p => !p.images || JSON.parse(p.images).length === 0).length
    const avgPrice = total > 0 ? Math.round(products.reduce((s, p) => s + p.basePrice, 0) / total) : 0
    return { total, bestsellers, trending, noImages, avgPrice }
  }, [products])

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedProducts.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(paginatedProducts.map(p => p.id)))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id); else n.add(id)
      return n
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black italic tracking-tighter uppercase mb-1 flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Package className="h-5 w-5 text-primary" />
            </div>
            Product Catalog
          </h1>
          <p className="text-sm text-muted-foreground font-medium ml-12">
            Manage your Ayurvedic skincare and haircare inventory
          </p>
        </div>
        <div className="flex items-center gap-3 ml-12 md:ml-0">
          <Button variant="outline" size="sm" onClick={loadData} className="gap-2 text-xs font-bold">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </Button>
          <Button 
            onClick={() => { setEditingProduct(null); setShowForm(true) }}
            className="gap-2 px-5 rounded-xl shadow-lg shadow-primary/20 text-xs font-black uppercase tracking-wider"
          >
            <Plus className="h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Products', value: stats.total, icon: Package, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
          { label: 'Bestsellers', value: stats.bestsellers, icon: Star, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
          { label: 'Trending', value: stats.trending, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
          { label: 'Avg. Price', value: `₹${stats.avgPrice}`, icon: Tag, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
          { label: 'Missing Image', value: stats.noImages, icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white p-4 rounded-2xl border ${stat.border} shadow-sm flex items-center gap-3 transition-all hover:shadow-md`}>
            <div className={`h-10 w-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground truncate">{stat.label}</p>
              <p className="text-lg font-black italic">{loading ? '...' : stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 w-full md:w-auto">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search by name, slug, or category..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
                className="w-full pl-10 pr-4 h-10 rounded-xl border bg-muted/20 text-sm focus:outline-primary transition-all"
              />
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowFilters(!showFilters)}
              className={`gap-2 text-xs font-bold uppercase tracking-wider shrink-0 ${showFilters ? 'bg-primary/5 border-primary text-primary' : ''}`}
            >
              <Filter className="h-3.5 w-3.5" /> Filters
              {(filterCategory !== 'all' || filterFlag !== 'all') && (
                <span className="h-5 w-5 rounded-full bg-primary text-white text-[10px] font-black flex items-center justify-center">
                  {(filterCategory !== 'all' ? 1 : 0) + (filterFlag !== 'all' ? 1 : 0)}
                </span>
              )}
            </Button>
          </div>

          {selectedIds.size > 0 && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
              <span className="text-xs font-bold text-red-700">{selectedIds.size} selected</span>
              <Button variant="destructive" size="sm" onClick={handleBulkDelete} className="gap-1 text-xs h-7">
                <Trash2 className="h-3 w-3" /> Delete
              </Button>
              <button onClick={() => setSelectedIds(new Set())} className="text-red-400 hover:text-red-600">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Filter Row */}
        {showFilters && (
          <div className="px-4 py-3 border-b bg-muted/10 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category:</label>
              <select
                value={filterCategory}
                onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1) }}
                className="h-8 border rounded-lg px-3 text-xs bg-white focus:outline-primary appearance-none pr-8"
              >
                <option value="all">All Categories</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Flag:</label>
              <select
                value={filterFlag}
                onChange={(e) => { setFilterFlag(e.target.value); setCurrentPage(1) }}
                className="h-8 border rounded-lg px-3 text-xs bg-white focus:outline-primary appearance-none pr-8"
              >
                <option value="all">All Products</option>
                <option value="bestseller">⭐ Bestsellers Only</option>
                <option value="trending">🔥 Trending Only</option>
                <option value="no-image">⚠️ Missing Images</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Sort:</label>
              <select
                value={`${sortBy}-${sortDir}`}
                onChange={(e) => {
                  const [by, dir] = e.target.value.split('-') as ['name' | 'price' | 'date', 'asc' | 'desc']
                  setSortBy(by); setSortDir(dir)
                }}
                className="h-8 border rounded-lg px-3 text-xs bg-white focus:outline-primary appearance-none pr-8"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="name-asc">Name A→Z</option>
                <option value="name-desc">Name Z→A</option>
                <option value="price-asc">Price Low→High</option>
                <option value="price-desc">Price High→Low</option>
              </select>
            </div>
            {(filterCategory !== 'all' || filterFlag !== 'all') && (
              <button 
                onClick={() => { setFilterCategory('all'); setFilterFlag('all') }}
                className="text-xs font-bold text-primary hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">
                <th className="px-4 py-3.5 w-10">
                  <input
                    type="checkbox"
                    checked={paginatedProducts.length > 0 && selectedIds.size === paginatedProducts.length}
                    onChange={toggleSelectAll}
                    className="accent-primary h-3.5 w-3.5"
                  />
                </th>
                <th className="px-4 py-3.5">Product</th>
                <th className="px-4 py-3.5 hidden lg:table-cell">Category</th>
                <th className="px-4 py-3.5">Price</th>
                <th className="px-4 py-3.5 hidden md:table-cell">Status</th>
                <th className="px-4 py-3.5 hidden xl:table-cell">Rating</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground font-medium">Loading your catalog...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-16 w-16 rounded-2xl bg-muted/30 flex items-center justify-center">
                        <Package className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-base font-bold">No products found</h3>
                      <p className="text-sm text-muted-foreground max-w-sm">
                        {searchQuery ? 'Try adjusting your search or filters.' : 'Start building your Ayurvedic catalog by adding your first product.'}
                      </p>
                      {!searchQuery && (
                        <Button onClick={() => { setEditingProduct(null); setShowForm(true) }} className="mt-2 gap-2">
                          <Plus className="h-4 w-4" /> Add First Product
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : paginatedProducts.map((product) => {
                let imgUrl: string | null = null
                try { const imgs = JSON.parse(product.images || '[]'); imgUrl = imgs[0] || null } catch {}
                const discount = product.mrp > 0 ? Math.round(((product.mrp - product.basePrice) / product.mrp) * 100) : 0

                return (
                  <tr 
                    key={product.id} 
                    className={`hover:bg-primary/[0.02] transition-colors ${selectedIds.has(product.id) ? 'bg-primary/5' : ''} ${deleteLoading === product.id ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(product.id)}
                        onChange={() => toggleSelect(product.id)}
                        className="accent-primary h-3.5 w-3.5"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-muted rounded-xl flex-shrink-0 overflow-hidden border relative">
                          {imgUrl ? (
                            <img src={imgUrl} alt={product.name} className="object-cover w-full h-full" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-muted flex items-center justify-center text-[10px] font-black text-muted-foreground">
                              <Leaf className="h-4 w-4 text-primary/40" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold line-clamp-1 text-sm">{product.name}</span>
                          <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[200px]">/{product.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-[10px] font-bold bg-muted px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {product.category?.name || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-black text-primary text-sm">₹{product.basePrice.toLocaleString()}</span>
                        {product.mrp > product.basePrice && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] line-through text-muted-foreground">₹{product.mrp.toLocaleString()}</span>
                            <span className="text-[9px] font-black text-green-600 bg-green-50 px-1 rounded">{discount}%</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <StatusBadge product={product} />
                    </td>
                    <td className="px-4 py-3 hidden xl:table-cell">
                      {product.rating ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-bold">{product.rating}</span>
                          <span className="text-[10px] text-muted-foreground">({product.reviewCount})</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-muted-foreground italic">No reviews</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => { setEditingProduct(product); setShowForm(true) }}
                          className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors" 
                          title="Edit"
                        >
                          <Edit className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)} 
                          className="h-8 w-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors" 
                          title="Delete"
                        >
                          {deleteLoading === product.id 
                            ? <Loader2 className="h-3.5 w-3.5 animate-spin text-red-400" />
                            : <Trash2 className="h-3.5 w-3.5 text-red-400 hover:text-red-600" />
                          }
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {filteredProducts.length > 0 && (
          <div className="px-4 py-3 border-t bg-muted/10 flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium">
              Showing {((currentPage - 1) * pageSize) + 1}–{Math.min(currentPage * pageSize, filteredProducts.length)} of {filteredProducts.length} products
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 rounded-lg text-xs font-bold transition-colors ${page === currentPage ? 'bg-primary text-white' : 'hover:bg-muted'}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Product Form Slide-over */}
      {showForm && (
        <ProductFormPanel
          product={editingProduct}
          categories={categories}
          onClose={() => { setShowForm(false); setEditingProduct(null) }}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  )
}
