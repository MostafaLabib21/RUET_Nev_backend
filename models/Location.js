const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['classroom', 'library', 'cafeteria', 'lab', 'sports', 'dormitory', 'administrative', 'department', 'other'],
    default: 'other'
  },
  department: String,
  roomNumber: String,
  address: String,
  phoneNumber: String,
  openingHours: String,
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Location', locationSchema);
