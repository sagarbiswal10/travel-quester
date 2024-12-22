import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bookings: [{
    type: mongoose.Schema.Types.Mixed,
    default: []
  }],
  wishlist: [{
    type: mongoose.Schema.Types.Mixed,
    default: []
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const User = mongoose.model('User', userSchema);