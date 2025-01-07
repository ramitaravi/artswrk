'use client';

import { useState } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';

interface MessageArtistPaywallProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanSelect: (planType: string) => void;
  artistName: string;
  currentPlan?: {
    type: string;
    messagesRemaining?: number;
  };
}

const MESSAGING_PLANS = [
  {
    name: 'Basic Plan',
    price: 50,
    interval: '/month',
    billingNote: 'billed annually',
    description: 'Perfect for occasional hiring',
    features: [
      'Message up to 10 artists per month',
      'View artist profiles',
      'Post up to 3 jobs per month',
      'Basic support'
    ],
    type: 'basic-subscription'
  },
  {
    name: 'Pro Plan',
    price: 150,
    interval: '/month',
    billingNote: 'billed annually',
    description: 'Best for active hiring',
    features: [
      'Unlimited artist messages',
      'Priority artist responses',
      'Unlimited job posts',
      'Featured job posts',
      'Priority support'
    ],
    type: 'pro-subscription',
    popular: true
  }
];

export default function MessageArtistPaywall({ 
  isOpen, 
  onClose, 
  onPlanSelect,
  artistName,
  currentPlan 
}: MessageArtistPaywallProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const handlePlanSelect = (planType: string) => {
    setSelectedPlan(planType);
    onPlanSelect(planType);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Message {artistName}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Choose a plan to start messaging artists and find the perfect talent for your needs
          </p>
        </div>

        {/* Current Plan Status (if exists) */}
        {currentPlan && (
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {currentPlan.type === 'pro-subscription' ? (
                    'You have unlimited messages available'
                  ) : currentPlan.messagesRemaining ? (
                    `You have ${currentPlan.messagesRemaining} messages remaining this month`
                  ) : (
                    'You've reached your monthly message limit'
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Plans */}
        <div className="p-6">
          <div className="space-y-4">
            {MESSAGING_PLANS.map((plan) => (
              <div
                key={plan.type}
                className={`rounded-lg border ${
                  plan.popular ? 'border-2 border-pink-500' : 'border-gray-200'
                } p-6 hover:border-pink-500 transition-colors cursor-pointer`}
                onClick={() => handlePlanSelect(plan.type)}
              >
                {plan.popular && (
                  <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-pink-100 text-pink-600 mb-4">
                    Recommended
                  </span>
                )}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                    <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-500">{plan.interval}</span>
                    {plan.billingNote && (
                      <p className="text-xs text-gray-500">{plan.billingNote}</p>
                    )}
                  </div>
                </div>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanSelect(plan.type)}
                  className={`mt-6 w-full py-2 px-4 border rounded-md text-sm font-semibold text-center ${
                    selectedPlan === plan.type
                      ? 'bg-pink-600 border-transparent text-white hover:bg-pink-700'
                      : 'border-pink-600 text-pink-600 hover:bg-pink-50'
                  }`}
                >
                  Select {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 