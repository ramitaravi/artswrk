'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('impersonatedUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role === 'Client') {
        router.push('/dashboard/client');
      } else if (user.role === 'Artist') {
        router.push('/dashboard/artist');
      } else {
        router.push('/data/users');
      }
    } else {
      router.push('/data/users');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );
} 