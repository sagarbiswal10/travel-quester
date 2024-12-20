import { Link } from 'react-router-dom';
import { Heart, BookMarked } from 'lucide-react';
import { Button } from './ui/button';

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            TravelQuester
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/bookings" className="flex items-center space-x-2 text-gray-600 hover:text-primary">
              <BookMarked className="h-5 w-5" />
              <span>My Bookings</span>
            </Link>
            <Link to="/wishlist" className="flex items-center space-x-2 text-gray-600 hover:text-primary">
              <Heart className="h-5 w-5" />
              <span>Wishlist</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};