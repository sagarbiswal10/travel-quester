import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';

const MyBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch bookings');
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast({
          title: 'Error',
          description: 'Failed to load bookings',
          variant: 'destructive',
        });
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user, toast]);

  const calculateTotal = (booking: any) => {
    const price = parseFloat(booking.price.replace(/[^0-9.-]+/g, ''));
    return isNaN(price) ? 0 : price;
  };

  const totalAmount = bookings.reduce((sum, booking) => sum + calculateTotal(booking), 0);

  const handlePayment = (bookingId: string) => {
    navigate(`/payment/${bookingId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-lg font-semibold">Total Amount: ${totalAmount.toFixed(2)}</p>
          </div>
        </div>
        
        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings found.</p>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <Card key={booking._id} className="mb-4">
                <CardHeader>
                  <CardTitle>
                    {booking.type === 'hotels' ? booking.name : (booking.operator || booking.airline)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img 
                    src={booking.image} 
                    alt={booking.name || `${booking.from} to ${booking.to}`} 
                    className="w-full h-48 object-cover rounded-md mb-4" 
                  />
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
                  <div className="mt-4">
                    <Button 
                      onClick={() => handlePayment(booking._id)}
                      className="w-full"
                    >
                      Pay Now
                    </Button>
                  </div>
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