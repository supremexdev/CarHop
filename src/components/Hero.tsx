import { Search, MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';

interface HeroProps {
  onSearch: (query: string) => void;
}

export function Hero({ onSearch }: HeroProps) {
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  return (
    <div className="relative bg-gradient-to-br from-primary to-orange-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h1 className="mb-4">Find Your Perfect Ride</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Choose from our wide selection of premium vehicles for your next journey
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <label className="block text-sm text-gray-700 mb-2">
                <MapPin className="inline-block w-4 h-4 mr-1" />
                Location
              </label>
              <input
                type="text"
                placeholder="Enter city or airport"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="relative">
              <label className="block text-sm text-gray-700 mb-2">
                <Calendar className="inline-block w-4 h-4 mr-1" />
                Pick-up Date
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="relative">
              <label className="block text-sm text-gray-700 mb-2">
                <Calendar className="inline-block w-4 h-4 mr-1" />
                Return Date
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by car name or type..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}