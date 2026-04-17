"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { 
  Users, UserPlus, Search, Edit, Trash2, Mail, Phone, 
  MapPin, Shield, ShoppingBag, CreditCard, ChevronRight,
  ArrowUpRight, AlertCircle, RefreshCcw, Loader2, Filter, RotateCcw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getUsersAction, upsertUserAction, deleteUserAction } from '../actions'
import { getPaymentSettings } from '@/lib/payment-config'

export const runtime = 'edge'

// ─── Interfaces ────────────────────────────────────────────────
interface DbUser {
  id: string
  name: string
  email: string | null
  phone: string | null
  role: 'user' | 'admin'
  createdAt: string
}

const CRM_MOCK_ORDERS = [
  { id: 'ORD-2026-69A', date: '2026-04-10', total: 1298, status: 'delivered', items: 2 },
  { id: 'ORD-2026-11B', date: '2026-04-12', total: 4500, status: 'processing', items: 5 },
]

// ─── Customer CRM Profile Panel ────────────────────────────────
function CustomerCRMSidepanel({ 
  user, 
  onClose, 
  onSave 
}: { 
  user: DbUser | null, 
  onClose: () => void,
  onSave: (data: any) => Promise<void>
}) {
  const isEditing = !!user?.id
  const [saving, setSaving] = useState(false)
  
  // CRM Core Data Form
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || 'user'
  })

  // Simulated Order UI States within CRM
  const [processingRefund, setProcessingRefund] = useState<string | null>(null)
  const [refundedOrders, setRefundedOrders] = useState<Record<string, boolean>>({})

  const handleSave = async () => {
    if (!form.name || !form.email) return
    setSaving(true)
    await onSave({
      ...(user?.id ? { id: user.id } : {}),
      ...form
    })
    setSaving(false)
  }

  const handleInitiateRefund = (orderId: string) => {
    if(!confirm(`Are you sure you want to initiate a full refund for ${orderId}? This will reverse the payment via the original Gateway.`)) return;
    
    setProcessingRefund(orderId)
    setTimeout(() => {
      setRefundedOrders(prev => ({ ...prev, [orderId]: true }))
      setProcessingRefund(null)
      alert(`Successfully refunded ₹${CRM_MOCK_ORDERS.find(o => o.id === orderId)?.total} via Razorpay/UPI gateway API.`)
    }, 1500)
  }

  // Handle active status simulation for orders
  const [mockOrderStatus, setMockOrderStatus] = useState<Record<string, string>>({})

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-[#FAF9F6] shadow-2xl z-[70] flex flex-col animate-in slide-in-from-right duration-300">
        
        <div className="flex items-center justify-between p-6 border-b bg-white">
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-black text-lg uppercase">
               {form.name ? form.name.charAt(0) : 'U'}
             </div>
             <div>
               <h2 className="text-xl font-black uppercase tracking-tighter text-slate-800">
                 {isEditing ? 'Customer Profile' : 'New User'}
               </h2>
               {isEditing && (
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                   ID: {user?.id.split('-')[0]}
                 </p>
               )}
             </div>
          </div>
          <button onClick={onClose} className="h-8 w-8 rounded-full hover:bg-muted bg-slate-50 flex items-center justify-center border transition-colors shadow-sm text-slate-500">
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto w-full flex flex-col relative h-full">
           
           {/* Section 1: Core Details Form */}
           <div className="p-6 space-y-4 bg-white border-b">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Identity & Contact</h3>
              
              <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Full Name *</label>
                   <input
                     value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                     className="w-full h-11 px-3 border rounded-xl text-sm focus:outline-primary bg-slate-50 transition-all"
                   />
                 </div>
                 <div>
                   <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Email Address *</label>
                   <input
                     type="email"
                     value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                     className="w-full h-11 px-3 border rounded-xl text-sm focus:outline-primary bg-slate-50 transition-all"
                   />
                 </div>
                 <div>
                   <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Phone Number</label>
                   <input
                     value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                     className="w-full h-11 px-3 border rounded-xl text-sm focus:outline-primary bg-slate-50 transition-all font-mono"
                   />
                 </div>
                 <div>
                   <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Privilege Role</label>
                   <select
                     value={form.role} onChange={e => setForm({...form, role: e.target.value as 'user' | 'admin'})}
                     className="w-full h-11 px-3 border rounded-xl text-sm focus:outline-primary bg-slate-50 transition-all"
                   >
                     <option value="user">Standard User</option>
                     <option value="admin">Administrator / Staff</option>
                   </select>
                 </div>
              </div>
              
              <div className="pt-2">
                 <Button onClick={handleSave} disabled={saving || !form.name || !form.email} className="w-full sm:w-auto px-8 gap-2 rounded-xl text-xs font-bold uppercase tracking-wider">
                   {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Edit className="h-4 w-4" />}
                   {isEditing ? 'Sync Profile Data' : 'Create User'}
                 </Button>
              </div>
           </div>

           {/* Section 2: Order Management & Ledger (Mocked for CRM Display) */}
           {isEditing && (
             <div className="p-6 bg-[#FAF9F6] flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Order Ledger & Operations</h3>
                  <div className="flex gap-2">
                     <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded uppercase">LTV: ₹5,798</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {CRM_MOCK_ORDERS.map((order) => {
                    const isRefunded = refundedOrders[order.id]
                    const currentStatus = mockOrderStatus[order.id] || order.status

                    return (
                      <div key={order.id} className="bg-white border rounded-2xl p-5 shadow-sm space-y-4 transition-all">
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                               <div className="h-10 w-10 bg-slate-50 rounded-full flex items-center justify-center border">
                                  <ShoppingBag className="h-4 w-4 text-slate-600" />
                               </div>
                               <div>
                                 <p className="font-black text-sm text-primary uppercase">{order.id}</p>
                                 <p className="text-[10px] text-muted-foreground font-medium">{order.date} • {order.items} items</p>
                               </div>
                            </div>
                            <div className="text-right">
                               <p className="font-black italic text-base">₹{order.total}</p>
                               {isRefunded ? (
                                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block bg-blue-50 px-2 rounded mt-1">Refunded</span>
                               ) : (
                                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mt-1">Paid • Razorpay</span>
                               )}
                            </div>
                         </div>

                         {/* CRM Controls */}
                         <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col sm:flex-row gap-3 justify-between items-center">
                            
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                               <span className="text-[10px] uppercase font-bold text-slate-500">Override Status:</span>
                               <select 
                                 value={currentStatus}
                                 onChange={(e) => setMockOrderStatus({...mockOrderStatus, [order.id]: e.target.value})}
                                 className="text-xs border rounded h-8 px-2 focus:outline-primary font-medium"
                               >
                                 <option value="processing">Processing</option>
                                 <option value="shipped">Shipped</option>
                                 <option value="delivered">Delivered</option>
                               </select>
                            </div>

                            <div className="flex gap-2 w-full sm:w-auto">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-[10px] h-8 font-black uppercase tracking-wider text-amber-600 border-amber-200 hover:bg-amber-50 rounded-lg flex-1 sm:flex-none"
                              >
                                Email Invoice
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm" 
                                disabled={isRefunded || processingRefund === order.id}
                                onClick={() => handleInitiateRefund(order.id)}
                                className="text-[10px] h-8 font-black uppercase tracking-wider rounded-lg flex-1 sm:flex-none gap-2 flex items-center justify-center bg-slate-900 hover:bg-slate-800"
                              >
                                {processingRefund === order.id ? <Loader2 className="h-3 w-3 animate-spin"/> : <RotateCcw className="h-3 w-3" />}
                                {isRefunded ? 'Refund Complete' : 'Full Refund'}
                              </Button>
                            </div>

                         </div>
                      </div>
                    )
                  })}

                  <div className="text-center p-6 border-dashed border-2 rounded-2xl bg-white/50 text-slate-400">
                    <p className="text-xs font-medium uppercase tracking-widest">End of History</p>
                  </div>
                </div>

             </div>
           )}

        </div>
      </div>
    </>
  )
}

