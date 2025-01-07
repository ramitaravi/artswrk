'use client';

import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

interface PlanFeature {
  title: string;
  basic: boolean;
  pro: boolean;
  highlight?: boolean;
}

export default function SubscriptionPage() {
  const [currentPlan] = useState<'basic' | 'pro'>('pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const features: PlanFeature[] = [
    { title: 'Create artist profile', basic: true, pro: true },
    { title: 'Basic job notifications', basic: true, pro: true },
    { title: 'Share profile link', basic: true, pro: true },
    { title: 'Priority in search results', basic: false, pro: true, highlight: true },
    { title: 'Access to premium jobs ($500+)', basic: false, pro: true, highlight: true },
    { title: 'Health insurance benefits', basic: false, pro: true },
    { title: 'Sick pay coverage', basic: false, pro: true },
    { title: 'Early access to new features', basic: false, pro: true },
    { title: 'Priority support', basic: false, pro: true },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Subscription</h2>
      <p className="text-gray-600 mb-8">Choose the plan that works best for you</p>

      {/* Billing Cycle Toggle */}
      <div className="mb-8">
        <div className="inline-flex p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-white text-gray-900 shadow'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
              billingCycle === 'yearly'
                ? 'bg-white text-gray-900 shadow'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Yearly
            <span className="ml-1 text-pink-600">(Save 15%)</span>
          </button>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Basic Plan */}
        <div className="relative bg-white border border-gray-200 rounded-2xl p-8">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Basic</h3>
            <p className="text-gray-500">Essential features to get started</p>
            <div className="mt-4">
              <span className="text-4xl font-bold text-gray-900">Free</span>
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <li
                key={index}
                className={`flex items-center gap-3 ${
                  !feature.basic ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {feature.basic ? (
                  <FaCheck className="w-5 h-5 text-pink-600 flex-shrink-0" />
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-200 rounded-full flex-shrink-0" />
                )}
                <span>{feature.title}</span>
              </li>
            ))}
          </ul>

          <button
            className={`w-full px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
              currentPlan === 'basic'
                ? 'bg-gray-100 text-gray-400 cursor-default'
                : 'bg-white border-2 border-black text-black hover:bg-gray-50'
            }`}
            disabled={currentPlan === 'basic'}
          >
            {currentPlan === 'basic' ? 'Current Plan' : 'Downgrade to Basic'}
          </button>
        </div>

        {/* Pro Plan */}
        <div className="relative bg-gradient-to-br from-black to-gray-900 rounded-2xl p-8 text-white">
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 text-xs font-medium bg-pink-600 text-white rounded-full">
              RECOMMENDED
            </span>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Artswrk PRO</h3>
            <p className="text-gray-400">Everything you need to succeed</p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-bold">
                ${billingCycle === 'monthly' ? '10.99' : '110'}
              </span>
              <span className="text-gray-400">
                /{billingCycle === 'monthly' ? 'month' : 'year'}
              </span>
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <li
                key={index}
                className={`flex items-center gap-3 ${
                  feature.highlight ? 'text-pink-400' : 'text-gray-300'
                }`}
              >
                <FaCheck className={`w-5 h-5 ${
                  feature.highlight ? 'text-pink-500' : 'text-pink-600'
                } flex-shrink-0`} />
                <span>{feature.title}</span>
              </li>
            ))}
          </ul>

          <button
            className={`w-full px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
              currentPlan === 'pro'
                ? 'bg-gray-800 text-gray-400 cursor-default'
                : 'bg-pink-600 text-white hover:bg-pink-700'
            }`}
            disabled={currentPlan === 'pro'}
          >
            {currentPlan === 'pro' ? 'Current Plan' : 'Upgrade to PRO'}
          </button>
        </div>
      </div>

      {/* FAQ or Additional Info */}
      <div className="mt-12 py-8 border-t border-gray-200">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Flexible Billing</h4>
            <p className="text-sm text-gray-500">
              Choose between monthly or yearly billing. Cancel or change your plan anytime.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Premium Support</h4>
            <p className="text-sm text-gray-500">
              Get priority access to our support team and dedicated account management.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Money Back Guarantee</h4>
            <p className="text-sm text-gray-500">
              Not satisfied? Get a full refund within the first 30 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 