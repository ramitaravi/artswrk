'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ARTIST_CATEGORIES = [
  'Dance Teachers',
  'Music Teachers',
  'Art Teachers',
  'Vocal Coaches',
  'Piano Teachers',
  'Guitar Teachers',
  'Drum Teachers',
  'Acting Coaches',
  'Yoga Instructors',
  'Fitness Trainers'
];

const BUSINESS_TYPES = [
  'Dance Studio',
  'Dance Competition',
  'Music School',
  'Art School',
  'Event Company',
  'Theater Company',
  'Startup',
  'Educational Institution',
  'Community Center',
  'Fitness Center'
];

const SUBSCRIPTION_PLANS = [
  {
    name: 'Pay Per Post',
    price: '50',
    period: 'per post',
    features: [
      'Single job posting',
      'Active for 30 days',
      'Access to artist directory',
      'Direct messaging with applicants'
    ]
  },
  {
    name: 'Basic',
    price: '50',
    period: 'month',
    features: [
      '3 job postings per month',
      'Access to artist directory',
      'Direct messaging with applicants',
      'Featured company profile'
    ]
  },
  {
    name: 'Pro',
    price: '100',
    period: 'month',
    features: [
      'Unlimited job postings',
      'Priority placement in search',
      'Advanced artist filters',
      'Analytics dashboard',
      'Bulk messaging',
      'Featured company profile'
    ]
  }
];

export default function ClientOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [accountType, setAccountType] = useState<'company' | 'individual' | null>(null);
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    location: '',
    type: '',
    website: ''
  });
  const [location, setLocation] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleCategorySelection = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleNext = () => {
    if (step === 5) {
      router.push('/dashboard');
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSkip = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="min-h-screen flex">
        {/* Left Content */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-full max-w-md">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-full h-1 rounded-full mx-1 ${
                      i <= step ? 'client-gradient' : 'bg-gray-100'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">Step {step} of 5</p>
            </div>

            {/* Step 1: Artist Categories */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    What type of artists do you hire?
                  </h1>
                  <p className="text-gray-500">Select all that apply to your needs</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {ARTIST_CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelection(category)}
                      className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                        selectedCategories.includes(category)
                          ? 'border-[#FFBC5D] bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category}</span>
                        <div className={`w-5 h-5 rounded-full border-2 ${
                          selectedCategories.includes(category)
                            ? 'border-[#FFBC5D] bg-[#FFBC5D]'
                            : 'border-gray-300'
                        }`}>
                          {selectedCategories.includes(category) && (
                            <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Account Type */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    How do you hire artists?
                  </h1>
                  <p className="text-gray-500">Choose your account type</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setAccountType('company')}
                    className={`w-full p-6 rounded-xl border-2 text-left transition-all ${
                      accountType === 'company'
                        ? 'border-[#FFBC5D] bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        accountType === 'company' ? 'bg-[#FFBC5D]' : 'bg-gray-100'
                      }`}>
                        <svg className={`w-6 h-6 ${accountType === 'company' ? 'text-white' : 'text-gray-500'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Hiring as a Company</div>
                        <p className="text-sm text-gray-500">I represent a business or organization</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setAccountType('individual')}
                    className={`w-full p-6 rounded-xl border-2 text-left transition-all ${
                      accountType === 'individual'
                        ? 'border-[#FFBC5D] bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        accountType === 'individual' ? 'bg-[#FFBC5D]' : 'bg-gray-100'
                      }`}>
                        <svg className={`w-6 h-6 ${accountType === 'individual' ? 'text-white' : 'text-gray-500'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Hiring as an Individual</div>
                        <p className="text-sm text-gray-500">I'm hiring for personal needs</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Company Information */}
            {step === 3 && accountType === 'company' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    Tell us about your company
                  </h1>
                  <p className="text-gray-500">Add your business information</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={companyInfo.name}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FFBC5D] hover:border-gray-300 transition-colors"
                      placeholder="Enter company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Type
                    </label>
                    <select
                      value={companyInfo.type}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, type: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FFBC5D] hover:border-gray-300 transition-colors"
                    >
                      <option value="">Select business type</option>
                      {BUSINESS_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={companyInfo.location}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, location: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FFBC5D] hover:border-gray-300 transition-colors"
                      placeholder="Enter business location"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      type="text"
                      value={companyInfo.website}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FFBC5D] hover:border-gray-300 transition-colors"
                      placeholder="Enter company website"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Individual Location */}
            {step === 4 && accountType === 'individual' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    Where are you located?
                  </h1>
                  <p className="text-gray-500">Help us find artists in your area</p>
                </div>

                <div>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FFBC5D] hover:border-gray-300 transition-colors"
                    placeholder="Enter your location"
                  />
                </div>
              </div>
            )}

            {/* Step 5: Subscription Plans */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    Choose your plan
                  </h1>
                  <p className="text-gray-500">Select the best option for your needs</p>
                </div>

                <div className="space-y-4">
                  {SUBSCRIPTION_PLANS.map((plan) => (
                    <button
                      key={plan.name}
                      onClick={() => setSelectedPlan(plan.name)}
                      className={`w-full p-6 rounded-xl border-2 text-left transition-all ${
                        selectedPlan === plan.name
                          ? 'border-[#FFBC5D] bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="font-medium mb-1">{plan.name}</div>
                          <div className="text-2xl font-semibold">${plan.price}<span className="text-sm font-normal text-gray-500">/{plan.period}</span></div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 ${
                          selectedPlan === plan.name
                            ? 'border-[#FFBC5D] bg-[#FFBC5D]'
                            : 'border-gray-300'
                        }`}>
                          {selectedPlan === plan.name && (
                            <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-2 text-[#FFBC5D]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8">
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="text-gray-500 font-medium hover:text-gray-700"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}

              <div className="flex items-center gap-4">
                {step < 5 && (
                  <button
                    onClick={handleSkip}
                    className="text-gray-500 font-medium hover:text-gray-700"
                  >
                    Skip
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#FFBC5D] to-[#F25722] text-white font-medium rounded-full hover:opacity-90 transition-opacity"
                >
                  {step === 5 ? 'Complete' : 'Continue'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Gradient */}
        <div className="hidden lg:block w-1/2 bg-gradient-to-br from-[#FFBC5D] to-[#F25722]" />
      </div>
    </div>
  );
} 