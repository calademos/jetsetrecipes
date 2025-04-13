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

  const prompt = `You are an expert travel deals assistant. Provide your response in valid GitHub-flavored Markdown using [text](url) link format where appropriate.

User input:
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

app.get('/', (req, res) => {
  res.send('✅ Jetset Recipes AI Proxy is running.');
});

app.listen(port, () => {
  console.log(`🚀 Jetset Proxy running on http://localhost:${port}`);
});
