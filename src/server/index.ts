import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import apiRoutes from './routes/api';
import authRoutes from './routes/auth';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/travel_booking')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);

// Add some dummy data for testing
const seedDummyData = async () => {
  try {
    // Add a dummy user if none exists
    const dummyUser = {
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Test User'
    };
    
    const existingUser = await User.findOne({ email: dummyUser.email });
    if (!existingUser) {
      await User.create(dummyUser);
      console.log('Dummy user created');
    }
  } catch (error) {
    console.error('Error seeding dummy data:', error);
  }
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  seedDummyData();
});