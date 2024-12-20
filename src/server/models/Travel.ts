import mongoose from 'mongoose';

const travelSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['flights', 'trains', 'buses', 'hotels'],
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: function() { return this.type !== 'hotels'; }
  },
  price: {
    type: Number,
    required: true
  },
  operator: String,
  airline: String,
  departure: String,
  arrival: String,
  image: String,
  name: String,
  location: String,
  rating: Number,
  roomType: String,
  availableSeats: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Travel = mongoose.model('Travel', travelSchema);