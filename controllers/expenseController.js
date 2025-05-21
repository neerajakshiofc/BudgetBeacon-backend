const User = require('../models/User'); // Adjust path if needed

// GET user expenses
exports.getExpenses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // assuming req.user is populated by auth middleware
    res.json({ expenses: user.expenses });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST new expense
exports.addExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;

  if (!title || !amount) {
    return res.status(400).json({ error: 'Title and amount are required' });
  }

  try {
    const user = await User.findById(req.user.id);

    user.expenses.push({ title, amount, category, date });
    await user.save();

    res.status(201).json({ message: 'Expense added successfully', expenses: user.expenses });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add expense' });
  }
};