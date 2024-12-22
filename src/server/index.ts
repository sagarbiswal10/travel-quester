import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api';
import authRoutes from './routes/auth';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);

// Dummy data for testing
const dummyUsers = [
  {
    id: '1',
    email: 'test@example.com',
    password: '$2a$10$xxxxxxxxxxx', // hashed password for 'password123'
    name: 'Test User',
    bookings: [],
    wishlist: []
  }
];

// Add dummy data route for testing
app.get('/api/dummy/users', (req, res) => {
  res.json(dummyUsers);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});