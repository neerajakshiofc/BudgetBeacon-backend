const express = require('express');
const router = express.Router();
const axios = require('axios');

const NEWS_API_KEY = process.env.NEWS_API_KEY; // ✅ Load from .env

// Route: GET /api/financial-news
router.get('/api/financial-news', async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&q=finance,stock,investment&language=en&category=business`
    );

    const articles = response.data.results.map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      source: item.source_id,
    }));

    res.json(articles.slice(0, 10)); // return top 10 articles
  } catch (error) {
    console.error('Error fetching financial news:', error.message);
    res.status(500).json({ message: 'Failed to fetch financial news.' });
  }
});

module.exports = router;