'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaMapMarkerAlt, FaStar, FaEnvelope, FaChevronRight, FaTimes, FaUser, FaFile } from 'react-icons/fa';
import Link from 'next/link';
import MessageInterestedArtistModal from '@/app/components/MessageInterestedArtistModal';

interface Applicant {
  id: string;
  name: string;
  location: string;
  profilePicture: string;
  rating: number;
  experience: string;
  appliedDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  message?: string;
  rate?: string;
  resume?: string;
}

const SAMPLE_APPLICANTS: Applicant[] = [
  {
    id: '1',
    name: 'Emily Grace Tucker',
    location: 'Bloomfield, NJ, USA',
    profilePicture: '/sample/profile1.jpg',
    rating: 4.8,
    experience: '5 years teaching experience',
    appliedDate: '2024-01-14',
    status: 'pending',
    message: "I'm excited about this opportunity! I have extensive experience teaching dance to couples for their weddings. I specialize in creating personalized routines that match each couple's style and skill level.",
    rate: "$75/hour",
    resume: "Professional dance instructor with 5+ years of experience..."
  },
  {
    id: '2',
    name: 'Annie Ellertsen',
    location: 'Brooklyn, NY, USA',
    profilePicture: '/sample/profile2.jpg',
    rating: 4.9,
    experience: '7 years teaching experience',
    appliedDate: '2024-01-13',
    status: 'pending'
  },
  {
    id: '3',
    name: 'Honeybee Moise',
    location: 'New York, NY, USA',
    profilePicture: '/sample/profile3.jpg',
    rating: 4.7,
    experience: '3 years teaching experience',
    appliedDate: '2024-01-12',
    status: 'pending'
  }
];

export default function JobApplicantsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const handleMessage = (applicant: Applicant, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedApplicant(applicant);
    setShowMessageModal(true);
  };

  const handleConfirm = async (applicantId: string) => {
    // TODO: Implement confirmation logic
    console.log('Confirming applicant:', applicantId);
  };

  const handleApplicantClick = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setShowModal(true);
  };

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
              <Link href="/jobs/clients" className="hover:text-gray-700">
                Jobs
              </Link>
            </li>
            <li>
              <FaChevronRight className="w-3 h-3" />
            </li>
            <li className="text-gray-900 font-medium">Dance Teacher for Wedding</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Dance Teacher for Wedding</h1>
              <p className="mt-1 text-sm text-gray-500">
                Posted on Jan 15, 2024 • $200-300 • 5 applicants
              </p>
            </div>
            <button
              onClick={() => router.push('/jobs/clients')}
              className="text-gray-500 hover:text-gray-700"
            >
              ← Back to Jobs
            </button>
          </div>
        </div>

        {/* Applicants List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Applicants</h2>
          </div>
          <ul className="divide-y divide-gray-200">
            {SAMPLE_APPLICANTS.map((applicant) => (
              <li
                key={applicant.id}
                className="p-6 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleApplicantClick(applicant)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200">
                      <div className="h-full w-full flex items-center justify-center">
                        <span className="text-lg text-gray-500">
                          {applicant.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{applicant.name}</h3>
                      <div className="mt-1 flex items-center">
                        <FaMapMarkerAlt className="w-4 h-4 text-gray-400 mr-1" />
                        <p className="text-sm text-gray-500">{applicant.location}</p>
                      </div>
                      <div className="mt-1 flex items-center">
                        <FaStar className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">{applicant.rating}</span>
                        <span className="mx-2">•</span>
                        <span className="text-sm text-gray-600">{applicant.experience}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={(e) => handleMessage(applicant, e)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <FaEnvelope className="w-4 h-4 mr-2" />
                      Message
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConfirm(applicant.id);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Applicant Modal */}
        {showModal && selectedApplicant && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-start p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Application Details</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Applied on {selectedApplicant.appliedDate}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Job Info Card */}
                <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Dance Teacher for Wedding</h3>
                      <p className="mt-1 text-sm text-gray-500">$200-300</p>
                    </div>
                    <Link 
                      href="/jobs/clients"
                      className="text-sm text-pink-600 hover:text-pink-700"
                    >
                      View Job Details →
                    </Link>
                  </div>
                </div>

                {/* Applicant Info */}
                <div className="mb-6">
                  <div className="flex items-center">
                    <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200">
                      <div className="h-full w-full flex items-center justify-center">
                        <span className="text-2xl text-gray-500">
                          {selectedApplicant.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-medium text-gray-900">{selectedApplicant.name}</h3>
                      <div className="mt-1 flex items-center">
                        <FaMapMarkerAlt className="w-4 h-4 text-gray-400 mr-1" />
                        <p className="text-sm text-gray-500">{selectedApplicant.location}</p>
                      </div>
                      <div className="mt-1 flex items-center">
                        <FaStar className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">{selectedApplicant.rating}</span>
                        <span className="mx-2">•</span>
                        <span className="text-sm text-gray-600">{selectedApplicant.experience}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={() => router.push(`/profile/${selectedApplicant.id}`)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <FaUser className="w-4 h-4 mr-2" />
                      View Full Profile
                    </button>
                    {selectedApplicant.resume && (
                      <a
                        href={selectedApplicant.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <FaFile className="w-4 h-4 mr-2" />
                        View Resume
                      </a>
                    )}
                  </div>
                </div>

                {/* Application Details */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Proposed Rate</h4>
                    <p className="mt-2 text-sm text-gray-600">{selectedApplicant.rate}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Cover Message</h4>
                    <p className="mt-2 text-sm text-gray-600">{selectedApplicant.message}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    onClick={(e) => handleMessage(selectedApplicant, e)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <FaEnvelope className="w-4 h-4 mr-2" />
                    Message
                  </button>
                  <button
                    onClick={() => handleConfirm(selectedApplicant.id)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Message Modal */}
        <MessageInterestedArtistModal
          isOpen={showMessageModal}
          onClose={() => setShowMessageModal(false)}
          artistName={selectedApplicant?.name || ''}
        />
      </div>
    </div>
  );
} 