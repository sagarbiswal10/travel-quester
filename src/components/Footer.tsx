import { Star } from 'lucide-react';

export const Footer = () => {
  const reviews = [
    { id: 1, name: "John Doe", rating: 5, text: "Amazing service! Found the perfect vacation package." },
    { id: 2, name: "Jane Smith", rating: 4, text: "Great deals on flights and hotels." },
    { id: 3, name: "Mike Johnson", rating: 5, text: "The booking process was smooth and easy." }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-300">
              TravelQuester is your trusted partner for all your travel needs. We provide the best deals on flights, hotels, and vacation packages.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review.id} className="border-b border-gray-700 pb-2">
                  <div className="flex items-center mb-1">
                    <span className="font-medium">{review.name}</span>
                    <div className="flex ml-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="text-gray-300">
              <p>Email: support@travelquester.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Travel Street, Adventure City, AC 12345</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} TravelQuester. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};