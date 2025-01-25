const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/userModel')

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register',
    body('email').trim().isEmail().notEmpty().isLength({ min: 13 }).withMessage('Email is required'),
    body('password').trim().isLength({ min: 5 }).notEmpty().withMessage('Password is required'),
    body('username').trim().isLength({ min: 3 }).notEmpty().withMessage('Username is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array(), message: "invalid data" });
        }
        const { username, email, password } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({ username, email, password: hashPassword });

        res.json(user)
        res.redirect("/index")

    }
);

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login',
    body('email').trim().isEmail().notEmpty().isLength({ min: 13 }).withMessage('Email is required'),
    body('password').trim().isLength({ min: 8 }).notEmpty().withMessage('Password is required'),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array(),
                message: "Invalid data",
            });
        }

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Email or Password is Incorrect"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Email or Password is Incorrect"
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.redirect('/home')
    }
);


module.exports = router;