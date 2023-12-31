const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ username }).maxTime(30000);
        if (existingUser) {
            return res.status(400).json({ message: 'This user already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        // Correção: Passando a chave secreta para jwt.sign
        const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY);

        res.status(201).json({ token });
    } catch (error) {
        console.error(error); // Adicionado para logar o erro no console
        res.status(500).json({ message: 'Error signing up new user' });
    }
});

module.exports = router;
