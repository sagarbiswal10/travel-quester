import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['flight', 'train', 'bus', 'hotel', 'featured', 'popular'],
    required: true
  },
  description: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    required: false
  },
  from: String,
  to: String,
  operator: String,
  airline: String,
  departure: String,
  arrival: String,
  location: String,
  roomType: String
}, { timestamps: true });

export default mongoose.model('Destination', destinationSchema);