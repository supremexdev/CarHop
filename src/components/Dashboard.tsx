import { useState } from 'react';
import { Calendar, MapPin, Car, DollarSign, Clock, CheckCircle2, ArrowRight, Phone, Mail, Building2, User, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { mockCars, Rental } from '../data/mockData';
import { Footer } from './Footer';
//import happyCustomers from 'figma:asset/4df0c52b234f7bff84e2f7e20e132e313bb7aee9.png';

const mockRentals: Rental[] = [
  {
    id: 'r1',
    car: mockCars[0],
    pickupDate: '2025-12-05',
    returnDate: '2025-12-10',
    pickupLocation: 'San Francisco Airport',
    status: 'active',
    totalPrice: 445,
    seller: mockCars[0].seller,
    trackingInfo: {
      collectionDate: '2025-12-05',
      collectionTime: '10:00 AM',
      collectionAddress: 'San Francisco International Airport, Terminal 1',
      confirmed: true,
    },
  },
  {
    id: 'r2',
    car: mockCars[1],
    pickupDate: '2025-12-15',
    returnDate: '2025-12-18',
    pickupLocation: 'Los Angeles Downtown',
    status: 'upcoming',
    totalPrice: 375,
    seller: mockCars[1].seller,
    trackingInfo: {
      collectionDate: '2025-12-15',
      collectionTime: '2:00 PM',
      collectionAddress: '123 Main St, Los Angeles, CA 90012',
      confirmed: true,
    },
  },
  {
    id: 'r3',
    car: mockCars[2],
    pickupDate: '2025-11-20',
    returnDate: '2025-11-25',
    pickupLocation: 'New York JFK',
    status: 'completed',
    totalPrice: 475,
    seller: mockCars[2].seller,
  },
];

interface DashboardProps {
  onNavigate: (page: 'home' | 'dashboard' | 'browse' | 'faq') => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'upcoming' | 'completed'>('all');
  const [expandedRental, setExpandedRental] = useState<string | null>(null);

  const filteredRentals = mockRentals.filter((rental) => {
    if (activeTab === 'all') return true;
    return rental.status === activeTab;
  });

  const stats = {
    active: mockRentals.filter((r) => r.status === 'active').length,
    upcoming: mockRentals.filter((r) => r.status === 'upcoming').length,
    completed: mockRentals.filter((r) => r.status === 'completed').length,
    totalSpent: mockRentals
      .filter((r) => r.status === 'completed')
      .reduce((sum, r) => sum + r.totalPrice, 0),
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="mb-2">My Dashboard</h1>
          <p className="text-gray-600">Manage your car rentals and bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#f6f8ef] rounded-xl p-6 shadow-md border-l-4 border-primary">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Active Rentals</p>
              <Car className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl text-gray-900">{stats.active}</p>
          </div>

          <div className="bg-[#f6f8ef] rounded-xl p-6 shadow-md border-l-4 border-secondary">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Upcoming</p>
              <Clock className="w-5 h-5 text-secondary" />
            </div>
            <p className="text-3xl text-gray-900">{stats.upcoming}</p>
          </div>

          <div className="bg-[#f6f8ef] rounded-xl p-6 shadow-md border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Completed</p>
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl text-gray-900">{stats.completed}</p>
          </div>

          <div className="bg-[#f6f8ef] rounded-xl p-6 shadow-md border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Total Spent</p>
              <DollarSign className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-3xl text-gray-900">${stats.totalSpent}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-[#f6f8ef] rounded-xl shadow-md mb-6">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {[
                { key: 'all', label: 'All Rentals' },
                { key: 'active', label: 'Active' },
                { key: 'upcoming', label: 'Upcoming' },
                { key: 'completed', label: 'Completed' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-6 py-4 whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rentals List */}
          <div className="p-6">
            {filteredRentals.length === 0 ? (
              <div className="text-center py-12">
                <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No rentals found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRentals.map((rental) => (
                  <div
                    key={rental.id}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="w-full lg:w-48 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <ImageWithFallback
                          src={rental.car.image}
                          alt={rental.car.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="mb-1 text-gray-900">{rental.car.name}</h3>
                            <p className="text-sm text-gray-500">{rental.car.type}</p>
                          </div>
                          <span
                            className={`px-4 py-1 rounded-full text-sm font-medium ${
                              rental.status === 'active'
                                ? 'bg-primary/10 text-primary'
                                : rental.status === 'upcoming'
                                ? 'bg-secondary/10 text-secondary'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                          </span>
                        </div>

                        {/* Seller Information */}
                        <div className="mb-4 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-[#f6f8ef] rounded-full flex items-center justify-center flex-shrink-0">
                              {rental.seller.type === 'dealership' ? (
                                <Building2 className="w-5 h-5 text-primary" />
                              ) : (
                                <User className="w-5 h-5 text-primary" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900">{rental.seller.name}</p>
                              <p className="text-xs text-gray-500 mb-1">
                                {rental.seller.type === 'dealership' ? 'Dealership' : 'Private Owner'}
                              </p>
                              <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  <span>{rental.seller.phone}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  <span className="truncate">{rental.seller.email}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Tracking Information for Active/Upcoming */}
                        {rental.trackingInfo && (rental.status === 'active' || rental.status === 'upcoming') && (
                          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-4 h-4 text-blue-600" />
                              <span className="font-medium text-gray-900">Collection Details</span>
                              {rental.trackingInfo.confirmed && (
                                <CheckCircle2 className="w-4 h-4 text-green-600 ml-auto" />
                              )}
                            </div>
                            <div className="space-y-1 text-sm text-gray-700">
                              <p><strong>Date:</strong> {new Date(rental.trackingInfo.collectionDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                              <p><strong>Time:</strong> {rental.trackingInfo.collectionTime}</p>
                              <p><strong>Address:</strong> {rental.trackingInfo.collectionAddress}</p>
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-gray-700">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{rental.pickupLocation}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">
                              {new Date(rental.pickupDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">
                              {new Date(rental.returnDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">Total Price</p>
                            <p className="text-gray-900">${rental.totalPrice}</p>
                          </div>
                          <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                            View Details
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-primary to-orange-600 text-white rounded-xl p-8 shadow-lg mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="mb-4 text-white">Ready for your next adventure?</h2>
              <p className="text-white/90 mb-6">
                Browse our collection of premium vehicles and find the perfect car for your next trip.
              </p>
              <button 
                onClick={() => onNavigate('browse')}
                className="px-8 py-3 bg-[#f6f8ef] text-primary border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                Browse Cars
              </button>
            </div>
            <div className="hidden md:block">
              {/* <ImageWithFallback
                src={happyCustomers}
                alt="Next adventure"
                className="rounded-xl shadow-xl"
              /> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}