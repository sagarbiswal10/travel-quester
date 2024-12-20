import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Navbar } from '@/components/Navbar';

const MyBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(storedBookings);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings found.</p>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="mb-4">
                <CardHeader>
                  <CardTitle>
                    {booking.type === 'hotels' ? booking.name : (booking.operator || booking.airline)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img src={booking.image} alt={booking.name || `${booking.from} to ${booking.to}`} className="w-full h-48 object-cover rounded-md mb-4" />
                  {booking.type === 'hotels' ? (
                    <>
                      <p>Location: {booking.location}</p>
                      <p>Price: {booking.price}</p>
                      <p>Room Type: {booking.roomType}</p>
                    </>
                  ) : (
                    <>
                      <p>From: {booking.from}</p>
                      <p>To: {booking.to}</p>
                      <p>Price: {booking.price}</p>
                      <p>Departure: {booking.departure}</p>
                      <p>Arrival: {booking.arrival}</p>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;