import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, BookMarked } from "lucide-react";
import { Navbar } from '@/components/Navbar';
import { useToast } from "@/hooks/use-toast";
import { gql, useMutation } from '@apollo/client';

// Dummy data for different types
const dummyData = {
  flights: [
    { id: 1, from: 'New York', to: 'London', airline: 'Delta', price: '$450', departure: '10:00 AM', arrival: '10:00 PM', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05' },
    { id: 2, from: 'London', to: 'Paris', airline: 'British Airways', price: '$200', departure: '2:00 PM', arrival: '4:00 PM', image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1' },
    { id: 3, from: 'Paris', to: 'Rome', airline: 'Air France', price: '$180', departure: '9:00 AM', arrival: '11:00 AM', image: 'https://images.unsplash.com/photo-1483450388369-9ed95738483c' },
  ],
  trains: [
    { id: 1, from: 'Paris', to: 'Lyon', operator: 'SNCF', price: '$60', departure: '8:00 AM', arrival: '11:00 AM', image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3' },
    { id: 2, from: 'London', to: 'Manchester', operator: 'National Rail', price: '$40', departure: '9:00 AM', arrival: '11:30 AM', image: 'https://images.unsplash.com/photo-1552423314-cf29ab68ad73' },
    { id: 3, from: 'Berlin', to: 'Munich', operator: 'Deutsche Bahn', price: '$80', departure: '10:00 AM', arrival: '3:00 PM', image: 'https://images.unsplash.com/photo-1535535112387-56ffe8db21ff' },
  ],
  buses: [
    { id: 1, from: 'New York', to: 'Boston', operator: 'Greyhound', price: '$30', departure: '7:00 AM', arrival: '11:00 AM', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957' },
    { id: 2, from: 'London', to: 'Bristol', operator: 'National Express', price: '$25', departure: '8:00 AM', arrival: '10:30 AM', image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e' },
    { id: 3, from: 'Paris', to: 'Brussels', operator: 'FlixBus', price: '$35', departure: '9:00 AM', arrival: '1:00 PM', image: 'https://images.unsplash.com/photo-1509749837427-ac94a2553d0e' },
  ],
  hotels: [
    { id: 1, name: 'Grand Hotel', location: 'Paris', price: '$200/night', rating: '4.5', roomType: 'Double Room', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945' },
    { id: 2, name: 'City Plaza', location: 'London', price: '$180/night', rating: '4.2', roomType: 'Single Room', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa' },
    { id: 3, name: 'Beach Resort', location: 'Barcelona', price: '$250/night', rating: '4.8', roomType: 'Suite', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4' },
  ],
};

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

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('type') as keyof typeof dummyData || 'flights';
  const results = dummyData[type] || [];

  const [createBooking] = useMutation(CREATE_BOOKING);
  const [addToWishlist] = useMutation(ADD_TO_WISHLIST);

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

  const handleBook = async (item: any) => {
    if (!checkAuth()) return;
    
    try {
      const { data } = await createBooking({
        variables: {
          destinationId: item.id,
          date: new Date().toISOString(),
          passengers: 1,
        },
      });

      toast({
        title: "Booking Successful!",
        description: "Your booking has been added to My Bookings.",
      });
      
      navigate('/bookings');
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: error instanceof Error ? error.message : "Failed to create booking",
        variant: "destructive",
      });
    }
  };

  const handleAddToWishlist = async (item: any) => {
    if (!checkAuth()) return;
    
    try {
      const { data } = await addToWishlist({
        variables: {
          destinationId: item.id,
        },
      });

      toast({
        title: "Added to Wishlist",
        description: "Item has been added to your wishlist.",
      });
    } catch (error) {
      toast({
        title: "Wishlist Update Failed",
        description: error instanceof Error ? error.message : "Failed to update wishlist",
        variant: "destructive",
      });
    }
  };

  const renderResult = (item: any) => {
    if (type === 'hotels') {
      return (
        <Card key={item.id} className="mb-4">
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <p>Location: {item.location}</p>
            <p>Price: {item.price}</p>
            <p>Rating: {item.rating}</p>
            <p>Room Type: {item.roomType}</p>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => handleAddToWishlist(item)}>
              <Heart className="h-4 w-4 mr-2" />
              Add to Wishlist
            </Button>
            <Button onClick={() => handleBook(item)}>
              <BookMarked className="h-4 w-4 mr-2" />
              Book Now
            </Button>
          </CardFooter>
        </Card>
      );
    }

    return (
      <Card key={item.id} className="mb-4">
        <CardHeader>
          <CardTitle>{item.operator || item.airline}</CardTitle>
        </CardHeader>
        <CardContent>
          <img src={item.image} alt={item.from + ' to ' + item.to} className="w-full h-48 object-cover rounded-md mb-4" />
          <p>From: {item.from}</p>
          <p>To: {item.to}</p>
          <p>Price: {item.price}</p>
          <p>Departure: {item.departure}</p>
          <p>Arrival: {item.arrival}</p>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => handleAddToWishlist(item)}>
            <Heart className="h-4 w-4 mr-2" />
            Add to Wishlist
          </Button>
          <Button onClick={() => handleBook(item)}>
            <BookMarked className="h-4 w-4 mr-2" />
            Book Now
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>
        <div className="grid gap-4">
          {results.map(renderResult)}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
