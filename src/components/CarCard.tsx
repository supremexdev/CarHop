import { Car as CarType } from '../data/mockData';
import { Users, Fuel, Settings, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CarCardProps {
  car: CarType;
  onSelect: (car: CarType) => void;
}

export function CarCard({ car, onSelect }: CarCardProps) {
  return (
    <div className="bg-[#f6f8ef] rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 bg-gray-200">
        <ImageWithFallback
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover"
        />
        {!car.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full">
              Not Available
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-[#f6f8ef] px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">{car.rating}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="mb-1">{car.name}</h3>
          <p className="text-sm text-gray-500">{car.type}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{car.seats}</span>
          </div>
          <div className="flex items-center gap-1">
            <Settings className="w-4 h-4" />
            <span className="text-xs">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="w-4 h-4" />
            <span className="text-xs">{car.fuel}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-gray-900">${car.pricePerDay}</span>
            <span className="text-sm text-gray-500">/day</span>
          </div>
          <button
            onClick={() => onSelect(car)}
            disabled={!car.available}
            className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {car.available ? 'Book Now' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
}