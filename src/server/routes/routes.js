const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', async (req, res) => {
    try {
        res.render('index');
    } catch (err) {
        console.log(err.message);
    }
});

router.get('/login', async (req, res) => {
    try {
        res.sender('login');
    } catch(err) {
        console.log(err.message);
    }
});

router.get('/register', async (req, res) => {
    try {
        res.sender('register');
    } catch(err) {
        console.log(err.message);
    }
});

module.exports = router;