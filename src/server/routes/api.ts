import express from 'express';
import { Travel } from '../models/Travel';

const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    const { type, from, to, date, returnDate, passengers, roomType } = req.query;
    
    let query: any = { type };
    
    if (from) query.from = new RegExp(from as string, 'i');
    if (to && type !== 'hotels') query.to = new RegExp(to as string, 'i');
    if (type === 'hotels' && roomType) query.roomType = roomType;
    
    // Add availability check
    if (passengers) {
      query.availableSeats = { $gte: Number(passengers) };
    }

    const results = await Travel.find(query);
    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;