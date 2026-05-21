"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import Button from "../ui/Button";
import WishlistToggle from "./WishlistToggle";

type Props = {
  product: any;
};

export default function ProductActions({ product }: Props) {
  const categoryName = (product.category?.name || "").toLowerCase();
  const isRing = categoryName.includes("ring");
  const isBraceletOrBangle = categoryName.includes("bracelet") || categoryName.includes("bangle");

  // // Determine sizes based on category type
  // let sizes: string[] = [];
  // let sizeLabel = "Size";
  
  // if (isRing) {
  //   sizes = ["12", "14", "16", "18", "20"];
  //   sizeLabel = "Ring Size (Indian)";
  // } else if (isBraceletOrBangle) {
  //   sizes = ["2.2", "2.4", "2.6", "2.8"];
  //   sizeLabel = "Bangle Size (Diameter)";
  // } else {
  //   sizes = ["Standard"];
  //   sizeLabel = "Size";
  // }

  // const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}`,
      productId: product.id,
      name: product.name,
      price: product.dynamicPrice || product.price || 0,
      image: product.images?.[0]?.url || "",
      quantity: 1,
      // variantName: selectedSize === "Standard" ? "Standard Size" : `${sizeLabel}: ${selectedSize}`,
    });
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Size Selection Section */}
      <div className="space-y-3">
        {/* <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">
            {sizeLabel}
          </span>
          {sizes.length > 1 && (
            <span className="text-[10px] text-primary/80 font-bold uppercase tracking-wider">
              Selected: {selectedSize}
            </span>
          )}
        </div> */}
{/* 
        {sizes.length > 1 ? (
          <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Select sizing">
            {sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`Size ${size}`}
                  className={`w-12 h-12 rounded-full border text-xs font-bold transition-all duration-300 flex items-center justify-center shadow-sm active:scale-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none ${
                    isSelected
                      ? "bg-secondary text-white border-secondary shadow-primary/10"
                      : "bg-white text-secondary border-gray-100 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        ) : ( */}
          <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-full shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">
              Adjustable Fit / One Size
            </span>
          </div>
        {/* )} */}
      </div>

      {/* Cart & Wishlist CTAs */}
      <div className="flex flex-col sm:flex-row gap-4">
      <button
  onClick={handleAddToCart}
  disabled={!product.isActive}
  className={`w-full h-14 rounded-2xl font-bold transition-all ${
    product.isActive
      ? "bg-primary text-white hover:opacity-90"
      : "bg-gray-200 text-gray-500 cursor-not-allowed"
  }`}
>
  {product.isActive ? "Add To Cart" : "Out Of Stock"}
</button>
        <WishlistToggle 
          product={{
            id: product.id,
            productId: product.id,
            name: product.name,
            price: product.dynamicPrice || product.price || 0,
            image: product.images?.[0]?.url || ""
          }} 
          className="w-full sm:w-20 flex items-center justify-center border border-gray-200 rounded-2xl hover:border-primary hover:text-primary transition-all active:scale-95 shadow-sm p-4 bg-white"
        />
      </div>
    </div>
  );
}
