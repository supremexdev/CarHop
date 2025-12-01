import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { mockCars, Car } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CheckoutFlow } from './CheckoutFlow';

export function BrowseCars() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [filters, setFilters] = useState({
    make: 'all',
    priceRange: 'all',
    year: 'all',
    mileage: 'all',
    type: 'all',
    fuel: 'all',
  });
  const [showFilters, setShowFilters] = useState(true);

  const makes = ['all', ...Array.from(new Set(mockCars.map((car) => car.make)))];
  const types = ['all', ...Array.from(new Set(mockCars.map((car) => car.type)))];
  const fuels = ['all', ...Array.from(new Set(mockCars.map((car) => car.fuel)))];

  const filteredCars = mockCars.filter((car) => {
    if (filters.make !== 'all' && car.make !== filters.make) return false;
    if (filters.type !== 'all' && car.type !== filters.type) return false;
    if (filters.fuel !== 'all' && car.fuel !== filters.fuel) return false;
    
    if (filters.priceRange !== 'all') {
      const price = car.pricePerDay;
      if (filters.priceRange === '0-50' && price > 50) return false;
      if (filters.priceRange === '51-100' && (price < 51 || price > 100)) return false;
      if (filters.priceRange === '101-150' && (price < 101 || price > 150)) return false;
      if (filters.priceRange === '151+' && price < 151) return false;
    }

    if (filters.year !== 'all') {
      if (filters.year === 'new' && car.year < 2023) return false;
      if (filters.year === 'recent' && (car.year < 2020 || car.year >= 2023)) return false;
      if (filters.year === 'older' && car.year >= 2020) return false;
    }

    if (filters.mileage !== 'all') {
      const miles = car.mileage;
      if (filters.mileage === '0-15000' && miles > 15000) return false;
      if (filters.mileage === '15001-30000' && (miles < 15001 || miles > 30000)) return false;
      if (filters.mileage === '30001+' && miles < 30001) return false;
    }

    return car.available;
  });

  const handleCheckout = (car: Car) => {
    setSelectedCar(car);
    setShowCheckout(true);
  };

  if (showCheckout && selectedCar) {
    return (
      <CheckoutFlow
        car={selectedCar}
        onBack={() => {
          setShowCheckout(false);
          setSelectedCar(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8ef] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Browse Available Cars</h1>
          <p className="text-gray-600">Find your perfect vehicle from our extensive collection</p>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
            <div className="bg-[#f6f8ef] rounded-xl shadow-md p-6 sticky top-24 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  <h3 className="text-gray-900">Filters</h3>
                </div>
                <button
                  onClick={() => setFilters({
                    make: 'all',
                    priceRange: 'all',
                    year: 'all',
                    mileage: 'all',
                    type: 'all',
                    fuel: 'all',
                  })}
                  className="text-sm text-primary hover:underline"
                >
                  Reset
                </button>
              </div>

              <div className="space-y-6">
                {/* Make Filter */}
                <div>
                  <label className="block mb-2 text-gray-700 font-medium">Make</label>
                  <div className="relative">
                    <select
                      value={filters.make}
                      onChange={(e) => setFilters({ ...filters, make: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-[#f6f8ef] focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    >
                      {makes.map((make) => (
                        <option key={make} value={make}>
                          {make === 'all' ? 'All Makes' : make}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block mb-2 text-gray-700 font-medium">Type</label>
                  <div className="relative">
                    <select
                      value={filters.type}
                      onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-[#f6f8ef] focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    >
                      {types.map((type) => (
                        <option key={type} value={type}>
                          {type === 'all' ? 'All Types' : type}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block mb-2 text-gray-700 font-medium">Price Range (per day)</label>
                  <div className="relative">
                    <select
                      value={filters.priceRange}
                      onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-[#f6f8ef] focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    >
                      <option value="all">All Prices</option>
                      <option value="0-50">$0 - $50</option>
                      <option value="51-100">$51 - $100</option>
                      <option value="101-150">$101 - $150</option>
                      <option value="151+">$151+</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Year Filter */}
                <div>
                  <label className="block mb-2 text-gray-700 font-medium">Year</label>
                  <div className="relative">
                    <select
                      value={filters.year}
                      onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-[#f6f8ef] focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    >
                      <option value="all">All Years</option>
                      <option value="new">New (2023+)</option>
                      <option value="recent">Recent (2020-2022)</option>
                      <option value="older">Older (Before 2020)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Mileage Filter */}
                <div>
                  <label className="block mb-2 text-gray-700 font-medium">Mileage</label>
                  <div className="relative">
                    <select
                      value={filters.mileage}
                      onChange={(e) => setFilters({ ...filters, mileage: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-[#f6f8ef] focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    >
                      <option value="all">All Mileage</option>
                      <option value="0-15000">0 - 15,000 miles</option>
                      <option value="15001-30000">15,001 - 30,000 miles</option>
                      <option value="30001+">30,001+ miles</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Fuel Type Filter */}
                <div>
                  <label className="block mb-2 text-gray-700 font-medium">Fuel Type</label>
                  <div className="relative">
                    <select
                      value={filters.fuel}
                      onChange={(e) => setFilters({ ...filters, fuel: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-[#f6f8ef] focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    >
                      {fuels.map((fuel) => (
                        <option key={fuel} value={fuel}>
                          {fuel === 'all' ? 'All Fuel Types' : fuel}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cars Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">{filteredCars.length} cars available</p>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden px-4 py-2 bg-[#f6f8ef] border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? 'Hide' : 'Show'} Filters
              </button>
            </div>

            {filteredCars.length === 0 ? (
              <div className="bg-[#f6f8ef] rounded-xl shadow-md p-12 text-center">
                <p className="text-gray-500">No cars match your filters. Try adjusting your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <div
                    key={car.id}
                    className="bg-[#f6f8ef] rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="h-48 overflow-hidden bg-gray-200">
                      <ImageWithFallback
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <div className="mb-3">
                        <h3 className="text-gray-900 mb-1">{car.name}</h3>
                        <p className="text-sm text-gray-500">{car.year} • {car.mileage.toLocaleString()} miles</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
                        <div>Type: {car.type}</div>
                        <div>Fuel: {car.fuel}</div>
                        <div>Seats: {car.seats}</div>
                        <div>{car.transmission}</div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div>
                          <p className="text-sm text-gray-500">Per day</p>
                          <p className="text-xl font-semibold text-primary">${car.pricePerDay}</p>
                        </div>
                        <button
                          onClick={() => handleCheckout(car)}
                          className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-md"
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}