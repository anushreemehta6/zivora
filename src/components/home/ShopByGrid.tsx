"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface GridItem {
  name: string;
  image: string | StaticImageData;
  slug: string;
  tagPrefix?: string; // e.g., "tag=", "category="
}

interface ShopByGridProps {
  title: string;
  items: GridItem[];
  tagPrefix?: string;
}

export default function ShopByGrid({ title, items, tagPrefix = "tag" }: ShopByGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 w-full py-12 md:py-12 overflow-x-auto hide-scrollbar relative">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div className="group">
          <h2 className="text-3xl font-bold text-secondary mb-2 uppercase tracking-tight">{title}</h2>
          <div className="h-1 w-20 bg-primary rounded-full group-hover:w-40 transition-all duration-500" />
        </div>
        <Link 
          href="/products" 
          className="text-sm font-bold text-gray-400 hover:text-primary transition-colors flex items-center gap-2 uppercase tracking-widest"
        >
          View All <ArrowRight size={16} />
        </Link>
      </div>

      <div className="flex overflow-x-auto pb-4 gap-6 md:gap-8 snap-x snap-mandatory hide-scrollbar">
        {items.map((item) => (
          <Link 
            key={item.slug} 
            href={`/products?${tagPrefix}=${item.slug}`} 
            className="flex-shrink-0 w-[200px] md:w-[280px] snap-start group"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-background-base shadow-sm ring-1 ring-black/5 transition-all duration-500 group-hover:shadow-2xl group-hover:ring-primary/20">
              <div className="relative w-full h-full">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-8 left-8 right-8 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-white font-bold text-lg mb-1">{item.name}</p>
                <div className="w-8 h-0.5 bg-primary rounded-full" />
              </div>
            </div>
            <h3 className="mt-6 text-center text-sm font-bold text-secondary uppercase tracking-widest group-hover:text-primary transition-colors">
              {item.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
