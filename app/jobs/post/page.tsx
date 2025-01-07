'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaBuilding, FaBriefcase, FaCalendar, FaClock, FaDollarSign } from 'react-icons/fa';
import PostJobPaywall from '@/app/components/PostJobPaywall';

interface Company {
  id: string;
  name: string;
  logo?: string;
}

interface ImpersonatedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  clientCompanies?: string;
}

type DateType = 'ongoing' | 'single' | 'flexible' | 'range';
type PaymentType = 'hourly' | 'flat' | 'artist_rate';
type ServiceType = 'music_teacher' | 'dance_teacher' | 'art_teacher' | 'other';

interface JobFormData {
  companyId: string;
  title: string;
  service: ServiceType;
  dateType: DateType;
  paymentType: PaymentType;
  rate?: number;
  description: string;
  startDate?: string;
  endDate?: string;
}

const SERVICES = [
  { id: 'music_teacher', label: 'Music Teacher' },
  { id: 'dance_teacher', label: 'Dance Teacher' },
  { id: 'art_teacher', label: 'Art Teacher' },
  { id: 'other', label: 'Other' }
];

const DATE_TYPES = [
  { id: 'ongoing', label: 'Ongoing Position' },
  { id: 'single', label: 'Single Date' },
  { id: 'flexible', label: 'Dates Flexible' },
  { id: 'range', label: 'Date Range' }
];

const PAYMENT_TYPES = [
  { id: 'hourly', label: 'Hourly Rate' },
  { id: 'flat', label: 'Flat Rate' },
  { id: 'artist_rate', label: 'Ask Artist for Rate' }
];

