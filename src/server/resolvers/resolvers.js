import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Destination from '../models/Destination.js';
import Booking from '../models/Booking.js';
import mongoose from 'mongoose';

const resolvers = {
  Query: {
    featuredDestinations: async () => {
      return await Destination.find({ type: 'featured' });
    },
    popularDestinations: async () => {
      return await Destination.find({ type: 'popular' });
    },
    searchResults: async (_, { type, from, to }) => {
      const query = { type };
      if (from) query.from = new RegExp(from, 'i');
      if (to) query.to = new RegExp(to, 'i');
      return await Destination.find(query);
    },
    myBookings: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      return await Booking.find({ user: user.userId }).populate('destination');
    },
    myWishlist: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      const userData = await User.findById(user.userId).populate('wishlist');
      return userData.wishlist;
    },
  },
  Mutation: {
    createBooking: async (_, { destinationId, date, returnDate, passengers, roomType }, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');

      try {
        if (!mongoose.Types.ObjectId.isValid(destinationId)) {
          throw new Error('Invalid destination ID');
        }

        const booking = new Booking({
          user: user.userId,
          destination: destinationId,
          date,
          returnDate,
          passengers,
          roomType,
          status: 'pending',
          paymentStatus: 'pending'
        });

        await booking.save();
        
        await User.findByIdAndUpdate(
          user.userId,
          { $push: { bookings: booking._id } }
        );

        return await Booking.findById(booking._id).populate('destination');
      } catch (error) {
        console.error('Booking creation error:', error);
        throw new Error('Failed to create booking: ' + error.message);
      }
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError('Invalid credentials');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new AuthenticationError('Invalid credentials');

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key');
      return { token, user };
    },
    register: async (_, { name, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error('User already exists');

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key');
      return { token, user };
    },
    addToWishlist: async (_, { destinationId }, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      
      await User.findByIdAndUpdate(
        user.userId,
        { $addToSet: { wishlist: destinationId } }
      );
      return await Destination.findById(destinationId);
    },
    removeFromWishlist: async (_, { destinationId }, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      
      await User.findByIdAndUpdate(
        user.userId,
        { $pull: { wishlist: destinationId } }
      );
      return await Destination.findById(destinationId);
    },
  },
};

export default resolvers;