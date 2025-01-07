'use client';

export default function SettingsPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Overview</h2>
      <p className="text-gray-600 mb-8">Manage your account settings and preferences</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Account Settings</h3>
          <p className="text-gray-600 mb-4">Manage your account information, email, and password</p>
          <div className="flex items-center gap-2 text-sm text-pink-600">
            <span>View settings</span>
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Subscription</h3>
          <p className="text-gray-600 mb-4">View and manage your subscription plan</p>
          <div className="flex items-center gap-2 text-sm text-pink-600">
            <span>View subscription</span>
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Notifications</h3>
          <p className="text-gray-600 mb-4">Configure how you receive notifications</p>
          <div className="flex items-center gap-2 text-sm text-pink-600">
            <span>View preferences</span>
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Help & Support</h3>
          <p className="text-gray-600 mb-4">Get help with using Artswrk</p>
          <div className="flex items-center gap-2 text-sm text-pink-600">
            <span>Get help</span>
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
} 