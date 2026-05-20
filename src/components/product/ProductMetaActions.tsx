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
    <div className="flex items-center gap-8 border-t border-gray-100 pt-8 mt-4">
      <button 
        onClick={handleShare}
        className="flex items-center gap-2.5 text-sm font-bold text-gray-500 hover:text-secondary group transition-colors duration-300 active:scale-95"
        title="Share this product with friends or copy link"
      >
        <div className="p-2 rounded-xl bg-gray-50 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300">
          <Share2 size={16} className="transition-transform group-hover:scale-110" />
        </div>
        <span>Share</span>
      </button>

      <button 
        onClick={handleAskQuestion}
        className="flex items-center gap-2.5 text-sm font-bold text-gray-500 hover:text-secondary group transition-colors duration-300 active:scale-95"
        title="Send an inquiry about this product"
      >
        <div className="p-2 rounded-xl bg-gray-50 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300">
          <HelpCircle size={16} className="transition-transform group-hover:scale-110" />
        </div>
        <span>Ask a Question</span>
      </button>
    </div>
  );
}
