import { useEffect, useState } from 'react';
import { getRenters } from '../data/database';

interface Renter {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  age: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  licenseNumber: string;
  licenseState: string;
  username: string;
  accountStatus: string;
  accountType: string;
  memberSince: string;
  lastLogin: string;
  totalVehicles: number;
  activeListings: number;
  totalEarnings: number;
  monthlyEarnings: number;
  completedRentals: number;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  [key: string]: any;
}

function RentersList() {
  const [renters, setRenters] = useState<Renter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRenters();
        setRenters(data);
      } catch (err) {
        setError('Failed to fetch renters');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">Loading renters...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Car Owners / Renters</h2>
      {renters.length === 0 ? (
        <p className="text-gray-500">No renters found</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {renters.map((renter) => (
            <div 
              key={renter._id} 
              className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow bg-white"
            >
              <div className="space-y-3">
                {/* Header with name and verification badge */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {renter.firstName} {renter.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">@{renter.username}</p>
                  </div>
                  {renter.isVerified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      ✓ Verified
                    </span>
                  )}
                </div>

                {/* Account type and status */}
                <div className="flex gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {renter.accountType}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    renter.accountStatus === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {renter.accountStatus}
                  </span>
                </div>

                {/* Contact info */}
                <div className="space-y-1 text-sm">
                  <p className="text-gray-600">
                    <span className="font-semibold">Email:</span> {renter.email}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Phone:</span> {renter.phoneNumber}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Age:</span> {renter.age}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                  <div>
                    <p className="text-xs text-gray-500">Vehicles</p>
                    <p className="text-lg font-semibold">{renter.totalVehicles}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Active Listings</p>
                    <p className="text-lg font-semibold">{renter.activeListings}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Completed</p>
                    <p className="text-lg font-semibold">{renter.completedRentals}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Rating</p>
                    <p className="text-lg font-semibold">
                      ⭐ {renter.rating} ({renter.reviewCount})
                    </p>
                  </div>
                </div>

                {/* Earnings */}
                <div className="pt-3 border-t">
                  <p className="text-xs text-gray-500">Total Earnings</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${renter.totalEarnings.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    This month: ${renter.monthlyEarnings.toLocaleString()}
                  </p>
                </div>

                {/* Member since */}
                <p className="text-xs text-gray-500 pt-2">
                  Member since {new Date(renter.memberSince).toLocaleDateString()}
                </p>

                {/* View all data */}
                <details className="text-sm text-gray-600 pt-2">
                  <summary className="cursor-pointer hover:text-blue-600">
                    View all data
                  </summary>
                  <pre className="mt-2 bg-gray-100 p-3 rounded overflow-x-auto text-xs">
                    {JSON.stringify(renter, null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RentersList;