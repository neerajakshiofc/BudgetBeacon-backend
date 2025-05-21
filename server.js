require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expenseRoutes');
const planRoutes = require('./routes/planRoutes');
const chatRoutes = require('./routes/chatRoutes');
const stocksRoutes = require('./routes/stocks'); // ✅ Fixed typo
const newsRoutes = require('./routes/news'); // ✅ Extracted

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
app.use('/api/expenses', expenseRoutes); // 👈 Better route separation
app.use('/api/plan', planRoutes);
app.use('/api/chat', chatRoutes);
app.use(stocksRoutes);
app.use('/', newsRoutes);

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
});