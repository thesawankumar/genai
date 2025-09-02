import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash", // Chat model
    apiKey: process.env.GEMINI_API_KEY,
});

// API endpoint
app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Message is required" });

        const response = await model.invoke(message);
        res.json({ reply: response.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
