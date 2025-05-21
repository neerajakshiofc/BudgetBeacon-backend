// routes/expenseRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/user/expenses
// Adds a new expense to a specific user
router.post('/expenses', async (req, res) => {
  const { userId, title, amount, category, date } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Add new expense
    user.expenses.push({ title, amount, category, date });
    await user.save();

    res.status(201).json({
      message: 'Expense added successfully',
      expenses: user.expenses
    });
  } catch (err) {
    console.error('Add Expense Error:', err);
    res.status(500).json({ message: 'Server error' });
  } 
});

module.exports = router;