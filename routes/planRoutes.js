import express from 'express';
const router = express.Router();
import FinancialGoal from '../models/Plan.js'; // ✅ Correct ES module import


// Mock auth middleware (replace with JWT middleware later)
const mockAuth = (req, res, next) => {
  req.user = { id: 'user123' }; // Replace with JWT-decoded user ID in real app
  next();
};

// Apply mock auth to all routes
router.use(mockAuth);

// GET all financial goals for the logged-in user
router.get('/financial-goals', async (req, res) => {
  try {
    const goals = await FinancialGoal.find({ userId: req.user.id });
    res.json(goals);
  } catch (err) {
    console.error('GET error:', err);
    res.status(500).json({ message: 'Failed to fetch goals' });
  }
});

// POST a new financial goal
router.post('/financial-goals', async (req, res) => {
  const { goal, targetAmount, currentAmount, deadline } = req.body;

  if (!goal || !targetAmount || !currentAmount || !deadline) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newGoal = await FinancialGoal.create({
      userId: req.user.id,
      goal,
      targetAmount,
      currentAmount,
      deadline,
    });
    res.status(201).json(newGoal);
  } catch (err) {
    console.error('POST error:', err);
    res.status(500).json({ message: 'Failed to save goal' });
  }
});

// DELETE a financial goal by ID for the current user
router.delete('/financial-goals/:id', async (req, res) => {
  try {
    const deletedGoal = await FinancialGoal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deletedGoal) {
      return res.status(404).json({ message: 'Goal not found or unauthorized' });
    }

    res.json({ message: 'Goal deleted successfully' });
  } catch (err) {
    console.error('DELETE error:', err);
    res.status(500).json({ message: 'Failed to delete goal' });
  }
});

export default router;