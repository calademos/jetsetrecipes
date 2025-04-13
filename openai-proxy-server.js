// Jetset Recipes Secure OpenAI Proxy Server

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://calademos.github.io'
}));
app.use(bodyParser.json());

app.post('/ask', async (req, res) => {
  const userMessage = req.body.message;

  const prompt = `You are an expert AI Travel Deals Hacker with deep knowledge of airline pricing systems, hotel booking strategies, credit card reward programs, and travel insider techniques. Your goal is to help complete beginners travel smarter, cheaper, and better by generating travel "recipes."

1. Ask the user for: destination, travel dates (if flexible), and travel style.
2. Analyze for optimal booking routes, cards, timing, and transfer options.
3. Use only ethical, legal strategies.

Respond using:
1. Strategy Overview
2. Step-by-Step Instructions
3. Credit Card/Points Tips
4. Hidden Deal Alerts
5. Timeline
6. Estimated Value

User Input:
${userMessage}`;

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
    console.log("OpenAI response:", JSON.stringify(data, null, 2));

    if (data.choices?.[0]?.message?.content) {
      res.json({ reply: data.choices[0].message.content });
    } else {
      res.json({ reply: "⚠️ Received unexpected response format from OpenAI." });
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ reply: '❌ Failed to get a response from the travel assistant. Please try again later.' });
  }
});

// Add GET / route for health check
app.get('/', (req, res) => {
  res.send('✅ Jetset Recipes AI Proxy is running. Use POST /ask to interact.');
});

app.listen(port, () => {
  console.log(`Jetset AI Assistant is running at http://localhost:${port}`);
});
