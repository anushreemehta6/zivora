"use client";

import React from "react";
import { Gift, Package, MessageSquare, Truck, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";
import { giftingBg } from "@/assets";

export default function GiftingSection() {
  return (
    <section className="bg-secondary w-full py-24 text-white overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 -ml-40" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -mr-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Visual Element */}
        <div className="relative group">
           <div className="relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[0.98]">
             <Image 
               src={giftingBg} 
               alt="Anushree Signature 925 Silver Gifting" 
               fill 
               className="object-cover"
             />
             <div className="absolute inset-0 bg-secondary/10" />
             
             {/* Glass Badge */}
             <div className="absolute bottom-10 left-10 p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl group-hover:translate-y-[-10px] transition-transform duration-500">
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-secondary relative">
                      <Gift size={24} />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
                   </div>
                   <div>
                      <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">Luxury Gifting</p>
                      <p className="font-bold text-sm">925 Silver Masterpiece.</p>
                   </div>
                </div>
             </div>
           </div>
        </div>

        {/* Text Content */}
        <div className="space-y-10 lg:pl-10">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
                Artisanal Silver Experience
              </div>
              <h2 className="text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter">
                The Art <br />
                <span className="text-primary tracking-tight">of Gifting</span>
              </h2>
           </div>

           <p className="text-lg text-gray-400 font-medium leading-relaxed max-w-lg">
             Discover handcrafted 925 sterling silver jewelry made for the moments that last a lifetime. From our signature silver-foiled packaging to personalized notes, we master the art of giving.
           </p>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4">
              <div className="flex gap-4">
                 <Package size={24} className="text-primary shrink-0" />
                 <div>
                    <h4 className="font-bold text-sm mb-1">Premium Wrap</h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">Silver-foiled signature boxes with silk ribbons.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <MessageSquare size={24} className="text-primary shrink-0" />
                 <div>
                    <h4 className="font-bold text-sm mb-1">Custom Notes</h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">Handwritten messages for a personal touch.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <Truck size={24} className="text-primary shrink-0" />
                 <div>
                    <h4 className="font-bold text-sm mb-1">Direct Ship</h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">Secure, discreet delivery to their doorstep.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <Sparkles size={24} className="text-primary shrink-0" />
                 <div>
                    <h4 className="font-bold text-sm mb-1">Gift Concierge</h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">Expert help in choosing the perfect silver piece.</p>
                 </div>
              </div>
           </div>

           <div className="flex gap-4 pt-6">
              <Link href="/products?tag=best-sellers">
                <Button variant="gold" className="px-10 py-5 text-sm font-bold uppercase tracking-widest shadow-2xl shadow-primary/20">Explore Gift Sets</Button>
              </Link>
              <Link href="/gifting">
                <Button variant="soft" className="px-10 py-5 text-sm font-bold uppercase tracking-widest border-white/10 text-white hover:bg-white/5 transition-all">Learn More</Button>
              </Link>
           </div>
        </div>
      </div>
    </section>
  );
}
