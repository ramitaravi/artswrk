'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaCheck, FaClock, FaArchive, FaBuilding, FaMapMarkerAlt, FaUsers, FaBriefcase, FaCalendar, FaCreditCard, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

type Tab = 'jobs' | 'bookings' | 'artists' | 'tasks' | 'companies';

interface Job {
  id: string;
  title: string;
  status: 'active' | 'archived';
  applicants: number;
  posted: string;
  budget: string;
}

interface Company {
  id: string;
  name: string;
  location: string;
  employeeCount: number;
  industry: string;
  activeJobs: number;
  logo?: string;
}

interface ImpersonatedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  companyName?: string;
  plan?: 'basic' | 'pro';
}

interface Artist {
  id: string;
  name: string;
  location: string;
  title: string;
  imageUrl?: string;
  status: 'interested' | 'hired' | 'all';
}

export default function ClientDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('jobs');
  const [impersonatedUser, setImpersonatedUser] = useState<ImpersonatedUser | null>(null);
  const [artistFilter, setArtistFilter] = useState<'all' | 'hired' | 'interested'>('all');

  useEffect(() => {
    // Check for impersonated user
    const storedUser = localStorage.getItem('impersonatedUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setImpersonatedUser(user);
      if (user.role !== 'Client') {
        router.push('/dashboard/artist');
      }
    }
  }, [router]);

  // Placeholder data - would come from your API
  const stats = {
    activeJobs: 3,
    totalApplicants: 12,
    upcomingBookings: 2,
    artistsWorkedWith: 8
  };

  const jobs: Job[] = [
    {
      id: '1',
      title: 'Dance Teacher for Wedding',
      status: 'active',
      applicants: 5,
      posted: '2024-01-15',
      budget: '$200-300'
    },
    {
      id: '2',
      title: 'Piano Instructor Needed',
      status: 'active',
      applicants: 3,
      posted: '2024-01-14',
      budget: '$150-200'
    }
  ];

  const companies: Company[] = [
    {
      id: '1',
      name: 'Creative Arts Studio',
      location: 'San Francisco, CA',
      employeeCount: 25,
      industry: 'Arts & Entertainment',
      activeJobs: 3,
      logo: '/logos/creative-arts.png'
    },
    {
      id: '2',
      name: 'Dance Academy SF',
      location: 'San Francisco, CA',
      employeeCount: 12,
      industry: 'Dance Education',
      activeJobs: 1,
      logo: '/logos/dance-academy.png'
    },
    {
      id: '3',
      name: 'Music Masters',
      location: 'Oakland, CA',
      employeeCount: 8,
      industry: 'Music Education',
      activeJobs: 2,
      logo: '/logos/music-masters.png'
    }
  ];

  // Sample artists data
  const artists: Artist[] = [
    {
      id: '1',
      name: 'Emily Grace Tucker',
      location: 'Bloomfield, NJ, USA',
      title: 'Dance Educator',
      imageUrl: '/images/placeholder-1.jpg',
      status: 'interested'
    },
    {
      id: '2',
      name: 'Annie Ellertsen',
      location: '392 St Johns Pl, Brooklyn, NY 11238, USA',
      title: 'Side Jobs',
      imageUrl: '/images/placeholder-2.jpg',
      status: 'interested'
    },
    {
      id: '3',
      name: 'Honeybee Moise',
      location: 'New York, NY, USA',
      title: 'Dance Educator, Acting Coach, Vocal Coach, Dance Adjudicator',
      imageUrl: '/images/placeholder-3.jpg',
      status: 'hired'
    },
    {
      id: '4',
      name: 'Faith Coleman',
      location: '88-40 78th St, Jamaica, NY 11421, USA',
      title: 'Dance Educator, Dance Adjudicator',
      imageUrl: '/images/placeholder-4.jpg',
      status: 'interested'
    },
    {
      id: '5',
      name: 'Helen Clare',
      location: 'Fairfield County, CT, USA',
      title: 'Dance Educator',
      imageUrl: '/images/placeholder-5.jpg',
      status: 'hired'
    }
  ];

  // Filter artists based on selected filter
  const filteredArtists = artists.filter(artist => 
    artistFilter === 'all' ? true : artist.status === artistFilter
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {impersonatedUser && (
        <div className="bg-blue-50 p-2 flex items-center justify-between">
          <p className="text-sm text-blue-600">
            Viewing as: <span className="font-medium">{impersonatedUser.name}</span> (Client)
          </p>
          <button
            onClick={() => {
              localStorage.removeItem('impersonatedUser');
              router.push('/data/users');
            }}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Stop Impersonating
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-start">
          {/* Main Content */}
          <div className="flex-1 mr-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                {impersonatedUser ? `${impersonatedUser.name}'s Dashboard` : 'Client Dashboard'}
              </h1>
              <Link
                href="/jobs/post"
                className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                <FaPlus className="w-4 h-4 mr-2" />
                Post New Job
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500">Active Jobs</h3>
                  <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
                    {stats.activeJobs}
                  </span>
                </div>
                <p className="text-2xl font-semibold text-gray-900">{stats.activeJobs}</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500">Total Applicants</h3>
                  <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
                    {stats.totalApplicants}
                  </span>
                </div>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalApplicants}</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500">Upcoming Bookings</h3>
                  <span className="bg-purple-100 text-purple-600 text-xs font-medium px-2 py-1 rounded-full">
                    {stats.upcomingBookings}
                  </span>
                </div>
                <p className="text-2xl font-semibold text-gray-900">{stats.upcomingBookings}</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500">Artists Worked With</h3>
                  <span className="bg-pink-100 text-pink-600 text-xs font-medium px-2 py-1 rounded-full">
                    {stats.artistsWorkedWith}
                  </span>
                </div>
                <p className="text-2xl font-semibold text-gray-900">{stats.artistsWorkedWith}</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`py-4 px-1 relative font-medium text-sm transition-colors ${
                    activeTab === 'jobs'
                      ? 'text-pink-600 border-b-2 border-pink-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Jobs
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`py-4 px-1 relative font-medium text-sm transition-colors ${
                    activeTab === 'bookings'
                      ? 'text-pink-600 border-b-2 border-pink-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Bookings
                </button>
                <button
                  onClick={() => setActiveTab('artists')}
                  className={`py-4 px-1 relative font-medium text-sm transition-colors ${
                    activeTab === 'artists'
                      ? 'text-pink-600 border-b-2 border-pink-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Artists
                </button>
                <button
                  onClick={() => setActiveTab('tasks')}
                  className={`py-4 px-1 relative font-medium text-sm transition-colors ${
                    activeTab === 'tasks'
                      ? 'text-pink-600 border-b-2 border-pink-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Tasks
                </button>
                <button
                  onClick={() => setActiveTab('companies')}
                  className={`py-4 px-1 relative font-medium text-sm transition-colors ${
                    activeTab === 'companies'
                      ? 'text-pink-600 border-b-2 border-pink-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Companies
                </button>
              </nav>
            </div>

            {/* Jobs Tab Content */}
            {activeTab === 'jobs' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="space-x-2">
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                      <FaCheck className="w-4 h-4 inline mr-2 text-green-500" />
                      Active ({jobs.filter(j => j.status === 'active').length})
                    </button>
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                      <FaArchive className="w-4 h-4 inline mr-2 text-gray-400" />
                      Archived
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600">
                      <option>Sort by: Newest</option>
                      <option>Sort by: Oldest</option>
                      <option>Sort by: Most Applicants</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {jobs.map(job => (
                    <div key={job.id} className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                          <p className="text-sm text-gray-500">Posted {job.posted}</p>
                        </div>
                        <span className="bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-full">
                          {job.applicants} applicants
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{job.budget}</span>
                          <span>•</span>
                          <span>
                            <FaClock className="w-4 h-4 inline mr-1" />
                            {new Date(job.posted).toLocaleDateString()}
                          </span>
                        </div>
                        <button className="text-pink-600 text-sm font-medium hover:text-pink-700">
                          View Applications →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other tab contents would go here */}
            {activeTab === 'bookings' && (
              <div className="text-gray-500 text-center py-12">
                Bookings content coming soon...
              </div>
            )}

            {activeTab === 'artists' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Browse Artists</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    View and manage your connections with artists.
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="border-b border-gray-200 mb-6">
                  <nav className="flex space-x-8">
                    <button
                      onClick={() => setArtistFilter('all')}
                      className={`py-4 px-1 relative font-medium text-sm transition-colors ${
                        artistFilter === 'all'
                          ? 'text-pink-600 border-b-2 border-pink-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setArtistFilter('hired')}
                      className={`py-4 px-1 relative font-medium text-sm transition-colors ${
                        artistFilter === 'hired'
                          ? 'text-pink-600 border-b-2 border-pink-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Hired
                    </button>
                    <button
                      onClick={() => setArtistFilter('interested')}
                      className={`py-4 px-1 relative font-medium text-sm transition-colors ${
                        artistFilter === 'interested'
                          ? 'text-pink-600 border-b-2 border-pink-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Interested
                    </button>
                  </nav>
                </div>

                {/* Artists Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredArtists.map(artist => (
                    <div key={artist.id}>
                      {/* Square Image Container */}
                      <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                        {artist.imageUrl ? (
                          <Image
                            src={artist.imageUrl}
                            alt={artist.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FaUser className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                      {/* Details Section */}
                      <div className="mt-3">
                        <h3 className="font-medium text-gray-900">{artist.name}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">{artist.location}</p>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{artist.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tasks' && (
              <div className="text-gray-500 text-center py-12">
                Tasks content coming soon...
              </div>
            )}

            {activeTab === 'companies' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Your Companies</h2>
                  <button 
                    onClick={() => {}} 
                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FaPlus className="w-4 h-4 mr-2" />
                    Add Company
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {companies.map(company => (
                    <div 
                      key={company.id} 
                      className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            {company.logo ? (
                              <img 
                                src={company.logo} 
                                alt={company.name} 
                                className="w-8 h-8 object-contain"
                              />
                            ) : (
                              <FaBuilding className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{company.name}</h3>
                            <p className="text-sm text-gray-500">{company.industry}</p>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-500">
                          {/* Add ellipsis menu or edit button here */}
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-500">
                          <FaMapMarkerAlt className="w-4 h-4 mr-2 text-gray-400" />
                          {company.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <FaUsers className="w-4 h-4 mr-2 text-gray-400" />
                          {company.employeeCount} employees
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">Active Jobs</div>
                          <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
                            {company.activeJobs}
                          </span>
                        </div>
                      </div>

                      <button 
                        className="mt-4 w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  ))}

                  {/* Add Company Card */}
                  <button 
                    className="border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors flex flex-col items-center justify-center text-gray-500 hover:text-gray-600"
                    onClick={() => {}}
                  >
                    <FaPlus className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">Add New Company</span>
                  </button>
                </div>
              </div>
            )}
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
                <div className="text-sm text-gray-600 mb-1">Client</div>
                <div className="text-2xl font-semibold">
                  {impersonatedUser?.name || 'Guest'}
                </div>
                {impersonatedUser?.companyName && (
                  <div className="text-sm text-gray-600 mt-1">{impersonatedUser.companyName}</div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">
                  {impersonatedUser?.plan === 'pro' ? 'PRO Plan' : 'Basic Plan'}
                </div>
                <button className="text-pink-600 text-sm font-medium hover:opacity-80">
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
                <Link
                  href="/jobs/post"
                  className="w-full text-left px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors block"
                >
                  <div className="text-sm font-medium flex items-center">
                    <FaBriefcase className="w-4 h-4 mr-2 text-gray-400" />
                    Post a Job
                  </div>
                  <div className="text-xs text-gray-500">Create a new job listing</div>
                </Link>
                <button className="w-full text-left px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="text-sm font-medium flex items-center">
                    <FaCalendar className="w-4 h-4 mr-2 text-gray-400" />
                    Schedule Booking
                  </div>
                  <div className="text-xs text-gray-500">Book an artist</div>
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="text-sm font-medium flex items-center">
                    <FaCreditCard className="w-4 h-4 mr-2 text-gray-400" />
                    Billing
                  </div>
                  <div className="text-xs text-gray-500">Manage payment methods</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 