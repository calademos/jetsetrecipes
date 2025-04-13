// openai-proxy-server.js (mocked version)

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://calademos.github.io'
}));

app.use(bodyParser.json());

// ✅ POST endpoint that sends a mocked markdown response
app.post('/ask', async (req, res) => {
  const userMessage = req.body.message;

  // Mock response (hardcoded markdown with clickable links)
  const reply = `
### ✈️ Jetset Recipe: Paris on Points

#### 🥄 Ingredients
- [Chase Sapphire Preferred – Apply Now](https://www.referyourchasecard.com/226m/EFWV1I3B5Q)
- [Rakuten Cashback Sign-Up](https://www.rakuten.com/r/HUNGER276)
- Google Flights  
- 45,000 Chase Ultimate Rewards Points

#### 👨‍🍳 Steps
1. Book your round-trip flight using Chase Travel Portal with 45k points.  
2. Reserve a 3-night stay at a Hyatt property in Paris.  
3. Stack Rakuten cashback when booking transport or excursions.  
4. Use your card’s travel protections and lounge access.

#### 💡 Pro Tip
Book during shoulder season (April–May or Sept–Oct) for best value.

#### 🍷 Estimated Savings
$1,200+

✅ Enjoy your Paris escape!
`;

  res.json({ reply });
});


// ✅ Health check
app.get('/', (req, res) => {
  res.send('✅ Jetset Proxy is live (mock mode)');
});

app.listen(port, () => {
  console.log(`🚀 Jetset Proxy (mock mode) running at http://localhost:${port}`);
});
