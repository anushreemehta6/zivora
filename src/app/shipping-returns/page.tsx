import React from 'react';

export default function ShippingReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 font-sans text-gray-800">
      <h1 className="text-3xl font-bold mb-8 border-b pb-4">Shipping & Returns</h1>
      
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-secondary">Shipping Policy</h2>
        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            <strong>Processing Time:</strong> All orders are processed within 24-48 business hours. You will receive a notification with tracking details once your order has been dispatched.
          </p>
          <p>
            <strong>Delivery Time:</strong> Standard shipping typically takes 4-6 business days across India. Please note that delivery times may vary based on your location and courier availability.
          </p>
          <p>
            <strong>Shipping Charges:</strong> Free shipping is available on all orders above ₹499. For orders below ₹499, a flat shipping fee of ₹99 will be applied at checkout.
          </p>
          <p>
            <strong>Tracking:</strong> Real-time tracking updates will be sent via WhatsApp, Email, and SMS once your order is on its way.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-secondary">Return & Exchange Policy</h2>
        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            We offer a <strong>15-day return policy</strong> for most items. If you are not satisfied with your purchase, you can initiate a return within 15 days of receiving the delivery.
          </p>
          <h3 className="font-bold mt-6 mb-2">Conditions for Returns:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Items must be unused, unworn, and in their original packaging.</li>
            <li>Original invoice and any certificates must be included with the return.</li>
            <li>Items showing signs of wear or damage will not be eligible for a refund.</li>
          </ul>
          
          <h3 className="font-bold mt-6 mb-2">Non-Returnable Items:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Personalized or engraved jewelry.</li>
            <li>Custom-made or made-to-order pieces.</li>
            <li>Final sale/clearance items.</li>
            <li>Coins and God idols.</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-secondary">Refund Process</h2>
        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            1. <strong>Verification:</strong> Once we receive your returned item, it will undergo a quality check (typically 1-2 business days).
          </p>
          <p>
            2. <strong>Initiation:</strong> After successful verification, the refund will be initiated to your original payment method.
          </p>
          <p>
            3. <strong>Completion:</strong> Depending on your bank, it may take 4-7 business days for the refund to reflect in your account.
          </p>
        </div>
      </section>

      <div className="mt-16 p-8 bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-sm font-medium mb-2">Need Help?</p>
        <p className="text-sm text-gray-600">
          For any queries regarding your order, shipping, or returns, please contact our support team.
        </p>
        <div className="mt-4 text-sm font-semibold">
          <p>Email: zivora2026@gmail.com</p>
          <p>Phone: +91 95492 58382</p>
        </div>
      </div>
    </div>
  );
}
