"use client";

import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, Users, ShoppingBag, DollarSign, Package, ChevronRight, ArrowUpRight, ArrowDownRight, Info } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface AnalyticsData {
  stats: {
    orders: number;
    sales: number;
    users: number;
    products: number;
  };
  chartData: { name: string; value: number }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/admin/analytics");
      const result = await res.json();
      setData(result);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return <div className="h-96 flex items-center justify-center font-bold text-primary  animate-pulse">Analyzing Store Data...</div>;
  }

  const kpiCards = [
    { label: "Total Revenue", value: `₹${data.stats.sales.toLocaleString()}`, icon: DollarSign, trend: "+12.5%", color: "text-green-500" },
    { label: "Total Orders", value: data.stats.orders.toLocaleString(), icon: ShoppingBag, trend: "+8.2%", color: "text-blue-500" },
    { label: "New Customers", value: data.stats.users.toLocaleString(), icon: Users, trend: "+5.1%", color: "text-purple-500" },
    { label: "Active Inventory", value: data.stats.products.toLocaleString(), icon: Package, trend: "Stable", color: "text-orange-500" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-secondary mb-2 ">Performance Insights</h1>
          <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 font-mono tracking-widest uppercase">
            <span>Admin</span>
            <ChevronRight size={12} />
            <span>Intelligence</span>
            <ChevronRight size={12} />
            <span className="text-primary ">Analytics</span>
          </nav>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, i) => (
          <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-gray-50 ${card.color}`}>
                <card.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest ${card.trend.startsWith('+') ? "text-green-500" : "text-gray-400"}`}>
                {card.trend.startsWith('+') ? <ArrowUpRight size={12} /> : null}
                {card.trend}
              </div>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">{card.label}</p>
            <h3 className="text-2xl font-bold text-secondary  tracking-tighter">{card.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sales Chart */}
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                <BarChart3 size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold ">Sales Trajectory</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Revenue over last 6 months</p>
              </div>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#56678a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#56678a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#1F2933' }}
                />
                <Area type="monotone" dataKey="value" stroke="#56678a" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-secondary rounded-[2.5rem] p-10 text-white flex flex-col justify-between min-h-[300px]">
            <div>
              <TrendingUp size={32} className="text-primary mb-6" />
              <h3 className="text-lg font-bold  mb-4">Growth Objective</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Your store is currently seeing a <span className="text-white font-bold ">8.2% increase</span> in order volume compared to the previous quarter.
              </p>
            </div>
            <div className="space-y-4 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                <span>Target Reach</span>
                <span className="text-white">82%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[82%] bg-primary shadow-[0_0_15px_rgba(255,215,0,0.4)] transition-all duration-1000" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
              <Info size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-secondary  mb-1">Update Schedule</h4>
              <p className="text-[10px] text-gray-400 font-bold leading-relaxed">Intelligence data is refreshed every 15 minutes to ensure real-time accuracy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
