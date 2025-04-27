const router = require('express').Router();
const { Tournament } = require('../../models');

// Create a new tournament
router.post('/', async (req, res) => {
  try {
    const tournament = await Tournament.create(req.body);
    res.status(201).json(tournament);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create tournament', error: err.message });
  }
});

module.exports = router;
