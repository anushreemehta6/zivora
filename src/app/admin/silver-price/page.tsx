"use client"

import { useState } from "react"
import { Coins, Info, ArrowRight, ShieldCheck, RefreshCcw } from "lucide-react"
import Button from "@/components/ui/Button"

export default function Page() {
  const [form, setForm] = useState({
    metal: "silver",
    purity: "",
    price: "",
    adminPrice: ""
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/admin/metal-rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          metal: form.metal,
          purity: form.purity,
          price: Number(form.price),
          adminPrice: Number(form.adminPrice)
        })
      })

      const data = await res.json()

      if (res.ok) {
        alert("Rate updated ✅")
        setForm({
          metal: "silver",
          purity: "",
          price: "",
          adminPrice: ""
        })
      } else {
        alert(data.error)
      }

    } catch (err) {
      alert("Something went wrong")
    }

    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-secondary mb-2 ">Metal Rates</h1>
          <p className="text-gray-400 font-medium">Configure live market prices and your internal markup rates.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Card */}
        <div className="lg:col-span-7 bg-white rounded-[2rem] border border-gray-100 shadow-sm p-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
              <Coins size={24} />
            </div>
            <h2 className="text-xl font-bold ">Update Market Rates</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Metal Type</label>
                <select
                  name="metal"
                  value={form.metal}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                >
                  <option value="silver">Silver</option>
                  <option value="gold">Gold</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Purity (e.g. 925)</label>
                <input
                  type="text"
                  name="purity"
                  placeholder="925"
                  value={form.purity}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Market Price (per gram)</label>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Admin Markup Price</label>
                <input
                  type="number"
                  name="adminPrice"
                  placeholder="0.00"
                  value={form.adminPrice}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              variant="gold"
              className="w-full py-5 text-sm font-bold uppercase tracking-widest group shadow-2xl shadow-primary/20"
            >
              {loading ? "Synchronizing..." : "Update Live Rate"}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </div>

        {/* Info Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-secondary rounded-[2rem] p-8 text-white">
            <Info size={24} className="text-primary mb-4" />
            <h3 className="text-lg font-bold  mb-4">Pricing Logic</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              Market price represents the current world silver/gold rates. Admin Price includes your operational overheads and initial markups. 
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                <ShieldCheck className="text-green-400" size={16} />
                <p className="text-[10px] font-bold uppercase tracking-widest">Global Sync Enabled</p>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                <RefreshCcw className="text-primary" size={16} />
                <p className="text-[10px] font-bold uppercase tracking-widest">Auto-calculation Active</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <h3 className="text-secondary font-bold mb-4 ">Quick Tip</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Updates to these rates will immediately affect the dynamic pricing of all products currently listed in the store. Be careful with large price swings.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
