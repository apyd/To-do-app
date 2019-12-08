const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', async (req, res) => {
    try {
        res.render('index');
    } catch (ex) {
        console.log(ex.message);
    }
});

module.exports = router;