export default function PostJobPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [formData, setFormData] = useState<JobFormData>({
    companyId: '',
    title: '',
    service: 'music_teacher',
    dateType: 'ongoing',
    paymentType: 'hourly',
    description: ''
  });

  // Paywall state
  const [showPaywall, setShowPaywall] = useState(true);
  const [currentPlan, setCurrentPlan] = useState<{
    type: string;
    postsRemaining?: number;
    postsUsed?: number;
    postsLimit?: number;
  } | undefined>(undefined);

  useEffect(() => {
    // Get user info and companies from localStorage
    const storedUser = localStorage.getItem('impersonatedUser');
    if (storedUser) {
      const user: ImpersonatedUser = JSON.parse(storedUser);
      if (user.clientCompanies) {
        const companiesData = user.clientCompanies.split(',').map(company => ({
          id: company.trim(),
          name: company.trim()
        }));
        setCompanies(companiesData);
        if (companiesData.length === 1) {
          setFormData(prev => ({ ...prev, companyId: companiesData[0].id }));
        }
      }
    }
    checkUserAccess();
  }, []);

  // Check user's subscription status
  const checkUserAccess = async () => {
    try {
      // TODO: Replace with actual API call to check user's subscription status
      const response = await fetch('/api/user/subscription');
      const data = await response.json();
      
      if (data.subscription) {
        setCurrentPlan({
          type: data.subscription.type,
          postsRemaining: data.subscription.postsRemaining,
          postsUsed: data.subscription.postsUsed || 0,
          postsLimit: data.subscription.type === 'basic-subscription' ? 3 : undefined
        });
        
        // Don't automatically hide paywall - let user click through
        if (data.subscription.type === 'pro-subscription' || 
            (data.subscription.type === 'basic-subscription' && data.subscription.postsRemaining > 0)) {
          // Keep showing paywall but user can continue
        }
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const handlePlanSelect = async (planType: string) => {
    // Set the current plan based on selection
    if (planType === 'pay-per-post') {
      setCurrentPlan({
        type: 'pay-per-post',
        postsRemaining: 1,
        postsUsed: 0,
        postsLimit: 1
      });
    } else if (planType === 'basic-subscription') {
      setCurrentPlan({
        type: 'basic-subscription',
        postsRemaining: 3,
        postsUsed: 0,
        postsLimit: 3
      });
    } else if (planType === 'pro-subscription') {
      setCurrentPlan({
        type: 'pro-subscription',
        postsRemaining: undefined, // Unlimited
        postsUsed: 0
      });
    }

    // For now, just continue to the form
    setShowPaywall(false);
    
    // TODO: Later implement payment flow
    // if (planType === 'pay-per-post') {
    //   router.push('/checkout/single-post');
    // } else {
    //   router.push(`/checkout/subscription?plan=${planType}`);
    // }
  };

  const handleContinue = () => {
    setShowPaywall(false);
  };

  const handleInputChange = (field: keyof JobFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit job posting to API
    console.log('Submitting job:', formData);
    router.push('/jobs/clients');
  };

  if (showPaywall) {
    return (
      <PostJobPaywall
        isOpen={true}
        onClose={() => router.push('/jobs/clients')}
        onPlanSelect={handlePlanSelect}
        onContinue={handleContinue}
        currentPlan={currentPlan}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Post a New Job</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create a job posting to find the perfect artist for your needs.
          </p>
        </div>

        {/* Plan Status Banner */}
        <div className="mb-8 bg-gray-50 rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">
                {currentPlan?.type === 'basic-subscription' ? 'Basic Plan' : 
                 currentPlan?.type === 'pro-subscription' ? 'Pro Plan' : 
                 'Pay Per Post'}
              </span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-600">
                {currentPlan?.type === 'pro-subscription' ? (
                  'Unlimited job posts available'
                ) : currentPlan?.type === 'basic-subscription' ? (
                  `${currentPlan.postsRemaining} of ${currentPlan.postsLimit} posts remaining this month`
                ) : (
                  'Single job post'
                )}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {currentPlan?.type === 'basic-subscription' && (
                <div className="w-32">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-gray-700 h-1.5 rounded-full" 
                      style={{ width: `${(currentPlan.postsUsed || 0) / (currentPlan.postsLimit || 3) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              <button
                onClick={() => setShowPaywall(true)}
                className="text-sm text-gray-700 hover:text-gray-900 font-medium"
              >
                Change Plan →
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Basic Information</h2>
            <div className="space-y-6">
              {/* Company Selection */}
              {companies.length > 1 && (
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-500">
                    Posting on behalf of
                  </label>
                  <div className="mt-1 relative">
                    <select
                      id="company"
                      value={formData.companyId}
                      onChange={(e) => handleInputChange('companyId', e.target.value)}
                      required
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 rounded-lg"
                    >
                      <option value="" disabled>Select a company</option>
                      {companies.map(company => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <FaBuilding className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              )}

              {/* Job Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  placeholder="e.g., Piano Teacher for Wedding"
                />
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {SERVICES.map(service => (
                    <button
                      type="button"
                      key={service.id}
                      onClick={() => handleInputChange('service', service.id)}
                      className={`flex items-center p-3 border rounded-lg transition-colors ${
                        formData.service === service.id
                          ? 'border-pink-600 bg-pink-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="font-medium text-gray-900">{service.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Schedule & Payment */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Schedule & Payment</h2>
            <div className="space-y-6">
              {/* Date Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schedule Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {DATE_TYPES.map(type => (
                    <button
                      type="button"
                      key={type.id}
                      onClick={() => handleInputChange('dateType', type.id)}
                      className={`flex items-center p-3 border rounded-lg transition-colors ${
                        formData.dateType === type.id
                          ? 'border-pink-600 bg-pink-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="font-medium text-gray-900">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              {(formData.dateType === 'single' || formData.dateType === 'range') && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      required
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  {formData.dateType === 'range' && (
                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        required
                        value={formData.endDate}
                        onChange={(e) => handleInputChange('endDate', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Payment Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {PAYMENT_TYPES.map(type => (
                    <button
                      type="button"
                      key={type.id}
                      onClick={() => handleInputChange('paymentType', type.id)}
                      className={`flex items-center p-3 border rounded-lg transition-colors ${
                        formData.paymentType === type.id
                          ? 'border-pink-600 bg-pink-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="font-medium text-gray-900">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rate Input */}
              {(formData.paymentType === 'hourly' || formData.paymentType === 'flat') && (
                <div>
                  <label htmlFor="rate" className="block text-sm font-medium text-gray-700 mb-2">
                    Rate (USD)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaDollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="rate"
                      required
                      value={formData.rate}
                      onChange={(e) => handleInputChange('rate', parseFloat(e.target.value))}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Job Description */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Job Description</h2>
            <div>
              <textarea
                id="description"
                required
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                placeholder="Describe the job requirements, expectations, and any additional details..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 