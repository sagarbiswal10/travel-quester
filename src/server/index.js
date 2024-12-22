import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:8080', // Updated to match Vite's port
  credentials: true
}));
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.url} not found` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test URL: http://localhost:${PORT}/api/test`);
});