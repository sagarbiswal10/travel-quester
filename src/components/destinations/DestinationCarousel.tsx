import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface DestinationCarouselProps {
  children: React.ReactNode;
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const DestinationCarousel = ({
  children,
  currentIndex,
  onPrevious,
  onNext,
}: DestinationCarouselProps) => {
  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {children}
        </div>
      </div>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80"
        onClick={onPrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80"
        onClick={onNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};