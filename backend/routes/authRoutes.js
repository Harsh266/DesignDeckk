const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Helper to create JWT
const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = createToken(newUser);
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'None',
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(201).json({ user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = createToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'None',
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get logged-in user
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email profileImage");
    if (!user) return res.status(404).json({ message: "User not found." });

    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Logout Route
router.get('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'None',
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const token = createToken(req.user);
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'None',
      secure: process.env.NODE_ENV === 'production',
    });

    res.redirect(process.env.CLIENT_URL + "/dashboard");
  }
);

module.exports = router;
