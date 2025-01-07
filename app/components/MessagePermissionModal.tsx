'use client';

import { useState } from 'react';
import { FaTimes, FaLock, FaCheck, FaPaperPlane } from 'react-icons/fa';

interface MessagePermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistName: string;
}

export default function MessagePermissionModal({
  isOpen,
  onClose,
  artistName
}: MessagePermissionModalProps) {
  // Demo toggle for different plans
  const [currentPlan, setCurrentPlan] = useState<'basic' | 'pro' | 'unlimited'>('basic');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSendMessage = () => {
    // TODO: Implement message sending
    console.log('Sending message:', message);
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <div className="p-6">
          {/* Demo Toggle */}
          <div className="mb-4 flex gap-2 text-sm">
            <button
              onClick={() => setCurrentPlan('basic')}
              className={`px-3 py-1 rounded ${
                currentPlan === 'basic' 
                  ? 'bg-pink-600 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Basic View
            </button>
            <button
              onClick={() => setCurrentPlan('pro')}
              className={`px-3 py-1 rounded ${
                currentPlan === 'pro' 
                  ? 'bg-pink-600 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Pro View
            </button>
            <button
              onClick={() => setCurrentPlan('unlimited')}
              className={`px-3 py-1 rounded ${
                currentPlan === 'unlimited' 
                  ? 'bg-pink-600 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Unlimited View
            </button>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Message {artistName}
          </h2>

          <div className="space-y-4">
            {currentPlan === 'basic' && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <FaLock className="text-gray-500 w-5 h-5 mr-2" />
                  <div className="text-gray-700">
                    <p className="font-medium mb-1">You are on the Basic Plan</p>
                    <p className="text-sm">You can only message artists that apply to your jobs. Upgrade to Pro to message any artist on Artswrk.</p>
                  </div>
                </div>
              </div>
            )}

            {(currentPlan === 'pro' || currentPlan === 'unlimited') && (
              <>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <FaCheck className="text-green-500 w-5 h-5 mr-2" />
                    <div className="text-gray-700">
                      <p className="font-medium mb-1">
                        You are on the {currentPlan === 'pro' ? 'Pro' : 'Unlimited'} Plan
                      </p>
                      <p className="text-sm">
                        {currentPlan === 'pro' 
                          ? 'You can message any artist on Artswrk. Start a conversation now!'
                          : 'Enjoy unlimited messaging with any artist on Artswrk. Start a conversation now!'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Your message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </>
            )}

            {currentPlan === 'basic' ? (
              <button
                onClick={onClose}
                className="w-full py-2 px-4 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                Upgrade to Pro Plan
              </button>
            ) : (
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className={`w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  message.trim() 
                    ? 'bg-pink-600 hover:bg-pink-700 text-white' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>Send Message</span>
                <FaPaperPlane className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 