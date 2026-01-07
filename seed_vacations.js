const mongoose = require('mongoose');
require('dotenv').config(); // Load your .env file

// 1. Define the Schema (Must match your project's structure)
const VacationSchema = new mongoose.Schema({
  date: { type: String, required: true },
  occasion: { type: String, required: true }, // Bangla Name
  occasion_en: { type: String },              // English Name (Optional, good for searching)
  isMoonDependent: { type: Boolean, default: false },
  isClassOffOnly: { type: Boolean, default: false }
});

const Vacation = mongoose.model('Vacation', VacationSchema);

// 2. The Data (Extracted from your image)
const vacationData = [
  { date: "17 January", occasion: "শব-ই-মিরাজ", occasion_en: "Shab-e-Meraj", isMoonDependent: true },
  { date: "23 January", occasion: "শ্রী শ্রী সরস্বতী পূজা", occasion_en: "Sri Sri Saraswati Puja" },
  { date: "04 February", occasion: "শব-ই-বরাত", occasion_en: "Shab-e-Barat", isMoonDependent: true },
  { date: "19 Feb - 20 Mar", occasion: "পবিত্র রমজানের অবকাশ", occasion_en: "Holy Ramadan Vacation", isClassOffOnly: true },
  { date: "21 February", occasion: "শহিদ দিবস ও আন্তর্জাতিক মাতৃভাষা দিবস", occasion_en: "Martyrs' Day & Int'l Mother Language Day" },
  { date: "18 Mar - 25 Mar", occasion: "ঈদ-উল-ফিতর", occasion_en: "Eid-ul-Fitr" },
  { date: "17 March", occasion: "শব-ই-কদর", occasion_en: "Shab-e-Qadr" },
  { date: "20 March", occasion: "জুমাতুল বিদা", occasion_en: "Jumatul Wida" },
  { date: "26 March", occasion: "স্বাধীনতা ও জাতীয় দিবস", occasion_en: "Independence & National Day" },
  { date: "14 April", occasion: "বাংলা নববর্ষ", occasion_en: "Bengali New Year" },
  { date: "01 May", occasion: "মে দিবস", occasion_en: "May Day" },
  { date: "01 May", occasion: "বুদ্ধ পূর্ণিমা (বৈশাখী পূর্ণিমা)", occasion_en: "Buddha Purnima", isMoonDependent: true },
  { date: "21 May - 25 May", occasion: "গ্রীষ্মকালীন ছুটি", occasion_en: "Summer Vacation" },
  { date: "26 May - 03 June", occasion: "ঈদ-উল-আযহা", occasion_en: "Eid-ul-Adha" },
  { date: "26 June", occasion: "মহররম (আশুরা)", occasion_en: "Muharram (Ashura)", isMoonDependent: true },
  { date: "05 August", occasion: "জুলাই গণঅভ্যুত্থান দিবস", occasion_en: "July Mass Uprising Day" },
  { date: "12 August", occasion: "আখেরী চাহার সোম্বা", occasion_en: "Akheri Chahar Shamba", isMoonDependent: true },
  { date: "26 August", occasion: "ঈদ-ই-মিলাদুন্নবী (সাঃ)", occasion_en: "Eid-e-Miladunnabi (Sm)", isMoonDependent: true },
  { date: "01 September", occasion: "বিশ্ববিদ্যালয় দিবস", occasion_en: "University Day", isClassOffOnly: true },
  { date: "04 September", occasion: "জন্মাষ্টমী", occasion_en: "Janmashtami" },
  { date: "24 September", occasion: "ফাতেহা-ই-ইয়াজদাহম", occasion_en: "Fateha-e-Yazdaham", isMoonDependent: true },
  { date: "17 Oct - 21 Oct", occasion: "দুর্গা পূজা", occasion_en: "Durga Puja" },
  { date: "14 December", occasion: "শহিদ বুদ্ধিজীবী দিবস", occasion_en: "Martyred Intellectuals Day" },
  { date: "16 December", occasion: "বিজয় দিবস", occasion_en: "Victory Day" },
  { date: "19 Dec - 23 Dec", occasion: "শীতকালীন ছুটি", occasion_en: "Winter Vacation" },
  { date: "25 December", occasion: "বড়দিন", occasion_en: "Christmas Day" }
];

// 3. Connect and Seed
const seedDB = async () => {
  try {
    // Replace process.env.MONGO_URI with your actual connection string if .env doesn't work locally
    await mongoose.connect(process.env.MONGODB_URI); 
    console.log("Connected to MongoDB...");

    // Clear existing data (optional, remove this line if you want to keep old data)
    await Vacation.deleteMany({});
    console.log("Old vacation data cleared.");

    // Insert new data
    await Vacation.insertMany(vacationData);
    console.log("✅ Success! Vacation list added to database.");

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();