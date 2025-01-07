'use client';

import { useState } from 'react';

export default function ArtistProfilePage({ params }: { params: { id: string } }) {
  const handleMessage = async () => {
    // TODO: Implement messaging logic
    console.log('Messaging artist:', params.id);
  };

  return (
    <div>
      {/* Existing artist profile content */}
      
      {/* Message Button */}
      <button
        onClick={handleMessage}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700"
      >
        Message Artist
      </button>
    </div>
  );
} 