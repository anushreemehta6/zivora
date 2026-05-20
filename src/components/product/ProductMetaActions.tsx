"use client";

import React from "react";
import { Share2, HelpCircle } from "lucide-react";
import { toast } from "react-hot-toast";

type Props = {
  productName: string;
  productSlug: string;
};

export default function ProductMetaActions({ productName, productSlug }: Props) {
  const handleShare = async () => {
    // Generate full URL
    const url = typeof window !== "undefined" ? window.location.href : "";
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${productName} | Anushree Jewellers`,
          text: `Take a look at this stunning "${productName}" from Anushree Jewellers!`,
          url: url,
        });
      } catch (err: any) {
        // Ignore AbortError (if user cancels the share sheet)
        if (err.name !== "AbortError") {
          console.error("Error sharing product:", err);
          toast.error("Failed to share product.");
        }
      }
    } else {
      // Fallback: Copy to Clipboard
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Product link copied to clipboard!", {
          icon: "🔗",
          style: {
            borderRadius: "1rem",
            background: "#1a1a1a",
            color: "#fff",
            fontSize: "0.875rem",
            fontWeight: "bold",
          },
        });
      } catch (err) {
        console.error("Clipboard copy failed:", err);
        toast.error("Failed to copy link.");
      }
    }
  };

  const handleAskQuestion = () => {
    const subject = encodeURIComponent(`Inquiry regarding ${productName}`);
    const message = encodeURIComponent(
      `Hi, I was exploring your premium collection and came across the "${productName}". I have a few questions regarding this product and would love more details on its customizability, sizing, and shipping options. Looking forward to your response!`
    );
    window.location.href = `/contact?subject=${subject}&message=${message}`;
  };

  return (
    <div className="border-t border-gray-100 pt-6 mt-6">
      <div 
        className="flex items-center justify-center divide-x divide-gray-100 border border-gray-100 rounded-2xl bg-gradient-to-r from-gray-50/60 via-white to-gray-50/60 p-2 shadow-sm transition-all duration-300 hover:shadow hover:border-primary/10"
        role="group"
        aria-label="Product sharing and inquiry options"
      >
        <button 
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2.5 py-2.5 px-3 hover:text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest text-secondary transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:text-primary group"
          title="Share this product masterpiece"
        >
          <Share2 size={13} className="text-primary transition-transform group-hover:scale-110 duration-300" />
          <span>Share Piece</span>
        </button>

        <button 
          onClick={handleAskQuestion}
          className="flex-1 flex items-center justify-center gap-2.5 py-2.5 px-3 hover:text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest text-secondary transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:text-primary group"
          title="Consult with a jewelry expert about this piece"
        >
          <HelpCircle size={13} className="text-primary transition-transform group-hover:scale-110 duration-300" />
          <span>Consult Artisan</span>
        </button>
      </div>
    </div>
  );
}
