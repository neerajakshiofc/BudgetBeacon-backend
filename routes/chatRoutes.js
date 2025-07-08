import express from 'express';
import axios from 'axios';
const router = express.Router();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

router.post('/', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  if (!GOOGLE_API_KEY) {
    return res.status(500).json({ error: 'API key missing from server environment' });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No reply';
    res.json({ reply });

  } catch (err) {
    console.error('Gemini API error:', {
      message: err.message,
      responseData: err.response?.data,
      status: err.response?.status,
      requestData: err.config?.data,
      headers: err.config?.headers,
    });

    res.status(500).json({
      error: 'Gemini API error',
      message: err.message,
      responseData: err.response?.data,
    });
  }
});

export default router;
