'use client';

import Link from 'next/link';

export default function HelpPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Help</h2>
      <p className="text-gray-600 mb-8">Have questions about using Artswrk? We're here to help!</p>

      {/* About Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">About</h3>
        
        <div className="space-y-4">
          <Link 
            href="/terms"
            className="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <span className="text-gray-900">Terms & Conditions</span>
            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
            </svg>
          </Link>

          <Link 
            href="/privacy"
            className="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <span className="text-gray-900">Privacy Policy</span>
            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
            </svg>
          </Link>

          <Link 
            href="/cancellation"
            className="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <span className="text-gray-900">Cancellation Policy</span>
            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h3>
        
        <Link 
          href="/faq"
          className="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
        >
          <span className="text-gray-900">Read our FAQs</span>
          <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>

      {/* Contact Section */}
      <div className="mt-12 space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">Contact Us</h3>
        
        <div className="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-lg">
          <div className="space-y-1">
            <span className="block text-gray-900">Need further assistance? Email us at</span>
            <span className="block text-gray-600">contact@artswrk.com</span>
          </div>
          <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
} 