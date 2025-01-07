'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold mb-6">Settings</h1>

        <div className="flex gap-8">
          {/* Navigation Sidebar */}
          <div className="w-80 shrink-0">
            <div className="p-4 bg-white border border-gray-200 rounded-lg space-y-1">
              {/* Account */}
              <Link 
                href="/settings/account"
                className={`flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 ${
                  pathname === '/settings/account' ? 'bg-gray-50' : ''
                }`}
              >
                <div className="w-5 h-5 text-pink-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Account</span>
              </Link>

              {/* Subscription */}
              <Link 
                href="/settings/subscription"
                className={`flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 ${
                  pathname === '/settings/subscription' ? 'bg-gray-50' : ''
                }`}
              >
                <div className="w-5 h-5 text-pink-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
                    <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Subscription</span>
              </Link>

              {/* Notifications */}
              <Link 
                href="/settings/notifications"
                className={`flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 ${
                  pathname === '/settings/notifications' ? 'bg-gray-50' : ''
                }`}
              >
                <div className="w-5 h-5 text-pink-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Notifications</span>
              </Link>

              {/* Help */}
              <Link 
                href="/settings/help"
                className={`flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 ${
                  pathname === '/settings/help' ? 'bg-gray-50' : ''
                }`}
              >
                <div className="w-5 h-5 text-pink-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Help</span>
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="p-8 bg-white border border-gray-200 rounded-lg">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 