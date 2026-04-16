import React from 'react'
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PRODUCTS = [
  { id: '1', name: 'Ceramide & Vitamin C Sunscreen', category: 'PROTECT', price: 499, stock: 450, status: 'Active' },
  { id: '2', name: 'Haldi & Hyaluronic Acid Sunscreen', category: 'PROTECT', price: 499, stock: 12, status: 'Low Stock' },
  { id: '3', name: 'Tea Tree & Lactic Acid Body Lotion', category: 'MOISTURIZE', price: 349, stock: 0, status: 'Out of Stock' },
  { id: '4', name: 'Kesar & 2% Kojic Acid Ampoule Serum', category: 'CORRECT', price: 599, stock: 231, status: 'Active' },
]

export default function AdminProducts() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Products</h1>
          <p className="text-sm text-muted-foreground italic font-medium">Manage your inventory and product listings.</p>
        </div>
        <Button className="rounded-full gap-2 px-6">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between gap-4">
           <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 h-10 rounded-lg border bg-muted/20 text-sm focus:outline-primary"
              />
           </div>
           <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 text-xs font-bold uppercase tracking-wider">
                 <Filter className="h-3.5 w-3.5" /> Filters
              </Button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {PRODUCTS.map((product) => (
                <tr key={product.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-muted rounded-lg flex-shrink-0" />
                        <span className="font-bold line-clamp-1">{product.name}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className="text-[10px] font-bold bg-muted px-2 py-0.5 rounded uppercase tracking-wider">
                        {product.category}
                     </span>
                  </td>
                  <td className="px-6 py-4 font-black italic">₹{product.price}</td>
                  <td className="px-6 py-4 font-medium">{product.stock}</td>
                  <td className="px-6 py-4">
                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        product.status === 'Active' ? 'bg-green-100 text-green-700' :
                        product.status === 'Low Stock' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                     }`}>
                        {product.status}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
