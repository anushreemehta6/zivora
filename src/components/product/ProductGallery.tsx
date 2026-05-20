"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WishlistToggle from "./WishlistToggle";

interface ProductImage {
  url: string;
}

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  productId?: string;
  price?: number;
}

export default function ProductGallery({ images, productName, productId, price }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square rounded-3xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-300">
        No images available
      </div>
    );
  }

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-6" role="region" aria-label="Product Media Gallery">
      {/* Main Image Container */}
      <div 
        className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-100/80 group shadow-sm hover:shadow-md transition-shadow duration-500 cursor-zoom-in"
        role="tabpanel"
        id="gallery-main-view"
        aria-label={`Product main view ${activeIndex + 1} of ${images.length}`}
      >
        <Image
          src={images[activeIndex].url}
          alt={`${productName} - Product view ${activeIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          priority
        />
        
        {/* Fine luxury glass reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700" />

        {/* Navigation Arrows (Only if more than 1 image) */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              aria-label="Previous product image"
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-gray-100 hover:bg-white hover:scale-105 active:scale-95 transition-all opacity-0 group-hover:opacity-100 text-secondary focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <button 
              onClick={nextImage}
              aria-label="Next product image"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-gray-100 hover:bg-white hover:scale-105 active:scale-95 transition-all opacity-0 group-hover:opacity-100 text-secondary focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </>
        )}

        {productId && (
          <WishlistToggle 
            product={{
              id: productId,
              productId: productId,
              name: productName,
              price: price || 0,
              image: images?.[0]?.url || ""
            }}
            useCustomStyles={true}
            iconSize={20}
            className="absolute top-6 right-6 p-4 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-gray-100/50 hover:bg-white hover:text-red-500 active:scale-90 hover:scale-105 duration-300 z-10 transition-all text-gray-400"
          />
        )}
      </div>

      {/* Thumbnails Grid (Horizontal scroll on mobile, clean grid on desktop) */}
      {images.length > 1 && (
        <div 
          className="flex md:grid md:grid-cols-5 gap-3.5 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 hide-scrollbar snap-x snap-mandatory"
          role="tablist"
          aria-label="Select product image view"
        >
          {images.map((img, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={idx}
                role="tab"
                aria-selected={isSelected}
                aria-controls="gallery-main-view"
                aria-label={`View product image ${idx + 1}`}
                onClick={() => setActiveIndex(idx)}
                className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0 w-16 h-16 md:w-auto md:h-auto snap-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isSelected 
                    ? "border-primary shadow shadow-primary/20 scale-95 ring-1 ring-primary/25" 
                    : "border-transparent bg-gray-50 hover:border-primary/30"
                }`}
              >
                <Image 
                  src={img.url} 
                  alt={`${productName} thumbnail view ${idx + 1}`} 
                  fill 
                  sizes="80px"
                  className={`object-cover transition-opacity duration-300 ${isSelected ? "opacity-100" : "opacity-60 hover:opacity-100"}`} 
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
