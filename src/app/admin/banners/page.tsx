"use client";

import { useEffect, useState } from "react";
import { Image as ImageIcon, Plus, Trash2, Eye, EyeOff, Link as LinkIcon, Upload, Sparkles, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

interface Banner {
  id: string;
  title: string;
  image: string;
  link?: string;
  isActive: boolean;
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: "", image: "", link: "", isActive: true });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await fetch("/api/admin/banners");
      const data = await res.json();
      setBanners(data);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "my_unsigned_preset");
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: data
      });
      const result = await res.json();
      setForm(prev => ({ ...prev, image: result.secure_url }));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      await fetch("/api/admin/banners", {
        method: "POST",
        body: JSON.stringify(form)
      });
      setForm({ title: "", image: "", link: "", isActive: true });
      fetchBanners();
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-secondary mb-2 ">Visual Campaigns</h1>
          <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 font-mono tracking-widest uppercase">
            <span>Admin</span>
            <ChevronRight size={12} />
            <span>Storefront</span>
            <ChevronRight size={12} />
            <span className="text-primary ">Banners</span>
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Create Banner */}
        <div className="lg:col-span-5 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 h-fit">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
              <Plus size={24} />
            </div>
            <h2 className="text-xl font-bold ">New Banner</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Campaign Title</label>
              <input
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="Summer Sale 2024"
                className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Destination URL</label>
              <input
                value={form.link}
                onChange={e => setForm({ ...form, link: e.target.value })}
                placeholder="/products?sale=summer"
                className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Banner Asset</label>
              <div className="relative aspect-video bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden group hover:border-primary/30 transition-all">
                {form.image ? (
                  <>
                    <img src={form.image} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <label className="cursor-pointer p-3 rounded-full bg-white text-secondary scale-90 group-hover:scale-100 transition-transform">
                        <Upload size={18} />
                        <input type="file" hidden onChange={handleImageUpload} />
                      </label>
                    </div>
                  </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center gap-3">
                    <div className="p-3 rounded-xl bg-white shadow-sm text-primary">
                      <Upload size={24} />
                    </div>
                    <span className="text-xs font-bold text-gray-400">Add 1920x800px Image</span>
                    <input type="file" hidden onChange={handleImageUpload} />
                  </label>
                )}
                {uploading && <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center font-bold text-primary ">Uploading...</div>}
              </div>
            </div>

            <Button variant="gold" type="submit" disabled={adding || uploading} className="w-full py-5 text-sm font-bold uppercase tracking-widest">
              {adding ? "Publishing..." : "Launch Campaign"}
            </Button>
          </form>
        </div>

        {/* Banners List */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-secondary rounded-[2.5rem] p-10 text-white flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-bold  text-primary">Live Banners</h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Currently active on storefront</p>
            </div>
            <div className="flex -space-x-4">
              {banners.slice(0, 3).map((b, i) => (
                <div key={b.id} className="w-12 h-12 rounded-full border-4 border-secondary overflow-hidden bg-gray-700 relative group">
                  <img src={b.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {banners.length === 0 && !loading && (
              <div className="bg-white rounded-[2rem] border border-dashed border-gray-200 p-12 text-center text-gray-400 ">
                No active campaigns found. Add your first banner to get started.
              </div>
            )}
            {banners.map((banner) => (
              <div key={banner.id} className="bg-white rounded-[2.5rem] border border-gray-100 p-8 flex items-center gap-8 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-32 h-20 rounded-xl bg-gray-50 overflow-hidden relative flex-shrink-0">
                  <img src={banner.image} className="w-full h-full object-cover" />
                  {!banner.isActive && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <EyeOff size={16} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-secondary ">{banner.title}</h4>
                    {banner.isActive ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    ) : (
                      <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Inactive</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-400 font-mono tracking-widest uppercase">
                    <span className="flex items-center gap-1.5"><LinkIcon size={12} /> {banner.link || "No Redirect"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:text-secondary transition-colors"><Eye size={18} /></button>
                  <button className="p-3 rounded-2xl bg-gray-50 text-red-400 hover:bg-red-50 transition-colors"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
