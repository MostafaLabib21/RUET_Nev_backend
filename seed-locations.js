require('dotenv').config();
const mongoose = require('mongoose');
const Location = require('./models/Location');

const ruetLocations = [
  {
    name: "CSE Building",
    description: "Academic Building - 01 (CSE Building)",
    latitude: 24.364411,
    longitude: 88.629882,
    category: "department",
    department: "Computer Science and Engineering",
    roomNumber: "Academic Building - 01",
    address: "ECE Road, RUET",
    phoneNumber: "+88-0721-750206",
    openingHours: "8:00 AM - 5:00 PM (Sat-Thu)"
  },
  {
    name: "EEE Building",
    description: "Department of Electrical & Electronic Engineering",
    latitude: 24.364902,
    longitude: 88.629949,
    category: "department",
    department: "Electrical & Electronic Engineering",
    roomNumber: "Academic Building - 02",
    address: "ECE Road, RUET",
    phoneNumber: "+88-0721-750202",
    openingHours: "8:00 AM - 4:00 PM (Sat-Thu)"
  },
  {
    name: "RUET Shahid Minar",
    description: "Shahid Minar Memorial",
    latitude: 24.362978,
    longitude: 88.629335,
    category: "other",
    department: "",
    roomNumber: "",
    address: "Cafeteria Road, RUET",
    phoneNumber: "",
    openingHours: "24/7"
  },
  {
    name: "Central Cafeteria",
    description: "Main dining facility for students and staff",
    latitude: 24.363289,
    longitude: 88.629912,
    category: "cafeteria",
    department: "Food Services",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "+88-0721-750157",
    openingHours: "7:00 AM - 8:00 PM (Daily)"
  },
  {
    name: "Rupali Bank Limited, RUET Branch",
    description: "Bank branch on campus",
    latitude: 24.363289,
    longitude: 88.629912,
    category: "other",
    department: "",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "9:00 AM - 5:00 PM (Sat-Thu)"
  },
  {
    name: "Auditorium",
    description: "Main auditorium for events and conferences",
    latitude: 24.363607,
    longitude: 88.629600,
    category: "other",
    department: "",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "As per event schedule"
  },
  {
    name: "RUET Post Office",
    description: "Post office distribution center",
    latitude: 24.363763,
    longitude: 88.629118,
    category: "other",
    department: "",
    roomNumber: "",
    address: "RUET Main Road",
    phoneNumber: "",
    openingHours: "9:00 AM - 4:00 PM (Sat-Thu)"
  },
  {
    name: "Admin Building",
    description: "Central Administrative Office",
    latitude: 24.363590,
    longitude: 88.628439,
    category: "administrative",
    department: "Administration",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "+88-0721-750155",
    openingHours: "9:00 AM - 5:00 PM (Sat-Thu)"
  },
  {
    name: "New ECE Building",
    description: "New Electrical & Computer Engineering Building",
    latitude: 24.365515,
    longitude: 88.629686,
    category: "department",
    department: "Electrical & Electronic Engineering",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "8:00 AM - 5:00 PM (Sat-Thu)"
  },
  {
    name: "Mechanical Building",
    description: "Department of Mechanical Engineering",
    latitude: 24.364855,
    longitude: 88.628806,
    category: "department",
    department: "Mechanical Engineering",
    roomNumber: "Academic Building 3",
    address: "RUET",
    phoneNumber: "+88-0721-750203",
    openingHours: "8:00 AM - 4:00 PM (Sat-Thu)"
  },
  {
    name: "Fluid Mechanics Lab",
    description: "Fluid Mechanics Laboratory",
    latitude: 24.364540,
    longitude: 88.628863,
    category: "lab",
    department: "Mechanical Engineering",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "8:00 AM - 6:00 PM (Sat-Thu)"
  },
  {
    name: "New Mechanical Building",
    description: "New Mechanical Engineering Building",
    latitude: 24.364158,
    longitude: 88.628946,
    category: "department",
    department: "Mechanical Engineering",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "8:00 AM - 5:00 PM (Sat-Thu)"
  },
  {
    name: "Architecture Building",
    description: "Department of Architecture",
    latitude: 24.363897,
    longitude: 88.626553,
    category: "department",
    department: "Architecture",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "8:00 AM - 5:00 PM (Sat-Thu)"
  },
  {
    name: "Civil Building",
    description: "Department of Civil Engineering",
    latitude: 24.363897,
    longitude: 88.627133,
    category: "department",
    department: "Civil Engineering",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "+88-0721-750201",
    openingHours: "8:00 AM - 4:00 PM (Sat-Thu)"
  },
  {
    name: "Pocket Gate",
    description: "Pocket Gate near Architecture Building",
    latitude: 24.364406,
    longitude: 88.626189,
    category: "other",
    department: "",
    roomNumber: "",
    address: "Near Architecture Building",
    phoneNumber: "",
    openingHours: "24/7"
  },
  {
    name: "Dept of Building Engineering and Construction Management",
    description: "Department of Building Engineering and Construction Management",
    latitude: 24.364977,
    longitude: 88.626988,
    category: "department",
    department: "Building Engineering and Construction Management",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "8:00 AM - 5:00 PM (Sat-Thu)"
  },
  {
    name: "Shahid President Ziaur Rahman Hall",
    description: "Student residence hall",
    latitude: 24.365547,
    longitude: 88.626460,
    category: "dormitory",
    department: "Student Housing",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "24/7"
  },
  {
    name: "RUET Central Library",
    description: "Main library facility",
    latitude: 24.365953,
    longitude: 88.627774,
    category: "library",
    department: "Library Services",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "+88-0721-750156",
    openingHours: "8:00 AM - 10:00 PM (Sat-Thu), 10:00 AM - 6:00 PM (Fri)"
  },
  {
    name: "New Teacher's Quarter",
    description: "Faculty residential quarters",
    latitude: 24.366561,
    longitude: 88.629431,
    category: "other",
    department: "",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "24/7"
  },
  {
    name: "High Voltage Lab",
    description: "High Voltage Laboratory",
    latitude: 24.366033,
    longitude: 88.629000,
    category: "lab",
    department: "Electrical & Electronic Engineering",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "8:00 AM - 6:00 PM (Sat-Thu)"
  },
  {
    name: "RUET Guest House",
    description: "Guest house for visitors",
    latitude: 24.366965,
    longitude: 88.629348,
    category: "other",
    department: "",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "24/7"
  },
  {
    name: "Institute Building",
    description: "Institute administrative building",
    latitude: 24.366458,
    longitude: 88.628705,
    category: "administrative",
    department: "",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "9:00 AM - 5:00 PM (Sat-Thu)"
  },
  {
    name: "RUET Central Temple",
    description: "Central temple on campus",
    latitude: 24.366779,
    longitude: 88.628731,
    category: "other",
    department: "",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "24/7"
  },
  {
    name: "Fitting Shop, ME",
    description: "Fitting shop for Mechanical Engineering",
    latitude: 24.366698,
    longitude: 88.628412,
    category: "lab",
    department: "Mechanical Engineering",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "8:00 AM - 5:00 PM (Sat-Thu)"
  },
  {
    name: "Shaheed Abdul Hamid Hall",
    description: "Student residence hall",
    latitude: 24.366294,
    longitude: 88.626240,
    category: "dormitory",
    department: "Student Housing",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "24/7"
  },
  {
    name: "RUET Central Field",
    description: "Central sports field",
    latitude: 24.367402,
    longitude: 88.628098,
    category: "sports",
    department: "Sports & Recreation",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "6:00 AM - 9:00 PM (Daily)"
  },
  {
    name: "Central Common Room and Gym",
    description: "Central common room and gymnasium",
    latitude: 24.366560,
    longitude: 88.627530,
    category: "sports",
    department: "Sports & Recreation",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "6:00 AM - 9:00 PM (Daily)"
  },
  {
    name: "Tinshed Hall",
    description: "Tinshed Hall",
    latitude: 24.366754,
    longitude: 88.626720,
    category: "dormitory",
    department: "Student Housing",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "24/7"
  },
  {
    name: "Shahid Shahidul Islam Hall",
    description: "Student residence hall",
    latitude: 24.366778,
    longitude: 88.625979,
    category: "dormitory",
    department: "Student Housing",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "24/7"
  },
  {
    name: "Sher-e-Bangla AK Fazlul Haque Hall",
    description: "Student residence hall",
    latitude: 24.367436,
    longitude: 88.626277,
    category: "dormitory",
    department: "Student Housing",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "24/7"
  },
  {
    name: "Canteen Near Selim Hall",
    description: "Canteen near Selim Hall",
    latitude: 24.368174,
    longitude: 88.626749,
    category: "cafeteria",
    department: "Food Services",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "7:00 AM - 9:00 PM (Daily)"
  },
  {
    name: "VC Bunglow",
    description: "Vice Chancellor's Bungalow",
    latitude: 24.368675,
    longitude: 88.627967,
    category: "other",
    department: "",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "24/7"
  },
  {
    name: "Central Mosque",
    description: "Central mosque on campus",
    latitude: 24.368647,
    longitude: 88.627130,
    category: "other",
    department: "",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "24/7"
  },
  {
    name: "Shahid Lt. Selim Hall",
    description: "Student residence hall",
    latitude: 24.368288,
    longitude: 88.625821,
    category: "dormitory",
    department: "Student Housing",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "24/7"
  },
  {
    name: "New Male Hall (1)",
    description: "New male student residence hall",
    latitude: 24.369238,
    longitude: 88.625244,
    category: "dormitory",
    department: "Student Housing",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "24/7"
  },
  {
    name: "New Male Hall (2)",
    description: "New male student residence hall",
    latitude: 24.369414,
    longitude: 88.625824,
    category: "dormitory",
    department: "Student Housing",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "24/7"
  },
  {
    name: "Nawab Begum Faizunnesa Choudhurani Hall",
    description: "Female student residence hall",
    latitude: 24.370925,
    longitude: 88.624880,
    category: "dormitory",
    department: "Student Housing",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "24/7"
  },
  {
    name: "GCE Building",
    description: "GCE Building",
    latitude: 24.365308,
    longitude: 88.628560,
    category: "department",
    department: "",
    roomNumber: "",
    address: "RUET",
    phoneNumber: "",
    openingHours: "8:00 AM - 5:00 PM (Sat-Thu)"
  }
];

const seedLocations = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/campus_nav');
    console.log('MongoDB connected');

    // Clear existing locations
    await Location.deleteMany({});
    console.log('Cleared existing locations');

    // Insert RUET locations
    await Location.insertMany(ruetLocations);
    console.log(`✅ Successfully seeded ${ruetLocations.length} RUET locations!`);

    // Display what was added
    const count = await Location.countDocuments();
    console.log(`Total locations in database: ${count}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding locations:', error);
    process.exit(1);
  }
};

seedLocations();
