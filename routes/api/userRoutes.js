// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { User } = require('../../models');  // <<< CORRECTED
const bcrypt = require('bcryptjs');

// Register Route
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.loggedIn = true;

    res.redirect('/login'); // <<< Redirect after successful register
  } catch (err) {
    console.error(err);
    res.status(400).render('register', { error: 'Registration failed. Try again.' });
  }
});

// Login Route
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).render('login', { error: 'Invalid email or password.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).render('login', { error: 'Invalid email or password.' });
    }

    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.loggedIn = true;

    res.redirect('/dashboard'); // <<< Redirect after login success
  } catch (err) {
    console.error(err);
    res.status(400).render('login', { error: 'Login failed. Try again.' });
  }
});

// Logout Route
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
    }
    res.redirect('/login');
  });
});

module.exports = router;
