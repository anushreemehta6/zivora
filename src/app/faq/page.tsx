"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left hover:text-primary transition-colors duration-200"
      >
        <span className="text-base font-semibold text-secondary">
          {question}
        </span>
        <ChevronDown 
          size={18} 
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>
      {isOpen && (
        <div className="mt-4 pb-2">
          <p className="text-sm text-gray-500 leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default function FAQPage() {
  const faqCategories = [
    {
      title: "Orders & Payments",
      questions: [
        {
          question: "How can I track my order?",
          answer: "Once your order is shipped, we will send tracking details via WhatsApp, Email, and SMS with a direct link to follow the status of your delivery."
        },
        {
          question: "Can I cancel my order?",
          answer: "Yes, you can cancel your order before it has been shipped. If it has already been dispatched, please refuse the delivery to initiate a return and refund."
        },
        {
          question: "What payment methods are accepted?",
          answer: "We accept all major credit and debit cards, UPI, Net Banking, and popular wallets. Cash on Delivery (COD) is available based on pin code eligibility."
        }
      ]
    },
    {
      title: "Shipping & Delivery",
      questions: [
        {
          question: "What are the delivery timelines?",
          answer: "Standard delivery usually takes 4-6 business days within India. For personalized products, please allow 2-3 extra days for crafting."
        },
        {
          question: "Are there shipping charges?",
          answer: "We offer free shipping on all orders above ₹499. For orders below ₹499, a flat shipping fee of ₹99 is applied."
        }
      ]
    },
    {
      title: "Returns & Exchanges",
      questions: [
        {
          question: "How do I return an item?",
          answer: "You can initiate a return within 15 days of delivery by contacting our support team with your order details."
        },
        {
          question: "What items cannot be returned?",
          answer: "Personalized jewelry, made-to-order pieces, and final sale items are not eligible for returns unless they are defective upon arrival."
        }
      ]
    },
    {
      title: "Product Care",
      questions: [
        {
          question: "Is the jewelry made from 925 silver?",
          answer: "Yes, all our jewelry is crafted from authentic 925 sterling silver and comes with a certificate of authenticity."
        },
        {
          question: "How do I care for my silver jewelry?",
          answer: "To prevent tarnishing, store your jewelry in a dry, airtight container and avoid contact with moisture, perfumes, and lotions."
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 font-sans text-gray-800">
      <h1 className="text-3xl font-bold mb-8 border-b pb-4 text-center">Frequently Asked Questions</h1>
      
      <div className="mt-12 space-y-12">
        {faqCategories.map((category, index) => (
          <div key={index}>
            <h2 className="text-xl font-bold mb-6 text-secondary border-l-4 border-primary pl-4">
              {category.title}
            </h2>
            <div className="space-y-2">
              {category.questions.map((q, qIndex) => (
                <FAQItem key={qIndex} question={q.question} answer={q.answer} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 p-8 bg-gray-50 rounded-xl border border-gray-100 text-center">
        <h3 className="text-lg font-bold mb-2">Still need help?</h3>
        <p className="text-sm text-gray-400 mb-6 font-medium uppercase tracking-widest text-[10px]">Contact our support team</p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-sm font-semibold">
          <p>Email: zivora2026@gmail.com</p>
          <p>Phone: +91 95492 58382</p>
        </div>
      </div>
    </div>
  );
}
