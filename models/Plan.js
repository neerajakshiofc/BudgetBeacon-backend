// models/Plan.js
const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  goal: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, required: true },
  deadline: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Plan', goalSchema);