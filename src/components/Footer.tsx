import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    comment: "Amazing service! Found the best flight deals for my vacation.",
    date: "2024-02-15"
  },
  {
    id: 2,
    name: "Sarah Smith",
    rating: 4,
    comment: "Great hotel booking experience. Very user-friendly interface.",
    date: "2024-02-10"
  },
  {
    id: 3,
    name: "Mike Johnson",
    rating: 5,
    comment: "The best travel booking platform I've used. Highly recommended!",
    date: "2024-02-05"
  }
];

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About TravelQuester</h3>
            <p className="text-gray-300">
              Your one-stop destination for all travel needs. Book flights, hotels, trains, and buses with ease.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-700 pb-4">
                  <div className="flex items-center mb-2">
                    <span className="font-bold mr-2">{review.name}</span>
                    <div className="flex">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{review.comment}</p>
                  <p className="text-gray-400 text-xs mt-1">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="text-gray-300">
              <p>Email: support@travelquester.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Travel Street, City, Country</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 TravelQuester. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};