import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const tabs = [
  { name: 'Flights', path: '/flights' },
  { name: 'Trains', path: '/trains' },
  { name: 'Buses', path: '/buses' },
  { name: 'Hotels', path: '/hotels' },
];

export const TravelTabs = () => {
  const location = useLocation();

  return (
    <div className="flex space-x-1 rounded-lg bg-muted p-1">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={cn(
              "px-3 py-2 text-sm font-medium rounded-md transition-all",
              isActive
                ? "bg-white text-primary shadow"
                : "text-muted-foreground hover:text-primary hover:bg-white/50"
            )}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
};