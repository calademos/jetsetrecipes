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
    ✈️ Strategy Overview:
    Use Amex Membership Rewards to fly to Tokyo next month. Stay 4 nights with IHG points. Maximize cashback stacking with local transport deals.

    🔢 Step-by-Step Instructions:
    1. Transfer 60k Amex points to ANA Mileage Club
    2. Book IHG hotel using 20k points per night x 4 nights
    3. Use Rakuten for local tours and metro pass cashback

    💳 Credit Card Tips:
    Use Amex Gold + Rakuten for best synergy

    🕵️ Hidden Deal Alerts:
    Look for ANA Biz Class award seats on weekdays

    🕒 Timeline:
    Book ANA 21–28 days in advance for lowest award rate

    💰 Estimated Value:
    $1,800 trip for under $150 out of pocket
    `;
  } else if (userMessage.includes("brazil") || userMessage.includes("rio")) {
    mockResponse = `
    ✈️ Strategy Overview:
    Fly to Rio de Janeiro using Capital One Miles. Use Livelo and local app promos to stack deals.

    🔢 Step-by-Step Instructions:
    1. Transfer 75k Capital One Miles to TAP Air Portugal
    2. Use Livelo + Booking.com combo to reserve hotel
    3. Activate cashback via Méliuz and Flightradar alerts

    💳 Credit Card Tips:
    Capital One Venture X + mobile travel partners

    🕵️ Hidden Deal Alerts:
    Domestic GOL flights have 20% cashback via Inter

    🕒 Timeline:
    Book Tuesday night to snag TAP sales

    💰 Estimated Value:
    $1,500 travel for ~$120 with cashback
    `;
  } else {
    mockResponse = `
    ✈️ Strategy Overview:
    Use Chase Ultimate Rewards to fly to Paris in May. Stay 4 nights using Hyatt points. Combine credit card offers for maximum cashback.

    🔢 Step-by-Step Instructions:
    1. Book flight via Chase Travel Portal (50k UR points)
    2. Redeem 15k Hyatt points per night x 4 nights
    3. Stack Rakuten + CardPointers for bonus tracking

    💳 Credit Card Tips:
    Use Sapphire Preferred + Rakuten browser extension

    🕵️ Hidden Deal Alerts:
    Check off-peak Air France award availability

    🕒 Timeline:
    Book 30–60 days out for best value

    💰 Estimated Value:
    $1,200 trip for ~$100 out of pocket
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
