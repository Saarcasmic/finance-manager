const express = require('express');
const { spawn } = require('child_process');
const auth = require('../middleware/auth');
const path = require('path'); // Import path module to handle file paths
const Expense = require('../models/Expense');

const router = express.Router();

router.get('/spending-patterns', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    const expenseData = expenses.map(expense => ({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date
    }));

    // Resolve the absolute path to analysis.py using path.resolve
    const scriptPath = path.resolve(__dirname, '../ml/analysis.py');
    const pythonProcess = spawn('python', [scriptPath]);

    // Write data to the Python process
    pythonProcess.stdin.write(JSON.stringify(expenseData));
    pythonProcess.stdin.end();

    // Collect data from the Python process
    let result = '';
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({ message: 'Error executing Python script' });
      }
      res.status(200).json(JSON.parse(result));
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
