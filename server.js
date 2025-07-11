import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import expenseRoutes from './routes/expenseRoutes.js';
import planRoutes from './routes/planRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import stocksRoutes from './routes/stocks.js';
import financialNewsRoute from './routes/financialNews.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Temporary in-memory user store (for testing/demo)
const users = [];

// Register route
app.post("/api/register", (req, res) => {
  const { email, password } = req.body;
  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  users.push({ email, password });
  res.status(201).json({ message: "User registered successfully" });
});

// Login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (user || (email === 'test@example.com' && password === '123456')) {
    return res.json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/plan', planRoutes);
app.use('/api/chat', chatRoutes);
app.use(stocksRoutes);
app.use(financialNewsRoute);

// JSON error handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error("Bad JSON received:", err.message);
    return res.status(400).json({ message: "Invalid JSON" });
  }
  next();
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
}).on('error', err => {
  console.error("❌ Server failed to start:", err.message);
});
