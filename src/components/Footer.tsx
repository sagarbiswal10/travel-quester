import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment: "Amazing service! Found the perfect vacation package.",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 4,
    comment: "Great deals and easy booking process.",
  },
  {
    id: 3,
    name: "Emma Davis",
    rating: 5,
    comment: "The best travel booking platform I've used!",
  }
];

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About TravelQuester</h3>
            <p className="text-gray-300">
              Your trusted partner for discovering and booking amazing travel experiences around the world.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-700 pb-4">
                  <div className="flex items-center mb-2">
                    <span className="font-medium">{review.name}</span>
                    <div className="ml-2 flex">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-300">
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