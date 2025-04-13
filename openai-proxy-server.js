const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.post("/ask", async (req, res) => {
  const userMessage = req.body.message;

  // ✅ Hardcoded mock response to test clickable markdown links
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

app.get("/", (req, res) => {
  res.send("✅ Jetset Recipes AI Proxy is running. Use POST /ask to interact.");
});

app.listen(port, () => {
  console.log(`Jetset AI Assistant is running at http://localhost:${port}`);
});