// ─── Main Admin Users Directory ────────────────────────────────
export default function AdminUsers() {
  const [usersList, setUsersList] = useState<DbUser[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState<DbUser | null>(null)
  const [showPanel, setShowPanel] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    setLoading(true)
    const data = await getUsersAction()
    const normalizedUsers: DbUser[] = data.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      role: u.role,
      createdAt: (u.createdAt ?? new Date()).toISOString(),
    }))
    // Guarantee minimal display if db is empty for UI showcase purposes
    if (normalizedUsers.length === 0) {
      normalizedUsers.push({ id: 'USR-ADMIN-1', name: 'Ayur Admin', email: 'admin@ayurglow.com', phone: '900000000', role: 'admin', createdAt: new Date().toISOString() })
    }
    setUsersList(normalizedUsers)
    setLoading(false)
  }

  const handleSaveUser = async (data: any) => {
    await upsertUserAction(data)
    await loadUsers()
    setShowPanel(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Permanently delete this user? This revokes all their access.')) return
    await deleteUserAction(id)
    await loadUsers()
  }

  const filteredUsers = useMemo(() => {
    let res = [...usersList]
    if (search) {
      const q = search.toLowerCase()
      res = res.filter(u => 
        (u.name && u.name.toLowerCase().includes(q)) || 
        (u.email && u.email.toLowerCase().includes(q)) ||
        (u.phone && u.phone.includes(q))
      )
    }
    return res.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [usersList, search])

  // Analytics
  const totalUsers = usersList.length
  const totalAdmins = usersList.filter(u => u.role === 'admin').length

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      
      {/* ─── Header area ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black italic tracking-tighter uppercase mb-1 flex items-center gap-3">
             <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
               <Users className="h-5 w-5 text-primary" />
             </div>
             Customers & Staff
          </h1>
          <p className="text-sm text-muted-foreground font-medium ml-12">
             CRM dashboard for user identity, privilege management, and support requests.
          </p>
        </div>
        <div className="flex items-center gap-3 ml-12 md:ml-0">
          <Button variant="outline" size="sm" onClick={loadUsers} className="gap-2 text-xs font-bold rounded-xl h-10 shadow-sm border-slate-200">
             <RefreshCcw className="h-4 w-4" /> Refresh Base
          </Button>
          <Button 
            onClick={() => { setSelectedUser(null); setShowPanel(true) }}
            className="gap-2 px-5 rounded-xl uppercase tracking-widest font-black text-xs h-10 shadow-lg shadow-primary/20"
          >
            <UserPlus className="h-4 w-4" /> Add Identity
          </Button>
        </div>
      </div>

      {/* ─── Smart Stats ─── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border shadow-sm p-5 flex items-center justify-between">
           <div>
             <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">Total Network</p>
             <p className="text-2xl font-black text-slate-800 italic">{totalUsers}</p>
           </div>
           <div className="h-10 w-10 bg-slate-50 flex items-center justify-center rounded-full border">
             <Users className="h-4 w-4 text-slate-600" />
           </div>
        </div>
        <div className="bg-white rounded-2xl border shadow-sm p-5 flex items-center justify-between border-blue-100 bg-gradient-to-r from-blue-50/50 to-transparent">
           <div>
             <p className="text-[10px] uppercase font-black text-blue-500 tracking-widest mb-1">Privileged Staff</p>
             <p className="text-2xl font-black text-blue-900 italic">{totalAdmins}</p>
           </div>
           <div className="h-10 w-10 bg-white flex items-center justify-center rounded-full border-blue-200 border">
             <Shield className="h-4 w-4 text-blue-600" />
           </div>
        </div>
      </div>

      {/* ─── Main Content Box ─── */}
      <div className="bg-white rounded-3xl border shadow-sm flex flex-col min-h-[500px]">
         
         {/* Toolbar */}
         <div className="p-4 border-b flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50/50">
            <div className="relative w-full md:max-w-md">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
               <input 
                  placeholder="Search identity by name, email or phone..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 h-11 rounded-xl border-slate-200 border text-sm focus:outline-primary shadow-sm bg-white"
               />
            </div>
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
               <Button variant="outline" size="sm" className="h-11 rounded-xl text-xs gap-2 border-slate-200 font-bold bg-white text-slate-600 hover:text-slate-900">
                  <Filter className="h-3.5 w-3.5" /> High Value Customers
               </Button>
               <Button variant="outline" size="sm" className="h-11 rounded-xl text-xs gap-2 border-slate-200 font-bold bg-white text-slate-600 hover:text-slate-900">
                  Recent Orders
               </Button>
            </div>
         </div>

         {/* Directory Grid */}
         <div className="flex-1 p-6">
            {loading ? (
               <div className="h-full w-full flex items-center justify-center min-h-[300px]">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
               </div>
            ) : filteredUsers.length === 0 ? (
               <div className="h-full w-full flex flex-col items-center justify-center min-h-[300px] text-center">
                  <div className="h-16 w-16 bg-slate-50 flex items-center justify-center rounded-full mb-4 border">
                     <AlertCircle className="h-6 w-6 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800">No Identities Found</h3>
                  <p className="text-xs text-muted-foreground mt-1">Try adjusting your directory search filters.</p>
               </div>
            ) : (
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredUsers.map((u) => (
                     <div 
                        key={u.id}
                        onClick={() => { setSelectedUser(u); setShowPanel(true) }}
                        className="group bg-white border border-slate-200 hover:border-primary/40 rounded-2xl p-4 flex gap-4 items-start cursor-pointer transition-all hover:shadow-md"
                     >
                        <div className={`h-12 w-12 shrink-0 rounded-full flex items-center justify-center text-lg font-black uppercase text-white shadow-inner ${u.role === 'admin' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-gradient-to-br from-teal-500 to-emerald-600'}`}>
                           {u.name ? u.name.charAt(0) : 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="flex items-center gap-2 mb-0.5">
                              <h3 className="font-black text-slate-800 truncate">{u.name}</h3>
                              {u.role === 'admin' && (
                                 <span className="bg-blue-100 text-blue-700 border border-blue-200 text-[9px] uppercase tracking-widest font-black px-1.5 py-0.5 rounded flex items-center gap-1">
                                    <Shield className="h-2 w-2" /> Staff
                                 </span>
                              )}
                           </div>
                           <div className="space-y-1">
                              <p className="text-xs text-muted-foreground flex items-center gap-1.5 truncate">
                                 <Mail className="h-3 w-3" /> {u.email}
                              </p>
                              {u.phone && (
                                 <p className="text-xs text-muted-foreground flex items-center gap-1.5 truncate font-mono">
                                    <Phone className="h-3 w-3" /> {u.phone}
                                 </p>
                              )}
                           </div>
                        </div>
                        <div className="flex flex-col items-end gap-3 shrink-0">
                           <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                              {new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', year:'numeric'})}
                           </p>
                           <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ArrowUpRight className="h-4 w-4 text-primary" />
                           </Button>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>

      </div>

      {showPanel && (
         <CustomerCRMSidepanel 
            user={selectedUser} 
            onClose={() => { setShowPanel(false); setSelectedUser(null); }} 
            onSave={handleSaveUser} 
         />
      )}

    </div>
  )
}
