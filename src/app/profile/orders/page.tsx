"use client";

import React, { useState, useEffect } from "react";
import { Package, Truck, CheckCircle2, ChevronRight, ShoppingBag, Clock, MapPin, Loader2, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useSession, signOut } from "next-auth/react";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      const fetchOrders = async () => {
        try {
          const response = await fetch("/api/orders");
          if (response.ok) {
            const data = await response.json();
            setOrders(data);
          } else {
            setError("Failed to fetch order history.");
          }
        } catch (err) {
          setError("An error occurred while fetching orders.");
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-gray-400 font-medium text-sm animate-pulse">Retrieving your luxury orders...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <h2 className="text-3xl font-bold text-secondary mb-4">Please Log In</h2>
        <p className="text-gray-500 mb-8">You need to be logged in to view your order history.</p>
        <Link href="/login">
          <Button variant="gold">Log In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row gap-12">
      {/* Sidebar Profile Navigation */}
      <aside className="w-full lg:w-64 flex-shrink-0">
        <h2 className="text-3xl font-bold text-secondary mb-6">My Profile</h2>
        
        {/* User Card */}
        {session?.user && (
          <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100/85 flex items-center gap-4 animate-in fade-in duration-500">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
              {session.user.name?.[0]?.toUpperCase() || <User size={20} />}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-secondary text-sm truncate leading-tight mb-1">{session.user.name}</h4>
              <p className="text-xs text-gray-400 font-medium truncate leading-none">{session.user.email}</p>
            </div>
          </div>
        )}

        <nav className="flex flex-col gap-2">
          {["Dashboard", "My Orders", "Wishlist", "Settings", "Log Out"].map((item) => {
            const isActive = item === "My Orders";
            
            const handleNav = () => {
              if (item === "Log Out") {
                signOut({ callbackUrl: "/" });
              }
            };

            const linkMap: Record<string, string> = {
              Dashboard: "/dashboard",
              Wishlist: "/wishlist",
              Settings: "/profile/settings"
            };

            if (item === "Log Out") {
              return (
                <button
                  key={item}
                  onClick={handleNav}
                  className="text-left px-6 py-4 rounded-2xl text-sm font-bold transition-all text-red-500 hover:bg-red-50/50"
                >
                  {item}
                </button>
              );
            }

            if (isActive) {
              return (
                <button
                  key={item}
                  className="text-left px-6 py-4 rounded-2xl text-sm font-bold transition-all bg-primary/5 text-primary border-l-4 border-primary shadow-sm"
                >
                  {item}
                </button>
              );
            }

            return (
              <Link key={item} href={linkMap[item] || "#"} className="w-full">
                <button className="w-full text-left px-6 py-4 rounded-2xl text-sm font-bold transition-all text-gray-400 hover:bg-gray-50 hover:text-secondary">
                  {item}
                </button>
              </Link>
            );
          })}
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
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Showing {orders.length} Recent {orders.length === 1 ? "Order" : "Orders"}
            </p>
          </div>
        </div>

        {error && (
          <div className="p-6 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-sm font-medium mb-8">
            {error}
          </div>
        )}

        <div className="space-y-12">
          {orders.map((order) => {
            const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
            
            const expectedDate = new Date(order.createdAt);
            expectedDate.setDate(expectedDate.getDate() + 5);
            const formattedExpected = expectedDate.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            // Map status
            const statusLabels: Record<string, string> = {
              PENDING: "Pending",
              CONFIRMED: "Confirmed",
              PROCESSING: "Processing",
              SHIPPED: "Shipped",
              DELIVERED: "Delivered",
              CANCELLED: "Cancelled",
              RETURNED: "Returned",
            };

            const displayStatus = statusLabels[order.status] || order.status;

            return (
              <div key={order.id} className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Card Header */}
                <div className="p-8 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100">
                  <div className="flex flex-wrap gap-8 md:gap-10">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order Placed</p>
                      <p className="text-sm font-bold text-secondary">{orderDate}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total</p>
                      <p className="text-sm font-bold text-secondary">₹{order.finalAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                      <div className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${order.status === "DELIVERED" ? "bg-green-50 text-green-600" : order.status === "CANCELLED" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`}>
                        {order.status === "DELIVERED" ? <CheckCircle2 size={12} /> : <Truck size={12} />}
                        {displayStatus}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                    <p className="text-sm font-bold text-secondary opacity-60 font-mono tracking-wider">{order.id}</p>
                  </div>
                </div>

                {/* Items List */}
                <div className="p-8 space-y-6">
                  {order.items.map((item: any, idx: number) => {
                    const productImage = item.product.images?.[0]?.url || "https://images.unsplash.com/photo-1605100804763-247f67b3557e";
                    return (
                      <div key={idx} className="flex gap-6 group">
                        <div className="relative w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0">
                          <Image src={productImage} alt={item.product.name} fill className="object-cover transition-transform group-hover:scale-110" />
                        </div>
                        <div className="flex-grow flex flex-col justify-center">
                          <h4 className="text-lg font-bold text-secondary mb-1 group-hover:text-primary transition-colors">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">
                            Size: {item.variant?.name || "Standard Size"} • Qty: {item.quantity}
                          </p>
                          <p className="font-bold text-secondary">₹{item.price.toLocaleString()}</p>
                        </div>
                        <div className="hidden md:flex flex-col items-end justify-center">
                          <Link href={`/product/${item.product.slug}`}>
                            <Button variant="outline" className="px-6 py-2 text-xs font-bold rounded-xl border border-gray-200">
                              View Product
                            </Button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Track / Address Details */}
                <div className="px-8 py-6 bg-background-soft border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-gray-500">
                    <Clock size={16} className="text-primary" />
                    <span>{order.status === "DELIVERED" ? "Delivered On" : "Expected Delivery"}: {formattedExpected}</span>
                    <div className="hidden sm:block h-4 w-px bg-gray-200 mx-2" />
                    <MapPin size={16} className="text-primary" />
                    <span>{order.address.fullName}, {order.address.city} - {order.address.postalCode}</span>
                  </div>
                  <button className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline self-start md:self-auto">
                    Track Package <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}

          {orders.length === 0 && (
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
