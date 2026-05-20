"use client";

import { useSession, signOut } from "next-auth/react";
import React, { useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X, ChevronDown, ChevronRight, Sparkles, LogOut, Settings, Package, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import CartDrawer from "../cart/CartDrawer";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    } else {
      router.push("/products");
    }
  };


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
            <Link href="/gifting" className="hover:text-primary transition-colors">
              Gifting
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
            <form onSubmit={handleSearch} className="hidden lg:flex items-center relative group">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 xl:w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
              <button type="submit" className="absolute left-3.5 text-gray-400 group-hover:text-primary transition-colors">
                <Search size={14} />
              </button>
            </form>

            <Link href="/wishlist" className="p-1.5 md:p-2 text-secondary hover:text-primary transition-colors relative group">
              <Heart size={20} className="md:w-5 md:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 md:w-5 md:h-5 bg-primary text-white text-[8px] md:text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm ring-1 ring-primary/20">
                  {wishlistCount}
                </span>
              )}
            </Link>


            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className={`w-10 h-10 rounded-full transition-all flex items-center justify-center text-sm font-bold select-none cursor-pointer focus:outline-none ${
                  session
                    ? "bg-primary/10 border-2 border-primary/20 hover:border-primary text-primary"
                    : "bg-gray-50 border-2 border-gray-100 hover:border-primary/45 hover:bg-primary/5 text-secondary"
                }`}
                title={session ? "My Profile" : "Guest Menu / Sign In"}
              >
                {session ? (
                  session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "Avatar"}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    session.user?.name?.[0]?.toUpperCase() || <User size={16} />
                  )
                ) : (
                  <User size={16} className="text-gray-500" />
                )}
              </button>

              {/* Dropdown Card */}
              {isProfileDropdownOpen && (
                <>
                  {/* Invisible Backdrop to close dropdown on click outside */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileDropdownOpen(false)}
                  />
                  
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 space-y-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {session ? (
                      <>
                        {/* User Header */}
                        <div className="border-b border-gray-100 pb-4">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-2">Logged in as</p>
                          <h4 className="font-bold text-secondary text-sm truncate leading-tight mb-0.5">{session.user?.name}</h4>
                          <p className="text-xs text-gray-400 truncate leading-none">{session.user?.email}</p>
                        </div>

                        {/* Dropdown Options */}
                        <div className="flex flex-col gap-1.5 text-sm font-semibold text-secondary">
                          <Link 
                            href="/profile/orders" 
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/5 hover:text-primary transition-all"
                          >
                            <User size={16} className="text-gray-400" />
                            <span>My Profile</span>
                          </Link>
                          <Link 
                            href="/profile/orders" 
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/5 hover:text-primary transition-all"
                          >
                            <Package size={16} className="text-gray-400" />
                            <span>My Orders</span>
                          </Link>
                          <Link 
                            href="/wishlist" 
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/5 hover:text-primary transition-all"
                          >
                            <Heart size={16} className="text-gray-400" />
                            <span>My Wishlist</span>
                          </Link>
                          <Link 
                            href="/profile/settings" 
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/5 hover:text-primary transition-all"
                          >
                            <Settings size={16} className="text-gray-400" />
                            <span>Settings</span>
                          </Link>
                          {session.user?.role === "ADMIN" && (
                            <Link 
                              href="/admin" 
                              onClick={() => setIsProfileDropdownOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/5 hover:text-primary transition-all text-primary font-bold"
                            >
                              <Sparkles size={16} />
                              <span>Admin Panel</span>
                            </Link>
                          )}
                        </div>

                        {/* Sign Out Button */}
                        <div className="border-t border-gray-100 pt-3">
                          <button
                            onClick={() => {
                              setIsProfileDropdownOpen(false);
                              signOut({ callbackUrl: "/" });
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50/50 transition-all text-sm font-semibold text-left"
                          >
                            <LogOut size={16} />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Guest Header */}
                        <div className="border-b border-gray-100 pb-4">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-2">Welcome to Zivora</p>
                          <h4 className="font-bold text-secondary text-sm leading-tight mb-0.5">Guest Profile</h4>
                          <p className="text-xs text-gray-400 leading-none">Login to track orders and save favorites</p>
                        </div>

                        {/* Dropdown Options */}
                        <div className="flex flex-col gap-1.5 text-sm font-semibold text-secondary">
                          <Link 
                            href="/login" 
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/5 hover:text-primary transition-all text-primary font-bold animate-pulse"
                          >
                            <LogIn size={16} />
                            <span>Sign In</span>
                          </Link>
                          <Link 
                            href="/register" 
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/5 hover:text-primary transition-all"
                          >
                            <UserPlus size={16} className="text-gray-400" />
                            <span>Create Account</span>
                          </Link>
                          
                          <div className="h-px bg-gray-100 my-1" />
                          
                          <Link 
                            href="/login?callbackUrl=/profile/orders" 
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-primary/5 hover:text-primary transition-all group/opt"
                          >
                            <div className="flex items-center gap-3">
                              <User size={16} className="text-gray-400 group-hover/opt:text-primary transition-colors" />
                              <span className="text-gray-400 group-hover/opt:text-secondary transition-colors">My Profile</span>
                            </div>
                            <span className="text-[10px] bg-gray-100 text-gray-400 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider group-hover/opt:bg-primary/10 group-hover/opt:text-primary transition-colors">Lock</span>
                          </Link>
                          <Link 
                            href="/login?callbackUrl=/profile/orders" 
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-primary/5 hover:text-primary transition-all group/opt"
                          >
                            <div className="flex items-center gap-3">
                              <Package size={16} className="text-gray-400 group-hover/opt:text-primary transition-colors" />
                              <span className="text-gray-400 group-hover/opt:text-secondary transition-colors">My Orders</span>
                            </div>
                            <span className="text-[10px] bg-gray-100 text-gray-400 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider group-hover/opt:bg-primary/10 group-hover/opt:text-primary transition-colors">Lock</span>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>

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

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="mb-8 relative group">
          <input
            type="text"
            placeholder="Search jewelry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors" size={18} />
        </form>

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
          <Link href="/gifting" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary flex items-center gap-2">
            Gifting
          </Link>
          <Link href="/testimonials" onClick={() => setIsMobileMenuOpen(false)}>Stories</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
        </div>


        <div className="mt-auto pt-8 border-t border-gray-100 space-y-4">
          {session ? (
            <div className="space-y-4 animate-in fade-in duration-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0 overflow-hidden border border-primary/20">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "Avatar"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    session.user?.name?.[0]?.toUpperCase() || <User size={16} />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-secondary text-sm truncate leading-tight">{session.user?.name}</h4>
                  <p className="text-xs text-gray-400 truncate leading-none mt-1">{session.user?.email}</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 font-semibold text-sm">
                <Link
                  href="/profile/orders"
                  className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User size={18} className="text-gray-400" /> My Profile
                </Link>
                <Link
                  href="/profile/orders"
                  className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Package size={18} className="text-gray-400" /> My Orders
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Heart size={18} className="text-gray-400" /> My Wishlist
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="flex items-center gap-2 text-red-500 font-bold text-left"
                >
                  <LogOut size={18} /> Log Out
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 flex-shrink-0">
                  <User size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-secondary text-sm leading-tight">Guest Profile</h4>
                  <p className="text-xs text-gray-400 leading-none mt-1">Unlock luxury access</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 font-semibold text-sm">
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-primary font-bold hover:text-primary transition-colors animate-pulse"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn size={18} /> Sign In
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserPlus size={18} /> Create Account
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;

