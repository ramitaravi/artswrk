'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Tab = 'jobs' | 'bookings' | 'hosting';

interface ImpersonatedUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Booking {
  _Option_Booking_Status: string;
  "Artist": string;
  "Client": string;
  "Description": string;
  "Start date": string;
  "End date": string;
  "Creation Date": string;
  "Location": string;
}

export default function ArtistDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('jobs');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [impersonatedUser, setImpersonatedUser] = useState<ImpersonatedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for impersonated user
    const storedUser = localStorage.getItem('impersonatedUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log('Impersonated User Data:', {
        user,
        bookingsString: user.bookings,
        bookingsArray: user.bookings ? user.bookings.split(',') : []
      });
      setImpersonatedUser(user);
      if (user.role !== 'Artist') {
        router.push('/dashboard/client');
      }
    }

    // Fetch bookings
    async function fetchBookings() {
      try {
        const response = await fetch('/api/bookings');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        console.log('All Bookings Data:', {
          count: data.bookings?.length,
          sampleBooking: data.bookings?.[0],
          uniqueIds: data.bookings?.map(b => b["unique id"])
        });
        setBookings(data.bookings || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [router]);

  const handleStopImpersonating = () => {
    localStorage.removeItem('impersonatedUser');
    router.push('/data/users');
  };

  // Filter bookings for the current user
  const userBookings = bookings.filter(booking => {
    if (!impersonatedUser || !impersonatedUser.bookings) {
      console.log('No impersonated user or bookings data');
      return false;
    }
    
    const bookingId = booking["unique id"];
    const userBookingIds = impersonatedUser.bookings.split(',').map(id => id.trim()).filter(Boolean);
    
    console.log('Booking Comparison:', {
      currentBookingId: bookingId,
      userBookingIds,
      isMatch: userBookingIds.includes(bookingId),
      bookingArtist: booking["Artist"],
      userName: impersonatedUser.name
    });
    
    // Check both the booking IDs and the artist name
    return (bookingId && userBookingIds.includes(bookingId)) || 
           (booking["Artist"] === impersonatedUser.name);
  });

  console.log('Final Filtered Bookings:', {
    totalBookings: bookings.length,
    filteredCount: userBookings.length,
    userBookings
  });

  const upcomingBookings = userBookings.filter(booking => 
    new Date(booking["Start date"]) > new Date()
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {impersonatedUser && (
        <div className="bg-blue-50 p-2 flex items-center justify-between">
          <p className="text-sm text-blue-600">
            Viewing as: <span className="font-medium">{impersonatedUser.name}</span> (Artist)
          </p>
          <button
            onClick={handleStopImpersonating}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Stop Impersonating
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1 mr-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-8">
              {impersonatedUser ? `${impersonatedUser.name}'s Artist Dashboard` : 'Artist Dashboard'}
            </h1>
            
            {/* Navigation Tabs */}
            <div className="tab-container">
              <nav className="tab-group">
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`tab ${activeTab === 'jobs' ? 'tab-active' : 'tab-inactive'}`}
                >
                  Available Jobs
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`tab ${activeTab === 'bookings' ? 'tab-active' : 'tab-inactive'}`}
                >
                  Your Bookings
                </button>
                <button
                  onClick={() => setActiveTab('hosting')}
                  className={`tab ${activeTab === 'hosting' ? 'tab-active' : 'tab-inactive'}`}
                >
                  Your Classes
                </button>
              </nav>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Total Bookings</h3>
                  <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
                    {userBookings.length}
                  </span>
                </div>
                <p className="text-sm text-gray-500">All time bookings</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Upcoming Bookings</h3>
                  <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
                    {upcomingBookings.length}
                  </span>
                </div>
                <p className="text-sm text-gray-500">View your schedule</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Profile Views</h3>
                  <span className="bg-purple-100 text-purple-600 text-xs font-medium px-2 py-1 rounded-full">
                    23
                  </span>
                </div>
                <p className="text-sm text-gray-500">Last 30 days</p>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="mt-8">
              {activeTab === 'bookings' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Bookings</h2>
                  <div className="space-y-4">
                    {userBookings.map((booking, index) => (
                      <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <p className="font-medium">{booking._Option_Booking_Status}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-medium">{new Date(booking["Start date"]).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Client</p>
                            <p className="font-medium">{booking["Client"]}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">{booking["Location"]}</p>
                          </div>
                          {booking["Description"] && (
                            <div className="col-span-2">
                              <p className="text-sm text-gray-500">Description</p>
                              <p className="font-medium">{booking["Description"]}</p>
                            </div>
                          )}
                        </div>
                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={() => router.push(`/booking/artist/${booking["unique id"]}`)}
                            className="text-sm bg-[#ec008c] text-white px-3 py-1 rounded-md hover:bg-[#d4007d] transition-colors"
                          >
                            View Booking
                          </button>
                        </div>
                      </div>
                    ))}
                    {userBookings.length === 0 && (
                      <p className="text-gray-500 text-center py-8">No bookings found.</p>
                    )}
                  </div>
                </div>
              )}
              
              {activeTab === 'jobs' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Jobs</h2>
                  <p className="text-gray-500">Coming soon...</p>
                </div>
              )}
              
              {activeTab === 'hosting' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Classes</h2>
                  <p className="text-gray-500">Coming soon...</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-80 space-y-4">
            {/* Profile Card */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">★</span>
                </div>
              </div>
              <div className="mb-8">
                <div className="text-sm text-gray-600 mb-1">Artist</div>
                <div className="text-2xl font-semibold">
                  {impersonatedUser?.name || 'Guest'}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">View Profile</div>
                <button className="text-[#ec008c] text-sm font-medium hover:opacity-80">
                  Edit →
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Quick Actions</h3>
              </div>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="text-sm font-medium">Create New Class</div>
                  <div className="text-xs text-gray-500">Start hosting your own sessions</div>
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="text-sm font-medium">Update Availability</div>
                  <div className="text-xs text-gray-500">Manage your schedule</div>
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="text-sm font-medium">View Analytics</div>
                  <div className="text-xs text-gray-500">Track your performance</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 