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
   - `PORT`: 10000
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
- `PORT`: Port number (default: 3000 for development, 10000 for production)
- `GEMINI_API_KEY`: Your Google Gemini API key
- `FRONTEND_URL`: URL of your frontend (used for CORS)

## Troubleshooting

### CORS Issues

If you encounter CORS issues:

1. Check the console logs to see which URLs are being used
2. Verify that the API URL in script.js is correctly configured
3. For local testing, try opening the local-test.html file to test API connectivity
4. Ensure the server's CORS configuration allows requests from your frontend
5. In production, use relative URLs for API endpoints

### Connection Issues

If your frontend cannot connect to the backend:

1. In development: Make sure the server is running on port 3000
2. In production: Verify that your application is deployed correctly on Render
3. Check if the API endpoint is responding with the expected data
4. Test with curl or Postman to isolate frontend vs. backend issues
