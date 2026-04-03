"use client";

import { useSession, signOut } from "next-auth/react";
import React, { useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X, ChevronDown, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import CartDrawer from "../cart/CartDrawer";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { data: session } = useSession();


  return (
    <>
      <nav className="sticky top-0 w-full bg-white/80 backdrop-blur-md z-[90] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-secondary"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Desktop Links Left */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-secondary">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            
            {/* Shop By Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                Shop By <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 pt-6 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                <div className="w-56 bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 space-y-4 backdrop-blur-xl bg-white/90">
                  <Link href="/products?tag=for-her" className="flex items-center justify-between text-xs hover:text-primary transition-colors">
                    Recipient <ChevronRight size={12} />
                  </Link>
                  <Link href="/products?tag=couple" className="flex items-center justify-between text-xs hover:text-primary transition-colors">
                    Bond <ChevronRight size={12} />
                  </Link>
                  <Link href="/products?tag=wedding" className="flex items-center justify-between text-xs hover:text-primary transition-colors">
                    Occasion <ChevronRight size={12} />
                  </Link>
                  <Link href="/products?tag=minimalist" className="flex items-center justify-between text-xs hover:text-primary transition-colors">
                    Theme <ChevronRight size={12} />
                  </Link>
                  <Link href="/products" className="flex items-center justify-between text-xs hover:text-primary transition-colors">
                    Price <ChevronRight size={12} />
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/products" className="hover:text-primary transition-colors">Collection</Link>
            <Link href="/gifting" className="hover:text-primary transition-colors text-primary flex items-center gap-1.5">
              <Sparkles size={14} /> Gifting
            </Link>
          </div>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <h1 className="logo-gradient text-3xl md:text-6xl font-bold tracking-tighter">
              Zivora
            </h1>
          </Link>


          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-6">
            <div className="hidden lg:flex items-center relative group">
              <input 
                type="text" 
                placeholder="Search..."
                className="w-40 xl:w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
              <Search className="absolute left-3.5 text-gray-400 group-hover:text-primary transition-colors" size={14} />
            </div>

            <Link href="/wishlist" className="p-1.5 md:p-2 text-secondary hover:text-primary transition-colors relative group">
              <Heart size={20} className="md:w-5 md:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 md:w-5 md:h-5 bg-blue-500 text-white text-[8px] md:text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm ring-1 ring-blue-500/20 transition-transform group-hover:scale-110">
                  {wishlistCount}
                </span>
              )}
            </Link>


            {session ? (
              <button 
                onClick={() => signOut()}
                className="p-1.5 md:p-2 text-secondary hover:text-primary transition-colors"
                title="Profile & Settings"
              >
                <User size={20} className="md:w-5 md:h-5" />
              </button>
            ) : (
              <Link href="/login" className="p-1.5 md:p-2 text-secondary hover:text-primary transition-colors">
                <User size={20} className="md:w-5 md:h-5" />
              </Link>
            )}

            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 md:p-2 text-secondary hover:text-primary transition-colors relative group"
            >
              <ShoppingBag size={20} className="md:w-5 md:h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 md:w-5 md:h-5 bg-primary text-white text-[8px] md:text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm ring-1 ring-primary/20">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div 
        className={`fixed inset-y-0 left-0 w-72 bg-white z-[101] flex flex-col p-8 transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-12">
          <h1 className="logo-gradient text-3xl font-bold">Zivora</h1>
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} className="text-gray-400" />
          </button>
        </div>
        
        <div className="flex flex-col gap-6 text-lg font-bold text-secondary">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/products" onClick={() => setIsMobileMenuOpen(false)}>Collection</Link>
          <div className="space-y-4 pl-4 border-l-2 border-gray-100">
             <Link href="/products?tag=for-her" className="block text-sm text-gray-400" onClick={() => setIsMobileMenuOpen(false)}>Recipient</Link>
             <Link href="/products?tag=couple" className="block text-sm text-gray-400" onClick={() => setIsMobileMenuOpen(false)}>Bond</Link>
             <Link href="/products?tag=wedding" className="block text-sm text-gray-400" onClick={() => setIsMobileMenuOpen(false)}>Occasion</Link>
             <Link href="/products?tag=minimalist" className="block text-sm text-gray-400" onClick={() => setIsMobileMenuOpen(false)}>Theme</Link>
             <Link href="/products" className="block text-sm text-gray-400" onClick={() => setIsMobileMenuOpen(false)}>Price</Link>
          </div>
          <Link href="/gifting" onClick={() => setIsMobileMenuOpen(false)} className="text-primary flex items-center gap-2">
            <Sparkles size={20} /> Gifting
          </Link>
          <Link href="/testimonials" onClick={() => setIsMobileMenuOpen(false)}>Stories</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
        </div>

        
        <div className="mt-auto pt-8 border-t border-gray-100">
          <Link 
            href="/login" 
            className="flex items-center gap-2 text-secondary font-bold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <User size={20} /> Login / Register
          </Link>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;

