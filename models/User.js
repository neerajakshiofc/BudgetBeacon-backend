import mongoose from 'mongoose';

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

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
