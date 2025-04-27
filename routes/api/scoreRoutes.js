const router = require('express').Router();
const { Score } = require('../../models');

// Create a new score
router.post('/', async (req, res) => {
  try {
    const score = await Score.create(req.body);
    res.status(201).json(score);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create score', error: err.message });
  }
});

module.exports = router;
