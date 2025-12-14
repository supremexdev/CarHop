import { useEffect, useState } from 'react';
import { getVehicles } from '../data/database';

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  available: boolean;
  [key: string]: any;
}

function VehiclesList() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch (err) {
        setError('Failed to fetch vehicles');
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
        <div className="text-lg">Loading vehicles...</div>
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
      <h2 className="text-3xl font-bold mb-6">Available Vehicles</h2>
      {vehicles.length === 0 ? (
        <p className="text-gray-500">No vehicles found</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <div 
              key={vehicle._id} 
              className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow bg-white"
            >
              <div className="space-y-3">
                {/* Vehicle header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {vehicle.year} {vehicle.make}
                    </h3>
                    <p className="text-lg text-gray-600">{vehicle.model}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    vehicle.available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {vehicle.available ? '✓ Available' : '✗ Unavailable'}
                  </span>
                </div>

                {/* Price */}
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500">Price per day</p>
                  <p className="text-3xl font-bold text-blue-600">
                    ${vehicle.pricePerDay}
                    <span className="text-sm text-gray-500 font-normal">/day</span>
                  </p>
                </div>

                {/* Additional info if available */}
                {(vehicle.color || vehicle.transmission || vehicle.fuelType) && (
                  <div className="pt-3 border-t space-y-1 text-sm">
                    {vehicle.color && (
                      <p className="text-gray-600">
                        <span className="font-semibold">Color:</span> {vehicle.color}
                      </p>
                    )}
                    {vehicle.transmission && (
                      <p className="text-gray-600">
                        <span className="font-semibold">Transmission:</span> {vehicle.transmission}
                      </p>
                    )}
                    {vehicle.fuelType && (
                      <p className="text-gray-600">
                        <span className="font-semibold">Fuel:</span> {vehicle.fuelType}
                      </p>
                    )}
                  </div>
                )}

                {/* Action button */}
                <button 
                  className={`w-full mt-4 py-2 px-4 rounded font-semibold transition-colors ${
                    vehicle.available
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!vehicle.available}
                >
                  {vehicle.available ? 'Book Now' : 'Not Available'}
                </button>

                {/* View all data */}
                <details className="text-sm text-gray-600 pt-2">
                  <summary className="cursor-pointer hover:text-blue-600">
                    View all data
                  </summary>
                  <pre className="mt-2 bg-gray-100 p-3 rounded overflow-x-auto text-xs">
                    {JSON.stringify(vehicle, null, 2)}
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

export default VehiclesList;