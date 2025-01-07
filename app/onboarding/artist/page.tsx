'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ARTIST_TYPES = [
  'Dance Teacher',
  'Music Teacher',
  'Art Teacher',
  'Vocal Coach',
  'Piano Teacher',
  'Guitar Teacher',
  'Drum Teacher',
  'Acting Coach',
  'Yoga Instructor',
  'Fitness Trainer'
];

const SUBSCRIPTION_PLANS = [
  {
    name: 'Basic',
    price: '1.99',
    period: 'month',
    features: [
      'Create your portfolio',
      'Get discovered by clients',
      'Basic analytics',
      'Up to 10 projects'
    ]
  },
  {
    name: 'Pro',
    price: '10.99',
    period: 'month',
    features: [
      'Everything in Basic',
      'Priority in search results',
      'Advanced analytics',
      'Unlimited projects',
      'Custom branding'
    ]
  }
];

// Sample locations for demo - in production this would come from an API
const LOCATIONS = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Antonio, TX',
  'San Diego, CA',
  'Dallas, TX',
  'San Jose, CA',
  'Austin, TX',
  'San Francisco, CA',
  'Seattle, WA',
  'Denver, CO',
  'Boston, MA',
  'Miami, FL'
];

export default function ArtistOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [instagram, setInstagram] = useState('');
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [referralEmails, setReferralEmails] = useState(['', '', '']);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const locationRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter locations based on input
  const handleLocationChange = (value: string) => {
    setLocation(value);
    setShowLocationDropdown(true);
    
    const filtered = LOCATIONS.filter(loc => 
      loc.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 5); // Limit to 5 results
    
    setFilteredLocations(filtered);
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setShowLocationDropdown(false);
  };

  const updateReferralEmail = (index: number, value: string) => {
    const newEmails = [...referralEmails];
    newEmails[index] = value;
    setReferralEmails(newEmails);
  };

  const handleTypeSelection = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleNext = () => {
    if (step === 4) {
      // If on last step, navigate to dashboard
      router.push('/dashboard');
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSkip = () => {
    // Navigate to dashboard when skipping
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="min-h-screen flex">
        {/* Left Content */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-full max-w-md">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`w-full h-1 rounded-full mx-1 ${
                      i <= step ? 'artist-gradient' : 'bg-gray-100'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">Step {step} of 4</p>
            </div>

            {/* Step 1: Artist Types */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    What type of artist are you?
                  </h1>
                  <p className="text-gray-500">Select all that apply to you</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {ARTIST_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleTypeSelection(type)}
                      className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                        selectedTypes.includes(type)
                          ? 'border-[#ec008c] bg-pink-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{type}</span>
                        <div className={`w-5 h-5 rounded-full border-2 ${
                          selectedTypes.includes(type)
                            ? 'border-[#ec008c] bg-[#ec008c]'
                            : 'border-gray-300'
                        }`}>
                          {selectedTypes.includes(type) && (
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

            {/* Step 2: Basic Info */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    Tell us about yourself
                  </h1>
                  <p className="text-gray-500">Add your basic information</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="relative w-24 h-24 rounded-full bg-gray-100 overflow-hidden">
                      {profilePic ? (
                        <Image
                          src={profilePic}
                          alt="Profile"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="relative" ref={locationRef}>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => handleLocationChange(e.target.value)}
                      onFocus={() => setShowLocationDropdown(true)}
                      placeholder="Location"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300 hover:border-gray-300 transition-colors"
                    />
                    {showLocationDropdown && filteredLocations.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                        {filteredLocations.map((loc) => (
                          <button
                            key={loc}
                            onClick={() => handleLocationSelect(loc)}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                          >
                            {loc}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300 hover:border-gray-300 transition-colors resize-none"
                  />

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      @
                    </div>
                    <input
                      type="text"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="Instagram username"
                      className="w-full pl-8 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300 hover:border-gray-300 transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Refer Friends */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    Invite your artist friends
                  </h1>
                  <p className="text-gray-500">Help them join the community</p>
                </div>

                <div className="space-y-4">
                  {referralEmails.map((email, index) => (
                    <input
                      key={index}
                      type="email"
                      value={email}
                      onChange={(e) => updateReferralEmail(index, e.target.value)}
                      placeholder={`Friend's email ${index + 1}`}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300 hover:border-gray-300 transition-colors"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Subscription */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    Choose your plan
                  </h1>
                  <p className="text-gray-500">Select a plan that works for you</p>
                </div>

                <div className="space-y-4">
                  {SUBSCRIPTION_PLANS.map((plan) => (
                    <button
                      key={plan.name}
                      onClick={() => setSelectedPlan(plan.name)}
                      className={`w-full p-6 rounded-xl border-2 text-left transition-all ${
                        selectedPlan === plan.name
                          ? 'border-[#ec008c] bg-pink-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">{plan.name}</h3>
                        <div className="text-right">
                          <span className="text-2xl font-bold">${plan.price}</span>
                          <span className="text-gray-500">/{plan.period}</span>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {plan.features.map((feature) => (
                          <li key={feature} className="text-sm text-gray-500 flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
            <div className="mt-8 space-y-4">
              {step === 4 ? (
                <>
                  <button
                    onClick={handleNext}
                    className="w-full artist-gradient text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-all"
                  >
                    Complete Setup
                  </button>
                  <button
                    onClick={handleSkip}
                    className="w-full text-gray-500 hover:text-gray-700 text-sm font-medium"
                  >
                    Skip for now
                  </button>
                </>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full artist-gradient text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-all"
                >
                  Continue
                </button>
              )}
              
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="w-full text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  Back
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Content - Animated Design */}
        <div className="flex-1 relative hidden lg:block artist-gradient overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-96 h-96">
              {/* Large circle */}
              <div className="absolute inset-0 bg-white/10 rounded-full backdrop-blur-3xl floating" />
              
              {/* Smaller floating circles */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full backdrop-blur-2xl floating" 
                   style={{ animationDelay: '-2s' }} />
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/20 rounded-full backdrop-blur-2xl floating" 
                   style={{ animationDelay: '-1s' }} />
              <div className="absolute top-1/2 right-0 w-16 h-16 bg-white/20 rounded-full backdrop-blur-2xl floating" 
                   style={{ animationDelay: '-3s' }} />
              
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center space-y-4 floating" style={{ animationDelay: '-1.5s' }}>
                  <div className="w-32 h-32 mx-auto bg-white/20 backdrop-blur-2xl rounded-2xl transform rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 