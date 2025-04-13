const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.post('/ask', async (req, res) => {
  const userMessage = req.body.message || "Help me plan a trip";

  // Load affiliate links from environment variables or set default placeholders
  const chaseLink = process.env.CHASE_LINK || 'https://www.chase.com';
  const rakutenLink = process.env.RAKUTEN_LINK || 'https://www.rakuten.com';
  const amexLink = process.env.AMEX_LINK || 'https://www.americanexpress.com';

  const prompt = `
You are a travel savings expert. Craft a travel "recipe" using markdown formatting.

Include:
- ✈️ Recipe Title
- 🥄 Ingredients (credit card points, programs, referral links)
- 👨‍🍳 Steps (how to book)
- 💡 Pro Tip
- 🍷 Estimated Savings
- ✅ Final encouragement

Respond in markdown. Use these referral links:

- [Chase Sapphire Preferred – Apply Now](${chaseLink})
- [Rakuten Cashback – Sign Up](${rakutenLink})
- [Amex Cards – See Offers](${amexLink})

User Input:
${userMessage}
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (data?.choices?.[0]?.message?.content) {
      res.json({ reply: data.choices[0].message.content });
    } else {
      console.error("⚠️ OpenAI API Error:", data);
      res.status(500).json({ reply: "⚠️ Error: Unable to generate response." });
    }
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).send("Server error");
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('✅ Jetset Recipes Proxy is live. POST /ask to use.');
});

app.listen(port, () => {
  console.log(`🚀 Jetset AI Proxy running on port ${port}`);
});
