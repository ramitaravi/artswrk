'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaSearch, FaPaperclip, FaPaperPlane, FaFileInvoice, FaTimes } from 'react-icons/fa';

interface Conversation {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  lastMessage: string;
  timestamp: string;
  booking?: {
    location: string;
    dates: string;
  };
  unread: boolean;
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isOwn?: boolean;
  sender?: string;
  senderAvatar?: string;
}

interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isOwn: boolean;
  senderName?: string;
  senderAvatar?: string;
}

function MessageBubble({ content, timestamp, isOwn, senderName, senderAvatar }: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-end space-x-2 max-w-[70%] ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {!isOwn && senderAvatar && (
          <div className="relative h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
            <Image src={senderAvatar} alt={senderName || ''} fill className="object-cover" />
          </div>
        )}
        <div>
          {!isOwn && senderName && (
            <div className="text-sm text-gray-500 mb-1">{senderName}</div>
          )}
          <div className={`rounded-2xl px-4 py-2 ${
            isOwn ? 'bg-[#ec008c] text-white' : 'bg-gray-100'
          }`}>
            <p className="text-sm">{content}</p>
          </div>
          <div className={`text-xs text-gray-500 mt-1 ${isOwn ? 'text-right' : ''}`}>
            {timestamp}
          </div>
        </div>
      </div>
    </div>
  );
}

// Sample messages for demonstration
const sampleMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! How can I help you today?',
    timestamp: '10:00 AM',
    isOwn: false,
    sender: 'Marie Et Maxime',
    senderAvatar: '/placeholder-avatar.jpg'
  },
  {
    id: '2',
    content: 'I have a question about my upcoming booking',
    timestamp: '10:02 AM',
    isOwn: true
  },
  {
    id: '3',
    content: 'Of course! What would you like to know?',
    timestamp: '10:03 AM',
    isOwn: false,
    sender: 'Marie Et Maxime',
    senderAvatar: '/placeholder-avatar.jpg'
  }
];

// Add interface for invoice details
interface InvoiceDetails {
  clientName: string;
  date: string;
  amount: string;
  description: string;
}

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails>({
    clientName: 'Marie Et Maxime',
    date: new Date().toISOString().split('T')[0],
    amount: '',
    description: ''
  });

  const handleInvoiceSubmit = () => {
    console.log('Sending invoice:', invoiceDetails);
    setShowInvoiceModal(false);
  };

  // Mock data
  const conversations: Conversation[] = [
    {
      id: '1',
      user: {
        name: 'Marie Et Maxime',
        avatar: '/placeholder-avatar.jpg'
      },
      lastMessage: 'Bonjour Ramita, In preparation for your departure on Mar 15...',
      timestamp: '6:08 AM',
      booking: {
        location: 'Paris',
        dates: 'Feb 14 - Mar 15, 2024'
      },
      unread: true
    },
    {
      id: '2',
      user: {
        name: 'Airbnb Support',
        avatar: '/airbnb-logo.png'
      },
      lastMessage: 'Welcome',
      timestamp: '2/14/24',
      unread: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-screen">
        <h1 className="text-2xl font-semibold mb-6">Messages</h1>
        <div className="flex bg-white rounded-xl border border-gray-200 h-[calc(100%-88px)]">
          {/* Left Sidebar */}
          <div className="w-80 border-r border-gray-200 flex flex-col">
            {/* Tabs */}
            <div className="p-4 border-b border-gray-200">
              <div className="tab-group">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`tab ${activeTab === 'all' ? 'tab-active' : 'tab-inactive'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab('unread')}
                  className={`tab ${activeTab === 'unread' ? 'tab-active' : 'tab-inactive'}`}
                >
                  Unread
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="p-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-gray-400"
                />
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                    selectedConversation === conversation.id ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      {conversation.user.avatar ? (
                        <Image
                          src={conversation.user.avatar}
                          alt={conversation.user.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <span className="text-base text-gray-500">
                            {conversation.user.name[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="text-base-medium truncate">
                          {conversation.user.name}
                        </h3>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                          {conversation.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {conversation.lastMessage}
                      </p>
                      {conversation.booking && (
                        <div className="mt-2 text-xs text-gray-500">
                          {conversation.booking.location} · {conversation.booking.dates}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col relative">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="absolute top-0 left-0 right-0 bg-white z-10 p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <h2 className="text-lg font-medium">
                        {conversations.find(c => c.id === selectedConversation)?.user.name}
                      </h2>
                    </div>
                    <button
                      onClick={() => setShowInvoiceModal(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FaFileInvoice className="w-4 h-4" />
                      <span>Create Invoice</span>
                    </button>
                  </div>
                </div>

                {/* Invoice Modal */}
                {showInvoiceModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-md p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Create Invoice</h2>
                        <button
                          onClick={() => setShowInvoiceModal(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <FaTimes className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Client Name
                          </label>
                          <input
                            type="text"
                            value={invoiceDetails.clientName}
                            onChange={(e) => setInvoiceDetails({...invoiceDetails, clientName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Client name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date
                          </label>
                          <input
                            type="date"
                            value={invoiceDetails.date}
                            onChange={(e) => setInvoiceDetails({...invoiceDetails, date: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Amount
                          </label>
                          <input
                            type="text"
                            value={invoiceDetails.amount}
                            onChange={(e) => setInvoiceDetails({...invoiceDetails, amount: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="$0.00"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <textarea
                            value={invoiceDetails.description}
                            onChange={(e) => setInvoiceDetails({...invoiceDetails, description: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                            rows={3}
                            placeholder="Dance lessons, choreography, etc."
                          />
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                          <button
                            onClick={() => setShowInvoiceModal(false)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleInvoiceSubmit}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Send Invoice
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 pt-20 pb-24">
                  {sampleMessages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      content={message.content}
                      timestamp={message.timestamp}
                      isOwn={message.isOwn || false}
                      senderName={!message.isOwn ? message.sender : undefined}
                      senderAvatar={message.senderAvatar}
                    />
                  ))}
                </div>

                {/* Message Input */}
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700">
                      <FaPaperclip className="h-5 w-5" />
                    </button>
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 p-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-gray-400"
                    />
                    <button 
                      className="p-2 text-white bg-[#ec008c] rounded-lg hover:bg-[#d4007d] disabled:opacity-50"
                      disabled={!messageInput.trim()}
                    >
                      <FaPaperPlane className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 