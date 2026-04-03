"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import Button from "../ui/Button";
import { Info } from "lucide-react";
import WishlistToggle from "./WishlistToggle";


type Props = {
  product: any;
};

export default function ProductActions({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState("16");
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedSize}`,
      productId: product.id,
      name: product.name,
      price: product.dynamicPrice,
      image: product.images?.[0]?.url || "",
      quantity: 1,
      variantName: `Size: ${selectedSize}`,
    });
  };

  return (
    <div className="space-y-8 mb-12">
      {/* Variant Selector */}
      <div>
        <h4 className="font-bold text-sm text-secondary uppercase tracking-wider mb-4 flex items-center justify-between">
          Select Size
          <button className="text-primary text-[10px] hover:underline flex items-center gap-1">
            <Info size={12} /> Size Guide
          </button>
        </h4>
        <div className="flex flex-wrap gap-3">
          {["12", "14", "16", "18"].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center font-bold text-sm transition-all active:scale-95 ${
                selectedSize === size
                  ? "border-primary text-primary bg-primary/5 shadow-inner"
                  : "border-gray-100 text-gray-500 hover:border-gray-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="gold"
          onClick={handleAddToCart}
          className="flex-grow py-5 text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:shadow-primary/40"
        >
          Add to Cart
        </Button>
        <WishlistToggle 
          product={{
            id: product.id,
            productId: product.id,
            name: product.name,
            price: product.dynamicPrice || 0,
            image: product.images?.[0]?.url || ""
          }} 
          className="w-full sm:w-20 flex items-center justify-center border-2 border-gray-100 rounded-2xl hover:border-primary/30 transition-all active:scale-95"
        />
      </div>
    </div>
  );
}

