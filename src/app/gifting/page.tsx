"use client";

import React from "react";
import { Gift, Heart, Sparkles, Truck, Package, MessageSquare, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

const giftCategories = [
  { 
    name: "For Her", 
    slug: "for-her", 
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7",
  },
  { 
    name: "For Him", 
    slug: "for-him", 
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a",
  },
  { 
    name: "For Best Friends", 
    slug: "best-friends", 
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
  },
  { 
    name: "For Couples", 
    slug: "couples", 
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
  },
];

export default function GiftingPage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero */}
      <section className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 mesh-gradient opacity-30 -z-10" />
        <div className="relative text-center space-y-6 max-w-4xl px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
            The Art of Giving
          </div>
          <h1 className="text-5xl md:text-8xl font-bold text-secondary uppercase tracking-tighter">
            Unforgettable <span className="text-primary">Gifts</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed font-medium max-w-2xl mx-auto">
            Discover jewelry crafted for moments that last a lifetime. From premium packaging to personalized notes, we handle the art of giving for you.
          </p>
          <div className="flex justify-center gap-4 pt-4">
             <Link href="/products?tag=best-sellers">
               <Button variant="gold" className="px-10 py-5 text-sm font-bold uppercase tracking-widest">Shop Best Sellers</Button>
             </Link>
          </div>
        </div>
      </section>

      {/* Gifting Features */}
      <section className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center mx-auto text-primary group-hover:scale-110 transition-transform">
            <Package size={32} />
          </div>
          <h3 className="text-xl font-bold text-secondary uppercase tracking-tight">Premium Packaging</h3>
          <p className="text-sm text-gray-400 font-medium leading-relaxed">Every piece arrives in our signature velvet-lined box, wrapped in luxury paper.</p>
        </div>
        <div className="text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center mx-auto text-primary group-hover:scale-110 transition-transform">
            <MessageSquare size={32} />
          </div>
          <h3 className="text-xl font-bold text-secondary uppercase tracking-tight">Personalized Notes</h3>
          <p className="text-sm text-gray-400 font-medium leading-relaxed">Add a handwritten message to your gift for that extra emotional touch.</p>
        </div>
        <div className="text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center mx-auto text-primary group-hover:scale-110 transition-transform">
            <Truck size={32} />
          </div>
          <h3 className="text-xl font-bold text-secondary uppercase tracking-tight">Direct Shipping</h3>
          <p className="text-sm text-gray-400 font-medium leading-relaxed">Send your gift directly to their doorstep with our discreet, secure delivery.</p>
        </div>
      </section>

      {/* Gift by Recipient Grid */}
      <section className="max-w-7xl mx-auto px-8 w-full">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-4xl font-bold text-secondary uppercase tracking-tight">Gift by <span className="text-primary tracking-tight">Relationship</span></h2>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1">
            Choose Your Recipient
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {giftCategories.map((g, i) => (
            <Link key={i} href={`/products?tag=${g.slug}`} className="group relative">
               <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-sm ring-1 ring-black/5 transition-all duration-500 group-hover:shadow-2xl group-hover:ring-primary/20">
                 <Image src={g.image} alt={g.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-secondary/80 to-transparent">
                   <h4 className="text-white font-bold text-lg uppercase tracking-tight mb-1">{g.name}</h4>
                   <p className="text-primary text-[10px] font-bold uppercase tracking-widest">Shop Collection</p>
                 </div>
               </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Gift Box Preview */}
      <section className="bg-secondary w-full py-24 text-white overflow-hidden relative">
         <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 -ml-20" />
         <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
           <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
             <Image src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338" alt="Gift Box" fill className="object-cover" />
             <div className="absolute inset-0 bg-secondary/20" />
             <div className="absolute bottom-10 left-10 p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Signature Experience</p>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-secondary">
                      <Gift size={18} />
                   </div>
                   <p className="text-sm font-bold uppercase tracking-tight">Unboxing at its finest.</p>
                </div>
             </div>
           </div>
           <div className="space-y-8 relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight leading-tight">A <span className="text-primary tracking-tight">Masterpiece</span> in Every Box.</h2>
              <p className="text-gray-400 font-medium leading-relaxed text-lg">
                We believe the experience of receiving a gift should be as beautiful as the gift itself. Our signature packaging is designed to create a sense of wonder and appreciation.
              </p>
              <ul className="space-y-4">
                 {[
                   "Hand-tied silk ribbons",
                   "Velvet-lined protective box",
                   "Authenticity & Purity certificate",
                   "Premium microfiber cleaning cloth"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-tight text-gray-300">
                     <Star size={14} className="text-primary fill-primary" />
                     {item}
                   </li>
                 ))}
              </ul>
              <div className="pt-6">
                 <Link href="/products?tag=gift-boxes">
                   <Button variant="soft" className="bg-white/5 border-white/10 text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white/10">Browse Gift Sets</Button>
                 </Link>
              </div>
           </div>
         </div>
      </section>

      {/* Gift Registry Link */}
      <section className="max-w-3xl mx-auto px-8 text-center space-y-8 py-12">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
          <Heart size={32} />
        </div>
        <h2 className="text-3xl font-bold text-secondary uppercase tracking-tight">Gift with Purpose</h2>
        <p className="text-gray-500 font-medium leading-relaxed">
           Not sure what to choose? Our jewelry experts are available for virtual consultations to help you find the perfect piece for your special someone.
        </p>
        <div className="pt-4">
           <Link href="/contact">
             <Button variant="gold" className="px-10 py-5 text-sm font-bold uppercase tracking-widest">Connect with Expert</Button>
           </Link>
        </div>
      </section>
    </div>
  );
}
