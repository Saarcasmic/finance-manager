const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Expense = require('../models/Expense');

const router = express.Router();

router.post(
  '/',
  [auth, [check('amount', 'Amount is required').not().isEmpty(), check('category', 'Category is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, category, description, date } = req.body;

    try {
      const newExpense = new Expense({
        userId: req.user.id,
        amount,
        category,
        description,
        date
      });

      const expense = await newExpense.save();

      res.json(expense);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
