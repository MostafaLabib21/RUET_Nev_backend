const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true, // For faster search
  },
  designation: {
    type: String,
    enum: ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer', 'Guest Faculty'],
    default: 'Assistant Professor'
  },
  department: {
    type: String,
    required: true,
    index: true, // For faster search by department
  },
  building: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: String,
    default: '',
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  pabx: {
    type: String,
  },
  officeHours: {
    type: String,
  },
  specialization: {
    type: String,
  },
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location', // Reference to Location model if we want to link to a specific location
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for text search
teacherSchema.index({ name: 'text', department: 'text', specialization: 'text' });

module.exports = mongoose.model('Teacher', teacherSchema);

