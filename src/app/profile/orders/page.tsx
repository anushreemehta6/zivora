"use client";

import React from "react";
import { Package, Truck, CheckCircle2, ChevronRight, ShoppingBag, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

const MOCK_ORDERS = [
  {
    id: "AN-88492",
    date: "March 28, 2024",
    status: "In Transit",
    total: 24500,
    items: [
      { name: "Sparkling Diamond Ring", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e", price: 18000, quantity: 1, variant: "16" },
      { name: "Silver Heart Earrings", image: "https://images.unsplash.com/photo-1535633302704-c02fbc4a26f7", price: 6500, quantity: 1, variant: "ONESIZE" }
    ]
  },
  {
    id: "AN-88410",
    date: "February 15, 2024",
    status: "Delivered",
    total: 12000,
    items: [
      { name: "Minimalist Silver Bracelet", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a", price: 12000, quantity: 1, variant: "18" }
    ]
  }
];

export default function OrdersPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row gap-12">
      {/* Sidebar Overlay (Placeholder for future profile nav) */}
      <aside className="w-full lg:w-64 flex-shrink-0">
        <h2 className="text-3xl font-bold text-secondary mb-10 ">My Profile</h2>
        <nav className="flex flex-col gap-2">
          {["Dashboard", "My Orders", "Wishlist", "Settings", "Log Out"].map((item) => (
            <button 
              key={item} 
              className={`text-left px-6 py-4 rounded-2xl text-sm font-bold transition-all ${item === "My Orders" ? "bg-primary/5 text-primary border-l-4 border-primary shadow-sm" : "text-gray-400 hover:bg-gray-50 hover:text-secondary"}`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold text-secondary flex items-center gap-3">
            <Package size={24} className="text-primary" />
            Order History
          </h1>
          <div className="hidden md:block">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Showing 2 Recent Orders</p>
          </div>
        </div>

        <div className="space-y-12">
          {MOCK_ORDERS.map((order) => (
            <div key={order.id} className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              {/* Card Header */}
              <div className="p-8 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100">
                <div className="flex gap-10">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order Placed</p>
                    <p className="text-sm font-bold text-secondary">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total</p>
                    <p className="text-sm font-bold text-secondary">₹{order.total.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                    <div className={`flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-full ${order.status === "Delivered" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"}`}>
                      {order.status === "Delivered" ? <CheckCircle2 size={12} /> : <Truck size={12} />}
                      {order.status}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order #</p>
                  <p className="text-sm font-bold text-secondary opacity-60 font-mono tracking-widest">{order.id}</p>
                </div>
              </div>

              {/* Items List */}
              <div className="p-8 space-y-6">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="relative w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover transition-transform group-hover:scale-110" />
                    </div>
                    <div className="flex-grow flex flex-col justify-center">
                      <h4 className="text-lg font-bold text-secondary mb-1 group-hover:text-primary transition-colors">{item.name}</h4>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Size: {item.variant} • Qty: {item.quantity}</p>
                      <p className="font-bold text-secondary">₹{item.price.toLocaleString()}</p>
                    </div>
                    <div className="hidden md:flex flex-col items-end justify-center">
                      <Button variant="outline" className="px-6 py-2 text-xs font-bold rounded-xl border border-gray-200">View Product</Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Track / Help */}
              <div className="px-8 py-6 bg-background-soft border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
                  <Clock size={16} className="text-primary" />
                  <span>Expected Delivery: 4 April 2024</span>
                  <div className="h-4 w-px bg-gray-200 mx-2" />
                  <MapPin size={16} className="text-primary" />
                  <span>Kandivali West, Mumbai</span>
                </div>
                <button className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
                  Track Package <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}

          {MOCK_ORDERS.length === 0 && (
            <div className="py-20 text-center">
              <div className="p-8 rounded-full bg-gray-50 text-gray-200 inline-block mb-6">
                <ShoppingBag size={64} />
              </div>
              <h3 className="text-xl font-bold text-secondary">No orders yet</h3>
              <p className="text-gray-500 mt-2 mb-8">Ready to make a statement?</p>
              <Link href="/products">
                <Button variant="gold">Explore Best Sellers</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
