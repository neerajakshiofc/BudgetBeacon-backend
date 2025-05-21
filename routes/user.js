import express from 'express';
import jwt from 'jsonwebtoken';             // Use ES module import
import User from '../models/User.js';       // Import User model
const router = express.Router();

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).send('Token missing');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    
    if (!req.user) return res.status(401).send('User not found');
    next();
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
};

// Routes
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



export default User;
