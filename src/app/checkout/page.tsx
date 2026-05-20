"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { ShieldCheck, Truck, CreditCard, ChevronLeft, MapPin, CheckCircle2, Gift, Tag, Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState<any[]>([]);

  // Shipping form state
  const [shippingForm, setShippingForm] = useState({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "Maharashtra",
    postalCode: "",
    country: "India",
  });

  // Order placement state
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY"); // RAZORPAY or COD
  const [orderId, setOrderId] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState("");

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch("/api/coupons");
        if (response.ok) {
          const data = await response.json();
          // Filter coupons that are active and not expired
          const activeCoupons = data.filter((c: any) => {
            const isAct = c.isActive;
            const isNotExpired = !c.expiryDate || new Date(c.expiryDate) > new Date();
            return isAct && isNotExpired;
          });
          setAvailableCoupons(activeCoupons);
        }
      } catch (err) {
        console.error("Failed to fetch available coupons", err);
      }
    };
    fetchCoupons();
  }, []);

  const handleApplyCoupon = async (e?: React.FormEvent, directCode?: string) => {
    if (e) e.preventDefault();
    const targetCode = directCode || couponCode;
    if (!targetCode.trim()) return;

    setCouponLoading(true);
    setCouponError("");

    try {
      const response = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: targetCode.trim().toUpperCase(),
          cartTotal: cartTotal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setCouponError(data.error || "Invalid coupon code");
        setAppliedCoupon(null);
      } else {
        setAppliedCoupon({
          code: targetCode.trim().toUpperCase(),
          discountAmount: data.discountAmount,
        });
        setCouponError("");
        setCouponCode(targetCode.trim().toUpperCase()); // sync input
      }
    } catch (err) {
      setCouponError("Failed to validate coupon. Please try again.");
      setAppliedCoupon(null);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const subtotal = cartTotal;
  const giftWrapAmount = giftWrap ? 50 : 0;
  const taxableAmount = Math.max(0, subtotal - discountAmount + giftWrapAmount);
  const gstAmount = taxableAmount * 0.03;
  const grandTotal = taxableAmount + gstAmount;

  // Automatically adjust payment method if COD becomes unavailable
  useEffect(() => {
    if (grandTotal >= 10000 && paymentMethod === "COD") {
      setPaymentMethod("RAZORPAY");
    }
  }, [grandTotal, paymentMethod]);

  const handlePlaceOrder = async () => {
    const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
    const pinRegex = /^[1-9][0-9]{5}$/;

    if (!shippingForm.fullName.trim() || !shippingForm.phone.trim() || !shippingForm.line1.trim() || !shippingForm.city.trim() || !shippingForm.postalCode.trim() || !shippingForm.state) {
      setOrderError("Please complete all shipping address fields before placing the order.");
      setStep(1); // send back to shipping to correct
      return;
    }

    if (!phoneRegex.test(shippingForm.phone.replace(/[\s-]/g, ""))) {
      setOrderError("Please enter a valid 10-digit Indian phone number.");
      setStep(1);
      return;
    }

    if (!pinRegex.test(shippingForm.postalCode.trim())) {
      setOrderError("Please enter a valid 6-digit Indian PIN code (postal code).");
      setStep(1);
      return;
    }

    if (!INDIAN_STATES.includes(shippingForm.state)) {
      setOrderError("Please select a valid Indian State/Union Territory.");
      setStep(1);
      return;
    }

    setPlacingOrder(true);
    setOrderError("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: {
            fullName: shippingForm.fullName,
            phone: shippingForm.phone,
            line1: shippingForm.line1,
            line2: shippingForm.line2,
            city: shippingForm.city,
            state: shippingForm.state,
            postalCode: shippingForm.postalCode,
            country: shippingForm.country,
          },
          paymentMethod: paymentMethod, // RAZORPAY or COD
          discount: discountAmount,
          giftWrap: giftWrap,
          items: cart.map(item => ({
            productId: item.productId,
            variantId: item.variantId || null,
            quantity: item.quantity
          }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setOrderError(data.error || "Failed to place your luxury order. Please try again.");
      } else {
        setOrderId(data.id || "AN-88492");
        clearCart();
        setStep(3); // success
      }
    } catch (err) {
      console.error("Failed to place order:", err);
      setOrderError("An unexpected error occurred while processing your order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

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
          {orderError && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-sm font-semibold mb-6 animate-in fade-in slide-in-from-top-1">
              {orderError}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-left duration-500">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-secondary ">Shipping Information</h2>
                <Link href="/" className="text-sm font-bold text-gray-400 hover:text-primary flex items-center gap-1">
                  <ChevronLeft size={16} /> Back
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={shippingForm.fullName}
                    onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none text-sm font-semibold text-secondary" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    value={shippingForm.phone}
                    onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none text-sm font-semibold text-secondary" 
                    placeholder="+91 98765 43210" 
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Address Line 1 *</label>
                  <input 
                    type="text" 
                    required
                    value={shippingForm.line1}
                    onChange={(e) => setShippingForm({ ...shippingForm, line1: e.target.value })}
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none text-sm font-semibold text-secondary" 
                    placeholder="Apartment, Street, Area" 
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Address Line 2 (Optional)</label>
                  <input 
                    type="text" 
                    value={shippingForm.line2}
                    onChange={(e) => setShippingForm({ ...shippingForm, line2: e.target.value })}
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none text-sm font-semibold text-secondary" 
                    placeholder="Landmark, Near by, etc" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">City *</label>
                  <input 
                    type="text" 
                    required
                    value={shippingForm.city}
                    onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none text-sm font-semibold text-secondary" 
                    placeholder="Mumbai" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Postal Code *</label>
                  <input 
                    type="text" 
                    required
                    value={shippingForm.postalCode}
                    onChange={(e) => setShippingForm({ ...shippingForm, postalCode: e.target.value })}
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none text-sm font-semibold text-secondary" 
                    placeholder="400001" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">State *</label>
                  <div className="relative">
                    <select
                      value={shippingForm.state}
                      onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                      className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none text-sm font-semibold text-secondary appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select State / UT</option>
                      {INDIAN_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Country</label>
                  <input 
                    type="text" 
                    readOnly
                    disabled
                    value="India"
                    className="w-full px-5 py-3 bg-gray-100/50 border border-gray-150 rounded-xl outline-none text-sm font-semibold text-gray-400 cursor-not-allowed select-none" 
                  />
                  <p className="text-[10px] text-primary/70 font-semibold italic mt-1">✦ Currently shipping in India only</p>
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

              <Button 
                variant="gold" 
                className="w-full py-5 text-lg font-bold" 
                onClick={() => {
                  const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
                  const pinRegex = /^[1-9][0-9]{5}$/;

                  if (!shippingForm.fullName.trim() || !shippingForm.phone.trim() || !shippingForm.line1.trim() || !shippingForm.city.trim() || !shippingForm.postalCode.trim() || !shippingForm.state) {
                    setOrderError("Please fill out all required fields marked with *");
                    return;
                  }

                  if (!phoneRegex.test(shippingForm.phone.replace(/[\s-]/g, ""))) {
                    setOrderError("Please enter a valid 10-digit Indian phone number.");
                    return;
                  }

                  if (!pinRegex.test(shippingForm.postalCode.trim())) {
                    setOrderError("Please enter a valid 6-digit Indian PIN code (postal code).");
                    return;
                  }

                  if (!INDIAN_STATES.includes(shippingForm.state)) {
                    setOrderError("Please select a valid Indian State/Union Territory from the list.");
                    return;
                  }

                  setOrderError("");
                  setStep(2);
                }}
              >
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
                {/* Pay Online Option */}
                <div 
                  onClick={() => setPaymentMethod("RAZORPAY")}
                  className={`p-6 border-2 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === "RAZORPAY" 
                      ? "border-primary bg-primary/5" 
                      : "border-gray-100 hover:border-primary/20 hover:bg-gray-50/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full bg-white shadow-sm transition-colors ${paymentMethod === "RAZORPAY" ? "text-primary" : "text-gray-400"}`}>
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary">Pay Online</h4>
                      <p className="text-xs text-gray-500">UPI, Card, NetBanking</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-4 transition-all ${paymentMethod === "RAZORPAY" ? "border-primary" : "border-gray-200"}`} />
                </div>
                
                {/* Cash on Delivery Option */}
                <div 
                  onClick={() => {
                    if (grandTotal < 10000) {
                      setPaymentMethod("COD");
                    }
                  }}
                  className={`p-6 border rounded-2xl flex items-center justify-between transition-all ${
                    grandTotal >= 10000 
                      ? "opacity-40 cursor-not-allowed border-gray-100 bg-gray-50/50" 
                      : "cursor-pointer"
                  } ${
                    paymentMethod === "COD"
                      ? "border-2 border-primary bg-primary/5" 
                      : "border-gray-100 hover:border-primary/20 hover:bg-gray-50/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full bg-white shadow-sm transition-colors ${paymentMethod === "COD" ? "text-primary" : "text-gray-400"}`}>
                      <Truck size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary">Cash on Delivery</h4>
                      <p className="text-xs text-gray-500">
                        {grandTotal >= 10000 
                          ? "Unavailable (Orders must be under ₹10,000)" 
                          : "Available on orders below ₹10,000"}
                      </p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 transition-all ${paymentMethod === "COD" ? "border-4 border-primary" : "border-gray-200"}`} />
                </div>
              </div>

              <div className="p-6 bg-background-soft rounded-2xl border border-primary/10 flex items-start gap-4">
                <ShieldCheck className="text-primary mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-secondary text-sm">Secure Transaction</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">Your payment information is encrypted and processed securely. We do not store your card details.</p>
                </div>
              </div>

              <Button 
                variant="gold" 
                className="w-full py-5 text-lg font-bold shadow-2xl shadow-primary/30 flex items-center justify-center gap-2" 
                onClick={handlePlaceOrder}
                disabled={placingOrder}
              >
                {placingOrder ? (
                  <>
                    <Loader2 className="animate-spin text-white" size={20} />
                    <span>Processing Luxury Order...</span>
                  </>
                ) : (
                  <span>Complete Payment of ₹{grandTotal.toLocaleString()}</span>
                )}
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
                <p className="text-gray-500 max-w-md mx-auto">
                  Thank you for shopping with <span className="logo text-primary">Zivora</span>. Your order <span className="font-mono font-bold text-secondary">#{orderId}</span> is being prepared for shipment.
                </p>
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

              {/* Coupon Code Section */}
              <div className="py-6 border-t border-gray-100">
                {!appliedCoupon ? (
                  <div className="space-y-4">
                    {availableCoupons.length > 0 && (
                      <div className="space-y-1.5 animate-in fade-in duration-300">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                          Available Offers
                        </label>
                        <div className="relative">
                          <select
                            onChange={(e) => {
                              const code = e.target.value;
                              if (code) {
                                handleApplyCoupon(undefined, code);
                              }
                            }}
                            defaultValue=""
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none text-sm font-semibold text-secondary appearance-none cursor-pointer"
                          >
                            <option value="" disabled>Select a special offer...</option>
                            {availableCoupons.map((c) => (
                              <option key={c.id} value={c.code}>
                                {c.code} - {c.discountType === "percentage" ? `${c.discount}% Off` : `₹${c.discount} Off`}{c.minAmount ? ` (Min: ₹${c.minAmount.toLocaleString()})` : ""}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}

                    <form onSubmit={(e) => handleApplyCoupon(e)} className="space-y-3">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                        Or Enter Coupon Manually
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-grow">
                          <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input
                            type="text"
                            placeholder="ENTER COUPON CODE"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none text-sm uppercase tracking-wider font-semibold placeholder:text-gray-300 placeholder:normal-case placeholder:tracking-normal font-sans"
                          />
                        </div>
                        <Button
                          type="submit"
                          variant="dark"
                          disabled={couponLoading || !couponCode.trim()}
                          className="px-6 py-3 text-sm font-bold rounded-xl flex items-center justify-center min-w-[90px]"
                        >
                          {couponLoading ? (
                            <Loader2 className="animate-spin text-white" size={16} />
                          ) : (
                            "Apply"
                          )}
                        </Button>
                      </div>
                      {couponError && (
                        <p className="text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1 duration-200">
                          {couponError}
                        </p>
                      )}
                    </form>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                      Applied Coupon
                    </label>
                    <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-xl animate-in zoom-in-95 duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <CheckCircle2 size={16} />
                        </div>
                        <div>
                          <span className="font-bold text-secondary text-sm tracking-wider uppercase">{appliedCoupon.code}</span>
                          <p className="text-xs text-primary font-semibold">Saved ₹{appliedCoupon.discountAmount.toLocaleString()}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="p-1 hover:bg-primary/10 rounded-full text-gray-400 hover:text-primary transition-colors"
                        title="Remove Coupon"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-8 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-medium">Subtotal</span>
                  <span className="text-secondary font-bold">₹{subtotal.toLocaleString()}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-sm text-primary font-medium animate-in fade-in duration-300">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-medium">Shipping</span>
                  <span className="text-green-600 font-bold tracking-wider">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-medium font-bold">GST (3%)</span>
                  <span className="text-secondary font-bold">₹{gstAmount.toLocaleString()}</span>
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
                  <span className="text-primary font-bold">₹{grandTotal.toLocaleString()}</span>
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
