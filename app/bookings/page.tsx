'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch, FaFilter, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

interface Booking {
  id: number;
  _Option_Booking_Status: string;
  _Option_Payment_Status: string;
  "Artist": string;
  "Artist Rate": string;
  "Client": string;
  "Client Rate": string;
  "Description": string;
  "End date": string;
  "Location": string;
  "Start date": string;
  "unique id": string;
  "Job": string;
}

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [impersonatedUser, setImpersonatedUser] = useState<any>(null);

  useEffect(() => {
    // Get impersonated user
    const storedUser = localStorage.getItem('impersonatedUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log('Impersonated User:', user);
      setImpersonatedUser(user);
    }

    // Fetch bookings
    async function fetchBookings() {
      try {
        const response = await fetch('/api/bookings');
        if (!response.ok) throw new Error('Failed to fetch bookings');
        const data = await response.json();
        console.log('All Bookings:', data.bookings);
        setBookings(data.bookings || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  // Filter bookings for the current user
  const userBookings = bookings.filter(booking => {
    if (!impersonatedUser) {
      console.log('No impersonated user');
      return false;
    }
    
    const isMatch = booking["Artist"] === impersonatedUser.name || 
                   booking["Artist"] === impersonatedUser.email ||
                   booking["Client"] === impersonatedUser.name ||
                   booking["Client"] === impersonatedUser.email;
    
    console.log('Booking Match Check:', {
      bookingArtist: booking["Artist"],
      bookingClient: booking["Client"],
      userName: impersonatedUser.name,
      userEmail: impersonatedUser.email,
      status: booking._Option_Booking_Status,
      isMatch
    });
    
    return isMatch;
  });

  console.log('Filtered User Bookings:', userBookings);

  // Apply filters
  const filteredBookings = userBookings.filter(booking => {
    const matchesSearch = 
      booking["Job"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking["Location"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking["Client"]?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || booking._Option_Booking_Status === statusFilter;

    const bookingDate = new Date(booking["Start date"]);
    const today = new Date();
    const matchesDate = dateFilter === 'all' ||
      (dateFilter === 'upcoming' && bookingDate > today) ||
      (dateFilter === 'past' && bookingDate <= today);

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Sort bookings by date
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    return new Date(b["Start date"]).getTime() - new Date(a["Start date"]).getTime();
  });

  const formatCurrency = (amount: string) => {
    if (!amount) return '';
    const value = parseFloat(amount);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatName = (emailOrName: string) => {
    // If it's an email, extract the name part before the +
    if (emailOrName.includes('@')) {
      const namePart = emailOrName.split('@')[0];
      const baseName = namePart.split('+')[0];
      // Convert andrspeena to Andrés Peña
      return baseName
        .replace('andrspeena', 'Andrés Peña')
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return emailOrName;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold mb-6">Bookings</h1>
        
        {/* Filters */}
        <div className="flex gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
            />
          </div>

          {/* Status Filter */}
          <div className="relative w-48">
            <FaFilter className="absolute left-3 top-3 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 appearance-none bg-white"
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="relative w-48">
            <FaCalendar className="absolute left-3 top-3 text-gray-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 appearance-none bg-white"
            >
              <option value="all">All Dates</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-3">
          {sortedBookings.map((booking) => (
            <div
              key={booking["unique id"]}
              className="flex items-center bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer group"
              onClick={() => router.push(`/booking/artist/${booking["unique id"]}`)}
            >
              {/* Logo/Avatar */}
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                <span className="text-sm font-medium text-white">
                  {(booking["Job"] || booking["Client"]).substring(0, 2).toUpperCase()}
                </span>
              </div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  {/* Left Side */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {booking["Job"] ? `${booking["Job"]} | ${formatName(booking["Client"])}` : formatName(booking["Client"])}
                    </h3>
                    <div className="flex items-center gap-4 mt-1">
                      {booking["Artist Rate"] && (
                        <div className="text-green-700 bg-green-50 px-2 py-0.5 rounded-md text-sm font-medium">
                          +{formatCurrency(booking["Artist Rate"])}
                        </div>
                      )}
                      <div className="text-gray-500 text-sm">
                        {formatDate(booking["Start date"])}
                      </div>
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                      ${booking._Option_Booking_Status?.toLowerCase() === 'completed' ? 'bg-green-100 text-green-700' :
                        booking._Option_Booking_Status?.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        booking._Option_Booking_Status?.toLowerCase() === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'}`}
                    >
                      {booking._Option_Booking_Status || 'Pending'}
                    </span>
                    <div className="text-gray-400 group-hover:text-gray-600">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {sortedBookings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No bookings found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 