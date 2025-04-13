// openai-proxy-server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 10000;

// ✅ CORS for GitHub Pages frontend
app.use(cors({
  origin: 'https://calademos.github.io'
}));

app.use(bodyParser.json());

// 🎯 Main AI Endpoint
app.post('/ask', async (req, res) => {
  const userMessage = req.body.message;

  const prompt = `You are a friendly and expert AI Travel Deals Hacker who builds recipes for smart and budget-friendly trips using travel points, flight routing hacks, and hotel rewards. Always respond in markdown with bold headers, emojis, clickable affiliate links (if provided), and a friendly tone.

User Input:
${userMessage}

Respond using the Jetset Recipe format:
- **🍽️ Jetset Recipe: [Trip Title]**
- **🥄 Ingredients:** [List key points + referral links]
- **👨‍🍳 Prep Steps:** [Step-by-step instructions]
- **🍷 Flavor Enhancers (Tips):**
- **⏳ Cooking Time:** [When to book]
- **💰 Estimated Value:**
- ✅ Bon appétit!

Include these referral links:
- Chase: [Apply Now](https://www.referyourchasecard.com/226m/EFWV1I3B5Q)
- Amex Gold: [Apply Now](https://americanexpress.com/en-us/referral/gold-card?ref=MATEUGRvFC&xl=cp01)
- Rakuten: [Sign Up](https://www.rakuten.com/r/HUNGER276)`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("OpenAI Error:", data.error);
      return res.status(500).json({ reply: `⚠️ Error from OpenAI: ${data.error.message}` });
    }

    const reply = data.choices?.[0]?.message?.content || "⚠️ No reply generated.";
    res.json({ reply });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ reply: "⚠️ Server error. Please try again later." });
  }
});

// 🌐 Health Check
app.get('/', (req, res) => {
  res.send('✅ Jetset Recipes AI Proxy is running.');
});

app.listen(port, () => {
  console.log(`🚀 Jetset AI Proxy listening on http://localhost:${port}`);
});
