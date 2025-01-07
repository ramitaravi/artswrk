'use client';

import { useState } from 'react';

interface NotificationChannel {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface NotificationCategory {
  id: string;
  title: string;
  description: string;
  channels: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

export default function NotificationsPage() {
  // This would come from your database
  const [channels, setChannels] = useState<NotificationChannel[]>([
    {
      id: 'email',
      label: 'Email Notifications',
      description: 'Get updates delivered to your inbox',
      enabled: true,
    },
    {
      id: 'sms',
      label: 'SMS Notifications',
      description: 'Receive text messages for important updates',
      enabled: false,
    },
    {
      id: 'push',
      label: 'Push Notifications',
      description: 'Get instant notifications on your device',
      enabled: true,
    },
  ]);

  const [categories, setCategories] = useState<NotificationCategory[]>([
    {
      id: 'bookings',
      title: 'Booking Updates',
      description: 'New bookings, changes, and cancellations',
      channels: {
        email: true,
        sms: true,
        push: true,
      },
    },
    {
      id: 'messages',
      title: 'Messages',
      description: 'New messages from clients and Artswrk',
      channels: {
        email: true,
        sms: false,
        push: true,
      },
    },
    {
      id: 'jobs',
      title: 'Job Opportunities',
      description: 'New jobs matching your profile',
      channels: {
        email: true,
        sms: false,
        push: false,
      },
    },
    {
      id: 'payments',
      title: 'Payment Updates',
      description: 'Payment confirmations and payout notifications',
      channels: {
        email: true,
        sms: true,
        push: true,
      },
    },
  ]);

  const toggleChannel = (channelId: string) => {
    setChannels(channels.map(channel => 
      channel.id === channelId 
        ? { ...channel, enabled: !channel.enabled }
        : channel
    ));
  };

  const toggleCategoryChannel = (categoryId: string, channelId: keyof NotificationCategory['channels']) => {
    setCategories(categories.map(category =>
      category.id === categoryId
        ? {
            ...category,
            channels: {
              ...category.channels,
              [channelId]: !category.channels[channelId],
            },
          }
        : category
    ));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Notifications</h2>
      <p className="text-gray-600 mb-8">Choose how you want to be notified about updates</p>

      <div className="divide-y divide-gray-200">
        {/* Notification Channels */}
        <div className="py-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Channels</h3>
          <div className="space-y-4">
            {channels.map(channel => (
              <div key={channel.id} className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{channel.label}</h4>
                  <p className="text-sm text-gray-500">{channel.description}</p>
                </div>
                <button
                  onClick={() => toggleChannel(channel.id)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    channel.enabled ? 'bg-pink-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      channel.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Categories */}
        <div className="py-8">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Notification Preferences</h3>
          <div className="space-y-8">
            {categories.map(category => (
              <div key={category.id}>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900">{category.title}</h4>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(category.channels).map(([channelId, enabled]) => (
                    <button
                      key={channelId}
                      onClick={() => toggleCategoryChannel(category.id, channelId as keyof NotificationCategory['channels'])}
                      className={`flex items-center justify-center px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                        enabled
                          ? 'bg-pink-50 border-pink-200 text-pink-700'
                          : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {channelId.charAt(0).toUpperCase() + channelId.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="py-8">
          <button className="w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
} 