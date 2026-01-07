// models/Vacation.js
const mongoose = require('mongoose');

const vacationSchema = new mongoose.Schema({
  date: { 
    type: String, 
    required: true 
  },
  occasion: { 
    type: String, 
    required: true, 
    trim: true 
  },
  occasion_en: { 
    type: String, 
    required: true, 
    trim: true 
  },
  // True if marked with * (Depends on Moon)
  isMoonDependent: { 
    type: Boolean, 
    default: false 
  },
  // True if marked with ** (Only classes are off, offices open)
  isClassOffOnly: { 
    type: Boolean, 
    default: false 
  }
});

// Create the model from the schema
const Vacation = mongoose.model('Vacation', vacationSchema);

module.exports = Vacation;