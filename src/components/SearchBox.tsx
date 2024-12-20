import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface SearchBoxProps {
  type: 'flights' | 'trains' | 'buses' | 'hotels';
  onSearch: (searchData: any) => void;
}

export const SearchBox = ({ type, onSearch }: SearchBoxProps) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState('1');
  const [roomType, setRoomType] = useState('single');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!from) newErrors.from = 'This field is required';
    if (type !== 'hotels' && !to) newErrors.to = 'This field is required';
    if (!date) newErrors.date = 'Please select a date';
    if ((type === 'flights' || type === 'hotels') && !returnDate) {
      newErrors.returnDate = 'Please select a return date';
    }
    if (!passengers) newErrors.passengers = 'Please select number of passengers';
    if (type === 'hotels' && !roomType) newErrors.roomType = 'Please select a room type';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = () => {
    if (validateForm()) {
      onSearch({
        from,
        to,
        date,
        returnDate,
        passengers,
        roomType,
        type
      });
    } else {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <Input
            placeholder={type === 'hotels' ? 'Enter city' : 'Departure location'}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className={errors.from ? 'border-red-500' : ''}
          />
          {errors.from && <p className="text-red-500 text-sm mt-1">{errors.from}</p>}
        </div>
        
        {type !== 'hotels' && (
          <div>
            <label className="block text-sm font-medium mb-1">To</label>
            <Input
              placeholder="Destination"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className={errors.to ? 'border-red-500' : ''}
            />
            {errors.to && <p className="text-red-500 text-sm mt-1">{errors.to}</p>}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">
            {type === 'hotels' ? 'Check-in Date' : 'Departure Date'}
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${errors.date ? 'border-red-500' : ''}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>

        {(type === 'flights' || type === 'hotels') && (
          <div>
            <label className="block text-sm font-medium mb-1">
              {type === 'hotels' ? 'Check-out Date' : 'Return Date'}
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${errors.returnDate ? 'border-red-500' : ''}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {returnDate ? format(returnDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={returnDate}
                  onSelect={setReturnDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.returnDate && <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">
            {type === 'hotels' ? 'Room Type' : 'Passengers'}
          </label>
          {type === 'hotels' ? (
            <Select value={roomType} onValueChange={setRoomType}>
              <SelectTrigger className={errors.roomType ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single Room</SelectItem>
                <SelectItem value="double">Double Room</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Select value={passengers} onValueChange={setPassengers}>
              <SelectTrigger className={errors.passengers ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select passengers" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'Passenger' : 'Passengers'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {errors.roomType && <p className="text-red-500 text-sm mt-1">{errors.roomType}</p>}
          {errors.passengers && <p className="text-red-500 text-sm mt-1">{errors.passengers}</p>}
        </div>

        <div className="flex items-end md:col-span-4">
          <Button 
            className="w-full bg-primary hover:bg-primary/90"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};