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
  const userMessage = req.body.message;

  // Simulated mock response for testing
  const mockResponse = `
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

  res.json({ reply: mockResponse });
});

// Add GET / route for health check
app.get('/', (req, res) => {
  res.send('✅ Jetset Recipes AI Proxy is running. Use POST /ask to interact.');
});

app.listen(port, () => {
  console.log(`Jetset AI Assistant is running at http://localhost:${port}`);
});
