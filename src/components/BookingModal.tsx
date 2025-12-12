import { useState } from 'react';
import { X, Calendar, MapPin, User, Mail, Phone, Check } from 'lucide-react';
import { Car } from '../data/mockData';

interface BookingModalProps {
  car: Car;
  onClose: () => void;
}

export function BookingModal({ car, onClose }: BookingModalProps) {
  const [step, setStep] = useState<'details' | 'confirmation'>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupDate: '',
    returnDate: '',
    pickupLocation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmation');
  };

  const calculateDays = () => {
    if (formData.pickupDate && formData.returnDate) {
      const pickup = new Date(formData.pickupDate);
      const returnD = new Date(formData.returnDate);
      const days = Math.ceil((returnD.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 1;
    }
    return 1;
  };

  const totalPrice = calculateDays() * car.pricePerDay;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#f6f8ef] rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#f6f8ef] border-b border-gray-200 p-6 flex items-center justify-between">
          <h2>{step === 'details' ? 'Book Your Car' : 'Booking Confirmed!'}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="mb-2">{car.name}</h3>
              <p className="text-gray-600">{car.type} • ${car.pricePerDay}/day</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block mb-2 text-gray-700">
                  <User className="inline-block w-4 h-4 mr-1" />
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  <Mail className="inline-block w-4 h-4 mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  <Phone className="inline-block w-4 h-4 mr-1" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  <MapPin className="inline-block w-4 h-4 mr-1" />
                  Pick-up Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.pickupLocation}
                  onChange={(e) =>
                    setFormData({ ...formData, pickupLocation: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter address or airport"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-gray-700">
                    <Calendar className="inline-block w-4 h-4 mr-1" />
                    Pick-up Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.pickupDate}
                    onChange={(e) =>
                      setFormData({ ...formData, pickupDate: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">
                    <Calendar className="inline-block w-4 h-4 mr-1" />
                    Return Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.returnDate}
                    onChange={(e) =>
                      setFormData({ ...formData, returnDate: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Duration:</span>
                <span>{calculateDays()} {calculateDays() === 1 ? 'day' : 'days'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Total Price:</span>
                <span className="text-blue-600">${totalPrice}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Confirm Booking
            </button>
          </form>
        ) : (
          <div className="p-6 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>

            <h3 className="mb-4 text-green-600">Booking Confirmed!</h3>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Car</p>
                  <p>{car.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p>{formData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pick-up</p>
                  <p>{formData.pickupLocation}</p>
                  <p className="text-sm">{formData.pickupDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Return</p>
                  <p className="text-sm">{formData.returnDate}</p>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-blue-600">${totalPrice}</p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              A confirmation email has been sent to {formData.email}
            </p>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}