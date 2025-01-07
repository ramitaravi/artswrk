'use client';

import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const PRICING_PLANS = [
  {
    name: 'Pay Per Post',
    price: 50,
    interval: 'per post',
    description: 'Perfect for one-time hiring needs',
    features: [
      'Single job posting',
      'Active for 30 days',
      'Access to all applicants',
      'Message candidates',
    ],
    buttonText: 'Post a Job - $50',
    type: 'pay-per-post'
  },
  {
    name: 'Basic',
    price: 50,
    interval: '/month',
    billingNote: 'billed annually',
    description: 'Great for regular hiring needs',
    features: [
      'Up to 3 active job posts per month',
      'Posts active for 30 days',
      'Access to all applicants',
      'Message candidates',
      'Priority support'
    ],
    buttonText: 'Subscribe - $50/mo',
    type: 'basic-subscription',
    popular: true
  },
  {
    name: 'Pro',
    price: 150,
    interval: '/month',
    billingNote: 'billed annually',
    description: 'Best for high-volume hiring',
    features: [
      'Unlimited job posts',
      'Posts active for 30 days',
      'Access to all applicants',
      'Message candidates',
      'Priority support',
      'Featured job posts',
      'Advanced analytics'
    ],
    buttonText: 'Subscribe - $150/mo',
    type: 'pro-subscription'
  }
];

interface PricingPlansProps {
  onSelectPlan: (planType: string) => void;
  selectedPlan?: string;
}

export default function PricingPlans({ onSelectPlan, selectedPlan }: PricingPlansProps) {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that best fits your hiring needs
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.type}
              className={`rounded-lg shadow-sm divide-y divide-gray-200 ${
                plan.popular ? 'border-2 border-pink-500' : 'border border-gray-200'
              }`}
            >
              <div className="p-6">
                {plan.popular && (
                  <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-pink-100 text-pink-600 mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold leading-6 text-gray-900">{plan.name}</h3>
                <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-base font-medium text-gray-500">{plan.interval}</span>
                </p>
                {plan.billingNote && (
                  <p className="mt-1 text-sm text-gray-500">{plan.billingNote}</p>
                )}
                <button
                  onClick={() => onSelectPlan(plan.type)}
                  className={`mt-8 block w-full py-2 px-4 border rounded-md text-sm font-semibold text-center ${
                    selectedPlan === plan.type
                      ? 'bg-pink-600 border-transparent text-white hover:bg-pink-700'
                      : 'border-pink-600 text-pink-600 hover:bg-pink-50'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide">What's included</h4>
                <ul className="mt-4 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <FaCheck className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 