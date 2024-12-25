import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { gql, useMutation, useQuery } from '@apollo/client';
import { DestinationCard } from './destinations/DestinationCard';
import { DestinationCarousel } from './destinations/DestinationCarousel';

const GET_USER_BOOKINGS = gql`
  query GetUserBookings {
    myBookings {
      id
      destination {
        name
        price
      }
      date
      passengers
    }
  }
`;

const CREATE_BOOKING = gql`
  mutation CreateBooking($destinationId: ID!, $date: String!, $passengers: Int) {
    createBooking(destinationId: $destinationId, date: $date, passengers: $passengers) {
      id
      destination {
        name
        price
      }
      date
      passengers
    }
  }
`;

const ADD_TO_WISHLIST = gql`
  mutation AddToWishlist($destinationId: ID!) {
    addToWishlist(destinationId: $destinationId) {
      id
      name
    }
  }
`;

const GET_USER_WISHLIST = gql`
  query GetUserWishlist {
    myWishlist {
      id
      name
    }
  }
`;

export const FeaturedDestinations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: wishlistData } = useQuery(GET_USER_WISHLIST);
  const [createBooking] = useMutation(CREATE_BOOKING, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  });
  const [addToWishlist] = useMutation(ADD_TO_WISHLIST);

  useEffect(() => {
    if (wishlistData?.myWishlist) {
      setWishlistItems(wishlistData.myWishlist.map((item: any) => item.id));
    }
  }, [wishlistData]);

  const destinations = [
    {
      id: "64f5b7d42c7cf9f704f9d3e1", // Use actual MongoDB ObjectIds here
      name: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      price: '$599',
    },
    {
      id: "64f5b7d42c7cf9f704f9d3e2",
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
      price: '$799',
    },
    {
      id: "64f5b7d42c7cf9f704f9d3e3",
      name: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
      price: '$899',
    },
    {
      id: "64f5b7d42c7cf9f704f9d3e4",
      name: 'New York, USA',
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      price: '$699',
    },
  ];

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to continue.",
        variant: "destructive",
      });
      navigate('/auth');
      return false;
    }
    return true;
  };

  const handleBook = async (destination: typeof destinations[0]) => {
    if (!checkAuth()) return;
    
    try {
      const { data } = await createBooking({
        variables: {
          destinationId: destination.id,
          date: new Date().toISOString(),
          passengers: 1,
        },
        refetchQueries: [{ query: GET_USER_BOOKINGS }],
      });

      if (data?.createBooking) {
        toast({
          title: "Booking Successful!",
          description: `${destination.name} has been booked successfully.`,
        });
        navigate('/bookings');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: error instanceof Error ? error.message : "Failed to create booking",
        variant: "destructive",
      });
    }
  };

  const handleWishlist = async (destination: typeof destinations[0]) => {
    if (!checkAuth()) return;
    
    try {
      const { data } = await addToWishlist({
        variables: {
          destinationId: destination.id,
        },
        refetchQueries: [{ query: GET_USER_WISHLIST }],
      });

      setWishlistItems(prevItems => 
        prevItems.includes(destination.id.toString()) 
          ? prevItems.filter(id => id !== destination.id.toString())
          : [...prevItems, destination.id.toString()]
      );

      toast({
        title: wishlistItems.includes(destination.id.toString()) ? "Removed from Wishlist" : "Added to Wishlist",
        description: `${destination.name} has been ${wishlistItems.includes(destination.id.toString()) ? 'removed from' : 'added to'} your wishlist.`,
      });
    } catch (error) {
      toast({
        title: "Wishlist Update Failed",
        description: error instanceof Error ? error.message : "Failed to update wishlist",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Destinations</h2>
        <DestinationCarousel
          currentIndex={currentIndex}
          onPrevious={() => setCurrentIndex((prev) => (prev === 0 ? destinations.length - 1 : prev - 1))}
          onNext={() => setCurrentIndex((prev) => (prev === destinations.length - 1 ? 0 : prev + 1))}
        >
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              isWishlisted={wishlistItems.includes(destination.id.toString())}
              onBook={handleBook}
              onWishlist={handleWishlist}
            />
          ))}
        </DestinationCarousel>
      </div>
    </div>
  );
};