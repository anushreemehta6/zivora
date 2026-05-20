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
  iconSize?: number;
  useCustomStyles?: boolean;
};

export default function WishlistToggle({ product, className, iconSize = 18, useCustomStyles = false }: Props) {
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

  const defaultStyles = active 
    ? "bg-primary text-white shadow-lg shadow-primary/30" 
    : "bg-white/80 text-gray-400 hover:text-primary hover:bg-white shadow-xl";

  const buttonClasses = useCustomStyles
    ? className
    : `p-2.5 rounded-full backdrop-blur-md transition-all active:scale-90 ${defaultStyles} ${className || ""}`;

  return (
    <button
      onClick={toggle}
      className={buttonClasses}
    >
      <Heart 
        size={iconSize} 
        fill={active ? (useCustomStyles ? "#ef4444" : "currentColor") : "none"} 
        stroke={active ? (useCustomStyles ? "#ef4444" : "currentColor") : "currentColor"}
        strokeWidth={active ? (useCustomStyles ? 0.5 : 0) : 2} 
      />
    </button>
  );
}
