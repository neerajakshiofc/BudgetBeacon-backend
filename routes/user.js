const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).send('Token missing');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
};

router.get('/me', auth, (req, res) => res.json(req.user));

// Save expenses
router.post('/expenses', auth, async (req, res) => {
  req.user.expenses.push(req.body);
  await req.user.save();
  res.json({ message: 'Saved expense' });
});

// Save financial planner data
router.post('/planner', auth, async (req, res) => {
  req.user.financialPlans.push(req.body);
  await req.user.save();
  res.json({ message: 'Saved plan' });
});

// Save stock suggestion watchlist
router.post('/stocks', auth, async (req, res) => {
  req.user.stockWatchlist.push(req.body);
  await req.user.save();
  res.json({ message: 'Saved stock' });
});

module.exports = router;