'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function StyleGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto pt-8 px-4">
        <div className="mb-8">
          <h1 className="text-h2 text-primary-900 mb-2">Style Guide</h1>
          <p className="body-large-regular text-primary-600">Design system documentation and examples</p>
        </div>
        
        <nav className="flex space-x-1 border-b border-gray-200 mb-8">
          <Link
            href="/styleguide"
            className={`px-4 py-2 text-sm font-medium rounded-t-lg hover:bg-gray-100 hover:text-primary-900
              ${pathname === '/styleguide' ? 
                'bg-white text-primary-900 border-t border-l border-r border-gray-200' : 
                'text-primary-600'}`}
          >
            Typography
          </Link>
          <Link
            href="/styleguide/colors"
            className={`px-4 py-2 text-sm font-medium rounded-t-lg hover:bg-gray-100 hover:text-primary-900
              ${pathname === '/styleguide/colors' ? 
                'bg-white text-primary-900 border-t border-l border-r border-gray-200' : 
                'text-primary-600'}`}
          >
            Colors
          </Link>
          <Link
            href="/styleguide/components"
            className={`px-4 py-2 text-sm font-medium rounded-t-lg hover:bg-gray-100 hover:text-primary-900
              ${pathname === '/styleguide/components' ? 
                'bg-white text-primary-900 border-t border-l border-r border-gray-200' : 
                'text-primary-600'}`}
          >
            Components
          </Link>
        </nav>

        <main className="bg-white rounded-lg shadow-sm p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 