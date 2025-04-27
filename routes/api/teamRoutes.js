const express = require('express');
const router = express.Router();
const { Team } = require('../../models');

// Create Team
router.post('/', async (req, res) => {
  try {
    const { name, short_name, logo_url } = req.body;
    const team = await Team.create({ name, short_name, logo_url });
    res.redirect('/teams');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create team' });
  }
});

// Delete Team
router.delete('/:id', async (req, res) => {
  try {
    await Team.destroy({ where: { id: req.params.id } });
    res.redirect('/teams');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete team' });
  }
});

module.exports = router;
