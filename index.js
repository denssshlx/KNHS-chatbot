import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { chatHistory } from './chatHistory.js';
import { systemPrompt } from './systemPrompt.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});

const app = express();
const port = process.env.PORT || 3000;

// CORS setup
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

const apiKey = process.env.GEMINI_API_KEY;
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
    role: 'model',
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
    res
      .status(500)
      .json({ error: 'An error occurred while processing your request' });
  }
});

// Make sure the SPA routes work by returning index.html for any unmatched route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`CORS: Allowing all origins`);
});
