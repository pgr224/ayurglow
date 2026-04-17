"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { 
  ShoppingBag, Search, Filter, Eye, Edit, Trash2, 
  CheckCircle2, Clock, Truck, XCircle, Currency, 
  MapPin, User, Package, Calendar, RefreshCw, 
  Download, MoreHorizontal, ChevronLeft, ChevronRight, X
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const runtime = 'edge'

// ─── Types ──────────────────────────────────────────────────
interface Order {
  id: string
  userId?: string
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  subtotal: number
  discount: number
  total: number
  couponCode?: string
  shippingAddress: string // JSON
  paymentMethod: string
  paymentStatus: 'pending' | 'paid' | 'failed' | 'cod'
  createdAt: string
  user?: { name: string; email: string }
  items?: Array<{ id: string; name: string; quantity: number; price: number }>
}

// Dummy data for visual presentation since backend actions aren't fully wired for orders yet
const mockOrders: Order[] = [
  {
    id: "ORD-AG-20260418-001",
    status: "pending",
    subtotal: 1298,
    discount: 0,
    total: 1298,
    shippingAddress: '{"name": "Aarav Patel", "address": "123 MG Road, Apt 4B", "city": "Mumbai", "state": "Maharashtra", "pincode": "400001", "phone": "9876543210"}',
    paymentMethod: "upi",
    paymentStatus: "paid",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    user: { name: "Aarav Patel", email: "aarav.p@example.com" },
    items: [
      { id: "p1", name: "Kumkumadi Tailam Night Serum", quantity: 1, price: 899 },
      { id: "p2", name: "Neem & Tulsi Face Wash", quantity: 1, price: 399 }
    ]
  },
  {
    id: "ORD-AG-20260417-089",
    status: "shipped",
    subtotal: 2499,
    discount: 500,
    total: 1999,
    couponCode: "GLOW20",
    shippingAddress: '{"name": "Priya Sharma", "address": "45 Lotus Garden", "city": "Delhi", "state": "Delhi", "pincode": "110021", "phone": "9876512345"}',
    paymentMethod: "credit_card",
    paymentStatus: "paid",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    user: { name: "Priya Sharma", email: "priya.s@example.com" },
    items: [
      { id: "p3", name: "Ayurvedic Hair Growth Oil", quantity: 2, price: 1249.5 }
    ]
  },
  {
    id: "ORD-AG-20260416-042",
    status: "delivered",
    subtotal: 499,
    discount: 0,
    total: 499,
    shippingAddress: '{"name": "Vikram Singh", "address": "78 Scheme 54", "city": "Indore", "state": "MP", "pincode": "452010", "phone": "9123456780"}',
    paymentMethod: "cod",
    paymentStatus: "paid",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    user: { name: "Vikram Singh", email: "vikram.s@example.com" },
    items: [
      { id: "p4", name: "Sandalwood Face Pack", quantity: 1, price: 499 }
    ]
  },
  {
    id: "ORD-AG-20260415-012",
    status: "cancelled",
    subtotal: 899,
    discount: 0,
    total: 899,
    shippingAddress: '{"name": "Sneha Reddy", "address": "B-12 Jubilee Hills", "city": "Hyderabad", "state": "Telangana", "pincode": "500033", "phone": "8765432109"}',
    paymentMethod: "debit_card",
    paymentStatus: "failed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    user: { name: "Sneha Reddy", email: "sneha.r@example.com" },
    items: [
      { id: "p1", name: "Kumkumadi Tailam Night Serum", quantity: 1, price: 899 }
    ]
  }
]

