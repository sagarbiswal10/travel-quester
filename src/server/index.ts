import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import authRoutes from './routes/auth';
import { User } from './models/User';
import apiRoutes from './routes/api';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

// Connect to MongoDB and seed dummy data
mongoose.connect('mongodb://localhost:27017/travel_booking')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Seed dummy user if none exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const dummyUser = new User({
        email: 'test@example.com',
        password: hashedPassword,
        name: 'Test User',
        bookings: [],
        wishlist: []
      });
      await dummyUser.save();
      console.log('Dummy user created');
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});