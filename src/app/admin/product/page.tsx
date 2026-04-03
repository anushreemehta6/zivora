"use client"

import { useEffect, useState } from "react"
import { 
  PackagePlus, 
  Info, 
  ArrowRight, 
  Image as ImageIcon, 
  Upload,
  Coins,
  ChevronRight,
  Sparkles,
  Search
} from "lucide-react"
import Button from "@/components/ui/Button"

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: "",
    metal: "silver",
    purity: "",
    weight: "",
    makingCharge: "",
    stonePrice: "",
    description: "",
    type: "",
    categoryId: "",
    image: ""
  })

  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/admin/category")
        const data = await res.json()
        setCategories(data)
      } catch (e) {
        console.error("Failed to fetch categories", e)
      }
    }
    fetchCategories()
  }, [])

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)

    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "my_unsigned_preset")

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data
        }
      )
      const result = await res.json()
      setForm((prev) => ({
        ...prev,
        image: result.secure_url
      }))
    } catch (e) {
      console.error("Image upload failed", e)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          weight: Number(form.weight),
          makingCharge: Number(form.makingCharge),
          stonePrice: Number(form.stonePrice || 0),
          type: (form.type || "SILVER").toUpperCase()
        })
      })

      if (res.ok) {
        alert("Product created ✅")
        setForm({
          name: "",
          metal: "silver",
          purity: "",
          weight: "",
          makingCharge: "",
          stonePrice: "",
          description: "",
          type: "",
          categoryId: "",
          image: ""
        })
      } else {
        const data = await res.json()
        alert(data.error)
      }
    } catch (err) {
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-secondary mb-2 ">Add New Inventory</h1>
          <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 font-mono tracking-widest uppercase">
            <span>Admin</span>
            <ChevronRight size={12} />
            <span>Products</span>
            <ChevronRight size={12} />
            <span className="text-primary ">Addition</span>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="soft" className="bg-white border-gray-100 py-3 text-[10px] font-bold uppercase tracking-widest">
            Discard Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Form Area */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section 1: Basic Information */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                <Sparkles size={24} />
              </div>
              <h2 className="text-xl font-bold ">General Information</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Product Title</label>
                <input
                  name="name"
                  placeholder="e.g. Vintage Silver Royal Ring"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Detailed Description</label>
                <textarea
                  name="description"
                  placeholder="Tell the story of this piece..."
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Collection Category</label>
                  <select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Material Type</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                    required
                  >
                    <option value="">Specific material</option>
                    <option value="GOLD">Gold</option>
                    <option value="SILVER">Silver</option>
                    <option value="DIAMOND">Diamond</option>
                    <option value="PLATINUM">Platinum</option>
                    <option value="GEMSTONE">Gemstone</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Technical Specs */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                <Coins size={24} />
              </div>
              <h2 className="text-xl font-bold ">Hardware & Metal Specs</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Purity (925)</label>
                <input
                  name="purity"
                  placeholder="925"
                  value={form.purity}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Weight (g)</label>
                <input
                  type="number"
                  name="weight"
                  placeholder="0.00"
                  value={form.weight}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Making Charge</label>
                <input
                  type="number"
                  name="makingCharge"
                  placeholder="₹/g"
                  value={form.makingCharge}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Stone Price</label>
                <input
                  type="number"
                  name="stonePrice"
                  placeholder="Optional"
                  value={form.stonePrice}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info & Image */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-secondary rounded-[2.5rem] p-10 text-white min-h-[400px] flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-bold  mb-6 text-primary">Jewelry Visuals</h3>
            
            <div className="relative w-full aspect-square bg-white/5 rounded-3xl border border-dashed border-white/20 flex flex-col items-center justify-center overflow-hidden transition-all hover:bg-white/10 group">
              {form.image ? (
                <>
                  <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <label className="cursor-pointer p-4 rounded-full bg-white text-secondary transition-transform hover:scale-110">
                      <Upload size={20} />
                      <input type="file" hidden onChange={handleImageUpload} />
                    </label>
                  </div>
                </>
              ) : (
                <label className="w-full h-full cursor-pointer flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/10">
                    <Upload size={32} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold">Select high-res image</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">SVG, PNG, JPG (Max 5MB)</p>
                  </div>
                  <input type="file" hidden onChange={handleImageUpload} />
                </label>
              )}
              {uploading && <div className="absolute inset-0 bg-secondary/80 backdrop-blur-sm flex items-center justify-center text-primary font-bold">Uploading...</div>}
            </div>

            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-8 flex items-center gap-2">
              <Info size={12} /> 
              Recommended: 1080x1350px
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-sm space-y-6">
            <h3 className="text-secondary font-bold  flex items-center gap-2">
              <Sparkles size={18} className="text-primary" />
              Quick Check
            </h3>
            <p className="text-xs text-gray-400 font-medium leading-relaxed">
              Before finishing, ensure that the product purity matches the metal type. Dynamic pricing will be calculated based on the weight and current metal rates.
            </p>
            <Button 
              onClick={handleSubmit} 
              disabled={loading || uploading} 
              variant="gold" 
              className="w-full py-5 text-sm font-bold uppercase tracking-widest group shadow-2xl shadow-primary/20"
            >
              {loading ? "Registering..." : "Finalize & Publish"}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
