'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaUser, FaBuilding, FaBus, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';

interface Booking {
  id: number;
  _Option_Booking_Status: string;
  _Option_Payment_Status: string;
  "Artist Rate": string;
  "Client": string;
  "Client Rate": string;
  "Description": string;
  "End date": string;
  "Location": string;
  "Start date": string;
  "unique id": string;
}

interface Client {
  uniqueid: string;
  email: string;
  firstname: string;
  lastname: string;
  fullname: string;
  profilepicture: string;
  location: string;
  clientcompanyname: string;
  clienttransportdetails: string;
}

function StatusBadge({ status }: { status: string }) {
  const getStatusColor = (status: string) => {
    const statusLower = status?.toLowerCase() || '';
    switch (statusLower) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(status || '')}`}>
      {status || 'Unknown'}
    </span>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-100">
      <div className="flex-shrink-0">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="mt-1 font-medium">{value}</p>
      </div>
    </div>
  );
}

export default function ArtistBookingView({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookingData() {
      try {
        const bookingRes = await fetch(`/api/bookings/${params.id}`);
        if (!bookingRes.ok) throw new Error('Failed to fetch booking');
        const bookingData = await bookingRes.json();
        setBooking(bookingData);

        if (bookingData.Client) {
          const clientRes = await fetch(`/api/users?name=${encodeURIComponent(bookingData.Client)}`);
          if (!clientRes.ok) throw new Error('Failed to fetch client');
          const clientData = await clientRes.json();
          setClient(clientData.users[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchBookingData();
    }
  }, [params?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!booking || !client) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Not Found</h2>
          <p className="text-gray-600">Booking or client details not found</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <FaArrowLeft className="h-4 w-4 mr-2" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    {client.profilepicture ? (
                      <Image
                        src={client.profilepicture}
                        alt={client.fullname}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                        <span className="text-2xl text-gray-500">
                          {client.firstname?.[0]}
                          {client.lastname?.[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{client.fullname}</h1>
                    <p className="text-gray-500">{client.clientcompanyname || 'Independent Client'}</p>
                  </div>
                </div>
                <StatusBadge status={booking._Option_Booking_Status} />
              </div>

              <button 
                onClick={() => {
                  console.log('Message client:', client.email);
                }}
                className="w-full bg-[#ec008c] text-white px-6 py-3 rounded-lg hover:bg-[#d4007d] transition-colors flex items-center justify-center space-x-2"
              >
                <FaUser className="h-5 w-5" />
                <span>Message Client</span>
              </button>
            </div>

            {/* Booking Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard 
                icon={FaCalendarAlt}
                label="Start Date"
                value={formatDate(booking["Start date"])}
              />
              <InfoCard 
                icon={FaCalendarAlt}
                label="End Date"
                value={formatDate(booking["End date"])}
              />
              <InfoCard 
                icon={FaMapMarkerAlt}
                label="Location"
                value={booking.Location}
              />
              <InfoCard 
                icon={FaMoneyBillWave}
                label="Artist Rate"
                value={`$${booking["Artist Rate"]}`}
              />
            </div>

            {/* Description */}
            {booking.Description && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Description</h2>
                <p className="text-gray-600">{booking.Description}</p>
              </div>
            )}
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            {/* Company Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FaBuilding className="h-5 w-5 mr-2 text-gray-400" />
                Company Details
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Company Name</p>
                  <p className="font-medium">{client.clientcompanyname || 'Independent Client'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{client.location || 'Not specified'}</p>
                </div>
              </div>
            </div>

            {/* Transport Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FaBus className="h-5 w-5 mr-2 text-gray-400" />
                Transport Details
              </h2>
              <p className="text-gray-600">
                {client.clienttransportdetails || 'No transport details provided'}
              </p>
            </div>

            {/* Payment Status */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FaMoneyBillWave className="h-5 w-5 mr-2 text-gray-400" />
                Payment Details
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <StatusBadge status={booking._Option_Payment_Status} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Artist Rate</p>
                  <p className="font-medium">${booking["Artist Rate"]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 