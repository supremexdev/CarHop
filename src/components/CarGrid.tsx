import { Car } from '../data/mockData';
import { CarCard } from './CarCard';

interface CarGridProps {
  cars: Car[];
  onSelectCar: (car: Car) => void;
}

export function CarGrid({ cars, onSelectCar }: CarGridProps) {
  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No cars found matching your criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} onSelect={onSelectCar} />
      ))}
    </div>
  );
}