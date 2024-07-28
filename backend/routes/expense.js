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

// Delete Expense Route
router.delete('/:id', auth, async (req, res) => {
  try {
    
    let expense = await Expense.findById(req.params.id);

    if (!expense) {
      console.log('Expense not found');
      return res.status(404).json({ msg: 'Expense not found' });
    }

    if (expense.userId.toString() !== req.user.id) {
      console.log('User not authorized');
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Expense.findByIdAndDelete(req.params.id); // Use findByIdAndDelete instead of findByIdAndRemove

    res.json({ msg: 'Expense removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
