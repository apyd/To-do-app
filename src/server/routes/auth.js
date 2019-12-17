const express = require('express');
const auth = express.Router();
const User = require('../models/user');
const { validateLogin, validateRegister } = require('../validation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const routes = require('../routes/routes')


auth.post('/register', async (req, res) => {
    console.log(req.body);
    const {error} = await validateRegister(req.body);
    if (error) return res.redirect('/register').status(400).send(error.details[0].message);
    const emailExists = await User.findOne({
        email: req.body.email
    });
    if (emailExists) return res.redirect('/register').status(400).send('Email already used')
    const userExists = await User.findOne({
        username: req.body.username
    });
    if (userExists) return res.redirect('/register').status(400).send('Username already used')
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        await user.save();
        res.redirect('/register').send({
            user: user._id
        });
    } catch (err) {
        res.send(err.message).json();
    }
});

auth.post('/login', async (req, res) => {
    const { error } = await validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const validatedUser = await User.findOne({
        username: req.body.username
    });
    if(!validatedUser) return res.redirect('/login').status(401).send('Invalid username or password');
    const validatedPassword = await bcrypt.compare(req.body.password, validatedUser.password);
    if ((!validatedUser) || (!validatedPassword)) return res.redirect('/login').status(400).send('Incorrect username or password');
    const token = jwt.sign({ _id: validatedUser._id }, process.env.SECRET_KEY);
    try {
        res.set('id', validatedUser._id);
        res.set('Access-Control-Expose-Headers', 'id');
        res.set('x-auth-token', token);
        res.send(token);
    } catch (err) {
        res.send(err.message).json();
        res.redirect('/login');
    }
});

module.exports = auth;