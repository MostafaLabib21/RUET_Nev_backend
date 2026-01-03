const mongoose = require('mongoose');

const knowledgeBaseSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true // e.g., "Creator", "Library", "Medical"
  },
  question: {
    type: String, 
    required: true // A sample question like "Who built you?"
  },
  answer: {
    type: String,
    required: true // The text the bot should use to answer
  },
  tags: [String] // Keywords like ["developer", "admin", "mostafa"]
}, { timestamps: true });

module.exports = mongoose.model('KnowledgeBase', knowledgeBaseSchema);