// ─── Status Utilities ────────────────────────────────────────
const getStatusConfig = (status: Order['status']) => {
  switch (status) {
    case 'pending': return { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Processing' }
    case 'confirmed': return { icon: CheckCircle2, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', label: 'Confirmed' }
    case 'shipped': return { icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', label: 'Shipped' }
    case 'delivered': return { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', label: 'Delivered' }
    case 'cancelled': return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', label: 'Cancelled' }
    default: return { icon: Clock, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', label: status }
  }
}

const getPaymentStatusConfig = (status: Order['paymentStatus']) => {
  switch (status) {
    case 'paid': return { color: 'text-green-700', bg: 'bg-green-100', label: 'Paid' }
    case 'pending': return { color: 'text-amber-700', bg: 'bg-amber-100', label: 'Unpaid' }
    case 'failed': return { color: 'text-red-700', bg: 'bg-red-100', label: 'Failed' }
    case 'cod': return { color: 'text-blue-700', bg: 'bg-blue-100', label: 'COD' }
    default: return { color: 'text-gray-700', bg: 'bg-gray-100', label: status }
  }
}

// ─── Order Details Modal ─────────────────────────────────────
function OrderDetailsModal({ order, onClose }: { order: Order; onClose: () => void }) {
  const statusConfig = getStatusConfig(order.status)
  const paymentConfig = getPaymentStatusConfig(order.paymentStatus)
  let addressObj: any = {}
  try { addressObj = JSON.parse(order.shippingAddress) } catch (e) {}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-primary/5 to-transparent">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter">Order {order.id}</h2>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(order.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
            </p>
          </div>
          <button onClick={onClose} className="h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Status Bar */}
          <div className="flex flex-wrap gap-4 items-center justify-between bg-muted/10 p-4 rounded-xl border border-muted/20">
            <div className="flex gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Order Status</p>
                <div className={`px-3 py-1 rounded-full border flex items-center gap-2 w-fit ${statusConfig.bg} ${statusConfig.border}`}>
                  <statusConfig.icon className={`h-4 w-4 ${statusConfig.color}`} />
                  <span className={`text-xs font-bold ${statusConfig.color}`}>{statusConfig.label}</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Payment Status</p>
                <div className={`px-3 py-1 rounded-full flex items-center gap-2 w-fit ${paymentConfig.bg}`}>
                  <span className={`text-xs font-bold ${paymentConfig.color}`}>{paymentConfig.label}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <select className="h-9 border rounded-lg px-3 text-xs bg-white focus:outline-primary appearance-none pr-8">
                <option value="pending">Mark Processing</option>
                <option value="confirmed">Mark Confirmed</option>
                <option value="shipped">Mark Shipped</option>
                <option value="delivered">Mark Delivered</option>
                <option value="cancelled">Cancel Order</option>
              </select>
              <Button size="sm" className="h-9">Update</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Customer & Shipping */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground border-b pb-2 mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" /> Customer Details
                </h3>
                <div className="space-y-1 text-sm bg-white p-4 rounded-xl border shadow-sm">
                  <p className="font-bold">{order.user?.name || addressObj.name}</p>
                  <p className="text-muted-foreground">{order.user?.email}</p>
                  <p className="text-muted-foreground">{addressObj.phone}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground border-b pb-2 mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Shipping Address
                </h3>
                <div className="space-y-1 text-sm bg-white p-4 rounded-xl border shadow-sm">
                  <p className="font-bold">{addressObj.name}</p>
                  <p className="text-muted-foreground">{addressObj.address}</p>
                  <p className="text-muted-foreground">{addressObj.city}, {addressObj.state} {addressObj.pincode}</p>
                </div>
              </div>
            </div>

            {/* Order Items & Summary */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground border-b pb-2 mb-3 flex items-center gap-2">
                <Package className="h-4 w-4" /> Order Items
              </h3>
              <div className="bg-white p-4 rounded-xl border shadow-sm space-y-4">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-sm font-bold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-black italic">₹{item.price.toLocaleString()}</p>
                  </div>
                ))}
                
                <div className="border-t pt-4 mt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{order.subtotal.toLocaleString()}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount {order.couponCode && `(${order.couponCode})`}</span>
                      <span>-₹{order.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-black italic border-t pt-2 mt-2">
                    <span>Total</span>
                    <span className="text-primary">₹{order.total.toLocaleString()}</span>
                  </div>
                  <div className="text-right text-[10px] text-muted-foreground">
                    Paid via {order.paymentMethod.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


// ─── Main Orders Page ───────────────────────────────────────
export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const pageSize = 10

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    // Simulate API call for now
    setTimeout(() => {
      setOrders(mockOrders)
      setLoading(false)
    }, 600)
  }

  // Filtering
  const filteredOrders = useMemo(() => {
    let result = [...orders]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(o => 
        o.id.toLowerCase().includes(q) || 
        o.user?.name.toLowerCase().includes(q) ||
        o.user?.email.toLowerCase().includes(q)
      )
    }

    if (filterStatus !== 'all') {
      result = result.filter(o => o.status === filterStatus)
    }

    // Sort by newest always for this view
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return result
  }, [orders, searchQuery, filterStatus])

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize))
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Stats
  const stats = useMemo(() => {
    const total = orders.length
    const pending = orders.filter(o => o.status === 'pending').length
    const revenue = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0)
    return { total, pending, revenue }
  }, [orders])

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black italic tracking-tighter uppercase mb-1 flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-primary" />
            </div>
            Orders
          </h1>
          <p className="text-sm text-muted-foreground font-medium ml-12">
            Manage customer orders, shipping, and fulfillment
          </p>
        </div>
        <div className="flex items-center gap-3 ml-12 md:ml-0">
          <Button variant="outline" size="sm" onClick={loadData} className="gap-2 text-xs font-bold">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </Button>
          <Button variant="outline" className="gap-2 px-4 rounded-xl text-xs font-bold shadow-sm">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Orders', value: stats.total, icon: ShoppingBag, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
          { label: 'Pending Processing', value: stats.pending, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
          { label: 'Total Revenue', value: `₹${stats.revenue.toLocaleString()}`, icon: Currency, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white p-6 rounded-2xl border ${stat.border} shadow-sm flex items-center gap-4 transition-all hover:shadow-md`}>
            <div className={`h-12 w-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-black italic">{loading ? '...' : stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b flex flex-col md:flex-row items-center justify-between gap-4 bg-muted/5">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search by Order ID, Customer Name..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
              className="w-full pl-10 pr-4 h-10 rounded-xl border bg-white text-sm focus:outline-primary transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1) }}
              className="h-10 border rounded-xl px-4 text-sm bg-white focus:outline-primary shadow-sm appearance-none pr-8 min-w-[150px] font-medium"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">
                <th className="px-6 py-4">Order ID & Date</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4 text-right">Total</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
                      <RefreshCw className="h-8 w-8 animate-spin" />
                      <span className="font-medium text-sm">Loading orders...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="h-16 w-16 bg-muted/50 rounded-full flex items-center justify-center">
                        <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                         <h3 className="text-base font-bold italic mb-1">No orders found</h3>
                         <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                           {searchQuery || filterStatus !== 'all' 
                             ? 'Try adjusting your search criteria or filters.' 
                             : 'When customers place orders, they will appear here.'}
                         </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : paginatedOrders.map((order) => {
                const statusConfig = getStatusConfig(order.status)
                const paymentConfig = getPaymentStatusConfig(order.paymentStatus)
                let addressObj: any = {}
                try { addressObj = JSON.parse(order.shippingAddress) } catch (e) {}

                return (
                  <tr key={order.id} className="hover:bg-primary/[0.02] transition-colors cursor-pointer" onClick={() => setSelectedOrder(order)}>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-black text-primary hover:underline">{order.id}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold">{order.user?.name || addressObj.name}</span>
                        <span className="text-xs text-muted-foreground">{addressObj.city}, {addressObj.state}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`px-2.5 py-1 rounded-full border flex items-center gap-1.5 w-fit ${statusConfig.bg} ${statusConfig.border}`}>
                        <statusConfig.icon className={`h-3 w-3 ${statusConfig.color}`} />
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${statusConfig.color}`}>{statusConfig.label}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 items-start">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${paymentConfig.bg} ${paymentConfig.color}`}>
                          {paymentConfig.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground uppercase font-mono">{order.paymentMethod}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-black italic text-base">₹{order.total.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={(e) => { e.stopPropagation(); setSelectedOrder(order) }}>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {filteredOrders.length > 0 && (
          <div className="px-6 py-4 border-t bg-muted/5 flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium">
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredOrders.length)} of {filteredOrders.length} entries
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center disabled:opacity-30 transition-colors bg-white border shadow-sm"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="px-4 font-bold">{currentPage} / {totalPages}</div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center disabled:opacity-30 transition-colors bg-white border shadow-sm"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  )
}
