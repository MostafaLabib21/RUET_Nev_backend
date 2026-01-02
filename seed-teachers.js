require('dotenv').config();
const mongoose = require('mongoose');
const Teacher = require('./models/Teacher');

const teachers = [
  {
    name: "Prof. Dr. MD Nazrul Islam Mandol",
    designation: "Professor",
    department: "Computer Science and Engineering",
    building: "CSE Building",
    roomNumber: "204",
    email: "nazrul@ruet.ac.bd",
    phone: "+880721750301",
    specialization: "Machine Learning, AI",
    officeHours: "Sunday - Thursday, 10:00 AM - 2:00 PM"
  },
  {
    name: "Prof. Dr. MD Rafiqul Islam",
    designation: "Professor",
    department: "Electrical and Electronic Engineering",
    building: "EEE Building",
    roomNumber: "302",
    email: "rafiqul@ruet.ac.bd",
    phone: "+880721750302",
    specialization: "Power Systems",
    officeHours: "Sunday - Thursday, 9:00 AM - 1:00 PM"
  },
  {
    name: "Prof. Dr. AKM Ahsan Ullah",
    designation: "Professor",
    department: "Civil Engineering",
    building: "Civil Building",
    roomNumber: "101",
    email: "ahsan@ruet.ac.bd",
    phone: "+880721750303",
    specialization: "Structural Engineering",
    officeHours: "Sunday - Thursday, 10:00 AM - 2:00 PM"
  },
  {
    name: "Dr. MD Rashedul Islam",
    designation: "Associate Professor",
    department: "Computer Science and Engineering",
    building: "CSE Building",
    roomNumber: "205",
    email: "rashedul@ruet.ac.bd",
    phone: "+880721750304",
    specialization: "Database Systems, Software Engineering",
    officeHours: "Sunday - Thursday, 11:00 AM - 3:00 PM"
  },
  {
    name: "Dr. Fatema-Tuz-Zohra",
    designation: "Associate Professor",
    department: "Electrical and Electronic Engineering",
    building: "EEE Building",
    roomNumber: "201",
    email: "fatema@ruet.ac.bd",
    phone: "+880721750305",
    specialization: "Signal Processing",
    officeHours: "Sunday - Thursday, 9:00 AM - 1:00 PM"
  },
  {
    name: "Dr. MD Ashraful Alam",
    designation: "Assistant Professor",
    department: "Mechanical Engineering",
    building: "Mechanical Building",
    roomNumber: "301",
    email: "ashraful@ruet.ac.bd",
    phone: "+880721750306",
    specialization: "Thermal Engineering",
    officeHours: "Sunday - Thursday, 10:00 AM - 2:00 PM"
  },
  {
    name: "Dr. Sharmin Sultana",
    designation: "Assistant Professor",
    department: "Computer Science and Engineering",
    building: "CSE Building",
    roomNumber: "206",
    email: "sharmin@ruet.ac.bd",
    phone: "+880721750307",
    specialization: "Computer Networks, Security",
    officeHours: "Sunday - Thursday, 11:00 AM - 3:00 PM"
  },
  {
    name: "Engr. MD Tanvir Ahmed",
    designation: "Lecturer",
    department: "Electrical and Electronic Engineering",
    building: "EEE Building",
    roomNumber: "202",
    email: "tanvir@ruet.ac.bd",
    phone: "+880721750308",
    specialization: "Electronics",
    officeHours: "Sunday - Thursday, 9:00 AM - 1:00 PM"
  },
  {
    name: "Dr. MD Jamal Uddin",
    designation: "Associate Professor",
    department: "Civil Engineering",
    building: "Civil Building",
    roomNumber: "102",
    email: "jamal@ruet.ac.bd",
    phone: "+880721750309",
    specialization: "Geotechnical Engineering",
    officeHours: "Sunday - Thursday, 10:00 AM - 2:00 PM"
  },
  {
    name: "Dr. Nasrin Akter",
    designation: "Assistant Professor",
    department: "Computer Science and Engineering",
    building: "CSE Building",
    roomNumber: "207",
    email: "nasrin@ruet.ac.bd",
    phone: "+880721750310",
    specialization: "Data Science, Big Data",
    officeHours: "Sunday - Thursday, 11:00 AM - 3:00 PM"
  }
];

const seedTeachers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/campus_nav');
    console.log('MongoDB connected');

    // Clear existing teachers (optional - comment out if you want to keep existing data)
    await Teacher.deleteMany({});
    console.log('Cleared existing teachers');

    // Insert teachers
    await Teacher.insertMany(teachers);
    console.log(`✅ Successfully seeded ${teachers.length} teachers!`);

    // Display what was added
    const count = await Teacher.countDocuments();
    console.log(`Total teachers in database: ${count}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding teachers:', error);
    process.exit(1);
  }
};

seedTeachers();


