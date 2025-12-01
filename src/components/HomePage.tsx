import { Search, Check, Sparkles, Shield, Clock } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CarGrid } from './CarGrid';
import { BookingModal } from './BookingModal';
import { mockCars, Car } from '../data/mockData';
import { Footer } from './Footer';

interface HomePageProps {
  onNavigate: (page: 'home' | 'dashboard' | 'browse') => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCars = mockCars.filter((car) => {
    if (searchQuery === '') return true;
    return (
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl mb-6 text-white font-bold">Welcome to CARHOP</h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                CarHop aims to create a user-friendly platform that
                connects car owners with people seeking car rentals in
                an accessible and easy-to-use interface, streamlining
                the car-sharing process while prioritizing transparency
                and security throughout each step to help you feel the ground running.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onNavigate('browse')}
                  className="px-8 py-4 bg-white text-primary rounded-xl hover:bg-gray-100 transition-colors font-semibold shadow-lg"
                >
                  Get Started Now
                </button>
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for your perfect car..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 shadow-lg focus:ring-2 focus:ring-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800"
                alt="Happy customers"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Goal Section */}
      <section className="py-16 bg-[#f6f8ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                alt="Team collaboration"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="mb-6">Our goal is simple</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We want you feeling confident and connected as
                you personally reach out to car owners for the vehicle
                you need. We believe in transparency and making the entire
                car sharing process a breeze.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to create a seamless marketplace that puts the essentials in to help you hit the ground running.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12 text-white">Getting started</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white text-gray-900 rounded-2xl overflow-hidden shadow-lg">
              <div className="h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1604445415362-2a9840bd5ff6?w=600"
                  alt="Find your match"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-3">FIND YOUR MATCH</h3>
                <p className="text-gray-700 leading-relaxed">
                  Tell us what kind of vehicle you
                  need and when you need it.
                  Browse our wide selection to find
                  the perfect match for your journey.
                </p>
              </div>
            </div>

            <div className="bg-white text-gray-900 rounded-2xl overflow-hidden shadow-lg">
              <div className="h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1763705859529-6a18f667a55e?w=600"
                  alt="What the details"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-3">WHAT THE DETAILS</h3>
                <p className="text-gray-700 leading-relaxed">
                  Get thorough in on meetings. We
                  provide in-depth vehicle
                  information so you can make an
                  informed choice.
                </p>
              </div>
            </div>

            <div className="bg-white text-gray-900 rounded-2xl overflow-hidden shadow-lg">
              <div className="h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=600"
                  alt="Hit your goals"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-3">HIT YOUR GOALS</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our platform simplifies the rental
                  process, getting you on the road
                  as soon as possible with minimal
                  hassle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">Why choose CARHOP</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#f6f8ef] rounded-2xl p-8 shadow-md">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="mb-3">Quality Selection</h3>
              <p className="text-gray-700">
                Every vehicle is verified and maintained to the highest standards, ensuring a premium experience.
              </p>
            </div>

            <div className="bg-[#f6f8ef] rounded-2xl p-8 shadow-md">
              <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="mb-3">Secure & Safe</h3>
              <p className="text-gray-700">
                Your safety is our priority. All transactions are protected with industry-leading security.
              </p>
            </div>

            <div className="bg-[#f6f8ef] rounded-2xl p-8 shadow-md">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <h3 className="mb-3">24/7 Support</h3>
              <p className="text-gray-700">
                Our dedicated support team is always available to help you with any questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Available Cars Section */}
      <section className="py-16 bg-[#f6f8ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">Available Cars</h2>
          <CarGrid cars={filteredCars.slice(0, 6)} onSelectCar={setSelectedCar} />
          
          {filteredCars.length > 6 && (
            <div className="text-center mt-12">
              <button 
                onClick={() => onNavigate('browse')}
                className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-lg font-medium"
              >
                View All Cars
              </button>
            </div>
          )}
        </div>
      </section>

      {selectedCar && (
        <BookingModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}

      <Footer onNavigate={onNavigate} />
    </div>
  );
}