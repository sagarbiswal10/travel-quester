import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardTitle } from './ui/card';
import { useToast } from './ui/use-toast';

const destinations = [
  {
    id: 1,
    name: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    price: '$599',
  },
  {
    id: 2,
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
    price: '$799',
  },
  {
    id: 3,
    name: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    price: '$899',
  },
  {
    id: 4,
    name: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
    price: '$699',
  },
];

export const FeaturedDestinations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toast } = useToast();

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? destinations.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === destinations.length - 1 ? 0 : prev + 1));
  };

  const handleBook = (destination: typeof destinations[0]) => {
    toast({
      title: "Destination Booked!",
      description: `${destination.name} has been added to your bookings.`,
    });
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Destinations</h2>
        
        <div className="relative">
          <div className="flex overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {destinations.map((destination) => (
                <Card key={destination.id} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <CardContent className="p-4">
                    <CardTitle>{destination.name}</CardTitle>
                    <p className="text-lg font-semibold text-primary">{destination.price}</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={() => handleBook(destination)}
                    >
                      Book Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};