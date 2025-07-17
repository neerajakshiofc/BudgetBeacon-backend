import dotenv from 'dotenv';
import express from 'express';
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

const allowedOrigins = [
  'http://localhost:3000',
  'https://neeru-s-project-budgetbeacon.firebaseapp.com',
  'https://neeru-s-project-budgetbeacon.web.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.options('*', cors());
app.use(express.json());

// ✅ Connect to MongoDB
connectDB(); // uses the URI from .env

// ✅ In-memory store for demo
const users = [];

app.post("/api/register", (req, res) => {
  const { email, password } = req.body;
  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  users.push({ email, password });
  res.status(201).json({ message: "User registered successfully" });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user || (email === 'test@example.com' && password === '123456')) {
    return res.json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/plan', planRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api', stocksRoutes);
app.use('/api', financialNewsRoute);

app.get('/', (req, res) => {
  res.send('Budget Beacon Backend is running!');
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error("Bad JSON received:", err.message);
    return res.status(400).json({ message: "Invalid JSON" });
  }
  next();
});

app.get('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
