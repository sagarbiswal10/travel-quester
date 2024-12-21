import { Link, useNavigate } from 'react-router-dom';
import { Heart, BookMarked, LogIn, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

export const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            TravelQuester
          </Link>
          
          <div className="flex items-center space-x-4">
            {token ? (
              <>
                <Link to="/bookings" className="flex items-center space-x-2 text-gray-600 hover:text-primary">
                  <BookMarked className="h-5 w-5" />
                  <span>My Bookings</span>
                </Link>
                <Link to="/wishlist" className="flex items-center space-x-2 text-gray-600 hover:text-primary">
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </Link>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button>
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};