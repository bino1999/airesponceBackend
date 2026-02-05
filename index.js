import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';
import cors from 'cors';

const app = express();

// Allow your frontend domain (update after deploying frontend)
const allowedOrigins = [
  'http://localhost:3001',
  'http://localhost:3000',
  // Add your deployed frontend URL here after deployment
  // 'https://your-frontend.vercel.app'
];

app.use(cors({ 
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'AI server is running' });
});

app.post('/analyze', async (req, res) => {
  const { prompt } = req.body;

  try {
    // Use the correct model name: gemini-2.5-flash
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    
    if (data.error) {
      console.error('Gemini API Error:', data.error);
      return res.status(400).json({ error: data.error.message });
    }

    const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || '';

    res.json({ result: text });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => console.log(`AI server running on port ${PORT}`));