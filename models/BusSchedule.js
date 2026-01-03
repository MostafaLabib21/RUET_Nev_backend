const mongoose = require('mongoose');

const busScheduleSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
    unique: true // e.g., "Bus 1"
  },
  route: {
    type: String,
    required: true // e.g., "Court -> C&B -> Shaheb Bazar -> RUET"
  },
  upTime: {
    type: String,
    required: true // e.g., "7:00 AM"
  },
  downTime: {
    type: String,
    required: true // e.g., "5:00 PM"
  },
  activeDays: {
    type: String,
    default: "Saturday - Thursday"
  }
}, { timestamps: true });

module.exports = mongoose.model('BusSchedule', busScheduleSchema);