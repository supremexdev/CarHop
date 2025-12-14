import { useEffect, useState } from 'react';
import { getTenants } from '../data/database';

interface Tenant {
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
  memberSince: string;
  lastLogin: string;
  totalRentals: number;
  activeRentals: any[];
  rentalHistory: any[];
  isVerified: boolean;
  preferredCarType: string;
  insuranceOption: string;
  [key: string]: any;
}

function TenantsList() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTenants();
        setTenants(data);
      } catch (err) {
        setError('Failed to fetch tenants');
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
        <div className="text-lg">Loading tenants...</div>
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
      <h2 className="text-3xl font-bold mb-6">Tenants / Renters</h2>
      {tenants.length === 0 ? (
        <p className="text-gray-500">No tenants found</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tenants.map((tenant) => (
            <div 
              key={tenant._id} 
              className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow bg-white"
            >
              <div className="space-y-3">
                {/* Header with name and verification badge */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {tenant.firstName} {tenant.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">@{tenant.username}</p>
                  </div>
                  {tenant.isVerified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      ✓ Verified
                    </span>
                  )}
                </div>

                {/* Account status */}
                <div className="flex gap-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    tenant.accountStatus === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {tenant.accountStatus}
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                    {tenant.insuranceOption}
                  </span>
                </div>

                {/* Contact info */}
                <div className="space-y-1 text-sm">
                  <p className="text-gray-600">
                    <span className="font-semibold">Email:</span> {tenant.email}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Phone:</span> {tenant.phoneNumber}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Age:</span> {tenant.age}
                  </p>
                </div>

                {/* Preferences */}
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Preferred Car:</span> {tenant.preferredCarType}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">License:</span> {tenant.licenseNumber} ({tenant.licenseState})
                  </p>
                </div>

                {/* Rental Stats */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                  <div>
                    <p className="text-xs text-gray-500">Total Rentals</p>
                    <p className="text-2xl font-semibold text-blue-600">{tenant.totalRentals}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Active Rentals</p>
                    <p className="text-2xl font-semibold text-green-600">
                      {tenant.activeRentals?.length || 0}
                    </p>
                  </div>
                </div>

                {/* Member info */}
                <div className="pt-3 border-t text-xs text-gray-500">
                  <p>Member since {new Date(tenant.memberSince).toLocaleDateString()}</p>
                  <p>Last login: {new Date(tenant.lastLogin).toLocaleDateString()}</p>
                </div>

                {/* View all data */}
                <details className="text-sm text-gray-600 pt-2">
                  <summary className="cursor-pointer hover:text-blue-600">
                    View all data
                  </summary>
                  <pre className="mt-2 bg-gray-100 p-3 rounded overflow-x-auto text-xs">
                    {JSON.stringify(tenant, null, 2)}
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

export default TenantsList;