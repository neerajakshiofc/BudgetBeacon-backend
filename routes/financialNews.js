// backend/routes/financialNews.js
import express from 'express';
import axios from 'axios';
import xml2js from 'xml2js';

const router = express.Router();

router.get('/api/financial-news', async (req, res) => {
  try {
    const rssUrl = 'https://economictimes.indiatimes.com/rss/markets/rssfeeds/1977021501.cms';
    const response = await axios.get(rssUrl);
    const xml = response.data;

    const result = await xml2js.parseStringPromise(xml, { mergeAttrs: true });

    const items = result.rss.channel[0].item;

    const articles = items.map((item) => ({
      title: item.title[0],
      link: item.link[0],
      pubDate: item.pubDate[0],
      source: 'Economic Times',
    }));

    res.json(articles.slice(0, 10));
  } catch (error) {
    console.error('❌ Backend error fetching/parsing RSS:', error.message);
    res.status(500).json({ message: 'Failed to fetch financial news.' });
  }
});

export default router;
