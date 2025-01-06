const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users); // Ensure this returns the correct data
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;