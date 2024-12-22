import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Dummy users data
const dummyUsers = [
  {
    id: '1',
    email: 'test@example.com',
    // This is the hashed version of 'password123'
    password: '$2a$10$xxxxxxxxxxx',
    name: 'Test User',
    bookings: [],
    wishlist: []
  }
];

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    console.log('Register attempt:', { email, name }); // Debug log
    
    const existingUser = dummyUsers.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: (dummyUsers.length + 1).toString(),
      email,
      password: hashedPassword,
      name,
      bookings: [],
      wishlist: []
    };
    
    dummyUsers.push(newUser);

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ 
      token, 
      user: { 
        id: newUser.id, 
        email: newUser.email, 
        name: newUser.name 
      } 
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email); // Debug log
    
    const user = dummyUsers.find(user => user.email === email);
    
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // For the test user with email test@example.com, accept 'password123' directly
    const isMatch = email === 'test@example.com' 
      ? password === 'password123'
      : await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

export default router;