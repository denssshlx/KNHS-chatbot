import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { chatHistory } from './chatHistory.js';
import { systemPrompt } from './systemPrompt.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || "AIzaSyAEB8iM4Fd5p-9VdFFB_1FWW69pF4pHkGo";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: {
    temperature: 0.9,
    topP: 0.8,
    topK: 40,
    maxOutputTokens: 2048,
  },
  systemInstruction: {
    role: "model",
    parts: [{ text: systemPrompt }],
  },
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    const chatSession = model.startChat({
      history: chatHistory,
    });

    const result = await chatSession.sendMessage(message);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});