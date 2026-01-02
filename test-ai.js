require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function check() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    console.log("Checking API connection...");
    // This calls the internal list of models
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );
    const data = await response.json();
    
    console.log("\n✅ AVAILABLE MODELS FOR YOU:");
    if (data.models) {
        data.models.forEach(m => {
            // Only show models that can generate text
            if(m.supportedGenerationMethods.includes("generateContent")) {
                console.log(`Model ID: ${m.name.replace('models/', '')}`);
            }
        });
    } else {
        console.log("❌ No models found. Response:", data);
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

check();