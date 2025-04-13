// openai-proxy-server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// ✅ Allow frontend origin (GitHub Pages)
app.use(cors({
  origin: 'https://calademos.github.io'
}));

app.use(bodyParser.json());

// ✅ Proxy POST /ask
app.post('/ask', async (req, res) => {
  const userMessage = req.body.message;

  const prompt = `You are a travel planning assistant. Return your response in **GitHub-flavored Markdown**. Use valid [text](url) links for all referral links and travel tools.

User request:
${userMessage}
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('OpenAI API Error:', data.error);
      return res.status(500).json({ reply: `⚠️ Error: ${data.error.message}` });
    }

    const reply = data.choices?.[0]?.message?.content || '⚠️ No response received.';
    res.json({ reply });

  } catch (err) {
    console.error('Proxy Server Error:', err);
    res.status(500).json({ reply: '⚠️ Proxy error. Please try again later.' });
  }
});

// ✅ Health check
app.get('/', (req, res) => {
  res.send('✅ Jetset Proxy running');
});

app.listen(port, () => {
  console.log(`🚀 Jetset Proxy listening at http://localhost:${port}`);
});
