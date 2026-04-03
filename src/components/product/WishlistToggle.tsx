"use client";

import React from "react";
import { useWishlist } from "@/context/WishlistContext";
import { Heart } from "lucide-react";

type Props = {
  product: {
    id: string;
    productId: string;
    name: string;
    price: number;
    image: string;
  };
  className?: string;
};

export default function WishlistToggle({ product, className }: Props) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const active = isInWishlist(product.id);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (active) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <button
      onClick={toggle}
      className={`p-2.5 rounded-full backdrop-blur-md transition-all active:scale-90 ${
        active 
          ? "bg-primary text-white shadow-lg shadow-primary/30" 
          : "bg-white/80 text-gray-400 hover:text-primary hover:bg-white shadow-xl"
      } ${className}`}
    >
      <Heart size={18} fill={active ? "currentColor" : "none"} strokeWidth={active ? 0 : 2} />
    </button>
  );
}
