'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCreditCard, FaHistory, FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';

interface ImpersonatedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  clientStripeCardId?: string;
  clientStripeCustomerId?: string;
  artistStripeAccountId?: string;
}

interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  type: 'payment' | 'payout';
  bookingId: string;
  description: string;
}

export default function PaymentPage() {
  const router = useRouter();
  const [impersonatedUser, setImpersonatedUser] = useState<ImpersonatedUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('impersonatedUser');
    if (storedUser) {
      setImpersonatedUser(JSON.parse(storedUser));
    }
  }, []);

  // Placeholder data - would come from your API
  const totalSpend = 2450.00;
  const pendingPayments = 350.00;

  const transactions: Transaction[] = [
    {
      id: '1',
      date: '2024-01-20',
      amount: 250.00,
      status: 'completed',
      type: 'payment',
      bookingId: 'booking-1',
      description: 'Dance Class with Sarah'
    },
    {
      id: '2',
      date: '2024-01-18',
      amount: 180.00,
      status: 'pending',
      type: 'payment',
      bookingId: 'booking-2',
      description: 'Piano Lesson with John'
    },
    {
      id: '3',
      date: '2024-01-15',
      amount: 300.00,
      status: 'completed',
      type: 'payout',
      bookingId: 'booking-3',
      description: 'Wedding Dance Training'
    },
    {
      id: '4',
      date: '2024-01-12',
      amount: 150.00,
      status: 'failed',
      type: 'payment',
      bookingId: 'booking-4',
      description: 'Guitar Lesson'
    }
  ];

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <FaClock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <FaExclamationCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusStyles = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Wallet</h1>
          {impersonatedUser?.role === 'Artist' ? (
            <button className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
              <FaCreditCard className="w-4 h-4 mr-2" />
              Set Up Direct Deposit
            </button>
          ) : (
            <button className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
              <FaCreditCard className="w-4 h-4 mr-2" />
              Add Payment Method
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Card and Actions */}
          <div className="w-full lg:w-[320px]">
            {/* Fixed Credit Card Looking Component */}
            <div className="sticky top-8">
              {/* Credit Card Component */}
              <div className={`w-[320px] rounded-2xl p-8 text-white shadow-xl ${
                impersonatedUser?.role === 'Artist' 
                  ? 'bg-artist-gradient' 
                  : 'bg-business-gradient'
              }`}>
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-white/80 text-sm mb-1">Total {impersonatedUser?.role === 'Artist' ? 'Earnings' : 'Spend'}</p>
                    <p className="text-3xl font-bold">${totalSpend.toFixed(2)}</p>
                  </div>
                  <FaCreditCard className="w-8 h-8 text-white/80" />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white/80 text-sm mb-1">
                      {impersonatedUser?.role === 'Artist' ? 'Pending Payouts' : 'Pending Payments'}
                    </p>
                    <p className="text-xl font-semibold">${pendingPayments.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 text-sm mb-1">Account</p>
                    <p className="font-medium">{impersonatedUser?.name || 'Guest'}</p>
                  </div>
                </div>
              </div>

              {/* Action Cards */}
              <div className="w-[320px] grid grid-cols-1 gap-4 mt-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Pending Actions</h3>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                      2 pending
                    </span>
                  </div>
                  <button className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                    View Pending
                  </button>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Payment Methods</h3>
                    <FaCreditCard className="w-5 h-5 text-gray-400" />
                  </div>
                  <button className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                    Manage
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Transactions */}
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
                  <FaHistory className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {transactions.map(transaction => (
                  <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${
                          transaction.type === 'payout' ? 'text-green-600' : 'text-gray-900'
                        }`}>
                          {transaction.type === 'payout' ? '+' : '-'}${transaction.amount.toFixed(2)}
                        </p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          getStatusStyles(transaction.status)
                        }`}>
                          {getStatusIcon(transaction.status)}
                          <span className="ml-1 capitalize">{transaction.status}</span>
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => router.push(`/booking/artist/${transaction.bookingId}`)}
                      className="text-sm text-pink-600 hover:text-pink-700"
                    >
                      View Booking →
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-gray-200">
                <button className="w-full text-center text-sm text-gray-600 hover:text-gray-900">
                  View All Transactions →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 