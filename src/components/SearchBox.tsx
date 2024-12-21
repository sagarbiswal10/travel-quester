import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  const handleSearch = () => {
    onSearch({
      from,
      to,
      date,
      returnDate,
      passengers,
      roomType,
      type
    });
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
          />
        </div>
        
        {type !== 'hotels' && (
          <div>
            <label className="block text-sm font-medium mb-1">To</label>
            <Input
              placeholder="Destination"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
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
                className="w-full justify-start text-left font-normal"
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
                  className="w-full justify-start text-left font-normal"
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
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">
            {type === 'hotels' ? 'Room Type' : 'Passengers'}
          </label>
          {type === 'hotels' ? (
            <Select value={roomType} onValueChange={setRoomType}>
              <SelectTrigger>
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
              <SelectTrigger>
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