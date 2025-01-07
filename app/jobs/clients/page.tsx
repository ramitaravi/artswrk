'use client';

import { useRouter } from 'next/navigation';
import { FaCheck, FaArchive, FaClock, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';
import Link from 'next/link';

const SAMPLE_JOBS = [
  {
    id: '1',
    title: 'Dance Teacher for Wedding',
    postedDate: '2024-01-15',
    rate: '$200-300',
    deadline: '1/14/2024',
    status: 'active',
    applicants: 5
  },
  {
    id: '2',
    title: 'Piano Instructor Needed',
    postedDate: '2024-01-14',
    rate: '$150-200',
    deadline: '1/13/2024',
    status: 'active',
    applicants: 3
  }
];

export default function ClientJobsPage() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState('active');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPlan, setCurrentPlan] = useState({
    type: 'basic-subscription',
    postsRemaining: 2,
    postsUsed: 1,
    postsLimit: 3
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-gray-700">
                Home
              </Link>
            </li>
            <li>
              <FaChevronRight className="w-3 h-3" />
            </li>
            <li>
              <Link href="/jobs" className="hover:text-gray-700">
                Jobs
              </Link>
            </li>
            <li>
              <FaChevronRight className="w-3 h-3" />
            </li>
            <li className="text-gray-900 font-medium">My Jobs</li>
          </ol>
        </nav>

        {/* Header with Title and Post Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">My Jobs</h1>
          <button
            onClick={() => router.push('/jobs/post')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700"
          >
            + Post New Job
          </button>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Filter Tabs and Sort */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedStatus('active')}
                  className={`flex items-center px-4 py-2 rounded-full ${
                    selectedStatus === 'active'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-white text-gray-500'
                  }`}
                >
                  <FaCheck className="w-4 h-4 mr-2" />
                  Active (2)
                </button>
                <button
                  onClick={() => setSelectedStatus('archived')}
                  className={`flex items-center px-4 py-2 rounded-full ${
                    selectedStatus === 'archived'
                      ? 'bg-gray-100 text-gray-700'
                      : 'bg-white text-gray-500'
                  }`}
                >
                  <FaArchive className="w-4 h-4 mr-2" />
                  Archived
                </button>
              </div>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="newest">Sort by: Newest</option>
                  <option value="oldest">Sort by: Oldest</option>
                  <option value="applicants">Sort by: Most Applicants</option>
                </select>
              </div>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
              {SAMPLE_JOBS.map(job => (
                <div 
                  key={job.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                        <p className="text-sm text-gray-500 mt-1">Posted {job.postedDate}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-gray-700">{job.rate}</span>
                          <span className="text-gray-500 flex items-center">
                            <FaClock className="w-4 h-4 mr-1" />
                            {job.deadline}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                          {job.applicants} applicants
                        </span>
                        <button
                          onClick={() => router.push(`/jobs/clients/${job.id}`)}
                          className="mt-4 text-pink-600 hover:text-pink-700 font-medium"
                        >
                          View Applications →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Your Plan</h2>
              
              {/* Plan Details */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {currentPlan.type === 'basic-subscription' ? 'Basic Plan' : 
                       currentPlan.type === 'pro-subscription' ? 'Pro Plan' : 
                       'Pay Per Post'}
                    </span>
                    <Link 
                      href="/jobs/post"
                      className="text-sm text-pink-600 hover:text-pink-700"
                    >
                      Change Plan →
                    </Link>
                  </div>
                  
                  {currentPlan.type === 'basic-subscription' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Job Posts Used</span>
                        <span>{currentPlan.postsUsed} of {currentPlan.postsLimit}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-pink-600 h-2 rounded-full" 
                          style={{ width: `${(currentPlan.postsUsed / currentPlan.postsLimit) * 100}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600">
                        {currentPlan.postsRemaining} posts remaining this month
                      </p>
                    </div>
                  )}
                  
                  {currentPlan.type === 'pro-subscription' && (
                    <p className="text-sm text-gray-600">
                      Unlimited job posts available
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Plan Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheck className="w-4 h-4 text-green-500 mr-2" />
                      {currentPlan.type === 'pro-subscription' ? 'Unlimited' : '3'} job posts per month
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheck className="w-4 h-4 text-green-500 mr-2" />
                      Access to all applicants
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <FaCheck className="w-4 h-4 text-green-500 mr-2" />
                      Message candidates
                    </li>
                    {currentPlan.type === 'pro-subscription' && (
                      <li className="flex items-center text-sm text-gray-600">
                        <FaCheck className="w-4 h-4 text-green-500 mr-2" />
                        Featured job posts
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 