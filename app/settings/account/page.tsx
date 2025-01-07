'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AccountSettingsPage() {
  const [email] = useState('ramitaravi.94@gmail.com'); // This would come from your auth context

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Account</h2>
      <p className="text-gray-600 mb-8">Manage your Artswrk account information below</p>

      <div className="divide-y divide-gray-200">
        {/* Email Section */}
        <div className="py-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Email</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">{email}</span>
            <button className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" fill="currentColor"/>
              </svg>
              Link Google Account
            </button>
          </div>
        </div>

        {/* Password Section */}
        <div className="py-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Password</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">••••••••••••</span>
            <Link 
              href="/settings/account/reset-password"
              className="text-sm font-medium text-gray-900 hover:underline"
            >
              Reset Password
            </Link>
          </div>
        </div>

        {/* Manage Payouts Section */}
        <div className="py-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Manage Payouts</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">You're connected to Stripe</span>
              <span className="text-yellow-600">🎉</span>
            </div>
            <button className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
              </svg>
              View Stripe Dashboard
            </button>
          </div>
        </div>

        {/* Delete Account Section */}
        <div className="py-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Account</h3>
          <div>
            <p className="text-gray-600 mb-4">Do you want to delete your account?</p>
            <button className="text-sm font-medium text-red-600 hover:text-red-700">
              Email Artswrk to Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 