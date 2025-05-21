// models/Plan.js
import mongoose from 'mongoose';

// ✅ Define the schema
const financialGoalSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  goal: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, required: true },
  deadline: { type: String, required: true },
}, { timestamps: true });

// ✅ Use the correct variable name in the model
const FinancialPlanner = mongoose.model('FinancialGoal', financialGoalSchema);

// ✅ Export the model
export default FinancialPlanner;
