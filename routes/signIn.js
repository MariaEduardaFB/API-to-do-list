const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/signin', async (req, res) => {
    const { email, password} = req.body

    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({ message: 'Invalid credentials'})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({message: 'Invalid credentials'})
        }

        const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY)

        res.status(200).json({token})
    }catch(error){
        res.status(500).json({message:'Error trying to sign in'})
    }
});

module.exports = router;
