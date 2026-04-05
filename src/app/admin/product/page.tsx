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
  Search,
  Trash2
} from "lucide-react"
import Button from "@/components/ui/Button"
import { toast } from "react-hot-toast"

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
    images: [] as string[],
    tags: [] as string[]
  })

  const standardTags = [
    { id: "for-her", name: "Shop for Her" },
    { id: "for-him", name: "Shop for Him" },
    { id: "gift-sets", name: "Gift Sets" },
    { id: "anniversary", name: "Anniversary" },
    { id: "birthday", name: "Birthday" },
    { id: "wedding", name: "Wedding" },
    { id: "trending", name: "Trending" }
  ]

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

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      const uploadedUrls: string[] = []
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData()
        formData.append("file", files[i])
        formData.append("upload_preset", "my_unsigned_preset") // Using the original working preset

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        )
        const data = await res.json()
        
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url)
        } else {
          console.error("Cloudinary error:", data)
          toast.error(`Upload failed: ${data.error?.message || "Unknown error"}`)
        }
      }
      
      if (uploadedUrls.length > 0) {
        setForm(prev => ({
          ...prev,
          images: [...prev.images, ...uploadedUrls]
        }))
        toast.success(`${uploadedUrls.length} image(s) processed`)
      }
    } catch (error: any) {
      console.error("Upload error:", error)
      toast.error("Upload failed. Check your connection or Cloudinary cloud name.")
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    setForm({
      ...form,
      images: form.images.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (uploading) {
      toast.error("Please wait for all images to finish uploading.")
      return
    }
    const loadingToast = toast.loading("Registering product...")

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
        toast.success("Product published successfully! ✅", { id: loadingToast })
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
          images: [],
          tags: []
        })
      } else {
        const data = await res.json()
        toast.error(data.error || "Failed to publish product", { id: loadingToast })
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.", { id: loadingToast })
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
                  </select>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
                  <PackagePlus size={12} className="text-primary" />
                  Product Tags & Collections
                </label>
                <div className="flex flex-wrap gap-2">
                  {standardTags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => {
                        const newTags = form.tags.includes(tag.id)
                          ? form.tags.filter(t => t !== tag.id)
                          : [...form.tags, tag.id];
                        setForm({ ...form, tags: newTags });
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                        form.tags.includes(tag.id)
                          ? "bg-secondary text-primary border-secondary shadow-lg shadow-secondary/20"
                          : "bg-gray-50 text-gray-400 border-transparent hover:border-primary/20"
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 font-medium italic">Select one or more tags to categorize this product into special store collections.</p>
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
          <div className="bg-secondary rounded-[2.5rem] p-8 text-white min-h-[400px] flex flex-col items-center justify-start text-center">
            <h3 className="text-xl font-bold mb-6 text-primary">Jewelry Visuals</h3>
            
            <div className="w-full space-y-4">
              {/* Main Upload Area */}
              <label className="w-full py-10 cursor-pointer flex flex-col items-center justify-center gap-4 bg-white/5 rounded-3xl border border-dashed border-white/20 hover:bg-white/10 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/10">
                  <Upload size={28} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold">Add product photos</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Multiple selection enabled</p>
                </div>
                <input type="file" hidden multiple onChange={uploadImage} />
              </label>

              {/* Preview Grid */}
              {form.images.length > 0 && (
                <div className="grid grid-cols-2 gap-3 w-full">
                  {form.images.map((url, idx) => (
                    <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group border border-white/10">
                      <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                      <button 
                        onClick={() => removeImage(idx)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <Trash2 size={14} />
                      </button>
                      {idx === 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-primary/90 text-secondary text-[8px] font-black uppercase py-1 tracking-tighter">
                          Primary Shield
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {uploading && (
                <div className="w-full py-4 bg-white/5 rounded-2xl flex items-center justify-center gap-3 animate-pulse">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">Processing Uploads...</span>
                </div>
              )}
            </div>

            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-auto pt-8 flex items-center gap-2">
              <Info size={12} /> 
              Recommended: 1080x1350px (Portrait)
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
              onClick={(e) => handleSubmit(e)} 
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
