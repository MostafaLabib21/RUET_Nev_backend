const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Teacher = require('../models/Teacher'); // Adjust path to your Teacher model
const Location = require('../models/Location'); // Adjust path to your Location model

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    // 1. Fetch Data from your Database
    // We fetch just the text fields to keep payload light
    const teachers = await Teacher.find({}).select('name designation department roomNumber email phone building');
    const locations = await Location.find({}).select('name category description roomNumber');

    // 2. Create a "Context String" for the AI
    // This tells the AI what knowledge it has access to.
    const context = `
      You are a helpful University Campus Assistant, built for RUET.
      If a student sends greeting messages, respond politely and ask how you can assist them.
      If a student asks who built you,respond that you were built by Mostafa Labib.(CSE-21)
      
      Answer the student's question based ONLY on the following database.
      
      FACULTY LIST:
      ${teachers.map(t => `- ${t.name} (${t.designation}, ${t.department}): Room ${t.roomNumber} at ${t.building}. Email: ${t.email}`).join('\n')}
      
      LOCATIONS LIST:
      ${locations.map(l => `- ${l.name} (${l.category}): ${l.description || ''}`).join('\n')}

      If the answer is not in this list, say "I'm sorry, I don't have that information in my database."
    `;

    // 3. Call the AI
    //  CORRECT (Lowercase, no spaces)
    // Change this:
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// To this (The specific stable version):
  //  CORRECT (High limits, fast, and on your available list)
    //  Backup option from your specific list
    //  This alias points to the standard, stable Flash model (15 requests/min)
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const prompt = `${context}\n\nStudent Question: ${message}\nAnswer:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ reply: "I'm having trouble connecting to the brain right now. Please try again." });
  }
});

module.exports = router;