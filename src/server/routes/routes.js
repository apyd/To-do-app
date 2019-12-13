const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, async (req, res) => {
    try {
        res.render('index');
    } catch (err) {
        res.status(401).send(err.message);
    }
});

router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch(err) {
        res.status(401).send(err.message);
    }
});

router.get('/register', async (req, res) => {
    try {
        res.render('register');
    } catch(err) {
        res.status(401).send(err.message);
    }
});

module.exports = router;