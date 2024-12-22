import express from 'express';

const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    const { type, from, to, date, returnDate, passengers, roomType } = req.query;
    console.log('Search params:', { type, from, to, date, returnDate, passengers, roomType }); // Debug log
    
    let query = { type };
    
    if (from) query.from = new RegExp(from, 'i');
    if (to && type !== 'hotels') query.to = new RegExp(to, 'i');
    if (type === 'hotels' && roomType) query.roomType = roomType;
    
    // Add availability check
    if (passengers) {
      query.availableSeats = { $gte: Number(passengers) };
    }

    // Since we're using dummy data, return an empty array for now
    res.json([]);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;