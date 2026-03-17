import React from "react";
import { FaHeadset, FaWhatsapp } from "react-icons/fa6";


const Pricing = () => {
  return (
    <div className="min-h-[91vh] bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 p-6 md:p-10">
        <h2 className="text-3xl font-bold text-gray-800">Support</h2>
        <p className="text-gray-600 mt-3">
          Ordorra is currently free for all users. If you need help, have feedback,
          or want to support the project, reach out anytime.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <a
            href="mailto:support@ordorra.app"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition"
          >
            <FaHeadset />
            Email Support
          </a>
          <a
            href="https://wa.me/2349039834937"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg font-medium transition"
          >
            <FaWhatsapp />
            Contact on WhatsApp
          </a>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Update the WhatsApp number above in this file to your preferred support line.
        </p>
      </div>
    </div>
  );
};

export default Pricing;
