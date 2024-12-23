import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination'
  }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);