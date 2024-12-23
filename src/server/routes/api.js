import express from 'express';
import Destination from '../models/Destination.js';
import Booking from '../models/Booking.js';
import User from '../models/User.js';

const router = express.Router();

// Search destinations
router.get('/search', async (req, res) => {
  try {
    const { type, from, to, date, returnDate, passengers, roomType } = req.query;
    console.log('Search params:', { type, from, to, date, returnDate, passengers, roomType });

    let query = { type };
    if (from) query.from = new RegExp(from, 'i');
    if (to && type !== 'hotels') query.to = new RegExp(to, 'i');
    if (type === 'hotels' && roomType) query.roomType = roomType;

    const destinations = await Destination.find(query);
    res.json(destinations);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user bookings
router.get('/bookings/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate('destination')
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bookings' });
  }
});

// Create booking
router.post('/bookings', async (req, res) => {
  try {
    const { userId, destinationId, date, returnDate, passengers, roomType } = req.body;
    
    const booking = new Booking({
      user: userId,
      destination: destinationId,
      date,
      returnDate,
      passengers,
      roomType,
      status: 'confirmed'
    });

    await booking.save();
    await User.findByIdAndUpdate(userId, { $push: { bookings: booking._id } });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Error creating booking' });
  }
});

// Get user wishlist
router.get('/wishlist/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('wishlist');
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching wishlist' });
  }
});

// Add to wishlist
router.post('/wishlist', async (req, res) => {
  try {
    const { userId, destinationId } = req.body;
    await User.findByIdAndUpdate(userId, { $addToSet: { wishlist: destinationId } });
    res.status(200).json({ message: 'Added to wishlist' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding to wishlist' });
  }
});

// Remove from wishlist
router.delete('/wishlist', async (req, res) => {
  try {
    const { userId, destinationId } = req.body;
    await User.findByIdAndUpdate(userId, { $pull: { wishlist: destinationId } });
    res.status(200).json({ message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing from wishlist' });
  }
});

export default router;