import express from "express";
import cors from "cors";
// import { taskAgent } from "./agents/taskAgent.js";
import { codeAgent } from "./agents/codeAgent.js";

const app = express();
app.use(express.json());

// ✅ Enable CORS for frontend
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));


// Code Agent (direct query → code)
app.post("/code", async (req, res) => {
    try {
        const { query, run } = req.body;
        const result = await codeAgent(query, run);
        res.json(result); // ab direct { explanation, code }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () =>
    console.log("🚀 Multi-Agent AI running on http://localhost:3000")
);
