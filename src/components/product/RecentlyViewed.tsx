"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Star } from "lucide-react";
import WishlistToggle from "./WishlistToggle";

type ProductImage = {
  url: string;
};

type Category = {
  name: string;
  slug: string;
};

type RecentlyViewedProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  dynamicPrice?: number;
  comparePrice?: number;
  purity?: string;
  type: string;
  images: ProductImage[];
  category?: Category;
};

type Props = {
  currentSlug: string;
};

export default function RecentlyViewed({ currentSlug }: Props) {
  const [products, setProducts] = useState<RecentlyViewedProduct[]>([]);
  const [isHistory, setIsHistory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    async function fetchProducts() {
      try {
        setLoading(true);
        const stored = localStorage.getItem("recentlyViewed");
        let slugList: string[] = [];

        if (stored) {
          try {
            slugList = JSON.parse(stored);
          } catch (e) {
            console.error("Failed to parse recentlyViewed localStorage", e);
          }
        }

        if (!Array.isArray(slugList)) {
          slugList = [];
        }

        // Exclude the current page's slug from history list
        slugList = slugList.filter((slug) => slug !== currentSlug);

        if (slugList.length > 0) {
          setIsHistory(true);
          const slugsParam = slugList.join(",");
          const res = await fetch(`/api/products?slugs=${encodeURIComponent(slugsParam)}`);
          if (res.ok) {
            const data = await res.json();
            
            // Re-order the fetched products to match the exact order of the slugs list (most recently viewed first)
            const slugToProductMap = new Map<string, RecentlyViewedProduct>();
            data.forEach((p: RecentlyViewedProduct) => slugToProductMap.set(p.slug, p));
            
            const sortedData = slugList
              .map((slug) => slugToProductMap.get(slug))
              .filter((p): p is RecentlyViewedProduct => !!p);

            setProducts(sortedData);
          }
        } else {
          // Fallback: Fetch featured / active items for "Trending Masterpieces" row if user history is empty
          setIsHistory(false);
          const res = await fetch(`/api/products?limit=8`);
          if (res.ok) {
            const data = await res.json();
            // Filter out current active product from trending suggestions too
            const filteredData = data.filter((p: RecentlyViewedProduct) => p.slug !== currentSlug);
            setProducts(filteredData.slice(0, 4));
          }
        }
      } catch (error) {
        console.error("Failed to fetch recently viewed products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [mounted, currentSlug]);

  if (!mounted || (products.length === 0 && !loading)) {
    return null;
  }

  if (loading) {
    return (
      <div className="mt-24 border-t border-gray-100 pt-16 animate-pulse">
        <div className="h-6 bg-gray-100 rounded w-1/4 mb-4" />
        <div className="h-10 bg-gray-100 rounded w-1/3 mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4 bg-white p-4 border border-gray-50 rounded-2xl">
              <div className="bg-gray-100 rounded-2xl aspect-[4/5] w-full" />
              <div className="h-4 bg-gray-100 rounded w-1/3" />
              <div className="h-6 bg-gray-100 rounded w-3/4" />
              <div className="h-5 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-24 border-t border-gray-100 pt-16">
      <div className="flex justify-between items-end mb-12">
        <div className="group">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-1">
            {isHistory ? "Your History" : "Popular Right Now"}
          </span>
          <h2 className="text-3xl font-bold text-secondary uppercase tracking-tight">
            {isHistory ? "Recently Viewed" : "Trending Masterpieces"}
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full group-hover:w-40 transition-all duration-500 mt-2" />
        </div>
      </div>

      <div className="relative w-full">
        {/* Horizontal scroll grid matching ShopByGrid layout */}
        <div className="flex overflow-x-auto pb-6 gap-6 md:gap-8 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {products.map((product) => {
            const finalPrice = product.dynamicPrice || product.price || 0;
            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 w-[240px] md:w-[280px] flex-shrink-0 snap-start"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 w-full">
                  {product.images?.[0]?.url ? (
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      fill
                      sizes="280px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200">
                      <ShoppingBag size={48} />
                    </div>
                  )}
                  
                  {/* Wishlist toggle */}
                  <div className="absolute top-4 right-4 z-10" onClick={(e) => e.stopPropagation()}>
                    <WishlistToggle 
                      product={{
                        id: product.id,
                        productId: product.id,
                        name: product.name,
                        price: finalPrice,
                        image: product.images?.[0]?.url || ""
                      }} 
                    />
                  </div>

                  {/* Purity & Metal badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-secondary text-[10px] uppercase font-bold px-2 py-1 rounded-sm shadow-sm border border-gray-100">
                      {product.purity ? `${product.purity} ` : ""}{product.type}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                        {product.category?.name || "Jewelry"}
                      </span>
                      <div className="flex items-center gap-1 text-primary">
                        <Star size={12} fill="currentColor" />
                        <span className="text-xs font-bold">4.8</span>
                      </div>
                    </div>
                    
                    <h3 className="text-base font-bold text-secondary mb-2 line-clamp-1 group-hover:text-primary transition-colors uppercase tracking-tight">
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <p className="text-lg font-bold text-secondary">
                      ₹{finalPrice.toLocaleString()}
                    </p>
                    {product.comparePrice && (
                      <p className="text-sm text-gray-400 line-through">
                        ₹{product.comparePrice.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
