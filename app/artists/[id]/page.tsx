'use client';

import { useState } from 'react';
import MessageArtistPaywall from '@/app/components/MessageArtistPaywall';

// ... existing imports and code ...

export default function ArtistProfilePage({ params }: { params: { id: string } }) {
  const [showMessagePaywall, setShowMessagePaywall] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<{
    type: string;
    messagesRemaining?: number;
  } | undefined>(undefined);

  // Function to check if user can message
  const checkMessagePermission = async () => {
    try {
      // TODO: Replace with actual API call to check user's messaging permissions
      const response = await fetch('/api/user/messaging-status');
      const data = await response.json();
      
      if (data.canMessage) {
        // User has permission, proceed to messaging
        // TODO: Implement actual messaging logic
        console.log('Proceed to messaging');
      } else {
        // Show paywall
        setCurrentPlan(data.currentPlan);
        setShowMessagePaywall(true);
      }
    } catch (error) {
      console.error('Error checking message permission:', error);
      setShowMessagePaywall(true);
    }
  };

  const handlePlanSelect = async (planType: string) => {
    // TODO: Implement plan selection and payment flow
    console.log('Selected plan:', planType);
    // For now, just close the paywall
    setShowMessagePaywall(false);
    // Later this would redirect to payment/checkout
  };

  return (
    <div>
      {/* Existing artist profile content */}
      
      {/* Message Button - Update the existing message button or add this if it doesn't exist */}
      <button
        onClick={checkMessagePermission}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700"
      >
        Message Artist
      </button>

      {/* Message Artist Paywall */}
      <MessageArtistPaywall
        isOpen={showMessagePaywall}
        onClose={() => setShowMessagePaywall(false)}
        onPlanSelect={handlePlanSelect}
        artistName="Artist Name" // Replace with actual artist name
        currentPlan={currentPlan}
      />
    </div>
  );
} 