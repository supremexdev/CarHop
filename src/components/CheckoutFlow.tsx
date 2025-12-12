import { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, User, Mail, Phone, MessageSquare, CreditCard, Check, Building2, Star } from 'lucide-react';
import { Car } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CheckoutFlowProps {
  car: Car;
  onBack: () => void;
}

export function CheckoutFlow({ car, onBack }: CheckoutFlowProps) {
  const [step, setStep] = useState<'contact' | 'payment' | 'confirmation'>('contact');
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    pickupDate: '',
    returnDate: '',
    pickupLocation: '',
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const calculateDays = () => {
    if (contactData.pickupDate && contactData.returnDate) {
      const pickup = new Date(contactData.pickupDate);
      const returnD = new Date(contactData.returnDate);
      const days = Math.ceil((returnD.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 1;
    }
    return 1;
  };

  const totalPrice = calculateDays() * car.pricePerDay;
  const serviceFee = 25;
  const insurance = 15 * calculateDays();
  const grandTotal = totalPrice + serviceFee + insurance;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmation');
  };

  return (
    <div className="min-h-screen bg-[#f6f8ef] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Browse
        </button>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${step === 'contact' ? 'text-primary' : step === 'payment' || step === 'confirmation' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 'contact' ? 'bg-primary text-white' : step === 'payment' || step === 'confirmation' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                {step === 'payment' || step === 'confirmation' ? <Check className="w-5 h-5" /> : '1'}
              </div>
              <span className="hidden sm:inline font-medium">Contact Seller</span>
            </div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-primary' : step === 'confirmation' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-primary text-white' : step === 'confirmation' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                {step === 'confirmation' ? <Check className="w-5 h-5" /> : '2'}
              </div>
              <span className="hidden sm:inline font-medium">Payment</span>
            </div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div className={`flex items-center gap-2 ${step === 'confirmation' ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 'confirmation' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="hidden sm:inline font-medium">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 'contact' && (
              <div className="bg-[#f6f8ef] rounded-xl shadow-md p-6 border border-gray-200">
                <h2 className="text-gray-900 mb-6">Contact Seller & Rental Details</h2>

                {/* Seller Info */}
                <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#f6f8ef] rounded-full flex items-center justify-center">
                      {car.seller.type === 'dealership' ? (
                        <Building2 className="w-6 h-6 text-primary" />
                      ) : (
                        <User className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1">{car.seller.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {car.seller.type === 'dealership' ? 'Dealership' : 'Private Owner'} • {car.seller.location}
                      </p>
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{car.seller.rating}</span>
                        <span className="text-sm text-gray-500">rating</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{car.seller.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{car.seller.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleContactSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 text-gray-700 font-medium">
                        <User className="inline-block w-4 h-4 mr-1" />
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={contactData.name}
                        onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-gray-700 font-medium">
                          <Mail className="inline-block w-4 h-4 mr-1" />
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={contactData.email}
                          onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-gray-700 font-medium">
                          <Phone className="inline-block w-4 h-4 mr-1" />
                          Phone
                        </label>
                        <input
                          type="tel"
                          required
                          value={contactData.phone}
                          onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-gray-700 font-medium">
                        <MapPin className="inline-block w-4 h-4 mr-1" />
                        Pick-up Location
                      </label>
                      <input
                        type="text"
                        required
                        value={contactData.pickupLocation}
                        onChange={(e) => setContactData({ ...contactData, pickupLocation: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        placeholder="Enter address"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-gray-700 font-medium">
                          <Calendar className="inline-block w-4 h-4 mr-1" />
                          Pick-up Date
                        </label>
                        <input
                          type="date"
                          required
                          value={contactData.pickupDate}
                          onChange={(e) => setContactData({ ...contactData, pickupDate: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-gray-700 font-medium">
                          <Calendar className="inline-block w-4 h-4 mr-1" />
                          Return Date
                        </label>
                        <input
                          type="date"
                          required
                          value={contactData.returnDate}
                          onChange={(e) => setContactData({ ...contactData, returnDate: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-gray-700 font-medium">
                        <MessageSquare className="inline-block w-4 h-4 mr-1" />
                        Message to Seller (Optional)
                      </label>
                      <textarea
                        value={contactData.message}
                        onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        placeholder="Any questions or special requests?"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-lg"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {step === 'payment' && (
              <div className="bg-[#f6f8ef] rounded-xl shadow-md p-6 border border-gray-200">
                <h2 className="text-gray-900 mb-6">Payment Information</h2>

                <form onSubmit={handlePaymentSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 text-gray-700 font-medium">
                        <CreditCard className="inline-block w-4 h-4 mr-1" />
                        Card Number
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-gray-700 font-medium">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentData.cardName}
                        onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-gray-700 font-medium">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          required
                          value={paymentData.expiryDate}
                          onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-gray-700 font-medium">
                          CVV
                        </label>
                        <input
                          type="text"
                          required
                          value={paymentData.cvv}
                          onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700 flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      Your payment information is secure and encrypted. We use industry-standard security measures.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-lg"
                  >
                    Complete Payment - ${grandTotal}
                  </button>
                </form>
              </div>
            )}

            {step === 'confirmation' && (
              <div className="bg-[#f6f8ef] rounded-xl shadow-md p-6 text-center border border-gray-200">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-600" />
                </div>

                <h2 className="text-gray-900 mb-4">Booking Confirmed!</h2>
                <p className="text-gray-600 mb-6">
                  Your rental has been confirmed. The seller has been notified and will contact you shortly.
                </p>

                <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
                  <h3 className="text-gray-900 mb-4">Booking Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Confirmation #:</span>
                      <span className="font-medium">CH{Math.floor(Math.random() * 1000000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Car:</span>
                      <span className="font-medium">{car.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seller:</span>
                      <span className="font-medium">{car.seller.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pick-up Date:</span>
                      <span className="font-medium">{contactData.pickupDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Return Date:</span>
                      <span className="font-medium">{contactData.returnDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{contactData.pickupLocation}</span>
                    </div>
                    <div className="pt-3 border-t border-gray-200 flex justify-between">
                      <span className="text-gray-600">Total Paid:</span>
                      <span className="font-semibold text-primary text-xl">${grandTotal}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                  A confirmation email has been sent to {contactData.email}
                </p>

                <button
                  onClick={onBack}
                  className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-lg"
                >
                  Browse More Cars
                </button>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#f6f8ef] rounded-xl shadow-md p-6 sticky top-24 border border-gray-200">
              <h3 className="text-gray-900 mb-4">Rental Summary</h3>

              <div className="mb-4">
                <div className="h-40 rounded-lg overflow-hidden bg-gray-200 mb-3">
                  <ImageWithFallback
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-gray-900 mb-1">{car.name}</h4>
                <p className="text-sm text-gray-500">{car.type} • {car.year}</p>
              </div>

              <div className="space-y-3 py-4 border-y border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Rental ({calculateDays()} days)</span>
                  <span className="font-medium">${totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-medium">${serviceFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Insurance</span>
                  <span className="font-medium">${insurance}</span>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-semibold text-primary text-xl">${grandTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}