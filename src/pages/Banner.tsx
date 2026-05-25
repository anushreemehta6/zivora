"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

type Banner = {
  id: string;
  title: string;
  subtitle?: string;
  desktopImage: string;
  mobileImage?: string;
  destinationUrl?: string;
  isActive: boolean;
  priority: number;
};

export default function Banner() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchBanners() {
      try {
        const res = await fetch("/api/banners", {
          cache: "no-store",
        });

        if (!res.ok) return;

        const data = await res.json();

        if (mounted) {
          setBanners(
            Array.isArray(data)
              ? data
              : data.banners || []
          );
        }
      } catch (error) {
        console.error(
          "Failed to fetch banners:",
          error
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchBanners();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading || banners.length === 0) {
    return null;
  }

  return (
    <section className="w-full px-4 md:px-8 py-6 md:py-10">
      <div className="space-y-8">
        {banners.map((banner, index) => (
          <motion.div
            key={banner.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
            }}
            className="group relative overflow-hidden rounded-[2.5rem] border border-[#D0D2D6]/20 bg-[#1F2933]"
          >
            <Link
              href={
                banner.destinationUrl ||
                "/products"
              }
              className="block relative"
            >
              {/* Desktop */}
              <div className="hidden md:block relative aspect-[12/5] w-full">
                <Image
                  src={banner.desktopImage}
                  alt={banner.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-95"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#1F2933]/90 via-[#1F2933]/60 to-transparent" />

                {/* <div className="absolute inset-0 flex items-center">
                  <div className="max-w-2xl px-12 lg:px-20">
                    <span className="inline-block mb-4 text-xs font-bold tracking-[0.35em] uppercase text-[#D0D2D6]">
                      Exclusive Campaign
                    </span>

                    <h2 className="text-4xl lg:text-6xl font-light text-white leading-tight tracking-tight mb-5">
                      {banner.title}
                    </h2>

                    {banner.subtitle && (
                      <p className="text-[#D0D2D6] text-sm md:text-base leading-relaxed max-w-lg mb-8">
                        {banner.subtitle}
                      </p>
                    )}

                    <div className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#506181] text-white text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 group-hover:bg-[#3F3322]">
                      Explore Collection
                    </div>
                  </div>
                </div> */}
              </div>

              {/* Mobile */}
              <div className="md:hidden relative aspect-[2/3] w-full">
                <Image
                  src={
                    banner.mobileImage ||
                    banner.desktopImage
                  }
                  alt={banner.title}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2933]/95 via-[#1F2933]/50 to-transparent" />

                {/* <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block mb-3 text-[10px] font-bold tracking-[0.3em] uppercase text-[#D0D2D6]">
                    Exclusive Campaign
                  </span>

                  <h2 className="text-3xl font-light text-white leading-tight mb-3">
                    {banner.title}
                  </h2>

                  {banner.subtitle && (
                    <p className="text-sm text-[#D0D2D6] leading-relaxed mb-5">
                      {banner.subtitle}
                    </p>
                  )}

                  <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#506181] text-white text-[11px] font-bold uppercase tracking-[0.2em]">
                    Explore
                  </div>
                </div> */}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}