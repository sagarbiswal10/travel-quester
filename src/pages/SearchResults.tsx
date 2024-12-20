import { useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Navbar } from '@/components/Navbar';

// Dummy data for different types
const dummyData = {
  flights: [
    { id: 1, from: 'New York', to: 'London', airline: 'Delta', price: '$450', departure: '10:00 AM', arrival: '10:00 PM' },
    { id: 2, from: 'London', to: 'Paris', airline: 'British Airways', price: '$200', departure: '2:00 PM', arrival: '4:00 PM' },
    { id: 3, from: 'Paris', to: 'Rome', airline: 'Air France', price: '$180', departure: '9:00 AM', arrival: '11:00 AM' },
  ],
  trains: [
    { id: 1, from: 'Paris', to: 'Lyon', operator: 'SNCF', price: '$60', departure: '8:00 AM', arrival: '11:00 AM' },
    { id: 2, from: 'London', to: 'Manchester', operator: 'National Rail', price: '$40', departure: '9:00 AM', arrival: '11:30 AM' },
    { id: 3, from: 'Berlin', to: 'Munich', operator: 'Deutsche Bahn', price: '$80', departure: '10:00 AM', arrival: '3:00 PM' },
  ],
  buses: [
    { id: 1, from: 'New York', to: 'Boston', operator: 'Greyhound', price: '$30', departure: '7:00 AM', arrival: '11:00 AM' },
    { id: 2, from: 'London', to: 'Bristol', operator: 'National Express', price: '$25', departure: '8:00 AM', arrival: '10:30 AM' },
    { id: 3, from: 'Paris', to: 'Brussels', operator: 'FlixBus', price: '$35', departure: '9:00 AM', arrival: '1:00 PM' },
  ],
  hotels: [
    { id: 1, name: 'Grand Hotel', location: 'Paris', price: '$200/night', rating: '4.5', roomType: 'Double Room' },
    { id: 2, name: 'City Plaza', location: 'London', price: '$180/night', rating: '4.2', roomType: 'Single Room' },
    { id: 3, name: 'Beach Resort', location: 'Barcelona', price: '$250/night', rating: '4.8', roomType: 'Suite' },
  ],
};

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('type') as keyof typeof dummyData || 'flights';
  const results = dummyData[type] || [];

  const renderResult = (item: any) => {
    if (type === 'hotels') {
      return (
        <Card key={item.id} className="mb-4">
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Location: {item.location}</p>
            <p>Price: {item.price}</p>
            <p>Rating: {item.rating}</p>
            <p>Room Type: {item.roomType}</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card key={item.id} className="mb-4">
        <CardHeader>
          <CardTitle>{item.operator || item.airline}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>From: {item.from}</p>
          <p>To: {item.to}</p>
          <p>Price: {item.price}</p>
          <p>Departure: {item.departure}</p>
          <p>Arrival: {item.arrival}</p>
        </CardContent>
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