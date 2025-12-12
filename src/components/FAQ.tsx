import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Footer } from './Footer';
import parkingLot from 'figma:asset/81b854ba109c2488c1e8e4e3259fd147c542f2c7.png';

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

export function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#f6f8ef] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="mb-2">Frequently asked questions</h2>
          <p className="text-gray-600">
            Find answers to common questions about our car rental service.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#f6f8ef] rounded-xl shadow-md overflow-hidden border border-gray-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center gap-4 hover:bg-gray-100 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold">{index + 1}</span>
                </div>
                <span className="flex-1 font-medium text-gray-900">{faq.question}</span>
                {expandedIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {expandedIndex === index && (
                <div className="px-6 pb-5 pt-0">
                  <div className="pl-14">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Image */}
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <ImageWithFallback
            src={parkingLot}
            alt="Happy customers using CARHOP"
            className="w-full h-64 object-cover"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}