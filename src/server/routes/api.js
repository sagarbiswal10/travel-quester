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

// Add to wishlist
router.post('/wishlist/:userId', async (req, res) => {
  try {
    const { destinationId } = req.body;
    await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { wishlist: destinationId } }
    );
    res.status(200).json({ message: 'Added to wishlist' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding to wishlist' });
  }
});

// Get wishlist
router.get('/wishlist/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('wishlist');
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching wishlist' });
  }
});

// Remove from wishlist
router.delete('/wishlist/:userId/:destinationId', async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { wishlist: req.params.destinationId } }
    );
    res.status(200).json({ message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing from wishlist' });
  }
});

// Process payment
router.post('/payments/:bookingId', async (req, res) => {
  try {
    const { userId } = req.body;
    const booking = await Booking.findById(req.params.bookingId);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update user's payment history
    await User.findByIdAndUpdate(userId, {
      $push: {
        payments: {
          bookingId: booking._id,
          amount: booking.price,
          status: 'completed'
        }
      }
    });

    // Update booking status
    await Booking.findByIdAndUpdate(req.params.bookingId, {
      status: 'confirmed'
    });

    res.status(200).json({ message: 'Payment processed successfully' });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Error processing payment' });
  }
});

// Get payment history
router.get('/payments/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate({
        path: 'payments.bookingId',
        populate: { path: 'destination' }
      });
    
    res.json(user.payments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching payment history' });
  }
});

export default router;