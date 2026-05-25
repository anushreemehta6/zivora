"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Link as LinkIcon,
  Upload,
  ChevronRight,
  CalendarDays,
  ArrowUpDown,
} from "lucide-react";

import Button from "@/components/ui/Button";

interface Banner {
  id: string;

  title: string;

  subtitle?: string;

  desktopImage: string;

  mobileImage?: string;

  buttonText?: string;

  destinationUrl: string;

  isActive: boolean;

  priority: number;

  startDate?: string;

  endDate?: string;

  createdAt?: string;
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);

  const [loading, setLoading] = useState(true);

  const [adding, setAdding] = useState(false);

  const [uploadingDesktop, setUploadingDesktop] = useState(false);

  const [uploadingMobile, setUploadingMobile] = useState(false);

  const [form, setForm] = useState({
    title: "",

    subtitle: "",

    desktopImage: "",

    mobileImage: "",

    buttonText: "Shop Now",

    destinationUrl: "",

    isActive: true,

    priority: 0,

    startDate: "",

    endDate: "",
  });

  //////////////////////////////////////////////////////
  // FETCH BANNERS
  //////////////////////////////////////////////////////

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await fetch("/api/admin/banners");

      const data = await res.json();

      setBanners(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch banners:", error);
    } finally {
      setLoading(false);
    }
  };

  //////////////////////////////////////////////////////
  // IMAGE UPLOAD
  //////////////////////////////////////////////////////

  const uploadImage = async (
    file: File,
    type: "desktop" | "mobile"
  ) => {
    if (!file) return;

    if (type === "desktop") {
      setUploadingDesktop(true);
    } else {
      setUploadingMobile(true);
    }

    try {
      const data = new FormData();

      data.append("file", file);

      data.append(
        "upload_preset",
        "my_unsigned_preset"
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (type === "desktop") {
        setForm((prev) => ({
          ...prev,
          desktopImage: result.secure_url,
        }));
      } else {
        setForm((prev) => ({
          ...prev,
          mobileImage: result.secure_url,
        }));
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploadingDesktop(false);
      setUploadingMobile(false);
    }
  };

  //////////////////////////////////////////////////////
  // SUBMIT
  //////////////////////////////////////////////////////

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setAdding(true);

      const res = await fetch(
        "/api/admin/banners",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            ...form,

            priority: Number(form.priority),

            startDate: form.startDate
              ? new Date(form.startDate)
              : null,

            endDate: form.endDate
              ? new Date(form.endDate)
              : null,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to create banner"
        );
      }

      setForm({
        title: "",

        subtitle: "",

        desktopImage: "",

        mobileImage: "",

        buttonText: "Shop Now",

        destinationUrl: "",

        isActive: true,

        priority: 0,

        startDate: "",

        endDate: "",
      });

      fetchBanners();
    } catch (error) {
      console.error(error);
    } finally {
      setAdding(false);
    }
  };

  //////////////////////////////////////////////////////
  // DELETE
  //////////////////////////////////////////////////////

  const deleteBanner = async (
    id: string
  ) => {
    try {
      await fetch(`/api/admin/banners/${id}`, {
        method: "DELETE",
      });

      fetchBanners();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-secondary mb-2">
            Campaign Banners
          </h1>

          <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 tracking-widest uppercase">
            <span>Admin</span>

            <ChevronRight size={12} />

            <span>Storefront</span>

            <ChevronRight size={12} />

            <span className="text-primary">
              Banners
            </span>
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-5 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 h-fit">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
              <Plus size={24} />
            </div>

            <h2 className="text-xl font-bold">
              New Campaign
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* TITLE */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
                Campaign Title
              </label>

              <input
                required
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                placeholder="Wedding Collection 2026"
                className="w-full px-6 py-4 bg-gray-50 rounded-2xl text-sm font-bold outline-none border border-transparent focus:border-primary/20"
              />
            </div>

            {/* SUBTITLE */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
                Subtitle
              </label>

              <input
                value={form.subtitle}
                onChange={(e) =>
                  setForm({
                    ...form,
                    subtitle: e.target.value,
                  })
                }
                placeholder="Flat 20% OFF on Diamond Jewelry"
                className="w-full px-6 py-4 bg-gray-50 rounded-2xl text-sm font-bold outline-none border border-transparent focus:border-primary/20"
              />
            </div>

            {/* BUTTON TEXT */}
            {/* <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
                CTA Button Text
              </label>

              <input
                value={form.buttonText}
                onChange={(e) =>
                  setForm({
                    ...form,
                    buttonText: e.target.value,
                  })
                }
                placeholder="Shop Now"
                className="w-full px-6 py-4 bg-gray-50 rounded-2xl text-sm font-bold outline-none border border-transparent focus:border-primary/20"
              />
            </div> */}

            {/* URL */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
                Destination URL
              </label>

              <input
                value={form.destinationUrl}
                onChange={(e) =>
                  setForm({
                    ...form,
                    destinationUrl:
                      e.target.value,
                  })
                }
                placeholder="/collections/wedding"
                className="w-full px-6 py-4 bg-gray-50 rounded-2xl text-sm font-bold outline-none border border-transparent focus:border-primary/20"
              />
            </div>

            {/* PRIORITY */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
                <ArrowUpDown size={12} />
                Priority
              </label>

              <input
                type="number"
                value={form.priority}
                onChange={(e) =>
                  setForm({
                    ...form,
                    priority:
                      Number(e.target.value),
                  })
                }
                className="w-full px-6 py-4 bg-gray-50 rounded-2xl text-sm font-bold outline-none border border-transparent focus:border-primary/20"
              />
            </div>

            {/* START DATE */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
                <CalendarDays size={12} />
                Start Date
              </label>

              <input
                type="datetime-local"
                value={form.startDate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    startDate:
                      e.target.value,
                  })
                }
                className="w-full px-6 py-4 bg-gray-50 rounded-2xl text-sm font-bold outline-none border border-transparent focus:border-primary/20"
              />
            </div>

            {/* END DATE */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
                <CalendarDays size={12} />
                End Date
              </label>

              <input
                type="datetime-local"
                value={form.endDate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    endDate:
                      e.target.value,
                  })
                }
                className="w-full px-6 py-4 bg-gray-50 rounded-2xl text-sm font-bold outline-none border border-transparent focus:border-primary/20"
              />
            </div>

            {/* DESKTOP IMAGE */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
                Desktop Banner (1920×800)
              </label>

              <div className="relative aspect-video bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden">
                {form.desktopImage ? (
                  <img
                    src={form.desktopImage}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center gap-3 cursor-pointer">
                    <Upload size={28} />

                    <span className="text-xs font-bold text-gray-400">
                      Upload Desktop Banner
                    </span>

                    <input
                      hidden
                      type="file"
                      onChange={(e) => {
                        const file =
                          e.target.files?.[0];

                        if (file) {
                          uploadImage(
                            file,
                            "desktop"
                          );
                        }
                      }}
                    />
                  </label>
                )}

                {uploadingDesktop && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center font-bold text-primary">
                    Uploading...
                  </div>
                )}
              </div>
            </div>

            {/* MOBILE IMAGE */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
                Mobile Banner (800×1200)
              </label>

              <div className="relative aspect-[2/3] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden">
                {form.mobileImage ? (
                  <img
                    src={form.mobileImage}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center gap-3 cursor-pointer">
                    <Upload size={28} />

                    <span className="text-xs font-bold text-gray-400">
                      Upload Mobile Banner
                    </span>

                    <input
                      hidden
                      type="file"
                      onChange={(e) => {
                        const file =
                          e.target.files?.[0];

                        if (file) {
                          uploadImage(
                            file,
                            "mobile"
                          );
                        }
                      }}
                    />
                  </label>
                )}

                {uploadingMobile && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center font-bold text-primary">
                    Uploading...
                  </div>
                )}
              </div>
            </div>

            {/* ACTIVE */}
            <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-5 py-4">
              <div>
                <h4 className="font-bold text-sm text-secondary">
                  Active Campaign
                </h4>

                <p className="text-xs text-gray-400">
                  Show this banner live
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    isActive:
                      !form.isActive,
                  })
                }
                className={`w-14 h-8 rounded-full transition-all relative ${
                  form.isActive
                    ? "bg-primary"
                    : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${
                    form.isActive
                      ? "right-1"
                      : "left-1"
                  }`}
                />
              </button>
            </div>

            <Button
              variant="gold"
              type="submit"
              disabled={
                adding ||
                uploadingDesktop ||
                uploadingMobile
              }
              className="w-full py-5 text-sm font-bold uppercase tracking-widest"
            >
              {adding
                ? "Publishing..."
                : "Launch Campaign"}
            </Button>
          </form>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-7 space-y-5">
          {loading ? (
            <div className="bg-white rounded-[2rem] p-10">
              Loading...
            </div>
          ) : banners.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-12 border border-dashed border-gray-200 text-center text-gray-400">
              No banners found
            </div>
          ) : (
            banners.map((banner) => (
              <div
                key={banner.id}
                className="bg-white rounded-[2.5rem] border border-gray-100 p-8 flex gap-6 shadow-sm"
              >
                <div className="w-40 h-24 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                  <img
                    src={banner.desktopImage}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-secondary text-lg">
                      {banner.title}
                    </h3>

                    {banner.isActive ? (
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    ) : (
                      <EyeOff
                        size={14}
                        className="text-gray-400"
                      />
                    )}
                  </div>

                  <p className="text-sm text-gray-500 mb-3">
                    {banner.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-400 font-bold uppercase tracking-widest">
                    <span>
                      Priority:{" "}
                      {banner.priority}
                    </span>

                    <span className="flex items-center gap-1">
                      <LinkIcon size={12} />
                      {banner.destinationUrl}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    deleteBanner(banner.id)
                  }
                  className="p-3 rounded-2xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors h-fit"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}