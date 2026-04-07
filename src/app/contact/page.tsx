"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from "lucide-react";
import Button from "@/components/ui/Button";
import { toast } from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Sending your message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        toast.success("Thank you for reaching out! Your message has been saved.", { id: loadingToast });
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again later.", { id: loadingToast });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Something went wrong. Please check your connection.", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero */}
      <section className="pt-8 relative h-[30vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 mesh-gradient opacity-30 -z-10" />
        <div className="relative text-center space-y-6 max-w-3xl px-8">
          <h1 className="text-5xl md:text-7xl font-bold text-secondary  tracking-tighter">
            Get in <span className="text-primary underline decoration-primary/30 underline-offset-8">Touch</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed font-medium">
            Our team is here to assist you with everything from product inquiries to custom design requests.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Info Cards */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-secondary ">Contact Information</h2>
            <p className="text-gray-500 font-medium tracking-wide">Reach out via any of these channels.</p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Phone</p>
                <p className="text-lg font-bold text-secondary ">+91 95492 58382</p>
                <p className="text-xs text-gray-400 font-medium">(10 AM to 6:30 PM IST)</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
                <p className="text-lg font-bold text-secondary ">zivora2026@gmail.com</p>
                <p className="text-xs text-gray-400 font-medium">Average response time: 4 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Visit Store</p>
                <p className="text-lg font-bold text-secondary  max-w-sm">
                  D-35 Shanti Nagar, Jaipur, Rajasthan 302006
                </p>
              </div>
            </div>
          </div>


        </div>

        {/* Form */}
        <div className="lg:col-span-7 bg-white rounded-[3rem] border border-gray-100 shadow-sm p-12 lg:p-16">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              <MessageSquare size={20} />
            </div>
            <h2 className="text-2xl font-bold  text-secondary">Send us a Message</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Your Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Subject</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none"
                placeholder="Product Inquiry / Custom Request"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={6}
                className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-primary/20 transition-all outline-none resize-none"
                placeholder="Tell us more about your inquiry..."
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="w-full py-5 text-sm font-bold uppercase tracking-widest group shadow-2xl shadow-primary/20 disabled:opacity-50 flex justify-center items-center gap-4"
            >
              {!loading && <Send size={16} className="" />}
              {loading ? "Sending..." : "Send Message"}

            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
