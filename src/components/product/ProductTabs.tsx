"use client";

import React, { useState } from "react";
import Image from "next/image";
import { premiumPackaging } from "@/assets";
import ProductReviews from "./ProductReviews";

export default function ProductTabs({ product }: { product: any }) {
  const [activeTab, setActiveTab] = useState("Specifications");

  const tabs = ["Specifications", "Shipping & Gifting", "Reviews"];

  return (
    <div className="mt-24 border-t border-gray-100 pt-16">
      <div className="flex gap-12 border-b border-gray-100 mb-12 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
              activeTab === tab 
                ? "border-b-2 border-primary text-secondary" 
                : "text-gray-400 hover:text-secondary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="min-h-[400px] animate-in fade-in duration-500">
        {activeTab === "Specifications" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-secondary uppercase tracking-tight">Technical Details</h3>
              <div className="space-y-4">
                {[
                  { label: "Metal", value: product.type },
                  { label: "Purity", value: product.purity },
                  { label: "Product Weight", value: `${product.weight} g` },
                  { label: "Making Charges", value: `₹${product.makingCharges}` },
                  { label: "SKU", value: product.sku },
                ].map((spec) => (
                  <div key={spec.label} className="flex justify-between py-3 border-b border-gray-50">
                    <span className="text-gray-400 font-medium">{spec.label}</span>
                    <span className="text-secondary font-bold group-hover:text-primary transition-colors">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-background-soft p-10 rounded-[3rem] border border-gray-100">
               <h4 className="font-bold text-secondary mb-4 uppercase text-xs tracking-widest text-primary">Artisanal Process</h4>
               <p className="text-gray-600 leading-relaxed text-lg font-medium">
                  Each product is handcrafted by our master artisans, ensuring that every curve and facet reflects our heritage of excellence.
               </p>
            </div>
          </div>
        )}

        {activeTab === "Shipping & Gifting" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="space-y-8 animate-in slide-in-from-left duration-700">
              <h3 className="text-3xl font-bold text-secondary uppercase tracking-tighter leading-none">
                Signature <br /><span className="text-primary uppercase tracking-tight">Packaging</span>
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg font-medium">
                Every Zivora masterpiece arrives in our signature midnight-blue velvet-lined box, designed to keep your jewelry safe and make every unboxing a moment to remember. 
              </p>
              <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl group ring-1 ring-black/5">
                 <Image 
                   src={premiumPackaging} 
                   alt="Premium Zivora Packaging" 
                   fill 
                   className="object-cover transition-transform duration-700 group-hover:scale-105" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10">
                <h4 className="font-bold text-secondary mb-4 uppercase text-xs tracking-widest">Complimentary Gifting</h4>
                <p className="text-gray-600 text-sm leading-relaxed font-medium">
                  Add a personalized message and choose our premium gift wrap during checkout to make your gift unforgettable.
                </p>
              </div>
              <div className="p-8 rounded-[2.5rem] border border-gray-100 space-y-4">
                <h4 className="font-bold text-secondary mb-4 uppercase text-xs tracking-widest">Shipping Policy</h4>
                <ul className="space-y-3 text-sm text-gray-500 font-medium">
                   <li className="flex gap-3"><span>•</span> Free insured shipping across India.</li>
                   <li className="flex gap-3"><span>•</span> Dispatched within 24-48 business hours.</li>
                   <li className="flex gap-3"><span>•</span> 7-day hassle-free return policy.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Reviews" && (
          <ProductReviews 
            productId={product.id} 
            slug={product.slug}
            initialReviews={product.reviews || []}
            averageRating={product.averageRating || 4.8}
            reviewCount={product.reviewCount || 0}
          />
        )}
      </div>
    </div>
  );
}
