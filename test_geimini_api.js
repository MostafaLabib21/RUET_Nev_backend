// testGemini.js
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testModel(modelName) {
  console.log(`\n--- Testing Model: ${modelName} ---`);
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Hello, are you working?");
    const response = await result.response;
    console.log(`✅ SUCCESS! ${modelName} responded:`);
    console.log(`"${response.text()}"`);
  } catch (error) {
    console.log(`❌ FAILED: ${modelName}`);
    if (error.message.includes('404')) {
      console.log("Error 404: Model not found. Your library version might be too old.");
    } else if (error.message.includes('429')) {
      console.log("Error 429: Quota exceeded or Rate limit hit.");
    } else {
      console.log("Error details:", error.message);
    }
  }
}

async function runTests() {
  // Test 1: The standard stable model (Old reliable)
  await testModel("gemini-2.5-flash");

  // Test 2: The new fast model (The one we want)
  await testModel("gemini-2.5-flash-lite");

  // Test 3: The experimental alias (The one that gave you 429 errors)
  await testModel("gemini-flash-latest");
}

runTests();