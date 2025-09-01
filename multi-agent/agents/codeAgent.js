import { model } from "../gemini.js";

export async function codeAgent(query, run = false) {
    const prompt = `
  You are a coding assistant. 
  Input: "${query}" 
  Output: Return ONLY in JSON format with two fields:
  {
    "explanation": "short explanation of the code",
    "code": "the clean code snippet"
  }
  Do not include any extra text outside JSON.
  `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Try parsing JSON cleanly
    let parsed;
    try {
        parsed = JSON.parse(text);
    } catch (e) {
        parsed = { explanation: "Couldn't parse properly", code: text };
    }

    return parsed;
}
