// controllers/planController.js
const Plan = require('../models/Plan'); // Make sure you have this model

// Add new plan
const addPlan = async (req, res) => {
  const { goal, targetAmount, deadline } = req.body;

  try {
    const newPlan = new Plan({
      userId: req.user.id, // Comes from decoded JWT
      goal,
      targetAmount,
      deadline,
    });

    await newPlan.save();
    res.status(201).json({ message: 'Plan added successfully' });
  } catch (err) {
    console.error('Add Plan Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all plans
const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ userId: req.user.id });
    res.status(200).json(plans);
  } catch (err) {
    console.error('Get Plans Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addPlan, getPlans };