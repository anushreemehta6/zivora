import { Facebook, Instagram, MessageCircleHeart, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-24 pb-12 px-8 md:px-20 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-slate-400">
        <div className="flex flex-col space-y-8">
          <Link href="/">
            <h1 className="text-white text-4xl font-bold tracking-tighter">Zivora</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">Fine Silver Jewelry</p>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs font-medium">
            Exquisitely crafted 925 sterling silver jewelry. Timeless designs, ethically sourced, and made to last a lifetime.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all duration-300">
              <Facebook size={18} className="text-white" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all duration-300">
              <Instagram size={18} className="text-white" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all duration-300">
              <MessageCircleHeart size={18} className="text-white" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          <h3 className="text-lg text-white font-bold  underline decoration-primary underline-offset-8">Quick Links</h3>
          <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
            <li><Link href="/products" className="hover:text-white transition-colors cursor-pointer">Collection</Link></li>
            <li><Link href="/wishlist" className="hover:text-white transition-colors cursor-pointer">Wishlist</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors cursor-pointer">Our Story</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors cursor-pointer">Customer Care</Link></li>
          </ul>
        </div>

        <div className="flex flex-col space-y-6">
          <h3 className="text-lg text-white font-bold underline decoration-primary underline-offset-8">Information</h3>
          <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
            <li><Link href="/shipping-returns" className="hover:text-white transition-colors cursor-pointer">Shipping & Returns</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors cursor-pointer">FAQs</Link></li>
            {/* <li><Link href="/size-guide" className="hover:text-white transition-colors cursor-pointer">Size Guide</Link></li> */}
          </ul>
        </div>

        <div className="flex flex-col space-y-8">
          <h3 className="text-lg text-white font-bold  underline decoration-primary underline-offset-8">Visit Studio</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <MapPin size={20} className="text-primary flex-shrink-0" />
              <p className="text-sm leading-relaxed font-medium">
                D-35 Shanti Nagar, OPP. NBC Parking, Jaipur, Rajasthan 302006
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Phone size={18} className="text-primary flex-shrink-0" />
              <p className="text-sm font-bold tracking-wider hover:text-white transition-colors cursor-pointer">+91 95492 58382</p>
            </div>
            <div className="flex items-center gap-4">
              <Mail size={18} className="text-primary flex-shrink-0" />
              <p className="text-sm font-bold tracking-wider hover:text-white transition-colors cursor-pointer">zivora2026@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold text-gray-500 uppercase tracking-[0.25em]">
        <p>&copy; {new Date().getFullYear()} Zivora Fine Jewelry. All Rights Reserved.</p>
        <p>Designed and Developed By Anushree Mehta</p>
      </div>
    </footer>
  )
}

export default Footer

