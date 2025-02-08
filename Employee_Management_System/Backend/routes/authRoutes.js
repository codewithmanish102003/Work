const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log('User:', user); // Debugging log
    
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/register', async (req, res) => {
  const { email, password, firstname } = req.body;

  try {
    console.log('Registering user:', { email, firstname }); // Log user details

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);

    const newUser = new User({
      email,
      password: hashedPassword,
      firstname,
      role: 'employee', // Set role to employee
      tasks: [],
      taskCounts: { active: 0, newTask: 0, completed: 0, failed: 0 }
    });

    await newUser.save();
    console.log('User created:', newUser);


    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET);
    res.status(201).json({ token, role: newUser.role });
  }  catch (error) {
    console.error('Error during registration:', error); // Log the error
    res.status(500).json({ error: error.message });
  }
});


// Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET||secret, { expiresIn: '1h' });

    // Send email with reset link
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Password Reset',
      text: `Click the link to reset your password: http://localhost:5173/reset-password/${token}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Reset email sent to:', user.email);

    res.status(200).json({ message: 'Reset email sent' });
  } catch (error) {
    console.error('Error during forgot password:', error);
    res.status(500).json({ error: error.message });
  }
});

// Reset Password
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error during reset password:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;