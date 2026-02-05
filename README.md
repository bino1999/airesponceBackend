# AI Response Backend

Backend server using Express.js and Google Gemini API.

## Deployment Guide

### Deploy to Render (Free)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Render:**
   - Go to https://render.com and sign up
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** airesponse-backend
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
   - Add Environment Variable:
     - Key: `GEMINI_API_KEY`
     - Value: Your Gemini API key
   - Click "Create Web Service"

3. **Your backend URL will be:** `https://your-service-name.onrender.com`

### Deploy to Railway (Alternative)

1. Install Railway CLI:
   ```bash
   npm install -g railway
   ```

2. Deploy:
   ```bash
   railway login
   railway init
   railway up
   ```

3. Add environment variable:
   ```bash
   railway variables set GEMINI_API_KEY=your_key_here
   ```

## Connect to Frontend

Update your frontend API calls to use the deployed URL:

```javascript
// In your frontend code
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend.onrender.com'
  : 'http://localhost:8787';

// Make API call
fetch(`${API_URL}/analyze`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: 'your prompt' })
});
```

## Local Development

1. Copy `.env.example` to `.env`
2. Add your `GEMINI_API_KEY`
3. Run: `npm start`
