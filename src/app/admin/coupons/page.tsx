"use client";

import { useEffect, useState } from "react";
import { Ticket, Plus, Trash2, Calendar, Percent, IndianRupee, Info, Sparkles, ChevronRight, CheckCircle2, XCircle } from "lucide-react";
import Button from "@/components/ui/Button";

interface Coupon {
  id: string;
  code: string;
  discount: number;
  discountType: string;
  isActive: boolean;
  expiryDate?: string;
  minAmount?: number;
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({
    code: "",
    discount: "",
    discountType: "percentage",
    isActive: true,
    expiryDate: "",
    minAmount: ""
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await fetch("/api/admin/coupons");
      const data = await res.json();
      setCoupons(data);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      await fetch("/api/admin/coupons", {
        method: "POST",
        body: JSON.stringify(form)
      });
      setForm({ code: "", discount: "", discountType: "percentage", isActive: true, expiryDate: "", minAmount: "" });
      fetchCoupons();
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-secondary mb-2 ">Discount Strategies</h1>
          <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 font-mono tracking-widest uppercase">
            <span>Admin</span>
            <ChevronRight size={12} />
            <span>Storefront</span>
            <ChevronRight size={12} />
            <span className="text-primary ">Coupons</span>
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Create Coupon */}
        <div className="lg:col-span-5 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 h-fit">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
              <Ticket size={24} />
            </div>
            <h2 className="text-xl font-bold ">New Coupon</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Discount Code</label>
              <input
                value={form.code}
                onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })}
                placeholder="PROMO20"
                className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Value</label>
                <input
                  type="number"
                  value={form.discount}
                  onChange={e => setForm({ ...form, discount: e.target.value })}
                  placeholder="20"
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Type</label>
                <select
                  value={form.discountType}
                  onChange={e => setForm({ ...form, discountType: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none appearance-none"
                >
                  <option value="percentage">% Percentage</option>
                  <option value="flat">₹ Flat ₹</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Min. Amount</label>
                <input
                  type="number"
                  value={form.minAmount}
                  onChange={e => setForm({ ...form, minAmount: e.target.value })}
                  placeholder="500"
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Expiry Date</label>
                <input
                  type="date"
                  value={form.expiryDate}
                  onChange={e => setForm({ ...form, expiryDate: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                />
              </div>
            </div>

            <Button variant="gold" type="submit" disabled={adding} className="w-full py-5 text-sm font-bold uppercase tracking-widest">
              {adding ? "Deploying..." : "Activate Strategy"}
            </Button>
          </form>
        </div>

        {/* Coupon Grid */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-secondary rounded-[2.5rem] p-10 text-white flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-bold  text-primary">Active Incentives</h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Live conversion drivers</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 text-xs font-bold text-primary ">
              <Sparkles size={14} /> Total: {coupons.length}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coupons.length === 0 && !loading && (
              <div className="col-span-2 bg-white rounded-[2rem] border border-dashed border-gray-200 p-12 text-center text-gray-400 ">
                No active coupons found. Create your first discount code.
              </div>
            )}
            {coupons.map((coupon) => (
              <div key={coupon.id} className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Ticket size={48} className="transform rotate-12" />
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h4 className="text-xl font-bold text-secondary font-mono tracking-tighter">{coupon.code}</h4>
                    {coupon.isActive ? <CheckCircle2 size={16} className="text-green-500" /> : <XCircle size={16} className="text-red-400" />}
                  </div>
                  <button className="p-2 text-gray-300 hover:text-red-400 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-bold text-primary ">
                      {coupon.discountType === "percentage" ? `${coupon.discount}%` : `₹${coupon.discount.toLocaleString()}`}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5 underline decoration-primary underline-offset-4">OFF</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <IndianRupee size={10} /> Min. Spend
                      </p>
                      <p className="text-xs font-bold text-secondary ">₹{(coupon.minAmount || 0).toLocaleString()}+</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <Calendar size={10} /> Valid Until
                      </p>
                      <p className="text-xs font-bold text-secondary ">{coupon.expiryDate ? new Date(coupon.expiryDate).toLocaleDateString() : "Lifetime"}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
