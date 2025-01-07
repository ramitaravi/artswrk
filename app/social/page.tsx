'use client';

import { useState } from 'react';
import { FaUser, FaHeart, FaComment, FaImage, FaBriefcase, FaEnvelope, FaCalendar, FaFileInvoice, FaTimes } from 'react-icons/fa';

interface Post {
  id: string;
  author: {
    name: string;
    role: string;
    profilePicture?: string;
  };
  type: 'artist' | 'job';
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  jobDetails?: {
    rate: string;
    location: string;
    date: string;
    applicants: number;
  };
}

interface InvoiceDetails {
  clientName: string;
  date: string;
  amount: string;
  description: string;
}

const SAMPLE_POSTS: Post[] = [
  {
    id: '1',
    author: {
      name: 'Dance Studio NYC',
      role: 'Dance Studio',
      profilePicture: '/sample/studio1.jpg'
    },
    type: 'job',
    content: 'Looking for a ballet instructor for our advanced youth program. Must have 5+ years of teaching experience and strong classical background. Position starts September 2024.',
    jobDetails: {
      rate: '$75-85/hour',
      location: 'New York, NY',
      date: 'Starting Sep 2024',
      applicants: 3
    },
    likes: 45,
    comments: 12,
    timestamp: '2h ago'
  },
  {
    id: '2',
    author: {
      name: 'Calvin Hilpert',
      role: 'Ballet Instructor & Choreographer',
      profilePicture: '/sample/calvin.jpg'
    },
    type: 'artist',
    content: 'Hello everyone! I am looking to book teaching and choreographic engagements for Summer 2025! I specialize in ballet and contemporary dance, with experience at Budapest Dance Theatre and other major companies.',
    image: '/sample/calvin-1.jpg',
    likes: 45,
    comments: 12,
    timestamp: '3h ago'
  },
  {
    id: '3',
    author: {
      name: 'Wedding Planners Co',
      role: 'Event Planning Agency',
      profilePicture: '/sample/company1.jpg'
    },
    type: 'job',
    content: 'Seeking a choreographer for a wedding in June 2024. The couple wants to create a memorable first dance combining waltz and contemporary styles. 6-8 sessions needed.',
    jobDetails: {
      rate: '$120/session',
      location: 'Boston, MA',
      date: 'June 2024',
      applicants: 1
    },
    likes: 28,
    comments: 4,
    timestamp: '5h ago'
  }
];

export default function SocialPage() {
  const [newPost, setNewPost] = useState('');
  const [postType, setPostType] = useState<'artist' | 'job'>('artist');
  const [activeTab, setActiveTab] = useState<'artist' | 'job'>('artist');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails>({
    clientName: 'Marie Et Maxime',
    date: new Date().toISOString().split('T')[0],
    amount: '',
    description: ''
  });

  const handlePost = () => {
    console.log('Creating post:', { content: newPost, type: postType });
    setNewPost('');
  };

  const handleInvoiceSubmit = () => {
    console.log('Sending invoice:', invoiceDetails);
    setShowInvoiceModal(false);
  };

  const filteredPosts = SAMPLE_POSTS.filter(post => post.type === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header with Invoice Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
          <button
            onClick={() => setShowInvoiceModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FaFileInvoice className="w-4 h-4" />
            <span>Create Invoice</span>
          </button>
        </div>

        {/* Invoice Modal */}
        {showInvoiceModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Create Invoice</h2>
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={invoiceDetails.clientName}
                    onChange={(e) => setInvoiceDetails({...invoiceDetails, clientName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Client name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={invoiceDetails.date}
                    onChange={(e) => setInvoiceDetails({...invoiceDetails, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="text"
                    value={invoiceDetails.amount}
                    onChange={(e) => setInvoiceDetails({...invoiceDetails, amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="$0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={invoiceDetails.description}
                    onChange={(e) => setInvoiceDetails({...invoiceDetails, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    rows={3}
                    placeholder="Dance lessons, choreography, etc."
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowInvoiceModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleInvoiceSubmit}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Send Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Post */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setPostType('artist')}
                className={`px-3 py-1.5 rounded-full flex items-center gap-2 ${
                  postType === 'artist' ? 'bg-pink-100 text-pink-800' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <FaUser className="w-4 h-4" />
                <span>Artist Post</span>
              </button>
              <button
                onClick={() => setPostType('job')}
                className={`px-3 py-1.5 rounded-full flex items-center gap-2 ${
                  postType === 'job' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <FaBriefcase className="w-4 h-4" />
                <span>Job Post</span>
              </button>
            </div>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder={postType === 'job' ? "Describe the job opportunity..." : "Share something with the community..."}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
              rows={3}
            />
            {postType === 'job' && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Rate (e.g. $50/hour)"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            )}
            <div className="mt-4 flex justify-between items-center">
              <button className="text-gray-500 hover:text-gray-700">
                <FaImage className="w-5 h-5" />
              </button>
              <button
                onClick={handlePost}
                disabled={!newPost.trim()}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  newPost.trim()
                    ? 'bg-pink-600 hover:bg-pink-700 text-white'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {postType === 'job' ? 'Post Job' : 'Post'}
              </button>
            </div>
          </div>
        </div>

        {/* Feed Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('artist')}
                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'artist'
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FaUser className="w-4 h-4" />
                  <span>Artist Feed</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('job')}
                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'job'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FaBriefcase className="w-4 h-4" />
                  <span>Job Feed</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow">
              {/* Post Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    {post.author.profilePicture ? (
                      <img
                        src={post.author.profilePicture}
                        alt={post.author.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="w-6 h-6 text-gray-400 m-2" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{post.author.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        post.type === 'job' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                      }`}>
                        {post.type === 'job' ? 'Job' : 'Artist'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500">{post.author.role}</p>
                      <span className="text-gray-300">•</span>
                      <p className="text-sm text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-3">
                <p className="text-gray-900">{post.content}</p>
                
                {/* Job Details */}
                {post.type === 'job' && post.jobDetails && (
                  <div className="mt-4 bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <FaBriefcase className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{post.jobDetails.rate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCalendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{post.jobDetails.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaUser className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{post.jobDetails.applicants} applicants</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{post.jobDetails.location}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Post Image */}
              {post.image && (
                <div className="relative aspect-video">
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-pink-600">
                    <FaHeart className="w-5 h-5" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-pink-600">
                    <FaComment className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </button>
                </div>
                {post.type === 'job' ? (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Apply Now
                  </button>
                ) : (
                  <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                    Book Artist
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 