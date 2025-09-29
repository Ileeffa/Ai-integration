// backend/server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 Replace this with your actual OpenAI API key (it must start with "sk-")
const OPENAI_API_KEY = "sk-your-real-key-here"; 

app.post("/generate", async (req, res) => {
  const userPrompt = req.body.prompt;
  console.log("Incoming prompt:", userPrompt); // ✅ logs incoming data

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Create a skincare routine for the following: ${userPrompt}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ log raw response (optional)
    // console.log("OpenAI raw response:", response.data);

    const aiText = response.data.choices[0].message.content;
    res.json({ routine: aiText });
  } catch (error) {
    // Log detailed error
    if (error.response) {
      console.error("Error from OpenAI:", error.response.status, error.response.data);
    } else {
      console.error("Error:", error.message);
    }
    res.status(500).json({ error: "Failed to generate routine" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
