"use client";

import React from "react";
import Image from "next/image";
import { bg, heroComposition, rings, earrings, necklaces, bracelets } from "@/assets";
import Button from "@/components/ui/Button";
import { ArrowRight, Star, ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import Link from "next/link";

import ShopByRecipient from "@/components/home/ShopByRecipient";
import ShopByOccasion from "@/components/home/ShopByOccasion";
import ShopByTheme from "@/components/home/ShopByTheme";
import ShopByPrice from "@/components/home/ShopByPrice";
import GiftingSection from "@/components/home/GiftingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

const categories = [
  { name: "Rings", image: rings, slug: "rings" },
  { name: "Earrings", image: earrings, slug: "earrings" },
  { name: "Necklaces", image: necklaces, slug: "necklaces" },
  { name: "Bracelets", image: bracelets, slug: "bracelets" },
];

const HomePage = () => {
  return (
    <div className="flex flex-col gap-10 pb-20 overflow-x-hidden">
      {/* Modern Hero Section */}
      <section className="relative min-h-[90vh] w-full overflow-hidden flex items-center pt-20">
        <div className="absolute inset-0 mesh-gradient opacity-40 -z-10" />
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-primary/10 to-transparent -z-10" />

        <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10 space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              New Collection 2024
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold leading-[0.9] text-secondary tracking-tighter">
              Timeless <br />
              <span className="text-primary font-medium tracking-tight">Elegance</span>
            </h1>

            <p className="text-lg text-gray-500 max-w-lg leading-relaxed font-medium">
              Discover the art of 925 Sterling Silver. Handcrafted pieces designed to capture life's most precious moments with a touch of modern luxury.
            </p>

            <div className="flex flex-wrap gap-5 pt-4">
              <Link href="/products">
                <Button variant="gold" className="px-10 py-5 text-sm font-bold uppercase tracking-widest shadow-2xl shadow-primary/20 group">
                  Explore Collection
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </Button>
              </Link>
              <Button variant="soft" className="px-10 py-5 text-sm font-bold uppercase tracking-widest border-gray-200">
                The Heritage
              </Button>
            </div>

            <div className="flex gap-10 pt-8 border-t border-gray-100">
              <div>
                <p className="text-2xl font-bold text-secondary">500+</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Designs</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">925</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Pure Silver</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">Free</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Shipping</p>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] lg:h-[700px] animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square rounded-full border border-primary/5 -z-10 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full border border-primary/10 -z-10" />

            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full animate-float">
                <Image
                  src={heroComposition}
                  alt="Zivora Fine Jewelry"
                  fill
                  className="object-contain drop-shadow-[0_35px_35px_rgba(31,41,51,0.2)]"
                  priority
                />
              </div>
            </div>

            <div className="absolute bottom-10 left-0 p-6 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-2xl animate-in slide-in-from-bottom duration-1000 delay-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white">
                  <Star fill="currentColor" size={20} />
                </div>
                <div>
                  <p className="text-secondary font-bold">4.9 / 5.0</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Customer Rated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Paths */}
      <ShopByRecipient />
      <ShopByOccasion />

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 w-full py-12 md:py-24 overflow-hidden relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="group">
            <h2 className="text-3xl font-bold text-secondary mb-2 uppercase tracking-tight">Shop by Category</h2>
            <div className="h-1 w-20 bg-primary rounded-full group-hover:w-40 transition-all duration-500" />
          </div>
          <Link href="/products" className="text-sm font-bold text-gray-400 hover:text-primary transition-colors flex items-center gap-2 uppercase tracking-widest">
            View All Collections <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-background-base shadow-sm ring-1 ring-black/5 transition-all duration-500 group-hover:shadow-2xl group-hover:ring-primary/20">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-8 left-8 right-8 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white font-bold text-lg mb-1">{cat.name}</p>
                  <div className="w-8 h-0.5 bg-primary rounded-full" />
                </div>
              </div>
              <h3 className="mt-6 text-center text-sm font-bold text-secondary uppercase tracking-widest group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Detailed Discovery */}
      <ShopByTheme />
      <GiftingSection />
      <ShopByPrice />
      
      {/* Testimonials & Trust Flush Wrapper */}
      <div className="flex flex-col -mt-10">
        <TestimonialsSection />
        
        {/* Trust Badges */}
        <section className="w-full bg-secondary py-24 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary/30" />
          <div className="max-w-7xl mx-auto px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="flex flex-col items-center text-center gap-5 group">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                <ShieldCheck className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2">925 Pure Silver</h4>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">BIS Hallmarked & Certified Authentic Silver</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-5 group">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                <Truck className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2">Express Delivery</h4>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">Fast, secure shipping to your doorstep</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-5 group">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                <RefreshCcw className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2">Easy Returns</h4>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">7-day no-questions-asked return policy</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-5 group">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                <Star className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2">Lifetime Support</h4>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">Professional cleaning & polishing forever</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
