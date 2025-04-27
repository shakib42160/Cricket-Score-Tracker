const router = require('express').Router();
const { Match } = require('../../models');

// Create a new match
router.post('/', async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(201).json(match);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create match', error: err.message });
  }
});

module.exports = router;
