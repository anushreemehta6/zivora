"use client";

import React from "react";
import { Star, ShieldCheck, Heart, Sparkles, Globe, Users, Trophy, Award, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-20 md:gap-32 pb-24 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 mesh-gradient opacity-30 -z-10" />
        <div className="relative text-center space-y-6 max-w-4xl px-8 animate-in fade-in slide-in-from-bottom duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mx-auto">
             Legacy in Silver
          </div>
          <h1 className="text-5xl md:text-8xl font-bold text-secondary tracking-tighter leading-tight">
            Our <span className="text-primary underline decoration-primary/30 underline-offset-8">Heritage</span>
          </h1>
          <p className="text-base md:text-xl text-gray-500 leading-relaxed font-medium max-w-2xl mx-auto">
            From the heart of traditional craftsmanship to the forefront of digital luxury. Discover the transition of Anushree Jewellers into Zivora.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
        <div className="relative aspect-[4/5] md:aspect-square rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-black/5 group">
          <Image 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" 
            alt="Kiran Mehta - Founder" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-secondary/10" />
          <div className="absolute bottom-10 left-10 p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
             <p className="text-white font-bold text-2xl mb-1 tracking-tight">Kiran Mehta</p>
             <p className="text-primary text-xs font-bold uppercase tracking-widest">Founder & Visionary</p>
          </div>
        </div>
        <div className="space-y-8 md:space-y-10">
          <div className="space-y-4">
            <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">The Story of Zivora</p>
            <h2 className="text-4xl md:text-6xl font-bold text-secondary leading-[1.1] tracking-tighter">
              From <span className="text-primary tracking-tight">Anushree Jewellers</span> to the World.
            </h2>
          </div>
          <div className="space-y-6 text-gray-500 text-base md:text-lg leading-relaxed font-medium">
            <p>
              In the historic ateliers of traditional jewelry making, Kiran Mehta founded Anushree Jewellers with a single mission: to create silver pieces that transcend time. For decades, we served as a beacon of artisanal trust and purity.
            </p>
            <p>
              Today, that same legacy of trust and 925 sterling silver purity enters a new era with Zivora. We've taken our decades of physical expertise and transformed it into a digital discovery experience, bringing curated handcrafted silver to your doorstep, anywhere in the world.
            </p>
          </div>
          <div className="flex gap-10 pt-6">
            <div className="space-y-2">
              <p className="text-3xl font-bold text-secondary tracking-tighter">25+</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Years of Trust</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-secondary tracking-tighter">925</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Purity Certified</p>
            </div>
            <div className="space-y-2 border-l border-gray-100 pl-10 hidden sm:block">
               <div className="flex items-center gap-2 mb-2 text-primary">
                 <Award size={20} />
                 <span className="text-[10px] font-bold uppercase">Legacy Brand</span>
               </div>
               <p className="text-xs text-gray-400 font-medium max-w-[120px]">Handcrafted in India, Delivered Globally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Process Section */}
      <section className="bg-secondary py-24 md:py-32 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[50%] h-full bg-primary/5 -z-0" />
         <div className="max-w-7xl mx-auto px-8 relative z-10">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
              <div className="space-y-4">
                 <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">Our Craft</p>
                 <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none">Artistry in <span className="text-primary italic">Every Layer</span></h2>
              </div>
              <p className="text-gray-400 max-w-md text-sm md:text-base font-medium leading-relaxed">
                 From molten silver to a finished masterpiece, every Zivora piece goes through a rigorous seven-stage quality check and artisanal finish.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
              {[
                { step: "01", title: "Sculpting", desc: "Digital concepts meet hand-carved molds for perfect precision." },
                { step: "02", title: "Casting", desc: "Molten 925 Sterling Silver is cast into our signature silhouettes." },
                { step: "03", title: "Polishing", desc: "Multiple stages of diamond-grade polishing for that eternal shine." },
                { step: "04", title: "Hallmark", desc: "Rigorous purity tests and final BIS Hallmarking for authenticity." }
              ].map((p, i) => (
                <div key={i} className="space-y-6 group">
                   <div className="text-5xl font-bold text-white/5 group-hover:text-primary/20 transition-colors duration-500">{p.step}</div>
                   <h4 className="text-xl font-bold tracking-tight">{p.title}</h4>
                   <p className="text-sm text-gray-500 font-medium leading-relaxed">{p.desc}</p>
                   <div className="w-12 h-1 bg-white/10 group-hover:bg-primary transition-all duration-500" />
                </div>
              ))}
           </div>
         </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-8 space-y-16 md:space-y-24">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">Foundations</p>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary tracking-tighter">Our Core <span className="text-primary">Principles</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            { icon: Globe, title: "Ethical Sourcing", desc: "We prioritize responsible silver sourcing and conflict-free accents." },
            { icon: Users, title: "Artisan Support", desc: "Supporting local craft communities and preserving ancient techniques." },
            { icon: CheckCircle2, title: "Lifelong Trust", desc: "Lifetime professional support and purity guarantee for every piece." }
          ].map((v, i) => (
            <div key={i} className="p-12 rounded-[3.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-[0_20px_50px_rgba(31,41,51,0.1)] transition-all duration-700 text-center space-y-8 group">
              <div className="w-20 h-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto border border-primary/20 group-hover:rotate-6 transition-transform">
                <v.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-secondary tracking-tight">{v.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-bold uppercase tracking-widest opacity-60">Pledge of Quality</p>
              <p className="text-base text-gray-400 leading-relaxed font-medium">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-8 mb-24">
        <div className="rounded-[4rem] bg-secondary p-12 md:p-24 text-center text-white space-y-10 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544126592-807daa2e5682')] opacity-5 mix-blend-overlay object-cover" />
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter relative z-10 leading-none">Become a part of <br /> our <span className="text-primary tracking-tight">journey.</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto relative z-10 leading-relaxed text-lg font-medium">
            Explore our curated collections of fine 925 sterling silver jewelry and find the piece that resonates with your spirit.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10 pt-6">
            <Link href="/products">
              <Button variant="outline" className="px-12 py-6 bg-white text-secondary border-transparent font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all shadow-xl">Shop Collection</Button>
            </Link>
            <Link href="/contact">
              <Button variant="soft" className="px-12 py-6 bg-white/10 text-white border-white/20 hover:bg-white/20 font-bold uppercase tracking-widest text-xs backdrop-blur-md">Connect With Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
