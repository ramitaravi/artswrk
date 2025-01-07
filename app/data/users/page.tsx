'use client';

import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useRouter } from 'next/navigation';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

interface User {
  uniqueid: string;
  email: string;
  firstname: string;
  lastname: string;
  fullname: string;
  userrole: string;
  creationdate: string;
  modifieddate: string;
  profilepicture: string;
  location: string;
  artistservices: string;
  listofmasterstyles: string;
  addedbyadmin: string;
  affiliations: string;
  artistexperiences: string;
  artistonboardingcomplete: string;
  artiststripeaccountid: string;
  artiststripeaccounttype: string;
  artiststripebusinessname: string;
  artiststripedatecreated: string;
  artiststripereturncode: string;
  artisttransportationaccesses: string;
  artswrkbasic: string;
  artswrkproartists: string;
  availabilitydetails: string;
  beta: string;
  bio: string;
  bookings: string;
  businessorindividual: string;
  clientcompanies: string;
  clientcompanyname: string;
  clientpaymentmethod: string;
  clientpremium: string;
  clientsessionid: string;
  clientsetupintentid: string;
  clientstripecardid: string;
  clientstripecustomerid: string;
  clientsubscriptionid: string;
  clienttransportdetails: string;
  credits: string;
  eoyemail: string;
  favoritesartists: string;
  fuzzysearch: string;
  hiringcategory: string;
  instagram: string;
  invitedusers: string;
  lastlogin: string;
  latecancel: string;
  listofavailability: string;
  listofmasterservices: string;
  masterartisttypes: string;
  masterclasslandingpage: string;
  nopw: string;
  notifications: string;
  onbehalfof: string;
  onboardingstep: string;
  optionavailability: string;
  phonenumber: string;
  popupseen: string;
  prioritylist: string;
  pronouns: string;
  refresh: string;
  stripeemailsentonce: string;
  stripeproductid: string;
  tiktok: string;
  viewadmindashboard: string;
  website: string;
  youtube: string;
  slug: string;
  nullfield: string;
}

