<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Jetset Recipes AI Assistant</title>

  <!-- ✅ Enable Markdown Parsing -->
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script>
    window.marked = window.marked || marked;

    const renderer = new marked.Renderer();
    renderer.link = function(href, title, text) {
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    };

    window.marked.setOptions({
      breaks: true,
      gfm: true,
      renderer: renderer,
      headerIds: false
    });
  </script>

  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f4f4;
      margin: 0;
      padding: 2rem;
    }
    #chatbox {
      width: 100%;
      max-width: 600px;
      margin: auto;
      background: white;
      padding: 1rem;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    textarea {
      width: 100%;
      height: 100px;
      margin-top: 1rem;
      padding: 10px;
      font-size: 1rem;
    }
    button {
      margin-top: 10px;
      padding: 10px 20px;
      font-size: 1rem;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
    #response {
      background: #fdfdfd;
      padding: 1rem;
      border-radius: 6px;
      margin-top: 1rem;
      line-height: 1.6;
      word-wrap: break-word;
      overflow-wrap: anywhere;
    }
    #response a {
      color: #1a73e8;
      font-weight: bold;
      text-decoration: none;
    }
    #response a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div id="chatbox">
    <h2>Jetset Recipes – AI Travel Deals Hacker</h2>
    <p>Enter your destination, travel dates (if flexible), and travel style. Our AI chef will cook up a custom travel savings recipe!</p>
    <textarea id="userInput" placeholder="e.g. I want to fly to Paris next month, have Chase points, prefer business class..."></textarea>
    <button onclick="getResponse()">Get My Travel Recipe</button>
    <div id="response">Waiting for input...</div>
  </div>

  <script>
  async function getResponse() {
    const userMessage = document.getElementById("userInput").value;
    const responseBox = document.getElementById("response");
    responseBox.innerHTML = "<em>Cooking up your strategy...</em>";

    try {
      const res = await fetch("https://openai-proxy-server-qbp5.onrender.com/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      const output = (data.reply || "No response.").trim();
      console.log("🧠 AI RAW REPLY →", output);

      // ✅ Always parse markdown from AI
      responseBox.innerHTML = window.marked.parse(output);
    } catch (err) {
      responseBox.innerHTML = "<span style='color: red;'>❌ Error: Could not reach the assistant.</span>";
      console.error(err);
    }
  }
  </script>
</body>
</html>
