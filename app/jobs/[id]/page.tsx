'use client';

import { useState } from 'react';
import { FaMapMarkerAlt, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import ApplyPopup from '../components/ApplyPopup';

interface JobDetails {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: string;
  salary?: string;
  publishedDate: string;
  description: string;
  requirements: string[];
  companyInfo: {
    location: string;
    website: string;
  };
}

// This would come from an API based on the ID
const getJobDetails = (id: string): JobDetails => ({
  id,
  title: 'VP of Marketing',
  company: 'Betatech',
  companyLogo: '/company-logos/betatech.png',
  location: 'Dhaka, Bangladesh',
  type: 'Full-Time / Remote',
  salary: '$50,000-$100,000',
  publishedDate: 'May 16, 2023',
  description: 'We are searching for a Senior DevOps Engineer. You can be a perfect candidate if you are growth-oriented, you take pleasure in your work, and you enjoy working on new ideas to develop exciting products. By joining Proxify, you will get considerable opportunities to work with leading brands and amazing startups to build their next product and growth features.',
  requirements: [
    'You have +4 years of solid development experience as a DevOps Engineer',
    'You have +3 years of experience in Azure Cloud and Kubernetes',
    'You have good understanding of operating, monitoring, and documenting cloud solutions',
    'Responsible and able to work with minimal supervision',
    'Upper-intermediate English level',
    'You can communicate well with both technical and non-technical clients'
  ],
  companyInfo: {
    location: 'Dhaka, Bangladesh',
    website: 'https://betatech.com'
  }
});

export default function JobPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const jobDetails = getJobDetails(params.id);
  const [isApplyPopupOpen, setIsApplyPopupOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 group"
        >
          <FaArrowLeft className="mr-2 text-sm transition-transform group-hover:-translate-x-1" />
          Back to Jobs
        </button>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Published Date */}
            <div className="text-gray-500 mb-4">
              Published on {jobDetails.publishedDate}
            </div>

            {/* Job Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {jobDetails.title}
            </h1>

            {/* Job Meta */}
            <div className="text-lg text-gray-600 mb-8">
              {jobDetails.type} {jobDetails.salary && `/ ${jobDetails.salary}`}
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                The Role:
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {jobDetails.description}
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                What we are looking for:
              </h2>
              <ul className="space-y-4">
                {jobDetails.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gray-600">•</span>
                    <span className="ml-4 text-gray-600">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-8">
              {/* Company Logo */}
              <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                <img
                  src={jobDetails.companyLogo}
                  alt={jobDetails.company}
                  className="w-12 h-12 object-contain"
                />
              </div>

              {/* Company Name */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {jobDetails.company}
              </h2>

              {/* Location */}
              <div className="flex items-center text-gray-600 mb-4">
                <FaMapMarkerAlt className="mr-2" />
                {jobDetails.companyInfo.location}
              </div>

              {/* Website */}
              <a
                href={jobDetails.companyInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ec008c] hover:text-[#d4007d] flex items-center mb-6"
              >
                Visit Company Website
                <FaExternalLinkAlt className="ml-2 text-sm" />
              </a>

              {/* Apply Button */}
              <button 
                onClick={() => setIsApplyPopupOpen(true)}
                className="w-full bg-black text-white rounded-full py-3 px-6 font-medium hover:bg-gray-800 transition-colors"
              >
                Apply For This Job
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Popup */}
      <ApplyPopup
        isOpen={isApplyPopupOpen}
        onClose={() => setIsApplyPopupOpen(false)}
        jobDetails={{
          title: jobDetails.title,
          company: jobDetails.company,
          location: jobDetails.location,
          type: jobDetails.type
        }}
      />
    </div>
  );
} 