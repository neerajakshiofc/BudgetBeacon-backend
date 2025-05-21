import express from 'express';
const router = express.Router();
import yahooFinance from 'yahoo-finance2';

// GET /api/stock-suggestions?symbol=TCS.NS
router.get('/api/stock-suggestions', async (req, res) => {
  const { symbol } = req.query;

  if (!symbol) {
    return res.status(400).json({ message: 'Stock symbol is required' });
  }

  try {
    // Fetch latest quote
    const data = await yahooFinance.quote(symbol);
    if (!data || !data.regularMarketPrice) {
      return res.status(404).json({ message: 'Stock data not found for the symbol.' });
    }

    // Historical data for last 5 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 5);

    const history = await yahooFinance.historical(symbol, {
      period1: startDate,
      period2: endDate,
      interval: '1d',
    });

    const formattedHistory = history.map((point) => ({
      date: point.date.toISOString().split('T')[0],
      price: point.close,
    }));

    // Respond with full stock data
    const stockData = {
      symbol: data.symbol,
      name: data.shortName || data.longName || symbol,
      latestPrice: data.regularMarketPrice,
      change: data.regularMarketChangePercent,
      currency: data.currency || 'INR',
      dayHigh: data.regularMarketDayHigh,
      dayLow: data.regularMarketDayLow,
      volume: data.regularMarketVolume,
      marketTime: data.regularMarketTime
        ? new Date(data.regularMarketTime * 1000).toLocaleString()
        : null,
      history: formattedHistory,
    };

    res.json(stockData);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;