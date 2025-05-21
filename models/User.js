const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  category: String,
  date: Date,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  expenses: [expenseSchema], // Embed expense schema properly
  financialPlans: Array,
  stockWatchlist: Array,
});

module.exports = mongoose.model('User', userSchema);