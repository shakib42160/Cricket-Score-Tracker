const router = require('express').Router();
const { Player } = require('../../models');

// Create a new player
router.post('/', async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json(player);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create player', error: err.message });
  }
});

module.exports = router;
