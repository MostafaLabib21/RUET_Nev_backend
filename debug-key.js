require('dotenv').config();

// We use the native 'fetch' to bypass any SDK version issues
async function listAvailableModels() {
  const key = process.env.GOOGLE_API_KEY;
  
  if (!key) {
    console.log("❌ Error: Key missing in .env");
    return;
  }

  console.log("----------------------------------------");
  console.log("📡 Asking Google: 'What models can this key use?'...");
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await response.json();

    if (data.error) {
      console.log("❌ API Error:", data.error.message);
      return;
    }

    if (!data.models) {
        console.log("⚠️ No models found. Your account might be restricted.");
        return;
    }

    console.log("✅ SUCCESS! Here are the models available to you:");
    
    // Filter to only show models that can generate text
    const textModels = data.models.filter(m => 
        m.supportedGenerationMethods.includes("generateContent")
    );

    textModels.forEach(model => {
        // We print the 'name' property exactly as Google wants it
        console.log(`   👉 ${model.name}`); 
    });
    
    console.log("----------------------------------------");
    console.log("TRY THIS: Copy one of the names above exactly (e.g. 'models/gemini-pro') into your code.");

  } catch (e) {
    console.log("❌ Network/Fetch Error:", e.message);
    console.log("   (If this fails, check your Internet or VPN)");
  }
}

listAvailableModels();