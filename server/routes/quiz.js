const express = require('express')
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = "AIzaSyB10nBDi5qt-_vMxAvoQ4QpR0VZeOayFOk";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 0.7, // Lower temperature for more deterministic output
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const router = express.Router()

const quizPrompt = `Generate 5 questions in JSON format mentioned below related to topic mentioned below. Do not return anything else.
JSON format:
{
  "questions": [
    {
      "id": 1,
      "prompt": "What is the purpose of the let keyword in JavaScript?",
      "answers": [
        { "text": "Declare a variable with block scope", "correct": true },
        { "text": "Declare a global variable", "correct": false },
        { "text": "Define a function", "correct": false }
      ]
    },
    // ... more questions
  ]
}
Topic:
{{topic}}
`

router.post("generate", async (req, res) => {
    const {topic} = req.body;
    const finalPrompt = quizPrompt.replace("{{topic}}", topic);
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });
      const result = await chatSession.sendMessage(finalPrompt);
      let quiz = result.response.text();
      quiz = roadmap.trim().replace(/```json/g, "").replace(/```/g, "");
      res.json({ result: quiz });
    } catch (error) {
      console.error("Error generating quiz:", error);
      res.status(500).json({ error: "Error generating quiz" });
    }

})

module.export = router;