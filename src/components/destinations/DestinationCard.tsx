import { Heart, BookMarked } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card';

interface DestinationCardProps {
  destination: {
    id: string | number;
    name: string;
    image: string;
    price: string;
  };
  isWishlisted: boolean;
  onBook: (destination: any) => void;
  onWishlist: (destination: any) => void;
}

export const DestinationCard = ({ 
  destination, 
  isWishlisted, 
  onBook, 
  onWishlist 
}: DestinationCardProps) => {
  return (
    <Card className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4">
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <CardContent className="p-4">
        <CardTitle>{destination.name}</CardTitle>
        <p className="text-lg font-semibold text-primary">{destination.price}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline"
          onClick={() => onWishlist(destination)}
          className={isWishlisted ? 'bg-pink-50' : ''}
        >
          <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? 'fill-pink-500 stroke-pink-500' : ''}`} />
          {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
        </Button>
        <Button onClick={() => onBook(destination)}>
          <BookMarked className="h-4 w-4 mr-2" />
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};