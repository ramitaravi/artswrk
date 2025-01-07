'use client';

import { useState } from 'react';
import { FaTimes, FaCheck, FaPaperPlane } from 'react-icons/fa';

interface MessageInterestedArtistModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistName: string;
}

export default function MessageInterestedArtistModal({
  isOpen,
  onClose,
  artistName
}: MessageInterestedArtistModalProps) {
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Message {artistName}
          </h2>

          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <FaCheck className="text-green-500 w-5 h-5 mr-2" />
                <div className="text-gray-700">
                  <p className="font-medium mb-1">This artist is interested in your job</p>
                  <p className="text-sm">You can message them directly to discuss the opportunity.</p>
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
          </div>
        </div>
      </div>
    </div>
  );
} 