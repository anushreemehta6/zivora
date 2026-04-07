"use client";

import React from "react";
import Link from "next/link";
import { IndianRupee, Sparkles, ChevronRight } from "lucide-react";

const priceRanges = [
  { name: "Under ₹1,999", slug: "under-1999", priceMax: 1999, color: "bg-secondary text-white" },
  { name: "₹2,000 - ₹4,999", slug: "2000-4999", priceMin: 2000, priceMax: 4999, color: "bg-secondary text-white" },
  { name: "₹5,000 - ₹9,999", slug: "5000-9999", priceMin: 5000, priceMax: 9999, color: "bg-secondary text-white" },
  { name: "Luxury (₹10,000+)", slug: "luxury", priceMin: 10000, color: "bg-secondary text-white" },
];

export default function ShopByPrice() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 w-full py-12 md:py-12 overflow-hidden relative">
      <div className="flex flex-col items-center mb-12 group">
        <h2 className="text-3xl font-bold text-secondary mb-2 uppercase tracking-tight">Shop by Price</h2>
        <div className="h-1 w-20 bg-primary rounded-full group-hover:w-40 transition-all duration-500" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
        {priceRanges.map((p) => (
          <Link 
            key={p.slug} 
            href={`/products?priceMin=${p.priceMin || ""}&priceMax=${p.priceMax || ""}`}
            className="group p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm ring-1 ring-black/5 hover:shadow-2xl hover:ring-primary/20 transition-all duration-500 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <IndianRupee size={48} className="transform rotate-12" />
            </div>
            <div className={`w-12 h-12 rounded-2xl ${p.color} flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110 group-hover:rotate-6 duration-500`}>
              <IndianRupee size={20} />
            </div>
            <h3 className="text-lg font-bold text-secondary mb-2 uppercase tracking-tight group-hover:text-primary transition-colors">{p.name}</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-6">Discover Pieces</p>
            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
               View All <ChevronRight size={12} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
