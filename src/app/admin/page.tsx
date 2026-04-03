"use client";

import { useEffect, useState } from "react";
import { 
  ShoppingBag, 
  Users, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  Clock, 
  ChevronRight,
  Package,
  Calendar,
  Sparkles,
  Zap,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface Stats {
  sales: number;
  orders: number;
  users: number;
  products: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/analytics");
        const data = await res.json();
        setStats(data.stats);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statsCards = [
    { label: "Total Revenue", value: `₹${stats?.sales.toLocaleString() || "0"}`, icon: DollarSign, trend: "+12.5%", color: "text-green-500", bg: "bg-green-50" },
    { label: "Total Orders", value: stats?.orders.toLocaleString() || "0", icon: ShoppingBag, trend: "+8.4%", color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Total Customers", value: stats?.users.toLocaleString() || "0", icon: Users, trend: "+5.1%", color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Inventory Size", value: stats?.products.toLocaleString() || "0", icon: Package, trend: "Syncing", color: "text-orange-500", bg: "bg-orange-50" },
  ];

  if (loading) {
    return <div className="h-96 flex items-center justify-center font-bold text-primary  animate-pulse">Syncing Dashboard Data...</div>;
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-secondary mb-2 ">Intelligence Overviews</h1>
          <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 font-mono tracking-widest uppercase">
            <span>Admin Control</span>
            <ChevronRight size={12} />
            <span className="text-primary  underline underline-offset-4 decoration-primary/30">Dashboard</span>
          </nav>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-r border-gray-100 flex items-center gap-2">
            <Calendar size={14} /> Today, {new Date().toLocaleDateString()}
          </div>
          <Button variant="gold" className="py-2.5 text-[10px] px-6 font-bold uppercase tracking-widest">
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, i) => (
          <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3.5 rounded-2xl transition-colors duration-500 ${stat.bg} ${stat.color} group-hover:bg-secondary group-hover:text-primary`}>
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${stat.trend.startsWith('+') ? "text-green-500" : "text-gray-400"}`}>
                {stat.trend.startsWith('+') ? <ArrowUpRight size={12} /> : <Zap size={12} className="text-primary" />}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-secondary">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 text-secondary">
        {/* Recent Activity Placeholder */}
        <div className="xl:col-span-2 bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold ">Recent Activity</h3>
            <button className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">View All</button>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <Package size={20} />
                </div>
                <div className="flex-grow">
                  <p className="font-bold text-sm">New order received from Mumbai</p>
                  <p className="text-xs text-gray-400">Order #AN-88{item}92 • 2 mins ago</p>
                </div>
                <p className="font-bold">₹12,500</p>
                <ArrowUpRight size={16} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-secondary rounded-[2rem] p-8 text-white flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold  mb-2 text-primary">Admin Quick Access</h3>
            <p className="text-sm text-gray-400 mb-8">Manage your store efficiently with these quick shortcuts.</p>
            
            <div className="space-y-3">
              <button className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-xl text-left px-5 text-sm font-bold transition-all flex items-center justify-between group">
                Add New Product
                <ArrowUpRight size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-all" />
              </button>
              <button className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-xl text-left px-5 text-sm font-bold transition-all flex items-center justify-between group">
                Update Silver Rate
                <ArrowUpRight size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-all" />
              </button>
              <button className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-xl text-left px-5 text-sm font-bold transition-all flex items-center justify-between group">
                Generate Sales Report
                <ArrowUpRight size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-all" />
              </button>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/5">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center">Version 2.4.1 • Zivora Admin</p>
          </div>
        </div>
      </div>
    </div>
  )
}
