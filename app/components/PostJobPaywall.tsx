'use client';

import { useState } from 'react';
import { FaTimes, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import PricingPlans from './PricingPlans';

interface PostJobPaywallProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanSelect: (planType: string) => void;
  onContinue: () => void;
  currentPlan?: {
    type: string;
    postsRemaining?: number;
    postsUsed?: number;
    postsLimit?: number;
  };
}

export default function PostJobPaywall({ 
  isOpen, 
  onClose, 
  onPlanSelect, 
  onContinue,
  currentPlan 
}: PostJobPaywallProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const handlePlanSelect = (planType: string) => {
    setSelectedPlan(planType);
    onPlanSelect(planType);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        {/* Current Plan Status */}
        {currentPlan && (
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Current Plan: {currentPlan.type === 'basic-subscription' ? 'Basic' : currentPlan.type === 'pro-subscription' ? 'Pro' : 'Pay Per Post'}</h3>
              {currentPlan.type === 'basic-subscription' && (
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-500">
                    You've posted {currentPlan.postsUsed} of {currentPlan.postsLimit} jobs this month
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-pink-600 h-2 rounded-full" 
                      style={{ width: `${(currentPlan.postsUsed || 0) / (currentPlan.postsLimit || 3) * 100}%` }}
                    />
                  </div>
                  {currentPlan.postsRemaining === 0 ? (
                    <p className="flex items-center text-sm text-yellow-800">
                      <FaExclamationCircle className="w-4 h-4 mr-1" />
                      You've reached your monthly limit. Select a plan below to continue posting.
                    </p>
                  ) : (
                    <p className="flex items-center text-sm text-green-700">
                      <FaCheckCircle className="w-4 h-4 mr-1" />
                      {currentPlan.postsRemaining} posts remaining this month
                    </p>
                  )}
                </div>
              )}
              {currentPlan.type === 'pro-subscription' && (
                <p className="mt-1 text-sm text-gray-500 flex items-center">
                  <FaCheckCircle className="w-4 h-4 mr-1 text-green-500" />
                  Unlimited job posts available
                </p>
              )}
            </div>
          </div>
        )}

        {/* Pricing Plans */}
        <div className="p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {currentPlan ? 'Choose a Plan to Post' : 'Select a Plan to Post Your Job'}
            </h2>
            <p className="mt-2 text-gray-500">
              {currentPlan 
                ? 'Select any plan to continue with your job post'
                : 'Select a plan to start posting jobs and finding the perfect candidates'}
            </p>
          </div>
          
          <PricingPlans
            onSelectPlan={handlePlanSelect}
            selectedPlan={selectedPlan}
          />
        </div>
      </div>
    </div>
  );
} 