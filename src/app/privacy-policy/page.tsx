import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 font-sans text-gray-800">
      <h1 className="text-3xl font-bold mb-8 border-b pb-4">Privacy Policy</h1>

      <p className="text-sm leading-relaxed mb-10 text-gray-600">
        This Privacy Policy explains how Zivora collects, uses, and protects your information when you visit or shop on our website. We are committed to ensuring your privacy and protecting your data.
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-secondary">Information We Collect</h2>
          <div className="space-y-4 text-sm leading-relaxed text-gray-600">
            <p>
              <strong>Order Information:</strong> When you place an order, we collect your name, email address, shipping and billing address, and phone number to fulfill the transaction.
            </p>
            <p>
              <strong>Technical Information:</strong> We automatically collect data when you browse our site, including your IP address, browser type, and time zone. This is used to understand site usage and improve our services.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-secondary">How We Use Information</h2>
          <div className="space-y-4 text-sm leading-relaxed text-gray-600">
            <p>
              We use your personal data to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Process payments and arrange for shipping.</li>
              <li>Send order confirmations, invoices, and updates.</li>
              <li>Communicate with you regarding our products and services.</li>
              <li>Monitor for potential fraud or security risks.</li>
              <li>Personalize your shopping experience with relevant collections and marketing (only with your consent).</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-secondary">Data Sharing</h2>
          <p className="text-sm leading-relaxed text-gray-600">
            We share your data only with third-party service providers who assist us in fulfilling orders, such as logistics companies and secure payment gateways. We never sell your personal information to outside marketers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-secondary">Security</h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Your personal information is stored securely, and we use SSL encryption for all online transactions. While we strive to protect your data, please be aware that no online transmission is entirely secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-secondary">Your Rights</h2>
          <p className="text-sm leading-relaxed text-gray-600">
            You have the right to request access to the personal data we hold about you, and to ask that it be corrected or deleted. Please contact us at the email below for any data-related requests.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-secondary">Data Retention</h2>
          <p className="text-sm leading-relaxed text-gray-600">
            We retain order information for our records to provide ongoing customer support and warranty services unless you request its deletion.
          </p>
        </section>
      </div>

      <div className="mt-16 pt-10 border-t border-gray-200">
        <p className="text-sm font-semibold mb-1">Contact Us</p>
        <p className="text-sm text-gray-600">
          Email: zivora2026@gmail.com
        </p>
        <p className="text-xs text-gray-400 mt-4">Last Updated: April 2026</p>
      </div>
    </div>
  );
}
