const router = require('express').Router();

const userRoutes = require('./userRoutes');
const teamRoutes = require('./teamRoutes');
const playerRoutes = require('./playerRoutes');
const matchRoutes = require('./matchRoutes');
const scoreRoutes = require('./scoreRoutes');
const tournamentRoutes = require('./tournamentRoutes');

router.use('/users', userRoutes);
router.use('/teams', teamRoutes);
router.use('/players', playerRoutes);
router.use('/matches', matchRoutes);
router.use('/scores', scoreRoutes);
router.use('/tournaments', tournamentRoutes);

module.exports = router;
