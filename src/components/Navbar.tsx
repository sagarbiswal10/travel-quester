import { Link, useNavigate } from 'react-router-dom';
import { Heart, BookMarked, LogIn, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

export const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast({
      title: 'Logged out successfully',
      description: 'See you soon!',
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
            {user ? (
              <>
                <Link to="/bookings" className="flex items-center space-x-2 text-gray-600 hover:text-primary">
                  <BookMarked className="h-5 w-5" />
                  <span>My Bookings</span>
                </Link>
                <Link to="/wishlist" className="flex items-center space-x-2 text-gray-600 hover:text-primary">
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </Link>
                <Button variant="ghost" onClick={handleLogout} className="flex items-center space-x-2">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Button>
                <span className="text-gray-600">Welcome, {user.name}!</span>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};