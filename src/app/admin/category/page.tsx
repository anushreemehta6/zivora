"use client"

import { useState } from "react"
import { Tag, ArrowRight, Upload, Info, Sparkles, ChevronRight } from "lucide-react"
import Button from "@/components/ui/Button"
import { useForm } from "react-hook-form"

export default function Page() {
  const { register, handleSubmit, reset } = useForm()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "my_unsigned_preset")

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      )
      const data = await res.json()
      return data.secure_url
    } catch (e) {
      console.error("Upload failed", e)
      return ""
    }
  }

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      let imageUrl = ""
      if (file) {
        imageUrl = await uploadToCloudinary(file)
      }

      const res = await fetch("/api/admin/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          image: imageUrl,
        }),
      })

      if (res.ok) {
        alert("Category added ✅")
        reset()
        setFile(null)
      }
    } catch (e) {
      alert("Failed to add category")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-secondary mb-2 ">Product Taxonomy</h1>
          <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 font-mono tracking-widest uppercase">
            <span>Admin</span>
            <ChevronRight size={12} />
            <span>Categories</span>
            <ChevronRight size={12} />
            <span className="text-primary ">Addition</span>
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Card */}
        <div className="lg:col-span-12 xl:col-span-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
              <Tag size={24} />
            </div>
            <h2 className="text-xl font-bold ">Create New Category</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Display Name</label>
                <input
                  {...register("name")}
                  placeholder="e.g. Wedding Rings"
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">URL Slug</label>
                <input
                  {...register("slug")}
                  placeholder="e.g. wedding-rings"
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Description</label>
              <textarea
                {...register("description")}
                placeholder="Briefly describe the essence of this collection..."
                rows={4}
                className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none resize-none"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Representational Image</label>
              <div className="flex items-center gap-6">
                <label className="px-8 py-4 bg-secondary text-white rounded-2xl text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-secondary/90 transition-all flex items-center gap-3 active:scale-95 shadow-xl shadow-secondary/20">
                  <Upload size={16} className="text-primary" />
                  {file ? "Change Image" : "Choose Artwork"}
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </label>
                {file && (
                  <div className="flex items-center gap-3 text-xs font-bold text-primary font-mono bg-primary/5 px-4 py-2 rounded-lg border border-primary/10  animate-in slide-in-from-left">
                    <Sparkles size={14} />
                    {file.name}
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              variant="gold"
              disabled={loading}
              className="w-full py-5 text-sm font-bold uppercase tracking-widest group shadow-2xl shadow-primary/20"
            >
              {loading ? "Processing..." : "Register Category"}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </div>

        {/* Info Card */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-8">
          <div className="bg-secondary rounded-[2.5rem] p-10 text-white">
            <Info size={24} className="text-primary mb-6" />
            <h3 className="text-lg font-bold  mb-4">Structure Guide</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              Categories are the primary way users discover your collections. Use meaningful names and SEO-friendly slugs.
            </p>
            <div className="space-y-4 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                <span>Active Products</span>
                <span className="text-white">Live Sync</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-primary shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
