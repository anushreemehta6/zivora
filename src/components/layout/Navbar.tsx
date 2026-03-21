"use client";


import { useSession, signOut } from "next-auth/react";
import React from "react";
import { Hamburger, Heart, Menu, Search, User, XIcon } from "lucide-react";
import { useState } from "react";
import { div } from "motion/react-client";
import Link from "next/link";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  return (
    <>
    <div className="m-0 p-5 flex justify-between md:justify-around text-center  overflow-hidden">
      <div className="hidden md:flex items-center gap-5 text-xl">
        <Link href="/home">Home</Link>
        <Link href="/categories">Categories</Link>
        <Link href="/shop">Shop</Link>
      </div>

      <h1
        className={`font-heading logo-gradient md:text-7xl font-semibold tracking-wide text-4xl`}
      >
        Zivora
      </h1>
      {/* Hamburger Icon */}
      <div
        className="block md:hidden mt-3 cursor-pointer z-50 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <XIcon /> : <Menu />}
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`w-64 h-full bg-[#d9dadf] shadow-2xl p-6 flex flex-col gap-6 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h1
            className={`font-heading logo-gradient  font-semibold tracking-wide text-4xl`}
          >
            Zivora
          </h1>
          <Link href="/home" className="text-lg font-medium text-[#1F2933]">
            Home
          </Link>
          <Link
            href="/categories"
            className="text-lg font-medium text-[#1F2933]"
          >
            Categories
          </Link>
          <Link href="/shop" className="text-lg font-medium text-[#1F2933]">
            Shop
          </Link>
          <Link href="/about" className="text-lg font-medium text-[#1F2933]">
            About us
          </Link>
          <Link href="/join" className="text-lg font-medium text-[#1F2933]">
            Join community
          </Link>
         <Link href="/login">Login</Link>
        </div>

        {/* Click outside to close */}
        <div className="flex-1" onClick={() => setIsOpen(false)} />
      </div>

      <div className="md:flex items-center gap-5 text-xl hidden ">
        <div className="relative w-fit">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-3 py-1 rounded-full border-2 border-gray-500"
          />
        </div>
        <Heart />
        {session ? (
  <button onClick={() => signOut()}>
    <User />
  </button>
) : (
  <Link href="/login">
    <User />
  </Link>
)}
      </div>
      
    </div>
    <div className="bg-[#1F2933] h-1"></div>
    </>
  );
};

export default Navbar;
