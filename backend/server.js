const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authMiddleware = require('./middleware/auth'); // Import the auth middleware

const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expense');
const incomeRoutes = require('./routes/income');
const analysisRoutes = require('./routes/analysis');

const app = express();

app.use(express.json());
app.use(cors());

// Apply the auth middleware to secure routes
app.use('/api/expenses', authMiddleware); // Example: Apply to expenses routes
app.use('/api/incomes', authMiddleware); // Apply to incomes routes
app.use('/api/analysis', authMiddleware); // Apply to analysis routes

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/incomes', incomeRoutes);
app.use('/api/analysis', analysisRoutes);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handle the root URL
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const PORT = process.env.PORT || 5000;

const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const dbName = process.env.DB_NAME;
const mongoURI = `mongodb+srv://${username}:${password}@cluster0.hbfujyw.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, {  })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.error(err));
