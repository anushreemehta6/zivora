"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ShieldCheck, Truck, CreditCard, ChevronLeft, MapPin, CheckCircle2, Gift } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <h2 className="text-3xl font-bold text-secondary mb-4">Your bag is empty</h2>
        <p className="text-gray-500 mb-8">Add some jewelry to your bag before checking out.</p>
        <Link href="/products">
          <Button variant="gold">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
      {/* Stepper */}
      <div className="flex items-center justify-center mb-16 gap-4 md:gap-12">
        {[
          { icon: MapPin, label: "Shipping" },
          { icon: CreditCard, label: "Payment" },
          { icon: CheckCircle2, label: "Success" }
        ].map((s, i) => (
          <React.Fragment key={s.label}>
            <div className={`flex items-center gap-2 ${step >= i + 1 ? "text-primary font-bold" : "text-gray-300"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= i + 1 ? "border-primary bg-primary/5" : "border-gray-200"}`}>
                <s.icon size={20} />
              </div>
              <span className="hidden md:block text-sm uppercase tracking-widest">{s.label}</span>
            </div>
            {i < 2 && <div className={`h-[2px] w-12 md:w-20 ${step > i + 1 ? "bg-primary" : "bg-gray-100"}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          {step === 1 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-left duration-500">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-secondary ">Shipping Information</h2>
                <Link href="/" onClick={(e) => { e.preventDefault(); /* go back logic */ }} className="text-sm font-bold text-gray-400 hover:text-primary flex items-center gap-1">
                  <ChevronLeft size={16} /> Back
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                  <input type="text" className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                  <input type="tel" className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" placeholder="+91 98765 43210" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Address Line 1</label>
                  <input type="text" className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" placeholder="Apartment, Street, Area" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">City</label>
                  <input type="text" className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" placeholder="Mumbai" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Postal Code</label>
                  <input type="text" className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" placeholder="400001" />
                </div>
              </div>

              {/* Gifting Options */}
              <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-secondary flex items-center gap-2">
                      <Gift size={20} className="text-primary" />
                      Add Luxury Gift Wrap
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">Premium velvet-lined box & silk ribbon</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-primary">+₹50</span>
                    <button 
                      onClick={() => setGiftWrap(!giftWrap)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${giftWrap ? "bg-primary" : "bg-gray-200"}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${giftWrap ? "left-7" : "left-1"}`} />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                   <h4 className="font-bold text-secondary text-sm">Personalized Gift Message (Free)</h4>
                   <textarea 
                     className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none text-sm min-h-[100px]"
                     placeholder="Write your beautiful message here..."
                     value={giftMessage}
                     onChange={(e) => setGiftMessage(e.target.value)}
                   />
                </div>
              </div>

              <Button variant="gold" className="w-full py-5 text-lg font-bold" onClick={() => setStep(2)}>
                Continue to Payment
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right duration-500">
               <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-secondary ">Payment Method</h2>
                <button onClick={() => setStep(1)} className="text-sm font-bold text-gray-400 hover:text-primary flex items-center gap-1">
                  <ChevronLeft size={16} /> Edit Shipping
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-6 border-2 border-primary bg-primary/5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-white shadow-sm text-primary">
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary">Pay Online</h4>
                      <p className="text-xs text-gray-500">UPI, Card, NetBanking</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border-4 border-primary" />
                </div>
                
                <div className="p-6 border border-gray-100 bg-gray-50 rounded-2xl flex items-center justify-between opacity-60">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-white shadow-sm text-gray-400">
                      <Truck size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary">Cash on Delivery</h4>
                      <p className="text-xs text-gray-500">Available on orders below ₹10,000</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-gray-200" />
                </div>
              </div>

              <div className="p-6 bg-background-soft rounded-2xl border border-primary/10 flex items-start gap-4">
                <ShieldCheck className="text-primary mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-secondary text-sm">Secure Transaction</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">Your payment information is encrypted and processed securely. We do not store your card details.</p>
                </div>
              </div>

              <Button variant="gold" className="w-full py-5 text-lg font-bold shadow-2xl shadow-primary/30" onClick={() => setStep(3)}>
                Complete Payment of ₹{cartTotal.toLocaleString()}
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center text-center py-12 space-y-8 animate-in zoom-in duration-700">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                <div className="relative w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/50">
                  <CheckCircle2 size={48} />
                </div>
              </div>
              
              <div>
                <h2 className="text-4xl font-bold text-secondary mb-2 ">Order Placed Successfully!</h2>
                <p className="text-gray-500 max-w-md mx-auto">Thank you for shopping with <span className="logo text-primary">Zivora</span>. Your order #AN-88492 is being prepared for shipment.</p>
              </div>

              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 w-full max-w-md">
                <h4 className="font-bold text-secondary mb-4 uppercase text-xs tracking-widest opacity-50">Delivery Estimate</h4>
                <div className="flex items-center justify-center gap-2 text-xl font-bold text-secondary">
                  <Truck className="text-primary" />
                  <span>3 - 5 Business Days</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Link href="/profile/orders" className="flex-grow">
                  <Button variant="dark" className="w-full py-4 font-bold">Track Order</Button>
                </Link>
                <Link href="/" className="flex-grow">
                  <Button variant="gold" className="w-full py-4 font-bold">Back to Home</Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Summary */}
        <div className={`lg:col-span-5 ${step === 3 ? "hidden" : "block"}`}>
          <div className="sticky top-32 space-y-8">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-secondary mb-8 underline decoration-primary underline-offset-8">Order Summary</h3>
              
              <div className="space-y-6 max-h-96 overflow-y-auto pr-4 mb-10 scrollbar-thin">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-secondary text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{item.variantName}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                        <span className="font-bold text-secondary">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-medium">Subtotal</span>
                  <span className="text-secondary font-bold">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-medium">Shipping</span>
                  <span className="text-green-600 font-bold  tracking-wider">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-medium font-bold">GST (3%)</span>
                  <span className="text-secondary font-bold">₹{((cartTotal + (giftWrap ? 50 : 0)) * 0.03).toLocaleString()}</span>
                </div>
                {giftWrap && (
                  <div className="flex justify-between text-sm text-primary">
                    <span className="font-medium font-bold">Gift Wrap</span>
                    <span className="font-bold">₹50</span>
                  </div>
                )}
                <div className="h-px bg-gray-100 my-2" />
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-secondary uppercase tracking-tight">Grand Total</span>
                  <span className="text-primary ">₹{((cartTotal + (giftWrap ? 50 : 0)) * 1.03).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Support Info */}
            <div className="flex flex-col items-center text-center gap-4 py-8 border-2 border-dashed border-gray-100 rounded-3xl">
              <p className="text-xs text-gray-400 font-medium max-w-[200px]">Need help with your order? Our experts are here 24/7.</p>
              <Link href="/contact" className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">Contact Concierge</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