interface Booking {
  id: number;
  _Option_Booking_Status: string;
  _Option_Payment_Status: string;
  "Added to Spreadsheet?": string;
  "Artist": string;
  "Artist Rate": string;
  "Client": string;
  "Client Rate": string;
  "deleted?": string;
  "Description": string;
  "End date": string;
  "external payment?": string;
  "Gross Profit": string;
  "hours": string;
  "Interested Artist": string;
  "invoice": string;
  "Job": string;
  "List of Payments": string;
  "List of Reimbursement": string;
  "Location": string;
  "new_rate_proposal": string;
  "new_rate_proposal_message": string;
  "Notification_Artist_Scheduled_Reminder": string;
  "On-Demand Service": string;
  "Post Fee Revenue": string;
  "Request": string;
  "Session Number": string;
  "show_alert?": string;
  "Start date": string;
  "Stripe checkout url": string;
  "stripe fee": string;
  "time": string;
  "Time Slot": string;
  "Total Artist Rate (Artist Rate + Reimbursements)": string;
  "Total Client Rate (Client Rate + Reimbursements)": string;
  "Wf_ID 1": string;
  "Wf_ID 2": string;
  "Creation Date": string;
  "Modified Date": string;
  "Slug": string;
  "Creator": string;
  "unique id": string;
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

function UserDetailModal({ user, onClose, bookings }: { user: User; onClose: () => void; bookings: Booking[] }) {
  // Filter bookings for this user
  const userBookings = bookings.filter(booking => 
    booking["Artist"] === user.fullname || booking["Client"] === user.fullname
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">{user.fullname}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <dl className="space-y-2">
                {Object.entries(user).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2">
                    <dt className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</dt>
                    <dd className="text-gray-900">{value || '-'}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Associated Bookings</h3>
              {userBookings.length > 0 ? (
                <div className="space-y-4">
                  {userBookings.map((booking, index) => (
                    <div key={index} className="border rounded p-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Status:</span>
                          <span className="ml-2">{booking._Option_Booking_Status}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Date:</span>
                          <span className="ml-2">{booking["Creation Date"]}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Artist:</span>
                          <span className="ml-2">{booking["Artist"]}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Client:</span>
                          <span className="ml-2">{booking["Client"]}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No bookings found for this user.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingDetailModal({ booking, onClose }: { booking: Booking; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">Booking Details</h2>
              <p className="text-gray-600">ID: {booking["unique id"]}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(booking).map(([key, value]) => (
                <div key={key} className="border-b pb-2">
                  <dt className="text-gray-600 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</dt>
                  <dd className="text-gray-900">{value || '-'}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function getRoleStyles(role: string | null) {
  if (!role) return 'bg-gray-100 text-gray-600';
  
  switch (role.toLowerCase()) {
    case 'artist':
      return 'bg-pink-50 text-[#ec008c] border border-[#ec008c]';
    case 'client':
      return 'bg-orange-50 text-[#FFBC5D] border border-[#FFBC5D]';
    default:
      return 'bg-gray-100 text-gray-600';
  }
}

export default function UsersPage() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-h-screen bg-gray-50 p-8">
        <UsersPageContent />
      </div>
    </ErrorBoundary>
  );
}

function UsersPageContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'users' | 'bookings'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'creationdate', direction: 'desc' });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        const usersResponse = await fetch('/api/users');
        if (!usersResponse.ok) {
          throw new Error(`Failed to fetch users: ${usersResponse.statusText}`);
        }
        const userData = await usersResponse.json();
        console.log('USERS DATA FROM API:', {
          firstUser: userData.users?.[0],
          totalUsers: userData.users?.length
        });
        
        const bookingsResponse = await fetch('/api/bookings');
        if (!bookingsResponse.ok) {
          throw new Error(`Failed to fetch bookings: ${bookingsResponse.statusText}`);
        }
        const bookingsData = await bookingsResponse.json();

        setUsers(userData.users || []);
        setFilteredUsers(userData.users || []);
        setBookings(bookingsData.bookings || []);
        setFilteredBookings(bookingsData.bookings || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Error fetching data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const handleRunAsUser = (user: User, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the user modal
    console.log('Running as user:', user);
    
    // Store user info in localStorage with all necessary fields
    const userData = {
      id: user.uniqueid,
      name: user.fullname,
      email: user.email,
      role: user.userrole,
      bookings: user.bookings,
      profilepicture: user.profilepicture,
      location: user.location,
      companyName: user.clientcompanyname,
      plan: user.clientpremium === 'true' ? 'pro' : 'basic',
      // Client specific fields
      clientCompanies: user.clientcompanies,
      clientPaymentMethod: user.clientpaymentmethod,
      clientPremium: user.clientpremium,
      clientSessionId: user.clientsessionid,
      clientSetupIntentId: user.clientsetupintentid,
      clientStripeCardId: user.clientstripecardid,
      clientStripeCustomerId: user.clientstripecustomerid,
      clientSubscriptionId: user.clientsubscriptionid,
      // Keep artist fields for completeness
      pronouns: user.pronouns,
      instagram: user.instagram,
      tiktok: user.tiktok,
      youtube: user.youtube,
      website: user.website,
      bio: user.bio,
      listofmasterstyles: user.listofmasterstyles,
      artistservices: user.artistservices,
      artistexperiences: user.artistexperiences,
      optionavailability: user.optionavailability,
      availabilitydetails: user.availabilitydetails,
      artisttransportationaccesses: user.artisttransportationaccesses
    };

    console.log('Storing user data:', userData);
    localStorage.setItem('impersonatedUser', JSON.stringify(userData));
    
    // Dispatch custom event
    window.dispatchEvent(new Event('impersonatedUserChanged'));
    
    // Route based on user role
    if (user.userrole?.toLowerCase() === 'client') {
      router.push('/dashboard/client');
    } else if (user.userrole?.toLowerCase() === 'artist') {
      router.push('/dashboard/artist');
    } else {
      router.push('/dashboard');
    }
  };

  const handleSort = (key: keyof User) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    
    const sorted = [...filteredUsers].sort((a, b) => {
      const aVal = a[key]?.toString() || '';
      const bVal = b[key]?.toString() || '';
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredUsers(sorted);
  };

  const getSortIcon = () => {
    if (!sortConfig) return <FaSort className="ml-1 w-3 h-3" />;
    if (sortConfig.direction === 'asc') return <FaSortUp className="ml-1 w-3 h-3" />;
    return <FaSortDown className="ml-1 w-3 h-3" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Users and Bookings Dashboard</h1>
      
      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'bookings' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings
          </button>
        </div>
      </div>

      {activeTab === 'users' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('fullname')} className="flex items-center">
                      Name {sortConfig.key === 'fullname' && getSortIcon()}
                    </button>
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Profile Picture
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button onClick={() => handleSort('email')} className="flex items-center">
                      Email {sortConfig.key === 'email' && getSortIcon()}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bookings
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user, index) => {
                  // Get user's booking IDs
                  const userBookingIds = user.bookings ? user.bookings.split(',').map(id => id.trim()).filter(Boolean) : [];
                  
                  // Filter bookings for this user based on IDs or name match
                  const userBookings = bookings.filter(booking => 
                    userBookingIds.includes(booking["unique id"]) ||
                    booking["Artist"] === user.fullname ||
                    booking["Client"] === user.fullname
                  );

                  return (
                    <tr 
                      key={user.uniqueid || index}
                      onClick={() => handleUserClick(user)}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {user.fullname}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {user.profilepicture ? (
                            <img src={user.profilepicture} alt={user.fullname} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-sm font-medium text-gray-600">{user.fullname?.[0]?.toUpperCase()}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleStyles(user.userrole)}`}>
                          {user.userrole || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.creationdate || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{userBookings.length}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={(e) => handleRunAsUser(user, e)}
                          className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                        >
                          Run as User
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Artist
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking, index) => (
                  <tr 
                    key={booking["unique id"] || index}
                    onClick={() => handleBookingClick(booking)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{booking["Artist"] || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{booking["Client"] || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{booking["_Option_Booking_Status"] || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{booking["Creation Date"] || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent opening the modal
                          router.push(`/booking/artist/${booking["unique id"]}`);
                        }}
                        className="text-sm bg-[#ec008c] text-white px-3 py-1 rounded-md hover:bg-[#d4007d] transition-colors"
                      >
                        View Booking
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedUser && (
        <UserDetailModal 
          user={selectedUser} 
          bookings={bookings}
          onClose={() => setSelectedUser(null)} 
        />
      )}

      {selectedBooking && (
        <BookingDetailModal 
          booking={selectedBooking} 
          onClose={() => setSelectedBooking(null)} 
        />
      )}
    </div>
  );
} 