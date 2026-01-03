// seedBuses.js
require('dotenv').config(); 
const mongoose = require('mongoose');
const BusSchedule = require('./models/BusSchedule');

// Updated Data: Saturday - Thursday
const busData = [
  {
    busNumber: "Bus 1",
    route: "Court -> C&B -> Shaheb Bazar -> RUET",
    upTime: "7:00 AM",
    downTime: "5:00 PM",
    activeDays: "Saturday - Thursday" 
  },
  {
    busNumber: "Bus 2",
    route: "Bornali -> Rail gate -> Station -> Vodra -> RUET",
    upTime: "7:00 AM",
    downTime: "5:00 PM",
    activeDays: "Saturday - Thursday"
  },
  {
    busNumber: "Bus 3",
    route: "Katakhali -> Binodpur -> Kazla -> RUET",
    upTime: "7:00 AM",
    downTime: "5:00 PM",
    activeDays: "Saturday - Thursday"
  },
  {
    busNumber: "Bus 4",
    route: "Lokkhipur -> Ghoshpara -> Sagorpara -> Sadhur mor -> Munnafer Mor -> RUET",
    upTime: "7:00 AM",
    downTime: "5:00 PM",
    activeDays: "Saturday - Thursday"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear old data so we don't get duplicates
    await BusSchedule.deleteMany({});
    console.log('🗑️  Cleared old bus data');

    // Insert new corrected data
    await BusSchedule.insertMany(busData);
    console.log('🚌 Added 4 buses (Sat-Thu) successfully!');

    mongoose.connection.close();
    console.log('👋 Connection closed');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();