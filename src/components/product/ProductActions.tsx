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

