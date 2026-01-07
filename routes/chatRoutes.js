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
    const [teachers, locations, buses, knowledge, vacationsData] = await Promise.all([
      Teacher.find({}).select('name designation department roomNumber email phone building'),
      Location.find({}).select('name category description roomNumber'), 
      BusSchedule.find({}),
      KnowledgeBase.find({}),
      vacations.find({})
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
    
    const vacationText = vacationsData.map(v => 
      `- ${v.date}: ${v.occasion} (${v.occasion_en})${v.isMoonDependent ? ' *' : ''}${v.isClassOffOnly ? ' **' : ''}`
    ).join('\n');
    // 3. Construct the Master Context Prompt
    // 3. Construct the Master Context Prompt
    const context = `
      SYSTEM ROLE:
      You are "RUET Navigator AI", the dedicated intelligent assistant for Rajshahi University of Engineering & Technology (RUET).
      
      CORE DIRECTIVES:
      1. ACCURACY: Answer using ONLY the provided "LIVE DATABASE". Do not hallucinate or use outside knowledge.
      2. TONE: Friendly, helpful, and concise. Use emojis occasionally where appropriate (e.g., 🚌 for buses, 📅 for dates).
      3. FALLBACK: If the exact answer is missing, state clearly: "I apologize, but I don't have that specific information in my database right now."
      
      === LIVE DATABASE STARTS ===
      
      [GENERAL KNOWLEDGE & HISTORY]
      ${knowledgeText}

      [BUS SCHEDULE]
      ${busText}
      
      [FACULTY & TEACHERS]
      ${teacherText}
      
      [CAMPUS LOCATIONS]
      ${locationText}
      
      [OFFICIAL VACATION LIST 2026]
      ${vacationText}
      (Legend: * = Moon dependent, ** = Classes off/Offices open)
      
      === LIVE DATABASE ENDS ===

      RESPONSE RULES:
      1. VACATIONS: When asked about holidays, ALWAYS include the date, the English name, AND the Bangla name (e.g., "Feb 21: Martyrs' Day (শহিদ দিবস)"). If it is marked with '*', mention it depends on the moon.
      2. BUSES: Always provide the Route Name, Bus Number, Up Time (Morning), and Down Time (Return).
      3. TEACHERS: If a phone number is 'N/A', do not mention it. Just provide their room and email if available.
      4. CREATOR INFO: If asked about your creator, always credit "Mostafa Labib".
      5. FORMATTING: Use bullet points for lists to make them readable on mobile screens.

      CURRENT USER QUERY: "${message}"
      
      YOUR RESPONSE:
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