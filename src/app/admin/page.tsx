import React from 'react'
import { TrendingUp, ShoppingCart, Package, Users } from 'lucide-react'

const STATS = [
  { label: 'Total Revenue', value: '₹12,45,900', trend: '+12.5%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Total Orders', value: '4,892', trend: '+8.2%', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Total Products', value: '124', trend: '0%', icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Active Users', value: '25,120', trend: '+14.1%', icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
]

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Overview</h1>
        <p className="text-sm text-muted-foreground italic font-medium">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</span>
              <span className="text-xl font-black italic">{stat.value}</span>
              <span className={`text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend} from last month
              </span>
            </div>
            <div className={`h-12 w-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center p-3`}>
              <stat.icon className="h-full w-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-widest italic">Recent Orders</h3>
            <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="p-6 text-center text-muted-foreground text-sm italic py-20">
             Order activity chart or table will be displayed here.
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-sm font-black uppercase tracking-widest italic">Top Products</h3>
          </div>
          <div className="p-6 flex flex-col gap-4">
             {[1, 2, 3, 4].map(i => (
               <div key={i} className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-muted rounded-lg" />
                  <div className="flex flex-col flex-1">
                     <span className="text-xs font-bold line-clamp-1">Vitamin C Serum {i}</span>
                     <span className="text-[10px] text-muted-foreground">₹599 | 120 Sales</span>
                  </div>
                  <span className="text-xs font-black italic">₹71,880</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  )
}
