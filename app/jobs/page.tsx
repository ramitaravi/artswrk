'use client';

import { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  isRemote?: boolean;
  isPRO?: boolean;
  postedDate?: string;
  rate?: string;
  time?: string;
  type?: string;
}

const sampleJobs: Job[] = [
  {
    id: '1',
    title: 'Head of Design',
    company: 'Dontechi',
    companyLogo: '/company-logos/dontechi.png',
    location: 'Remote',
    type: 'Full-Time / Remote',
    postedDate: 'May 16, 2023'
  },
  {
    id: '2',
    title: 'Master Classes',
    company: 'East Coast Dance Company',
    companyLogo: '/company-logos/east-coast.png',
    location: 'Sea Girt, NJ',
    postedDate: 'Posted 4 days ago',
    time: 'Wed, 5/07/25, 4:00 pm - 5:00 pm',
    rate: 'Open rate'
  },
  {
    id: '3',
    title: 'Ventures Lead',
    company: 'Chorus One',
    companyLogo: '/company-logos/chorus.png',
    location: 'Remote',
    type: 'Part-Time / Remote',
    postedDate: 'May 16, 2023'
  },
  {
    id: '4',
    title: 'VP of Marketing',
    company: 'Betatech',
    companyLogo: '/company-logos/betatech.png',
    location: 'Remote',
    type: 'Full-Time / Remote',
    postedDate: 'May 16, 2023'
  }
];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('New York, NY, USA');
  const router = useRouter();

  const handleApply = (jobId: string) => {
    router.push(`/jobs/${jobId}`);
  };
  
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Left Side - Job Listings */}
        <div className="flex gap-8">
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold">Jobs For You (63)</h1>
              
              {/* Search Bars */}
              <div className="flex gap-2 mt-6">
                <div className="relative flex-1">
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search Jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                  />
                </div>
                <div className="relative flex-1">
                  <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={locationTerm}
                    onChange={(e) => setLocationTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-4 mt-4">
                <div className="relative">
                  <select className="appearance-none w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400">
                    <option>Artist Type</option>
                  </select>
                </div>
                <div className="relative">
                  <select className="appearance-none w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400">
                    <option>Service Type</option>
                  </select>
                </div>
                <button className="text-gray-600 hover:text-gray-800">
                  Reset Filters
                </button>
              </div>

              {/* PRO Jobs Section */}
              <div className="flex items-center gap-2 mt-8">
                <h2 className="text-lg font-semibold">Jobs PRO</h2>
                <FaStar className="text-yellow-400" />
                <div className="flex-1" />
                <button className="text-[#ec008c] hover:text-[#d4007d] font-medium">
                  View PRO Jobs →
                </button>
              </div>
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {sampleJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 transition-colors">
                  <div className="flex items-start gap-4">
                    {/* Company Logo */}
                    <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                      {job.companyLogo ? (
                        <img src={job.companyLogo} alt={job.company} className="w-10 h-10 object-contain" />
                      ) : (
                        <span className="text-xl font-medium text-gray-400">
                          {job.company[0]}
                        </span>
                      )}
                    </div>

                    {/* Job Details */}
                    <div className="flex-1">
                      {/* Company Name */}
                      <h4 className="text-gray-600 text-base mb-1">
                        {job.company}
                      </h4>

                      {/* Job Title */}
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        {job.title}
                      </h3>

                      {/* Job Meta */}
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          {job.time ? (
                            <>
                              {/* Time Icon and Time */}
                              <div className="flex items-center text-[#ec008c] text-sm">
                                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                                {job.time}
                              </div>
                              {/* Rate Badge */}
                              <div className="inline-block bg-[#fff5ef] text-[#ec008c] text-sm px-3 py-1 rounded-full">
                                {job.rate}
                              </div>
                            </>
                          ) : (
                            <>
                              {/* Location */}
                              <div className="flex items-center text-gray-600 text-sm">
                                <FaMapMarkerAlt className="mr-2" />
                                {job.location}
                              </div>
                              {/* Job Type */}
                              {job.type && (
                                <div className="text-gray-600 text-sm">
                                  {job.type}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        
                        {/* Posted Date & Apply Button */}
                        <div className="flex flex-col items-end">
                          <span className="text-gray-500 text-sm mb-2">
                            {job.postedDate}
                          </span>
                          <button 
                            onClick={() => handleApply(job.id)}
                            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="w-[500px] bg-gray-100 rounded-xl">
            <div className="h-full relative">
              <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-md">
                <button className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-l-lg border-r">
                  Map
                </button>
                <button className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-r-lg">
                  Satellite
                </button>
              </div>
              {/* Map will be integrated here */}
              <div className="h-[calc(100vh-96px)] w-full bg-gray-200 rounded-xl flex items-center justify-center">
                <p className="text-gray-500">Map Integration Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 