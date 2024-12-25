import mongoose from 'mongoose';
import Destination from './models/Destination.js';

const dummyDestinations = [
  {
    name: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    price: '$599',
    type: 'featured',
    description: 'City of Love and Lights',
    rating: 4.8
  },
  {
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
    price: '$799',
    type: 'featured',
    description: 'Tropical Paradise',
    rating: 4.7
  },
  {
    name: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    price: '$899',
    type: 'popular',
    description: 'Modern Metropolis',
    rating: 4.9
  },
  {
    name: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
    price: '$699',
    type: 'popular',
    description: 'The City That Never Sleeps',
    rating: 4.6
  },
  // Adding some transport and accommodation options
  {
    name: 'Paris Express',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05',
    price: '$150',
    type: 'train',
    from: 'London',
    to: 'Paris',
    departure: '09:00',
    arrival: '12:30',
    operator: 'Eurostar'
  },
  {
    name: 'Grand Hotel Paris',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    price: '$299',
    type: 'hotel',
    location: 'Paris',
    rating: 4.5,
    roomType: 'Deluxe Room'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/travelquester');
    
    // Clear existing destinations
    await Destination.deleteMany({});
    
    // Insert dummy destinations
    await Destination.insertMany(dummyDestinations);
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();