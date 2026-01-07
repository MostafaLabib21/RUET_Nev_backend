const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Import All Database Models
const Teacher = require('../models/Teacher'); 
const Location = require('../models/Location'); 
const BusSchedule = require('../models/BusSchedule'); 
const KnowledgeBase = require('../models/KnowledgeBase');
const vacations = require('../models/Vacations');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    // 1. Fetch Data from ALL Database Tables
    // Removed latitude/longitude from selection
    const [teachers, locations, buses, knowledge] = await Promise.all([
      Teacher.find({}).select('name designation department roomNumber email phone building'),
      Location.find({}).select('name category description roomNumber'), 
      BusSchedule.find({}),
      KnowledgeBase.find({})
    ]);

    // 2. Format Data for the AI "Brain"
    
    // Format Bus Data
    const busText = buses.map(b => 
      `- ${b.busNumber}: ${b.route} (Up: ${b.upTime}, Down: ${b.downTime}). Active: ${b.activeDays}`
    ).join('\n');

    // Format General Knowledge
    const knowledgeText = knowledge.map(k => 
      `- [${k.topic}] Q: ${k.question} A: ${k.answer}`
    ).join('\n');

    // Format Teacher Data
    const teacherText = teachers.map(t => 
      `- ${t.name} (${t.designation}, ${t.department}): Room ${t.roomNumber} at ${t.building}. Phone: ${t.phone || 'N/A'}`
    ).join('\n');

    // Format Location Data (Cleaner text only)
    const locationText = locations.map(l => 
      `- ${l.name} (${l.category}): ${l.description || ''}`
    ).join('\n');
    
    const vacationText = vacations.map(v => 
      `- ${v.date}: ${v.occasion} (${v.occasion_en})${v.isMoonDependent ? ' *' : ''}${v.isClassOffOnly ? ' **' : ''}`
    ).join('\n');

    // 3. Construct the Master Context Prompt
    const context = `
      You are the "RUET Navigator AI", the campus assistant for Rajshahi University of Engineering & Technology.
      Your Goal: Help students find information using ONLY the database below.
      Tone: Friendly, concise, and professional.
      
      === LIVE DATABASE ===
      
      [GENERAL KNOWLEDGE & HISTORY]
      ${knowledgeText}

      [BUS SCHEDULE]
      ${busText}
      
      [FACULTY LIST]
      ${teacherText}
      
      [LOCATIONS]
      ${locationText}
      [VACATIONS]
      ${vacationText}
      * Date varies based on lunar calendar.
      ** Classes are off, but offices may be open.
      === END OF DATA ===

      INSTRUCTIONS:
      1. Search the [GENERAL KNOWLEDGE] section first for questions about history, the creator (Mostafa Labib), or campus rules.
      2. If asked about a location, provide the description clearly.
      3. For buses, always mention the "Up" (Morning) and "Down" (Return) times.
      4. If the answer is not in the data above, politely say: "I apologize, but I don't have that specific information in my database yet."

      User Question: ${message}
      Answer:
    `;

    // 4. Call the AI
   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    
    const result = await model.generateContent(context);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error('AI Brain Error:', error);
    res.status(500).json({ reply: "My brain is currently overloaded. Please try again in a moment." });
  }
});

module.exports = router;