"use client";

import React, { useState } from "react";
import Image from "next/image";
import { premiumPackaging } from "@/assets";
import ProductReviews from "./ProductReviews";
import ProductDescription from "./ProductDescription";

export default function ProductTabs({ product }: { product: any }) {
  const [activeTab, setActiveTab] = useState("Specifications");

  const tabs = ["Specifications", "Shipping & Gifting", "Reviews"];

  return (
    <div className="mt-14 border-t border-gray-100 pt-10">
      <div 
        className="flex gap-8 md:gap-12 border-b border-gray-100 mb-10 overflow-x-auto hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
        role="tablist"
        aria-label="Product Information Tabs"
      >
        {tabs.map((tab) => {
          const tabId = `tab-${tab.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
          const panelId = `panel-${tab.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
          const isActive = activeTab === tab;

          return (
            <button 
              key={tab} 
              id={tabId}
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:text-primary ${
                isActive 
                  ? "border-b-2 border-primary text-secondary" 
                  : "border-b-2 border-transparent text-gray-400 hover:text-secondary"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
      
      <div className="min-h-[350px] transition-all duration-500">
        {activeTab === "Specifications" && (
          <div 
            id="panel-specifications"
            role="tabpanel"
            aria-labelledby="tab-specifications"
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-secondary uppercase tracking-tight">Technical Details</h3>
              <div className="space-y-4">
                {[
                  { label: "Metal", value: product.type },
                  { label: "Purity", value: product.purity },
                  { label: "Product Weight", value: `${product.weight} g` },
                  { label: "SKU", value: product.sku },
                ].map((spec) => (
                  <div key={spec.label} className="flex justify-between py-3 border-b border-gray-50 hover:bg-gray-50/30 px-1 rounded transition-colors">
                    <span className="text-gray-400 font-medium">{spec.label}</span>
                    <span className="text-secondary font-bold transition-colors">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="hidden md:block">
              <ProductDescription description={product.description} />
            </div>
          </div>
        )}

        {activeTab === "Shipping & Gifting" && (
          <div 
            id="panel-shippinggifting"
            role="tabpanel"
            aria-labelledby="tab-shippinggifting"
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-secondary uppercase tracking-tighter leading-none">
                Signature <br /><span className="text-primary uppercase tracking-tight">Packaging</span>
              </h3>
              <p className="text-gray-600 leading-relaxed text-base font-medium">
                Every Avira masterpiece arrives in our signature midnight-blue velvet-lined box, designed to keep your jewelry safe and make every unboxing a moment to remember. 
              </p>
              <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl group ring-1 ring-black/5">
                 <Image 
                   src={premiumPackaging} 
                   alt="Premium Avira Packaging" 
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
          <div 
            id="panel-reviews"
            role="tabpanel"
            aria-labelledby="tab-reviews"
            className="animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            <ProductReviews 
              productId={product.id} 
              slug={product.slug}
              initialReviews={product.reviews || []}
              averageRating={product.averageRating || 4.8}
              reviewCount={product.reviewCount || 0}
            />
          </div>
        )}
      </div>
    </div>
  );
}
