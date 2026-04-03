"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: Props) {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col transition-transform duration-500 animate-in slide-in-from-right">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-primary" />
            <h2 className="text-xl font-bold text-secondary">Your Bag ({cartCount})</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-secondary"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-secondary group-hover:text-primary transition-colors line-clamp-1">{item.name}</h3>
                      {item.variantName && (
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{item.variantName}</p>
                      )}
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-primary transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-primary transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-bold text-secondary">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="p-8 rounded-full bg-gray-50 text-gray-200 mb-6">
                <ShoppingBag size={64} />
              </div>
              <h3 className="text-xl font-bold text-secondary">Your bag is empty</h3>
              <p className="text-gray-500 mt-2 mb-8 max-w-[250px]">Looks like you haven't added any jewelry to your bag yet.</p>
              <Button variant="gold" className="w-full" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="font-medium text-gray-500 uppercase tracking-widest text-xs">Subtotal</span>
              <span className="font-bold text-secondary text-2xl">₹{cartTotal.toLocaleString()}</span>
            </div>
            <p className="text-xs text-center text-gray-400">Shipping and taxes calculated at checkout</p>
            <Link href="/checkout" className="block w-full" onClick={onClose}>
              <Button variant="gold" className="w-full py-4 text-lg font-bold flex items-center justify-center gap-2 group">
                Checkout
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
