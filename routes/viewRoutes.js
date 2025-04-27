const express = require('express');
const router = express.Router();
const { User, Team, Player, Match, Score, Tournament } = require('../models');
const withAuth = require('../utils/auth'); // ✅ Correct way to import

// Home page
router.get('/', (req, res) => {
    res.render('home', { layout: false });
});


// Login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// Register page
router.get('/register', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('register');
});

// Dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  res.render('dashboard', { logged_in: true });
});

// Teams page
router.get('/teams', withAuth, async (req, res) => {
  const teams = await Team.findAll();
  res.render('teams', { teams: teams.map(team => team.get({ plain: true })), logged_in: true });
});

// Players page
router.get('/players', withAuth, async (req, res) => {
  const players = await Player.findAll({ include: [Team] });
  res.render('players', { players: players.map(player => player.get({ plain: true })), logged_in: true });
});

// Matches page
router.get('/matches', withAuth, async (req, res) => {
  const matches = await Match.findAll({ include: [Team, Tournament] });
  res.render('matches', { matches: matches.map(match => match.get({ plain: true })), logged_in: true });
});

// Scores page
router.get('/scores', withAuth, async (req, res) => {
  const scores = await Score.findAll({ include: [Match, Player] });
  res.render('scores', { scores: scores.map(score => score.get({ plain: true })), logged_in: true });
});

module.exports = router;
