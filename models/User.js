const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    sparse: true
  },
  email: {
    type: String,
    unique: true,
    sparse: true
  },
  password: String, // Hash password in production
  profile: {
    firstName: String,
    lastName: String,
    profileImage: String
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
