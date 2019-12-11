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
        res.render('login');
    } catch(err) {
        console.log(err.message);
    }
});

router.get('/register', async (req, res) => {
    try {
        res.render('register');
    } catch(err) {
        console.log(err.message);
    }
});

module.exports = router;