const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// OpenAI API configuration
const OPENAI_API_KEY = "your_openai_api_key"; // Replace with your API key
const OPENAI_API_URL = "https://api.openai.com/v1/completions";

// Endpoint to generate objective questions
app.post("/generate-question", async (req, res) => {
  const { classLevel, subject, curriculum } = req.body;

  if (!classLevel || !subject || !curriculum) {
    return res.status(400).json({ error: "Missing required parameters." });
  }

  const prompt = `
    Create an objective question for:
    Class: ${classLevel}
    Subject: ${subject}
    Curriculum: ${curriculum}

    Include 4 options and clearly mark the correct choice.
    Example format:
    Question: What is 2 + 2?
    Options:
    a) 3
    b) 4 (correct)
    c) 5
    d) 6
  `;

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "text-davinci-003", // Use the appropriate GPT model
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const generatedText = response.data.choices[0].text.trim();

    // Extract the question and correct choice
    const questionMatch = generatedText.match(/Question:\s*(.*)/);
    const optionsMatch = generatedText.match(/Options:\s*([\s\S]*)/);

    if (questionMatch && optionsMatch) {
      const question = questionMatch[1].trim();
      const options = optionsMatch[1].trim().split("\n").map((opt) => opt.trim());

      const correctChoice = options.find((opt) => opt.includes("(correct)"));

      return res.json({
        question: question,
        options: options,
        correctChoice: correctChoice ? correctChoice.replace("(correct)", "").trim() : null,
      });
    } else {
      throw new Error("Invalid response format from AI.");
    }
  } catch (error) {
    console.error("Error generating question:", error);
    return res.status(500).json({ error: "Failed to generate question." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
