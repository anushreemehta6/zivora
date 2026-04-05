"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImage {
  url: string;
}

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
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
    <div className="space-y-6">
      {/* Main Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-gray-50 border border-gray-100 group">
        <Image
          src={images[activeIndex].url}
          alt={`${productName} - View ${activeIndex + 1}`}
          fill
          className="object-cover transition-all duration-700 hover:scale-110"
          priority
        />
        
        {/* Navigation Arrows (Only if more than 1 image) */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur shadow-sm hover:bg-white transition-opacity opacity-0 group-hover:opacity-100 text-secondary"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur shadow-sm hover:bg-white transition-opacity opacity-0 group-hover:opacity-100 text-secondary"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        <button className="absolute top-6 right-6 p-4 rounded-full bg-white shadow-lg shadow-black/5 hover:bg-white transition-colors text-gray-400 hover:text-red-500 active:scale-90 duration-300">
          <Heart size={20} />
        </button>
      </div>

      {/* Thumbnails Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                activeIndex === idx 
                  ? "border-primary shadow-lg shadow-primary/20 scale-95" 
                  : "border-transparent hover:border-primary/30"
              }`}
            >
              <Image 
                src={img.url} 
                alt={`${productName} thumb ${idx + 1}`} 
                fill 
                className={`object-cover transition-opacity duration-300 ${activeIndex === idx ? "opacity-100" : "opacity-60 hover:opacity-100"}`} 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
