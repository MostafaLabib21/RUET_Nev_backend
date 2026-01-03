require('dotenv').config();
const mongoose = require('mongoose');
const KnowledgeBase = require('./models/KnowledgeBase');

const knowledgeData = [
  // --- 1. IDENTITY & CREATOR ---
  {
    topic: "Identity",
    question: "Who built you?",
    answer: "I was built by Mostafa Labib (CSE-21) as a project to help RUET students navigate the campus easily.",
    tags: ["developer", "creator", "admin", "made", "build", "labib"]
  },
  {
    topic: "App Info",
    question: "What can you do?",
    answer: "I am the RUET Navigator. I can help you find teacher's rooms, department locations, bus schedules, and answer questions about the university's history and campus.",
    tags: ["help", "features", "capabilities", "function"]
  },

  // --- 2. PRACTICAL CAMPUS INFO ---
  {
    topic: "Library",
    question: "When is the central library open?",
    answer: "The RUET Central Library is usually open from 8:00 AM to 9:00 PM, On closed days it may vary.",
    tags: ["library", "books", "study", "time", "open"]
  },
  {
    topic: "Medical",
    question: "Where is the medical center?",
    answer: "The RUET Medical Center is located near the Shahid Shahidul Islam Hall. It is open 24/7 for emergencies.",
    tags: ["doctor", "medical", "hospital", "sick", "health"]
  },
  {
    topic: "Administrative Building",
    question: "Where is the admin building?",
    answer: "The Administrative Building is the large building near the main gate. The Vice Chancellor's office and other administrative offices are located here.",
    tags: ["admin", "vc", "office", "registrar"]
  },

  // --- 3. GENERAL RUET KNOWLEDGE (New) ---
  {
    topic: "Overview",
    question: "What is RUET?",
    answer: "Rajshahi University of Engineering & Technology (RUET) is the 2nd oldest public engineering and technological research university in Bangladesh. It specializes in applied sciences, engineering, technology, architecture, and urban planning. It grants PhDs and is funded by the UGC.",
    tags: ["ruet", "university", "about", "overview", "public"]
  },
  {
    topic: "Location",
    question: "Where is RUET located?",
    answer: "RUET is situated in the northern part of Bangladesh, in the city of Rajshahi. The campus is known for its 'spectacular harmony of architecture and natural beauty'.",
    tags: ["location", "address", "city", "campus", "where"]
  },
  {
    topic: "History - Origin",
    question: "When was RUET established?",
    answer: "It was originally established in 1964 as 'Rajshahi Engineering College' (REC) with three departments: Mechanical, Electrical & Electronic, and Civil Engineering. It started with 120 students.",
    tags: ["history", "established", "founded", "1964", "college"]
  },
  {
    topic: "History - BIT",
    question: "What is BIT Rajshahi?",
    answer: "In 1986, the college was converted into an institute named 'Bangladesh Institute of Technology (BIT), Rajshahi' to enhance technical education.",
    tags: ["bit", "institute", "1986", "history"]
  },
  {
    topic: "History - Upgrade",
    question: "When did it become a university?",
    answer: "In September 2003, the institute was upgraded to a full university and renamed Rajshahi University of Engineering & Technology (RUET).",
    tags: ["2003", "upgrade", "university", "history"]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear old data
    await KnowledgeBase.deleteMany({});
    console.log('🗑️  Cleared old knowledge data');

    // Insert new data
    await KnowledgeBase.insertMany(knowledgeData);
    console.log(`🧠 Added ${knowledgeData.length} knowledge entries to the brain!`);

    mongoose.connection.close();
    console.log('👋 Connection closed');
    
  } catch (error) {
    console.error('❌ Error seeding knowledge base:', error);
    process.exit(1);
  }
};

seedDB();