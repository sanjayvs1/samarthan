const express = require("express");
const cors = require("cors");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(cors()); // To handle cross-origin requests from your frontend

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

app.post("/generate-code", async (req, res) => {
  console.log("received");
  let { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
    prompt = `Generate a JSON object that represents a coding question. The object should have the following keys:
- "question" as a string describing the coding question.
- "id" as a unique identifier for the question (string).
- "steps" as an array where each element is an object with the following keys:
  - "step_id" as a number indicating the step's serial number.
  - "step_title" as a string describing the step.
  - "code" as a string representing the code needed for this step, ensuring that the code is executable and builds on previous steps.
  - "desired_output" as a string describing the expected output of the code, if any.
  - "hint" as a string providing a hint to help with the step.
  - "keywords" as an array of objects, where each object contains:
    - "keyword" as a string representing a keyword related to the step.
    - "description" as a string explaining the keyword's relevance or usage.

The JSON object should also include:
- "language" as a string indicating the programming language for the code (e.g., "JavaScript").

The steps should be designed so that each step’s code is executable in isolation, and the final code can be constructed by combining all the steps. Include only relevant keywords such as "function", "return", etc., and avoid including patterns or specific regex details as keywords.

For example:
{
  "question": "How to implement a function to add two numbers in JavaScript?",
  "id": "unique-id-123",
  "steps": [
    {
      "step_id": 1,
      "step_title": "Define the function",
      "code": "function addTwoNumbers(num1, num2) {",
      "desired_output": "",
      "hint": "Start by defining the function with a parameter for the numbers.",
      "keywords": [
        {"keyword": "function", "description": "Used to declare a function in JavaScript."}
      ]
    },
    {
      "step_id": 2,
      "step_title": "Add the numbers",
      "code": "  return num1 + num2;",
      "desired_output": "",
      "hint": "Perform the addition of the two parameters.",
      "keywords": [
        {"keyword": "return", "description": "Used to return a value from a function."},
        {"keyword": "+", "description": "Addition operator."}
      ]
    },
    {
      "step_id": 3,
      "step_title": "Close the function",
      "code": "}",
      "desired_output": "",
      "hint": "End the function definition.",
      "keywords": [
        {"keyword": "}", "description": "Used to close a block of code."}
      ]
    }
  ],
  "language": "JavaScript"
}

Now generate this for ${prompt}.`;

    const result = await chatSession.sendMessage(prompt);
    let generatedCode = result.response.text();

    // Clean the response
    generatedCode = generatedCode
      .replace(/```json/g, "") // Remove opening ```json
      .replace(/```/g, "") // Remove closing ```
      .trim(); // Remove leading and trailing whitespace

    // Optional: Remove extraneous quotes if needed
    generatedCode = generatedCode
      .replace(/^"+|"+$/g, "") // Remove leading and trailing quotes
      .trim();
    generatedCode = JSON.parse(generatedCode);
    res.json({ code: generatedCode });
  } catch (error) {
    console.error("Error generating code:", error);
    res.status(500).json({ error: "Failed to generate code" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
