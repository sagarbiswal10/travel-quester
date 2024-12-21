import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookMarked, Trash2 } from "lucide-react";
import { Navbar } from '@/components/Navbar';
import { useToast } from "@/hooks/use-toast";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(storedWishlist);
  }, []);

  const handleBook = (item: any) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(item);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    toast({
      title: "Booking Successful!",
      description: "Your booking has been added to My Bookings.",
    });
  };

  const handleRemove = (itemId: number) => {
    const updatedWishlist = wishlist.filter(item => item.id !== itemId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
        {wishlist.length === 0 ? (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
        ) : (
          <div className="grid gap-4">
            {wishlist.map((item) => (
              <Card key={item.id} className="mb-4">
                <CardHeader>
                  <CardTitle>
                    {item.type === 'hotels' ? item.name : (item.operator || item.airline)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img src={item.image} alt={item.name || `${item.from} to ${item.to}`} className="w-full h-48 object-cover rounded-md mb-4" />
                  {item.type === 'hotels' ? (
                    <>
                      <p>Location: {item.location}</p>
                      <p>Price: {item.price}</p>
                      <p>Room Type: {item.roomType}</p>
                    </>
                  ) : (
                    <>
                      <p>From: {item.from}</p>
                      <p>To: {item.to}</p>
                      <p>Price: {item.price}</p>
                      <p>Departure: {item.departure}</p>
                      <p>Arrival: {item.arrival}</p>
                    </>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => handleRemove(item.id)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                  <Button onClick={() => handleBook(item)}>
                    <BookMarked className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;