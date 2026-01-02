require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import Route Files
const locationRoutes = require('./routes/locations');
const userRoutes = require('./routes/users');
const teacherRoutes = require('./routes/teachers');
const chatRoutes = require('./routes/chatRoutes'); // <--- 1. Import it here

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/campus_nav');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// --- ROUTES ---
app.use('/api/locations', locationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/chat', chatRoutes); // <--- 2. Use it here (BEFORE app.listen)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// Connect to DB
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.`);
  } else {
    console.error('Server error:', err);
  }
});