const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Income = require('../models/Income');

const router = express.Router();

router.post(
  '/',
  [auth, [check('amount', 'Amount is required').not().isEmpty(), check('source', 'Source is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, source, description, date } = req.body;

    try {
      const newIncome = new Income({
        userId: req.user.id,
        amount,
        source,
        description,
        date
      });

      const income = await newIncome.save();

      res.json(income);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/', auth, async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(incomes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    let income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ msg: 'Income not found' });
    }

    if (income.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Income.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Income removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
