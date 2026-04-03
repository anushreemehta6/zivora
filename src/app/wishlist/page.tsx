"use client";

import React from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingBag, Trash2, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item: any) => {
    addToCart({
      ...item,
      quantity: 1,
    });
    removeFromWishlist(item.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-4  leading-tight">
            My <span className="text-primary">Wishlist</span>
          </h1>
          <p className="text-gray-500 font-medium tracking-wide">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>
        <Link href="/products">
          <Button variant="soft" className="px-8 py-4 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            Continue Shopping <ArrowRight size={14} />
          </Button>
        </Link>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlist.map((item) => (
            <div key={item.id} className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 h-full">
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-6 right-6 p-3 rounded-full bg-white/80 backdrop-blur-md text-gray-400 hover:text-red-500 hover:bg-white shadow-xl transition-all active:scale-95"
                >
                  <Trash2 size={18} />
                </button>
                <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-secondary/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <Star fill="currentColor" size={10} className="text-primary" />
                  Best Seller
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-secondary line-clamp-1 mb-2 group-hover:text-primary transition-colors cursor-pointer">
                  {item.name}
                </h3>
                <p className="text-2xl font-bold text-secondary mb-8">
                  ₹{item.price.toLocaleString()}
                </p>

                <div className="mt-auto space-y-3">
                  <Button 
                    variant="gold" 
                    className="w-full py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                    onClick={() => handleMoveToCart(item)}
                  >
                    <ShoppingBag size={14} /> Move to Cart
                  </Button>
                  <Link href={`/product/${item.id}`} className="block w-full">
                    <Button variant="soft" className="w-full py-4 text-[10px] font-bold uppercase tracking-widest border-gray-100">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-32 flex flex-col items-center text-center space-y-10 animate-in fade-in zoom-in duration-700">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
            <div className="relative w-32 h-32 bg-primary/5 text-primary rounded-full flex items-center justify-center shadow-inner border border-primary/10">
              <Heart size={64} strokeWidth={1} />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-secondary mb-3 ">Your wishlist is empty</h2>
            <p className="text-gray-500 max-w-sm leading-relaxed">Save your favorite jewelry pieces here to shop them later.</p>
          </div>
          <Link href="/products">
            <Button variant="gold" className="px-12 py-5 text-sm font-bold uppercase tracking-widest shadow-2xl shadow-primary/30">
              Discover Collections
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
