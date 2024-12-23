import express from 'express';
import jwt from 'jsonwebtoken';
import Booking from '../models/Booking.js';
import User from '../models/User.js';

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Create a new booking
router.post('/', authenticateToken, async (req, res) => {
  try {
    const booking = new Booking({
      user: req.userId,
      destination: req.body.destinationId,
      date: req.body.date,
      returnDate: req.body.returnDate,
      passengers: req.body.passengers,
      roomType: req.body.roomType,
      status: 'pending'
    });

    await booking.save();

    // Add booking to user's bookings array
    await User.findByIdAndUpdate(
      req.userId,
      { $push: { bookings: booking._id } }
    );

    res.status(201).json(booking);
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ message: 'Error creating booking' });
  }
});

// Get user's bookings
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate({
      path: 'bookings',
      populate: { path: 'destination' }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

export default router;