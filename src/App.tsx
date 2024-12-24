import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApolloProvider } from '@apollo/client';
import { client } from './lib/apollo-client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import MyBookings from "./pages/MyBookings";
import Payment from "./pages/Payment";
import Wishlist from "./pages/Wishlist";
import Auth from "./pages/Auth";
import { Footer } from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <ApolloProvider client={client}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/flights" element={<Index />} />
                <Route path="/trains" element={<Index />} />
                <Route path="/buses" element={<Index />} />
                <Route path="/hotels" element={<Index />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/bookings" element={<MyBookings />} />
                <Route path="/payment/:bookingId" element={<Payment />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ApolloProvider>
);

export default App;