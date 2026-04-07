"use client";

import React from "react";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { userAvatar1, userAvatar2, userAvatar3 } from "@/assets";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ananya Sharma",
      role: "Verified Buyer",
      content: "The detail on the Royal Silver Ring is simply breathtaking. It arrived in beautiful packaging and the quality surpassed my expectations.",
      rating: 5,
      image: userAvatar1
    },
    {
      name: "Vikram Mehta",
      role: "Gifting Expert",
      content: "I bought the Mother-Daughter set for my wife. The sentiment behind the design is beautiful, and the silver is pure and lustrous.",
      rating: 5,
      image: userAvatar2
    },
    {
      name: "Priya Das",
      role: "Collector",
      content: "Anushree Jewellers has become my go-to for minimalist silver. Their pieces are perfect for daily wear but still feel incredibly premium.",
      rating: 5,
      image: userAvatar3
    }
  ];

  return (
    <section className="max-w-8xl mx-auto px-10 w-full py-25 bg-white font-medium">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
            Customer Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary uppercase tracking-tight">Voices of <span className="text-primary">Elegance</span></h2>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div key={i} className="group p-10 rounded-[3rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Star size={64} className="text-primary fill-primary" />
            </div>
            <div className="flex gap-1 mb-6">
              {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} className="text-primary fill-primary" />)}
            </div>
            <p className="text-gray-500 leading-relaxed font-medium mb-10 relative z-10">"{t.content}"</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-md ring-1 ring-black/5 relative">
                <Image src={t.image} alt={t.name} fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-secondary uppercase tracking-tight">{t.name}</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
