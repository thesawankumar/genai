import express from "express";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// const model = new ChatGoogleGenerativeAI({
//   apiKey: process.env.GOOGLE_API_KEY,  // yeh tumhe Google AI Studio se milega
//   model: "gemini-1.5-flash"            // fast + free tier
// });


const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama3-8b-8192"
});



app.post("/chat", async (req, res) => {
  const { message } = req.body;
  const response = await model.invoke([
    new SystemMessage("You are a helpful assistant."),
    new HumanMessage(message)
  ]);
  res.json({ reply: response.content });
});

app.listen(3000, () =>
  console.log("Chatbot running on http://localhost:3000")
);
