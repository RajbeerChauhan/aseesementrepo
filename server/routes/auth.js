const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const express = require('express');
const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    // Simple input validation
    if (!email || !password || !name) {
        return res.status(400).send('All fields are required');
    }

    try {
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid credentials');
        }

        // Compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).send('Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        res.json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
