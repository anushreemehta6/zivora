"use client";
import Navbar from "@/components/layout/Navbar";
import React from "react";
import { bg } from "@/assets";
import Button from "@/components/ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";


const HomePage = () => {
return(
  <>
<div
  className="h-[70vh] bg-cover bg-center flex flex-col justify-center p-10"
  style={{ backgroundImage: `url(${bg.src})`, opacity:50 }}
>
  <div className="">
    <h1 className="text-3xl md:text-5xl font-semibold logo mb-2">Where Silver Becomes Statement</h1>
    <p className="text-xl w-sm md:w-lg">Discover beautifully crafted silver jewellery designed for everyday elegance, meaningful gifting, and lasting impressions.</p>
    <Button variant="dark" className="flex items-center gap-2 mt-5 rounded-full">
  Shop Now
  <ArrowRight className="transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
</Button>
  </div>
</div>

{/* bottom strip  */}
<div className="w-full bg-[#e0e6f6] py-5 flex justify-center">
  <div className="flex flex-wrap gap-4 justify-center items-center max-w-6xl">

    <div className="px-5 py-2 rounded-full bg-[#1F2933] text-white text-sm font-medium shadow-md">
      925 Pure Silver
    </div>

    <div className="px-5 py-2 rounded-full bg-[#1F2933] text-white text-sm font-medium shadow-md">
      Certified & Hallmarked
    </div>

    <div className="px-5 py-2 rounded-full bg-[#1F2933] text-white text-sm font-medium shadow-md">
      Premium Craftsmanship
    </div>

    <div className="px-5 py-2 rounded-full bg-[#1F2933] text-white text-sm font-medium shadow-md">
      Secure Payments
    </div>

    <div className="px-5 py-2 rounded-full bg-[#1F2933] text-white text-sm font-medium shadow-md">
      Fast & Reliable Delivery
    </div>

  </div>
</div>

  </>

);
};

export default HomePage;
