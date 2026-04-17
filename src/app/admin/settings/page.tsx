"use client"

import React, { useState, useEffect } from 'react'
import { Save, Eye, EyeOff, ToggleLeft, ToggleRight, CheckCircle, AlertCircle, Lock, Zap, Layout, FileText, Globe, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getPaymentSettings, savePaymentSettings } from '@/lib/payment-config'
import { getSettingsAction, updateSettingsAction, getPagesAction, upsertPageAction } from '../actions'
import type { PaymentProvider } from '@/lib/payment-config'

export const runtime = 'edge'

export default function PaymentSettingsPage() {
  const [activeTab, setActiveTab] = useState<'payment' | 'general' | 'pages'>('payment')
  const [providers, setProviders] = useState<PaymentProvider[]>([])
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({})
  const [saved, setSaved] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>('upi')
  
  // General & Pages State
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [pages, setPages] = useState<any[]>([])

  useEffect(() => {
    setProviders(getPaymentSettings())
    loadGeneralSettings()
    loadPages()
  }, [])

  async function loadGeneralSettings() {
    const data = await getSettingsAction()
    setSettings(data)
  }

  async function loadPages() {
    const data = await getPagesAction()
    setPages(data)
  }

  const handleFieldChange = (providerId: string, fieldKey: string, value: string) => {
    setProviders(prev =>
      prev.map(p =>
        p.id === providerId ? {
          ...p,
          fields: p.fields.map(f => f.key === fieldKey ? { ...f, value } : f)
        } : p
      )
    )
    setSaved(false)
  }

  const toggleEnabled = (providerId: string) => {
    setProviders(prev =>
      prev.map(p =>
        p.id === providerId ? { ...p, enabled: !p.enabled } : p
      )
    )
    setSaved(false)
  }

  const toggleComingSoon = (providerId: string) => {
    setProviders(prev =>
      prev.map(p =>
        p.id === providerId ? { ...p, comingSoon: !p.comingSoon, enabled: p.comingSoon ? true : p.enabled } : p
      )
    )
    setSaved(false)
  }

  const handleSavePayment = () => {
    savePaymentSettings(providers)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleSaveGeneral = async () => {
    for (const [key, value] of Object.entries(settings)) {
      await updateSettingsAction(key, value)
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleSavePage = async (page: any) => {
    await upsertPageAction(page)
    setSaved(true)
    loadPages()
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black italic tracking-tighter uppercase mb-1">Store Settings</h1>
          <p className="text-sm text-muted-foreground font-medium">
            Configure your brand, content, and payment gateways.
          </p>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex bg-muted/30 p-1 rounded-xl border">
          <button 
            onClick={() => setActiveTab('payment')}
            className={cn("px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all", activeTab === 'payment' ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground")}
          >
            Payments
          </button>
          <button 
            onClick={() => setActiveTab('general')}
            className={cn("px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all", activeTab === 'general' ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground")}
          >
            General
          </button>
          <button 
            onClick={() => setActiveTab('pages')}
            className={cn("px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all", activeTab === 'pages' ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground")}
          >
            Pages content
          </button>
        </div>
      </div>

      {activeTab === 'payment' && (
        <div className="flex flex-col gap-6">
          <div className="flex justify-end">
            <Button onClick={handleSavePayment} className={cn("rounded-xl", saved && "bg-green-600 hover:bg-green-700")}>
              {saved ? <CheckCircle className="h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              {saved ? 'Saved' : 'Save Payment Methods'}
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            {providers.map((provider) => {
              if (provider.comingSoon) return null; // Hide coming soon ones completely to declutter
              
              const isExpanded = expandedId === provider.id
              const isActive = provider.enabled
              
              return (
                <div key={provider.id} className={cn("bg-white rounded-2xl border shadow-sm overflow-hidden transition-all", isActive ? "border-primary/40 ring-1 ring-primary/10" : "")}>
                  <div className="p-5 flex items-center justify-between cursor-pointer hover:bg-muted/10 transition-colors" onClick={() => setExpandedId(isExpanded ? null : provider.id)}>
                    <div className="flex items-center gap-4">
                      <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shrink-0 border", isActive ? "bg-primary/10 border-primary/20" : "bg-muted border-muted-foreground/20")}>
                        <span className="text-2xl">{provider.icon}</span>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                          {provider.name}
                          {isActive && <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />}
                        </span>
                        <span className="text-xs text-muted-foreground">{provider.description}</span>
                      </div>
                    </div>
                    {/* Toggle Button for Header */}
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hidden md:block">
                         {isActive ? 'Active' : 'Disabled'}
                       </span>
                       <div 
                         onClick={(e) => { e.stopPropagation(); toggleEnabled(provider.id); }}
                         className={cn("w-12 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors border", isActive ? "bg-primary border-primary/20" : "bg-muted border-slate-300")}
                       >
                         <div className={cn("h-4 w-4 bg-white rounded-full shadow-sm transition-transform duration-300", isActive ? "translate-x-6" : "translate-x-0")} />
                       </div>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="border-t p-6 animate-in slide-in-from-top-1 bg-slate-50/50">
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                          Configuration Keys
                       </h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {provider.fields.map(f => (
                            <div key={f.key} className="flex flex-col gap-2">
                               <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{f.label}</label>
                               <input 
                                 type={showSecrets[`${provider.id}_${f.key}`] ? 'text' : f.type}
                                 placeholder={f.placeholder}
                                 value={f.value} 
                                 onChange={(e) => handleFieldChange(provider.id, f.key, e.target.value)}
                                 className="h-11 border rounded-xl px-4 text-sm focus:outline-primary bg-white shadow-sm transition-all"
                               />
                            </div>
                          ))}
                       </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'general' && (
        <div className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b pb-4">
             <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <h2 className="text-sm font-black uppercase tracking-widest italic">Branding & Logo</h2>
             </div>
             <Button onClick={handleSaveGeneral} size="sm" className="rounded-xl">Save Changes</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="flex flex-col gap-2">
                <label className="text-xs font-bold">Store Name</label>
                <input 
                  value={settings.site_name || 'AyurGlow'} 
                  onChange={(e) => setSettings({...settings, site_name: e.target.value})}
                  className="h-11 border rounded-xl px-4 text-sm"
                />
             </div>
             <div className="flex flex-col gap-2">
                <label className="text-xs font-bold">Logo URL</label>
                <div className="flex gap-2">
                   <input 
                     value={settings.site_logo || '/logo.png'} 
                     onChange={(e) => setSettings({...settings, site_logo: e.target.value})}
                     className="h-11 border rounded-xl px-4 text-sm flex-1"
                   />
                   <div className="h-11 w-11 border rounded-xl bg-muted flex items-center justify-center">
                      <ImageIcon className="h-5 w-5 opacity-30" />
                   </div>
                </div>
             </div>
             <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold">Store Description (SEO)</label>
                <textarea 
                  rows={3}
                  value={settings.site_description || 'Premium Ayurvedic Skincare Solution'} 
                  onChange={(e) => setSettings({...settings, site_description: e.target.value})}
                  className="p-4 border rounded-xl text-sm"
                />
             </div>
          </div>
        </div>
      )}

      {activeTab === 'pages' && (
        <div className="flex flex-col gap-6">
           <div className="grid grid-cols-1 gap-4">
              {['privacy-policy', 'terms-of-service', 'shipping-policy', 'return-policy', 'disclaimer'].map(slug => {
                const page = pages.find(p => p.slug === slug) || { slug, title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), content: '' }
                return (
                  <div key={slug} className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-4">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <FileText className="h-5 w-5 text-primary" />
                           <h3 className="text-xs font-black uppercase tracking-widest">{page.title}</h3>
                        </div>
                        <Button onClick={() => handleSavePage(page)} size="sm" variant="outline" className="rounded-xl h-8 text-[10px] font-bold">Update Content</Button>
                     </div>
                     <textarea 
                       rows={6}
                       placeholder={`Enter ${page.title} content...`}
                       value={page.content}
                       onChange={(e) => {
                         const newPages = pages.some(p => p.slug === slug) 
                           ? pages.map(p => p.slug === slug ? {...p, content: e.target.value} : p)
                           : [...pages, {...page, content: e.target.value}]
                         setPages(newPages)
                       }}
                       className="p-4 border rounded-xl text-xs font-mono bg-muted/5 leading-relaxed"
                     />
                  </div>
                )
              })}
           </div>
        </div>
      )}
    </div>
  )
}
