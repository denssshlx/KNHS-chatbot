# KNHS Chatbot

A chatbot application for Kalayaan National High School

## Local Development

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. The application will be available at http://localhost:3000

## Deployment to Render

### Manual Deployment

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure as follows:
   - **Name**: knhs-chatbot
   - **Environment**: Node
   - **Build Command**: npm install
   - **Start Command**: NODE_ENV=production node index.js
4. Add the following environment variables:
   - `NODE_ENV`: production
   - `PORT`: 3000
   - `GEMINI_API_KEY`: your-gemini-api-key
   - `FRONTEND_URL`: https://knhs-chatbot.onrender.com

### Automated Deployment with render.yaml

1. Push the code with render.yaml to your GitHub repository
2. In Render, create a new Blueprint instance
3. Connect your GitHub repository
4. The configuration from render.yaml will be automatically applied
5. Add your GEMINI_API_KEY as an environment variable

## Environment Variables

- `NODE_ENV`: development/production
- `PORT`: Port number (default: 3000)
- `GEMINI_API_KEY`: Your Google Gemini API key
- `FRONTEND_URL`: URL of your frontend (used for CORS)
