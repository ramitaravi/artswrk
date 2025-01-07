'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaInstagram, FaTiktok, FaThLarge, FaList } from 'react-icons/fa';

interface Artist {
  uniqueid: string;
  fullname: string;
  location: string;
  profilepicture: string;
  artistservices: string;
  listofmasterstyles: string;
  bio: string;
  instagram: string;
  tiktok: string;
  artistexperiences: string;
  availabilitydetails: string;
  userrole: string;
}

type ViewMode = 'grid' | 'list';

export default function BrowseArtistsPage() {
  const router = useRouter();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  useEffect(() => {
    async function fetchArtists() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error(`Failed to fetch artists: ${response.statusText}`);
        }
        
        const data = await response.json();
        if (!data.users) {
          throw new Error('No users data received');
        }
        
        // Filter for users with role 'Artist'
        const artistUsers = data.users.filter((user: Artist) => 
          user.userrole?.toLowerCase() === 'artist'
        );
        console.log('Fetched artists with IDs:', artistUsers.map((a: Artist) => ({ id: a.uniqueid, name: a.fullname })));
        setArtists(artistUsers);
      } catch (err) {
        console.error('Error loading artists:', err);
        setError(err instanceof Error ? err.message : 'Failed to load artists');
      } finally {
        setLoading(false);
      }
    }

    fetchArtists();
  }, []);

  // Get unique services and styles from artists
  const allServices = Array.from(new Set(artists.flatMap(artist => 
    artist.artistservices?.split(',').map(s => s.trim()) || []
  ))).filter(Boolean).sort();

  const allStyles = Array.from(new Set(artists.flatMap(artist => 
    artist.listofmasterstyles?.split(',').map(s => s.trim()) || []
  ))).filter(Boolean).sort();

  // Filter artists based on search and filters
  const filteredArtists = artists.filter(artist => {
    const matchesSearch = searchTerm === '' || 
      artist.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.location?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesService = selectedService === '' ||
      artist.artistservices?.toLowerCase().includes(selectedService.toLowerCase());

    const matchesStyle = selectedStyle === '' ||
      artist.listofmasterstyles?.toLowerCase().includes(selectedStyle.toLowerCase());

    return matchesSearch && matchesService && matchesStyle;
  });

  const handleArtistClick = (uniqueid: string) => {
    console.log('Navigating to artist profile:', uniqueid);
    router.push(`/profile/${uniqueid}`);
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredArtists.map(artist => (
        <div 
          key={artist.uniqueid}
          onClick={() => handleArtistClick(artist.uniqueid)}
          className="cursor-pointer group"
        >
          {/* Square Image Container */}
          <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
            {artist.profilepicture ? (
              <img
                src={artist.profilepicture}
                alt={artist.fullname}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-4xl text-gray-400">
                  {artist.fullname.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="mt-3">
            <h3 className="font-medium text-gray-900">{artist.fullname}</h3>
            {artist.location && (
              <p className="text-sm text-gray-500 mt-0.5 flex items-center">
                <FaMapMarkerAlt className="w-3 h-3 mr-1" />
                {artist.location}
              </p>
            )}
            {artist.artistservices && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {artist.artistservices.split(',')[0]}
              </p>
            )}
            
            {/* Social Links */}
            {(artist.instagram || artist.tiktok) && (
              <div className="mt-2 flex space-x-2">
                {artist.instagram && (
                  <a 
                    href={`https://instagram.com/${artist.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-400 hover:text-pink-600"
                  >
                    <FaInstagram className="w-4 h-4" />
                  </a>
                )}
                {artist.tiktok && (
                  <a 
                    href={`https://tiktok.com/@${artist.tiktok}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-400 hover:text-pink-600"
                  >
                    <FaTiktok className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Artist
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Services
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Social
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredArtists.map(artist => (
            <tr 
              key={artist.uniqueid}
              onClick={() => handleArtistClick(artist.uniqueid)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                      {artist.profilepicture ? (
                        <img
                          src={artist.profilepicture}
                          alt={artist.fullname}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <span className="text-lg text-gray-400">
                            {artist.fullname.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {artist.fullname}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500 flex items-center">
                  <FaMapMarkerAlt className="w-3 h-3 mr-1" />
                  {artist.location || 'N/A'}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 line-clamp-2">
                  {artist.artistservices?.split(',')[0] || 'N/A'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  {artist.instagram && (
                    <a 
                      href={`https://instagram.com/${artist.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-400 hover:text-pink-600"
                    >
                      <FaInstagram className="w-4 h-4" />
                    </a>
                  )}
                  {artist.tiktok && (
                    <a 
                      href={`https://tiktok.com/@${artist.tiktok}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-400 hover:text-pink-600"
                    >
                      <FaTiktok className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Browse Artists</h1>
          <p className="mt-1 text-sm text-gray-500">
            Find and connect with talented artists for your next project.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex justify-between items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                placeholder="Search by name, location, or keywords..."
              />
            </div>

            {/* View Toggle */}
            <div className="ml-4 flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid'
                    ? 'bg-pink-100 text-pink-600'
                    : 'bg-white text-gray-400 hover:text-gray-500'
                }`}
              >
                <FaThLarge className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list'
                    ? 'bg-pink-100 text-pink-600'
                    : 'bg-white text-gray-400 hover:text-gray-500'
                }`}
              >
                <FaList className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">All Services</option>
              {allServices.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>

            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">All Styles</option>
              {allStyles.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 text-pink-600 hover:text-pink-700 font-medium"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Artists Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading artists...</p>
          </div>
        ) : (
          viewMode === 'grid' ? renderGridView() : renderListView()
        )}

        {/* No Results */}
        {!loading && !error && filteredArtists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No artists found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 