import hondaCrv from 'figma:asset/5948f7c18eb3fbef43bd4a828c078810a375537d.png';

export interface Car {
  id: string;
  name: string;
  type: string;
  image: string;
  transmission: string;
  seats: number;
  fuel: string;
  pricePerDay: number;
  rating: number;
  available: boolean;
  make: string;
  year: number;
  mileage: number;
  seller: {
    name: string;
    type: 'owner' | 'dealership';
    phone: string;
    email: string;
    rating: number;
    location: string;
  };
}

export interface Rental {
  id: string;
  car: Car;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  status: 'active' | 'completed' | 'upcoming';
  totalPrice: number;
  seller: {
    name: string;
    type: 'owner' | 'dealership';
    phone: string;
    email: string;
  };
  trackingInfo?: {
    collectionDate: string;
    collectionTime: string;
    collectionAddress: string;
    confirmed: boolean;
  };
}

export const mockCars: Car[] = [
  {
    id: '1',
    name: 'Tesla Model 3',
    type: 'Electric',
    make: 'Tesla',
    year: 2023,
    mileage: 12000,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
    transmission: 'Automatic',
    seats: 5,
    fuel: 'Electric',
    pricePerDay: 89,
    rating: 4.8,
    available: true,
    seller: {
      name: 'Green Auto Dealership',
      type: 'dealership',
      phone: '+1 (555) 234-5678',
      email: 'contact@greenauto.com',
      rating: 4.9,
      location: 'San Francisco, CA',
    },
  },
  {
    id: '2',
    name: 'BMW X5',
    type: 'SUV',
    make: 'BMW',
    year: 2022,
    mileage: 25000,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    transmission: 'Automatic',
    seats: 7,
    fuel: 'Petrol',
    pricePerDay: 125,
    rating: 4.9,
    available: true,
    seller: {
      name: 'John Anderson',
      type: 'owner',
      phone: '+1 (555) 345-6789',
      email: 'john.anderson@email.com',
      rating: 4.7,
      location: 'Los Angeles, CA',
    },
  },
  {
    id: '3',
    name: 'Mercedes C-Class',
    type: 'Sedan',
    make: 'Mercedes',
    year: 2023,
    mileage: 8000,
    image: 'https://images.unsplash.com/photo-1701336843410-31897aea08a3?w=800',
    transmission: 'Automatic',
    seats: 5,
    fuel: 'Petrol',
    pricePerDay: 95,
    rating: 4.7,
    available: true,
    seller: {
      name: 'Luxury Motors Inc.',
      type: 'dealership',
      phone: '+1 (555) 456-7890',
      email: 'info@luxurymotors.com',
      rating: 4.8,
      location: 'New York, NY'
    },
  },
  {
    id: '4',
    name: 'Audi A4',
    type: 'Sedan',
    make: 'Audi',
    year: 2021,
    mileage: 35000,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    transmission: 'Automatic',
    seats: 5,
    fuel: 'Petrol',
    pricePerDay: 85,
    rating: 4.6,
    available: true,
    seller: {
      name: 'Sarah Miller',
      type: 'owner',
      phone: '+1 (555) 567-8901',
      email: 'sarah.m@email.com',
      rating: 4.5,
      location: 'Miami, FL',
    },
  },
  {
    id: '5',
    name: 'Range Rover Sport',
    type: 'SUV',
    make: 'Land Rover',
    year: 2024,
    mileage: 5000,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
    transmission: 'Automatic',
    seats: 5,
    fuel: 'Diesel',
    pricePerDay: 145,
    rating: 4.9,
    available: false,
    seller: {
      name: 'Premium Auto Group',
      type: 'dealership',
      phone: '+1 (555) 678-9012',
      email: 'sales@premiumauto.com',
      rating: 5.0,
      location: 'Chicago, IL',
    },
  },
  {
    id: '6',
    name: 'Toyota Camry',
    type: 'Sedan',
    make: 'Toyota',
    year: 2022,
    mileage: 18000,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
    transmission: 'Automatic',
    seats: 5,
    fuel: 'Hybrid',
    pricePerDay: 65,
    rating: 4.5,
    available: true,
    seller: {
      name: 'Mike Johnson',
      type: 'owner',
      phone: '+1 (555) 789-0123',
      email: 'mike.j@email.com',
      rating: 4.6,
      location: 'Seattle, WA',
    },
  },
  {
    id: '7',
    name: 'Porsche 911',
    type: 'Sports',
    make: 'Porsche',
    year: 2023,
    mileage: 10000,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    transmission: 'Manual',
    seats: 2,
    fuel: 'Petrol',
    pricePerDay: 250,
    rating: 5.0,
    available: true,
    seller: {
      name: 'Elite Sports Cars',
      type: 'dealership',
      phone: '+1 (555) 890-1234',
      email: 'contact@elitesportscars.com',
      rating: 4.9,
      location: 'Austin, TX',
    },
  },
  {
    id: '8',
    name: 'Honda CR-V',
    type: 'SUV',
    make: 'Honda',
    year: 2021,
    mileage: 42000,
    image: hondaCrv,
    transmission: 'Automatic',
    seats: 5,
    fuel: 'Petrol',
    pricePerDay: 75,
    rating: 4.4,
    available: true,
    seller: {
      name: 'Emily Davis',
      type: 'owner',
      phone: '+1 (555) 901-2345',
      email: 'emily.davis@email.com',
      rating: 4.3,
      location: 'Boston, MA',
    },
  },
];