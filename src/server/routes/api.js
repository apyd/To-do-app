const express = require('express');
const api = express.Router();
const Task = require('../models/task');
const { validateTask } = require('../validation');
const verifyToken = require('../middlewares/verifyToken');

api.get('/tasks', verifyToken, async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).send(tasks);
    } catch (err) {
        res.status(400).send(err.message).json();
    }
});

api.get('/tasks/:id', verifyToken, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        task ? res.status(200).send(task) : res.status(404).send('Task not found');
        
    } catch (err) {
        console.log('Error test command');
        res.status(400).send(err.message).json();
    }
});


api.post('/tasks', verifyToken, async (req, res) => {
    const {error} = validateTask(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    console.log(req.headers);
    const task = new Task ({
        title: req.body.title,
        done: req.body.done,
        
    });
    try {
    await task.save();
    res.status(200).send(task).json();
    }
    catch(err) {
        res.status(400).send(err.message).json();
    }
});

api.put('/tasks/:id', verifyToken, async (req, res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate({_id: req.params.id}, {$set:{done: req.body.done}});
        await updatedTask.save();
        res.status(200).send(updatedTask).json();
    } catch (err) {
        res.status(400).send(err.message).json();
    }
});

api.delete('/tasks/:id', verifyToken, async (req, res) => {

    try {
        await Task.findByIdAndRemove({_id: req.params.id});
        res.status(200).send('Task removed successfully');
    }
    catch (err) {
        res.status(400).send(err.message).json();
    }
});

module.exports = api;