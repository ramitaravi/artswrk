'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaTiktok, FaYoutube, FaGlobe, FaClock, FaCheck, FaCalendarAlt, FaStar, FaTimes } from 'react-icons/fa';
import MessagePermissionModal from '@/app/components/MessagePermissionModal';
import BookServiceModal from '@/app/components/BookServiceModal';

interface ImpersonatedUser {
  id: string;
  uniqueid: string;
  name?: string;
  fullname: string;
  email: string;
  role: string;
  bookings?: string;
  profilepicture?: string;
  location?: string;
  pronouns?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  website?: string;
  bio?: string;
  listofmasterstyles?: string;
  artistservices?: string;
  artistexperiences?: string;
  optionavailability?: string;
  availabilitydetails?: string;
  artisttransportationaccesses?: string;
  affiliations?: string;
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [user, setUser] = useState<ImpersonatedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'experience'>('about');
  const [bookingCount, setBookingCount] = useState(0);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<ImpersonatedUser | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all users and find the specific one
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users data');
        }
        
        const data = await response.json();
        if (!data.users) {
          throw new Error('No users data received');
        }

        // Find the specific user by ID
        const userData = data.users.find((user: any) => user.uniqueid === params.id);
        if (!userData) {
          throw new Error('User not found');
        }

        console.log('Found user data:', userData);
        setUser(userData);
        
        // Check if this is the current user's profile by comparing with impersonated user
        const storedUser = localStorage.getItem('impersonatedUser');
        if (storedUser) {
          const impersonatedUser = JSON.parse(storedUser);
          setIsCurrentUser(impersonatedUser.id === params.id);
        }
        
        // Calculate booking count if bookings exist
        const bookings = userData.bookings ? userData.bookings.split(',').filter(Boolean).length : 0;
        setBookingCount(bookings);
        
      } catch (error) {
        console.error('Error loading user data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load user data');
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [params.id]);

  const handleEditClick = () => {
    setEditFormData(user);
    setIsEditModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ec008c]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
        <div className="text-gray-500">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-[#ec008c] hover:underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
        <div className="text-gray-500">User not found</div>
        <button
          onClick={() => router.push('/browse/artists')}
          className="text-sm text-[#ec008c] hover:underline"
        >
          Return to Browse Artists
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <MessagePermissionModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        artistName={user?.fullname || ''}
      />

      <BookServiceModal
        isOpen={showBookModal}
        onClose={() => setShowBookModal(false)}
        artistName={user?.fullname || ''}
        services={user?.artistservices}
      />

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 font-poppins">Edit Profile</h2>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={editFormData?.name || ''}
                      onChange={(e) => setEditFormData(prev => prev ? {...prev, name: e.target.value} : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec008c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={editFormData?.location || ''}
                      onChange={(e) => setEditFormData(prev => prev ? {...prev, location: e.target.value} : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec008c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pronouns</label>
                    <input
                      type="text"
                      value={editFormData?.pronouns || ''}
                      onChange={(e) => setEditFormData(prev => prev ? {...prev, pronouns: e.target.value} : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec008c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture URL</label>
                    <input
                      type="text"
                      value={editFormData?.profilepicture || ''}
                      onChange={(e) => setEditFormData(prev => prev ? {...prev, profilepicture: e.target.value} : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec008c]"
                    />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">About</h3>
                <textarea
                  value={editFormData?.bio || ''}
                  onChange={(e) => setEditFormData(prev => prev ? {...prev, bio: e.target.value} : null)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec008c]"
                  placeholder="Tell people about yourself..."
                />
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                    <input
                      type="text"
                      value={editFormData?.instagram || ''}
                      onChange={(e) => setEditFormData(prev => prev ? {...prev, instagram: e.target.value} : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec008c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">TikTok</label>
                    <input
                      type="text"
                      value={editFormData?.tiktok || ''}
                      onChange={(e) => setEditFormData(prev => prev ? {...prev, tiktok: e.target.value} : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec008c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">YouTube</label>
                    <input
                      type="text"
                      value={editFormData?.youtube || ''}
                      onChange={(e) => setEditFormData(prev => prev ? {...prev, youtube: e.target.value} : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec008c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input
                      type="text"
                      value={editFormData?.website || ''}
                      onChange={(e) => setEditFormData(prev => prev ? {...prev, website: e.target.value} : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec008c]"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Professional Information</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dance Styles (comma-separated)</label>
                  <input
                    type="text"
                    value={editFormData?.listofmasterstyles || ''}
                    onChange={(e) => setEditFormData(prev => prev ? {...prev, listofmasterstyles: e.target.value} : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec008c]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Services (comma-separated)</label>
                  <input
                    type="text"
                    value={editFormData?.artistservices || ''}
                    onChange={(e) => setEditFormData(prev => prev ? {...prev, artistservices: e.target.value} : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec008c]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience (comma-separated)</label>
                  <input
                    type="text"
                    value={editFormData?.artistexperiences || ''}
                    onChange={(e) => setEditFormData(prev => prev ? {...prev, artistexperiences: e.target.value} : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec008c]"
                  />
                </div>
              </div>

              {/* Availability & Transportation */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Availability & Transportation</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Availability Status</label>
                  <input
                    type="text"
                    value={editFormData?.optionavailability || ''}
                    onChange={(e) => setEditFormData(prev => prev ? {...prev, optionavailability: e.target.value} : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec008c]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Availability Details</label>
                  <textarea
                    value={editFormData?.availabilitydetails || ''}
                    onChange={(e) => setEditFormData(prev => prev ? {...prev, availabilitydetails: e.target.value} : null)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec008c]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transportation (comma-separated)</label>
                  <input
                    type="text"
                    value={editFormData?.artisttransportationaccesses || ''}
                    onChange={(e) => setEditFormData(prev => prev ? {...prev, artisttransportationaccesses: e.target.value} : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec008c]"
                  />
                </div>
              </div>

              {/* Affiliations */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Affiliations</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Affiliations (comma-separated)</label>
                  <input
                    type="text"
                    value={editFormData?.affiliations || ''}
                    onChange={(e) => setEditFormData(prev => prev ? {...prev, affiliations: e.target.value} : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec008c]"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-[#ec008c] rounded-lg hover:bg-[#ff7171] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section with Cover Image */}
      <div className="bg-gradient-to-r from-[#ec008c] to-[#ff7171] h-60 relative">
        <div className="absolute inset-0 bg-black/0"></div>
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 pb-12">
        <div className="relative">
          {/* Profile Header Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start gap-8">
              {/* Profile Picture */}
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                {user.profilepicture ? (
                  <img src={user.profilepicture} alt={user.fullname} className="w-full h-full object-cover" />
                ) : (
                  <FaUser className="w-16 h-16 text-gray-400" />
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-poppins">{user.fullname}</h1>
                    <div className="flex flex-col gap-2 mt-2">
                      <span className="flex items-center gap-1 text-gray-600">
                        <FaMapMarkerAlt className="w-4 h-4" />
                        {user.location}
                      </span>
                      <span className="flex items-center gap-1 text-gray-600">
                        <FaStar className="w-4 h-4" />
                        Booked {bookingCount} times on Artswrk
                      </span>
                      <span className="text-sm text-gray-600">{user.pronouns}</span>
                    </div>
                  </div>
                  {/* Edit/Message/Book Buttons */}
                  <div className="flex items-center space-x-4">
                    {isCurrentUser ? (
                      <button
                        onClick={handleEditClick}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => setShowMessageModal(true)}
                          className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors"
                        >
                          Message Artist
                        </button>
                        <button
                          onClick={() => setShowBookModal(true)}
                          className="px-4 py-2 text-sm font-medium text-pink-600 border border-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
                        >
                          Book Now
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4 mt-4">
                  {user.instagram && (
                    <a href={user.instagram} target="_blank" rel="noopener noreferrer" 
                       className="text-gray-600 hover:text-[#ec008c] transition-colors">
                      <FaInstagram className="w-5 h-5" />
                    </a>
                  )}
                  {user.tiktok && (
                    <a href={user.tiktok} target="_blank" rel="noopener noreferrer"
                       className="text-gray-600 hover:text-[#ec008c] transition-colors">
                      <FaTiktok className="w-5 h-5" />
                    </a>
                  )}
                  {user.youtube && (
                    <a href={user.youtube} target="_blank" rel="noopener noreferrer"
                       className="text-gray-600 hover:text-[#ec008c] transition-colors">
                      <FaYoutube className="w-5 h-5" />
                    </a>
                  )}
                  {user.website && (
                    <a href={user.website} target="_blank" rel="noopener noreferrer"
                       className="text-gray-600 hover:text-[#ec008c] transition-colors">
                      <FaGlobe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-8 border-b border-gray-200">
              <nav className="flex gap-8">
                {user.bio && (
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'about'
                        ? 'border-[#ec008c] text-[#ec008c]'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    About
                  </button>
                )}
                {(user.listofmasterstyles || user.artistservices) && (
                  <button
                    onClick={() => setActiveTab('services')}
                    className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'services'
                        ? 'border-[#ec008c] text-[#ec008c]'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Services
                  </button>
                )}
                {user.artistexperiences && (
                  <button
                    onClick={() => setActiveTab('experience')}
                    className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'experience'
                        ? 'border-[#ec008c] text-[#ec008c]'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Experience
                  </button>
                )}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="col-span-2 space-y-8">
              {activeTab === 'about' && (
                <>
                  {/* Bio Section */}
                  <div className="bg-white">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">About</h2>
                    {user.bio ? (
                      <p className="text-gray-600 whitespace-pre-wrap">{user.bio}</p>
                    ) : isCurrentUser ? (
                      <div className="text-center py-6">
                        <button className="w-full p-8 border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300 transition-colors group">
                          <p className="text-gray-500 mb-2">Add a bio to tell people about yourself</p>
                          <span className="text-sm text-[#ec008c] group-hover:text-[#ff7171]">+ Add Bio</span>
                        </button>
                      </div>
                    ) : null}
                  </div>

                  {/* Instagram Media Section */}
                  {user.instagram && (
                    <div className="bg-white mt-8">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900 font-poppins">Recent Work</h2>
                        <a 
                          href={user.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[#ec008c] hover:text-[#ff7171] transition-colors"
                        >
                          <FaInstagram className="w-5 h-5" />
                          <span className="text-sm font-medium">Follow on Instagram</span>
                        </a>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                          <div key={item} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <img 
                              src={`https://picsum.photos/400/400?random=${item}`}
                              alt="Recent work"
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {activeTab === 'services' && (
                <>
                  {/* Styles Section */}
                  <div className="bg-white mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">Styles</h2>
                    {user.listofmasterstyles ? (
                      <div className="flex flex-wrap gap-2">
                        {user.listofmasterstyles.split(',').map((style) => (
                          <span key={style} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-full text-sm">
                            {style.trim()}
                          </span>
                        ))}
                      </div>
                    ) : isCurrentUser ? (
                      <div className="text-center py-6">
                        <button className="w-full p-8 border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300 transition-colors group">
                          <p className="text-gray-500 mb-2">Add your dance styles</p>
                          <span className="text-sm text-[#ec008c] group-hover:text-[#ff7171]">+ Add Styles</span>
                        </button>
                      </div>
                    ) : null}
                  </div>

                  {/* Services Section */}
                  <div className="bg-white">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">Services Offered</h2>
                    {user.artistservices ? (
                      <div className="space-y-4">
                        {user.artistservices.split(',').map((service) => (
                          <div key={service} className="flex items-center gap-3 text-gray-600">
                            <FaCheck className="w-5 h-5 text-[#ec008c]" />
                            <span className="font-medium">{service.trim()}</span>
                          </div>
                        ))}
                      </div>
                    ) : isCurrentUser ? (
                      <div className="text-center py-6">
                        <button className="w-full p-8 border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300 transition-colors group">
                          <p className="text-gray-500 mb-2">Add services you offer</p>
                          <span className="text-sm text-[#ec008c] group-hover:text-[#ff7171]">+ Add Services</span>
                        </button>
                      </div>
                    ) : null}
                  </div>
                </>
              )}

              {activeTab === 'experience' && (
                <div className="bg-white">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">Professional Experience</h2>
                  <div className="space-y-4">
                    {user.artistexperiences?.split(',').map((experience) => (
                      <div key={experience} className="flex items-center gap-3 text-gray-600">
                        <FaCheck className="w-5 h-5 text-[#ec008c]" />
                        <span className="font-medium">{experience.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Availability Card */}
              {isCurrentUser ? (
                <div className="bg-gray-50 rounded-3xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">Availability</h3>
                  {user.optionavailability || user.availabilitydetails ? (
                    <>
                      {user.optionavailability && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaCalendarAlt className="w-5 h-5" />
                          <span className="font-medium">{user.optionavailability}</span>
                        </div>
                      )}
                      {user.availabilitydetails && (
                        <p className="mt-3 text-gray-600">{user.availabilitydetails}</p>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <button className="w-full p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300 transition-colors group">
                        <p className="text-gray-500 mb-2">Add your availability details</p>
                        <span className="text-sm text-[#ec008c] group-hover:text-[#ff7171]">+ Add Availability</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : user.optionavailability || user.availabilitydetails ? (
                <div className="bg-gray-50 rounded-3xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">Availability</h3>
                  {user.optionavailability && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaCalendarAlt className="w-5 h-5" />
                      <span className="font-medium">{user.optionavailability}</span>
                    </div>
                  )}
                  {user.availabilitydetails && (
                    <p className="mt-3 text-gray-600">{user.availabilitydetails}</p>
                  )}
                </div>
              ) : null}

              {/* Transportation Card */}
              {isCurrentUser ? (
                <div className="bg-gray-50 rounded-3xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">Transportation</h3>
                  {user.artisttransportationaccesses ? (
                    <div className="space-y-3">
                      {user.artisttransportationaccesses.split(',').map((transport) => (
                        <div key={transport} className="flex items-center gap-3 text-gray-600">
                          <FaCheck className="w-5 h-5 text-[#ec008c]" />
                          <span className="font-medium">{transport.trim()}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <button className="w-full p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300 transition-colors group">
                        <p className="text-gray-500 mb-2">Add your transportation options</p>
                        <span className="text-sm text-[#ec008c] group-hover:text-[#ff7171]">+ Add Transportation</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : user.artisttransportationaccesses ? (
                <div className="bg-gray-50 rounded-3xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">Transportation</h3>
                  <div className="space-y-3">
                    {user.artisttransportationaccesses.split(',').map((transport) => (
                      <div key={transport} className="flex items-center gap-3 text-gray-600">
                        <FaCheck className="w-5 h-5 text-[#ec008c]" />
                        <span className="font-medium">{transport.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Affiliations Card */}
              {isCurrentUser ? (
                <div className="bg-gray-50 rounded-3xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">Affiliations</h3>
                  {user.affiliations ? (
                    <div className="space-y-3">
                      {user.affiliations.split(',').map((affiliation) => (
                        <div key={affiliation} className="flex items-center gap-3 text-gray-600">
                          <FaCheck className="w-5 h-5 text-[#ec008c]" />
                          <span className="font-medium">{affiliation.trim()}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <button className="w-full p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300 transition-colors group">
                        <p className="text-gray-500 mb-2">Add your affiliations</p>
                        <span className="text-sm text-[#ec008c] group-hover:text-[#ff7171]">+ Add Affiliations</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : user.affiliations ? (
                <div className="bg-gray-50 rounded-3xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">Affiliations</h3>
                  <div className="space-y-3">
                    {user.affiliations.split(',').map((affiliation) => (
                      <div key={affiliation} className="flex items-center gap-3 text-gray-600">
                        <FaCheck className="w-5 h-5 text-[#ec008c]" />
                        <span className="font-medium">{affiliation.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 