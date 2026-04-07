"use client";

import React from "react";
import Image from "next/image";
import {
  heroModelLuxury,
  rings,
  earrings,
  necklaces,
  bracelets,
  catMangalsutra,
  catToering,
  catPendants,
  catAnklets,
  catBangles,
  catNosepins
} from "@/assets";
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
  { name: "Mangalsutra", image: catMangalsutra, slug: "mangalsutra" },
  { name: "Toe Rings", image: catToering, slug: "toering" },
  { name: "Pendants", image: catPendants, slug: "pendants" },
  { name: "Anklets", image: catAnklets, slug: "anklets" },
  { name: "Bangles", image: catBangles, slug: "bangles" },
  { name: "Nose Pins", image: catNosepins, slug: "nosepins" },
];

const HomePage = () => {
  return (
    <div className="overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] w-full flex items-center px-6 md:px-20 pt-8 pb-12">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <h1 className="text-6xl md:text-8xl font-playfair font-bold text-secondary tracking-tighter leading-[0.95]">
              Timeless <br />
              <span className="text-primary italic font-medium">Elegance</span>
            </h1>

            <p className="text-lg text-slate-500 max-w-lg leading-relaxed font-medium tracking-wide">
              Zivora is your trusted destination to buy 925 sterling silver jewellery online in India. Our collection features premium-quality silver pieces that are skin-friendly, long-lasting, and crafted to perfection.
            </p>

            <div className="">
              <Link href="/products">
                <Button variant="newprimary" className="px-10 py-5 text-xl flex items-center gap-4">
                  Explore Collection
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </Link>
            </div>

            <div className="flex gap-10 pt-8 border-t border-gray-100">
              <div>
                <p className="text-3xl font-bold text-secondary tracking-tight">2500+</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Designs</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary tracking-tight">925</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Pure Silver</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary tracking-tight">Free</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Shipping</p>
              </div>
            </div>
          </div>

          <div className="flex-1 relative w-full aspect-square max-w-xl animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="absolute inset-0 bg-primary/5 rounded-[5rem] rotate-3 translate-x-4 translate-y-4 -z-10" />
            <div className="relative w-full h-full rounded-[5rem] overflow-hidden shadow-2xl ring-1 ring-black/5">
              <Image
                src={heroModelLuxury}
                alt="Zivora Fine Jewelry"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Arched Category Overlap */}
      <section className="hidden md:block relative -mt-8 z-20 px-6">
        <div className="max-w-7xl mx-auto overflow-x-auto hide-scrollbar snap-x snap-mandatory">
          <div className="flex gap-6 min-w-max pb-8">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/products/${cat.slug}`} className="snap-start group">
                <div className="w-44 md:w-60 aspect-[3/4.5] bg-white rounded-t-full overflow-hidden shadow-lg border border-gray-50 p-2 transition-all duration-500 hover:-translate-y-2 active:scale-95">
                  <div className="relative w-full h-[80%] rounded-t-full overflow-hidden mb-4">
                    <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                  </div>
                  <div className="text-center px-2">
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">{cat.name}</p>
                    <div className="h-0.5 w-4 bg-primary/20 mx-auto mt-2 transition-all duration-500 group-hover:w-12 group-hover:bg-primary" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <ShopByRecipient />
      <ShopByOccasion />
      <ShopByTheme />
      <GiftingSection />
      <ShopByPrice />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Trust Badges - Restored to Original Design */}
      <section className="w-full bg-secondary py-24 text-white relative overflow-hidden mt-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary/10" />
        <div className="max-w-7xl mx-auto px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col items-center text-center gap-5 group">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500">
              <ShieldCheck className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-xl mb-2 tracking-tight">Authentic 925</h4>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">bis hallmarked jewelry</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-5 group">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500">
              <Truck className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-xl mb-2  tracking-tight">Insured delivery</h4>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">safe & secure shipping</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-5 group">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500">
              <RefreshCcw className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-xl mb-2 tracking-tight">15 day return</h4>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">hassle-free exchanges</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-5 group">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500">
              <Star className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-xl mb-2 tracking-tight">Lifetime care</h4>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">cleaning & restoration</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
