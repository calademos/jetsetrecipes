// Jetset Recipes Secure OpenAI Proxy Server

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://calademos.github.io'
}));
app.use(bodyParser.json());

app.post('/ask', async (req, res) => {
  const userMessage = req.body.message.toLowerCase();

  // Dynamic mock response based on input
  let mockResponse;

  if (userMessage.includes("tokyo")) {
    mockResponse = `
    🍽️ **Jetset Recipe: Tokyo Tonkotsu Adventure**

    🧂 **Ingredients:**
    - [60k Amex Points – **Apply Now**](https://americanexpress.com/en-us/referral/gold-card?ref=MATEUGRvFC&xl=cp01) → ANA Mileage Club
    - 80k IHG Points (20k/night x 4)
    - [Rakuten Extension](https://www.rakuten.com/r/HUNGER276) 🍱

    🔥 **Prep Steps:**
    1️⃣ Transfer points to ANA & IHG
    2️⃣ Search Tokyo flights 21–28 days out
    3️⃣ Book 4 nights at IHG Tokyo Bay
    4️⃣ Activate [Rakuten](https://www.rakuten.com/r/HUNGER276) for metro + tour cashback

    🍷 **Flavor Enhancers (Tips):**
    - Use [Amex Gold – **Apply Now**](https://americanexpress.com/en-us/referral/gold-card?ref=MATEUGRvFC&xl=cp01) for restaurant bonus
    - Check ANA Biz Class availability (mid-week)

    🧭 **Cooking Time:**
    - Prep 1 week before booking window opens
    - Total value: ~$1800 travel for <$150 cost

    ✅ Bon Appétit! Your Tokyo trip is now seasoned to perfection!
    `;
  } else if (userMessage.includes("brazil") || userMessage.includes("rio")) {
    mockResponse = `
    🍽️ **Jetset Recipe: Brazilian BBQ Getaway**

    🧂 **Ingredients:**
    - 75k Capital One Miles → TAP
    - Livelo + Booking.com
    - Méliuz Extension 🍖

    🔥 **Prep Steps:**
    1️⃣ Transfer miles to TAP Air Portugal
    2️⃣ Book Rio hotel via Booking.com (Livelo active)
    3️⃣ Enable [Méliuz](https://www.rakuten.com/r/HUNGER276) for Uber + restaurants

    🍷 **Flavor Enhancers (Tips):**
    - Venture X for travel credit
    - GOL + Inter cashback stacking (up to 20%)

    🧭 **Cooking Time:**
    - Book Tuesday night TAP fare drops
    - Total value: ~$1500 trip for ~$120 net cost

    ✅ Savor the samba without burning your wallet!
    `;
  } else {
    mockResponse = `
    🍽️ **Jetset Recipe: French Riviera Delight**

    🧂 **Ingredients:**
    - [50k Chase UR Points ✈️ – **Apply Now**](https://www.referyourchasecard.com/226m/EFWV1I3B5Q)
    - 60k Hyatt Points (15k/night)
    - [Rakuten](https://www.rakuten.com/r/HUNGER276) + CardPointers 🔍

    🔥 **Prep Steps:**
    1️⃣ Use [Chase Travel Portal – **Apply Now**](https://www.referyourchasecard.com/226m/EFWV1I3B5Q) for Paris flights
    2️⃣ Book 4-night Hyatt stay
    3️⃣ Activate Rakuten and CardPointers before paying

    🍷 **Flavor Enhancers (Tips):**
    - [Sapphire Preferred – **Apply Now**](https://www.referyourchasecard.com/226m/EFWV1I3B5Q)
    - Air France off-peak award sweet spots

    🧭 **Cooking Time:**
    - 30–60 days out for best ingredients
    - Trip Value: ~$1200 → cooked for $100 🔥

    ✅ Voilà! A Parisian feast of savings just for you.
    `;
  }

  res.json({ reply: mockResponse });
});

// Add GET / route for health check
app.get('/', (req, res) => {
  res.send('✅ Jetset Recipes AI Proxy is running. Use POST /ask to interact.');
});

app.listen(port, () => {
  console.log(`Jetset AI Assistant is running at http://localhost:${port}`);
});
