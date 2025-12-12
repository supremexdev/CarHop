import { Search, Check, Sparkles, Shield, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CarGrid } from './CarGrid';
import { BookingModal } from './BookingModal';
import { mockCars, Car } from '../data/mockData';
import { Footer } from './Footer';
import parkingLotImage from 'figma:asset/81b854ba109c2488c1e8e4e3259fd147c542f2c7.png';
import womanInCar from 'figma:asset/86e3b7f20a2a7acadeb82615bee08ec9734043e5.png';
import carKeyHandoff from 'figma:asset/efd5699d662f67ba24cfe1c5d9c64819c7820f34.png';

const faqs = [
  {
    question: 'How can I book a car?',
    answer: 'Simply click on "Get Started" to browse our available cars. Select your desired vehicle and click "Checkout" to proceed with your rental. You\'ll be asked to provide rental details, contact the seller, and complete the payment process.',
  },
  {
    question: 'If it is stuck, what is the payment process?',
    answer: 'After selecting your car and providing rental details, you\'ll contact the seller directly. Once confirmed, you\'ll proceed to our secure payment page where you can pay using your credit or debit card. All transactions are encrypted and secure.',
  },
  {
    question: 'How many cars & vans should I be able to book?',
    answer: 'You can book multiple vehicles through our platform. Each booking is processed separately. For rentals lasting 2-3 days or longer, special rates may apply. Insurance is included in all our rental packages.',
  },
  {
    question: 'When will I get my equipment and income are to update(s)?',
    answer: 'Once your booking is confirmed, you\'ll receive all the details including collection date, time, and address. You can track this information in your dashboard under the active or upcoming rentals section.',
  },
];

interface HomePageProps {
  onNavigate: (page: 'home' | 'dashboard' | 'browse') => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const filteredCars = mockCars.filter((car) => {
    if (searchQuery === '') return true;
    return (
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const toggleFAQ = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Scroll to FAQ section
    const faqSection = document.getElementById('faq-section');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
                <form onSubmit={handleSearchSubmit} className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for your perfect car..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 shadow-lg focus:ring-2 focus:ring-white focus:outline-none"
                  />
                </form>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758521961483-30f5908b9c93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRyaXZlciUyMHNtaWxpbmclMjBjYXJ8ZW58MXx8fHwxNzY1NTAwNDY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
                src={parkingLotImage}
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
          <h2 className="text-center mb-12 font-bold text-xl text-white">Getting started</h2>
          
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
                  src="https://images.unsplash.com/photo-1613214150333-53afb7561e6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBkZXRhaWxzJTIwaW5zcGVjdGlvbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjU1MDE0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="What the details"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-3">KNOW THE DETAILS</h3>
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
                  src="https://images.unsplash.com/photo-1659031605326-e0d90676abd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGRyaXZpbmclMjBjYXIlMjBoYXBweXxlbnwxfHx8fDE3NjU1MDEzNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
          <h2 className="text-center font-bold text-xl mb-12">Why choose CARHOP</h2>
          
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
          <h2 className="text-center font-bold text-xl mb-12">Available cars</h2>
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

      {/* FAQ Section */}
      <section className="py-16 bg-[#f6f8ef]" id="faq-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-bold text-xl mb-12">Frequently asked questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleFAQ(index)}>
                  <h3 className="text-gray-900 font-semibold">{faq.question}</h3>
                  {expandedFaqIndex === index ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                </div>
                {expandedFaqIndex === index && (
                  <p className="text-gray-700 mt-4 leading-relaxed">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}