require('dotenv').config();
const mongoose = require('mongoose');
const Teacher = require('./models/Teacher');

// Real CSE Department Faculty Data
const teachers = [
  {
    name: "Dr. Md. Nazrul Islam Mondal",
    designation: "Professor",
    department: "Computer Science and Engineering",
    building: "CSE Building",
    roomNumber: "R 202",
    email: "mondal@cse.ruet.ac.bd",
    phone: "880-1720662278",
    pabx: "132",
  },
  {
    name: "Dr. Md. Rabiul Islam",
    designation: "Professor",
    department: "Computer Science and Engineering",
    building: "CSE Building",
    roomNumber: "N/A",
    email: "rabiul_cse@yahoo.com",
    phone: "",
  },
  {
    name: "Shyla Afroge",
    designation: "Associate Professor",
    department: "Computer Science and Engineering",
    building: "CSE Building",
    roomNumber: "114",
    email: "shyla@cse.ruet.ac.bd",
    phone: "880-1723568183",
  },
  {
    name: "Dr. Julia Rahman",
    designation: "Associate Professor",
    department: "Computer Science and Engineering",
    building: "CSE Building",
    roomNumber: "N/A",
    email: "julia@cse.ruet.ac.bd",
    phone: "880-1751953221",
  },
  {
    name: "Emrana Kabir Hashi",
    designation: "Assistant Professor",
    department: "Computer Science and Engineering",
    building: "CSE Building",
    roomNumber: "CSE109, Ground Floor",
    email: "Emrana.Kabir@cse.ruet.ac.bd",
    phone: "880-1767616748",
    pabx: "(88) 0721 750742-3 Ext: 579",
  },
  {
    name: "Sadia Zaman Mishu",
    designation: "Assistant Professor",
    department: "Computer Science and Engineering",
    building: "CSE Building",
    roomNumber: "204, 1st floor",
    email: "sadia@cse.ruet.ac.bd",
    phone: "880-1737365608",
  },
  {
    name: "Barshon Sen",
    designation: "Assistant Professor",
    department: "Computer Science and Engineering",
    building: "CSE Building",
    roomNumber: "205, 2nd Floor",
    email: "barshon.sen@cse.ruet.ac.bd",
    phone: "880-1672340091",
  },
  {
    name: "Mohiuddin Ahmed",
    designation: "Assistant Professor",
    department: "Computer Science and Engineering",
    building: "CSE Building",
    roomNumber: "N/A",
    email: "mohiuddin@cse.ruet.ac.bd",
    phone: "880-1742621067",
  },
  {
    name: "Md. Azmain Yakin Srizon",
    designation: "Assistant Professor",
    department: "Computer Science and Engineering",
    building: "CSE Building",
    roomNumber: "N/A",
    email: "azmainsrizon@cse.ruet.ac.bd",
    phone: "880-1790187189",
  },
  {
    name: "A. F. M. Minhazur Rahman",
    designation: "Assistant Professor",
    department: "Computer Science and Engineering",
    building: "CSE Building",
    roomNumber: "",
    email: "afm.minhazur@cse.ruet.ac.bd",
    phone: "880-1710001958",
  },
  {
    name: "Farjana Parvin",
    designation: "Assistant Professor",
    department: "Computer Science and Engineering",
    building: "CSE Building",
    roomNumber: "110",
    email: "farjana@cse.ruet.ac.bd",
    phone: "880-1739497360",
  },
  {
    name: "Utsha Das",
    designation: "Assistant Professor",
    department: "Computer Science and Engineering",
    building: "CSE Building",
    roomNumber: "CSE 206, 1st Floor",
    email: "utsha.das@cse.ruet.ac.bd",
    phone: "880-1826526004",
  },
  {
    name: "Md. Sozib Hossain",
    designation: "Lecturer",
    department: "Computer Science and Engineering",
    building: "CSE Building",
    roomNumber: "116, Academic Building 1",
    email: "sozib.hossain@cse.ruet.ac.bd",
    phone: "880-1771905794",
  },
  {
    name: "Md. Nasif Osman Khansur",
    designation: "Lecturer",
    department: "Computer Science and Engineering",
    building: "CSE Building",
    roomNumber: "CSE 119, Ground Floor",
    email: "nasif.khansur@cse.ruet.ac.bd",
    phone: "880-1763761979",
  },
  {
    name: "Md. Mazharul Islam",
    designation: "Lecturer",
    department: "Computer Science and Engineering",
    building: "CSE Building",
    roomNumber: "N/A",
    email: "mazharul.islam@cse.ruet.ac.bd",
    phone: "880-1777095754",
  },
  {
    name: "Md. Farhan Shakib",
    designation: "Lecturer",
    department: "Computer Science and Engineering",
    building: "CSE Building",
    roomNumber: "CSE 118",
    email: "farhan.shakib@cse.ruet.ac.bd",
    phone: "880-1752794347",
  },
  {
    name: "Khaled Zinnurine",
    designation: "Lecturer",
    department: "Computer Science and Engineering",
    building: "CSE Building",
    roomNumber: "CSE 117",
    email: "khaled@cse.ruet.ac.bd",
    phone: "880-1963844063",
  },
  {
    name: "Dr. Md. Shahid Uz Zaman",
    designation: "Professor",
    department: "Computer Science and Engineering",
    building: "CSE Building",
    roomNumber: "N/A",
    email: "szaman22.ruet@gmail.com,zaman@cse.ruet.ac.bd",
    phone: "880-1707006137",
  },
  {
    name: "Dr. Md. Masud Rana",
    designation: "Professor",
    department: "Electrical and Electronic Engineering",
    building: "EEE Building",
    roomNumber: "Room 10, 1st Floor",
    email: "md.masud.rana.ruet@gmail.com,md.masud.rana@eee.ruet.ac.bd",
    phone: "880-1724550535"
  },
  {
    name: "Dr. Md. Rafiqul Islam Sheikh",
    designation: "Professor",
    department: "Electrical and Electronic Engineering",
    building: "EEE Building",
    roomNumber: "3rd Floor",
    email: "mri.sheikh@eee.ruet.ac.bd,mri.sheikh.eee@gmail.com",
    phone: "880-1911404193"
  },
  {
    name: "S M Abdur Razzak",
    designation: "Professor",
    department: "Electrical and Electronic Engineering",
    building: "EEE Building",
    roomNumber: "2nd Floor",
    email: "sma.razzak@eee.ruet.ac.bd,sma.razzak@ieee.org",
    phone: "880-1721013866"
  },
  {
    name: "Dr. Md. Faruk Hossain",
    designation: "Professor",
    department: "Electrical and Electronic Engineering",
    building: "EEE Building",
    roomNumber: "Office of Head",
    email: "engr.mfhossain@eee.ruet.ac.bd,faruk94_ruet@yahoo.com",
    phone: "880-1778400600"
  },
  {
    name: "Dr. Md. Selim Hossain",
    designation: "Professor",
    department: "Electrical and Electronic Engineering",
    building: "EEE Building",
    roomNumber: "Room 205, 1st Floor",
    email: "engg.selim@gmail.com,prof.selim@eee.ruet.ac.bd",
    phone: "880-1788122226"
  },
  {
    name: "Dr. Abdul Khaleque",
    designation: "Professor",
    department: "Electrical and Electronic Engineering",
    building: "EEE Building",
    roomNumber: "1st Floor",
    email: "abdul.khaleque.eee@gmail.com,ak03@eee.ruet.ac.bd",
    phone: "880-1755986363"
  },
  {
    name: "Dr. Md. Sohel Rana",
    designation: "Professor",
    department: "Electrical and Electronic Engineering",
    building: "EEE Building",
    roomNumber: "Room 209, 1st Floor",
    email: "sohel.unsw@gmail.com,sohel@eee.ruet.ac.bd",
    phone: "880-1725431631"
  },
  {
    name: "Dr. Tanvir Ahmed",
    designation: "Professor",
    department: "Electrical and Electronic Engineering",
    building: "EEE Building",
    roomNumber: "N/A",
    email: "tanvir_eee_ruet@yahoo.com,tanvir.ahmed@eee.ruet.ac.bd",
    phone: "880-1893994187"
  },
  {
    name: "Dr. G.K.M. Hasanuzzaman",
    designation: "Professor",
    department: "Electrical and Electronic Engineering",
    building: "EEE Building",
    roomNumber: "N/A",
    email: "g.kibria82@yahoo.com,gkmhasan@eee.ruet.ac.bd",
    phone: "880-1718969737"
  },
  {
    name: "Dr. Abu Sadat Md. Sayem",
    designation: "Professor",
    department: "Electrical and Electronic Engineering",
    building: "EEE Building",
    roomNumber: "Level 1",
    email: "sayem@eee.ruet.ac.bd",
    phone: "880-1318148196"
  },
  {
    name: "Dr. Mohammod Abdul Motin",
    designation: "Associate Professor",
    department: "Electrical and Electronic Engineering",
    building: "EEE Building",
    roomNumber: "N/A",
    email: "motin.eee.06@gmail.com,mamotin@eee.ruet.ac.bd",
    phone: "880-1712863393"
  }
  
];

const seedTeachers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/campus_nav');
    console.log('MongoDB connected');

    // Clear existing teachers
    await Teacher.deleteMany({});
    console.log('Cleared existing teachers');

    // Insert real teachers
    await Teacher.insertMany(teachers);
    console.log(`✅ Successfully seeded ${teachers.length}  faculty members!`);

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

