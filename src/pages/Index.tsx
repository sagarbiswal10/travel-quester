import { useNavigate, useLocation } from 'react-router-dom';
import { SearchBox } from '@/components/SearchBox';
import { TravelTabs } from '@/components/TravelTabs';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentType = location.pathname.slice(1) || 'flights';

  const handleSearch = (searchData: any) => {
    const queryParams = new URLSearchParams({
      type: searchData.type,
      from: searchData.from,
      to: searchData.to || '',
      date: searchData.date?.toISOString() || '',
      returnDate: searchData.returnDate?.toISOString() || '',
      passengers: searchData.passengers || '1',
      roomType: searchData.roomType || '',
    }).toString();
    
    navigate(`/search?${queryParams}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900">
          Find Your Perfect Journey
        </h1>
        <p className="text-xl text-center mb-12 text-gray-600">
          Search across multiple travel options to find the best deals
        </p>
        
        <div className="mb-8 flex justify-center">
          <TravelTabs />
        </div>

        <SearchBox type={currentType as any} onSearch={handleSearch} />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Best Price Guarantee</h3>
            <p className="text-gray-600">Find the best deals across all travel options</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
            <p className="text-gray-600">Our travel experts are here to help you</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Secure Booking</h3>
            <p className="text-gray-600">Book with confidence using our secure platform</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;