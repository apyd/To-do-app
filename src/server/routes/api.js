const express = require('express');
const api = express.Router();
const Task = require('../models/task');

api.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).send(tasks);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

api.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).send(task);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

api.post('/tasks', async (req, res) => {
    const task = new Task ({
        title: req.params.title,
        priority: req.params.priority,
        done: req.params.done
    });
    try {
    await task.save();
    res.status(200).send('Task added succesfully');
    }
    catch(err) {
        res.status(400).send(err.message)
    }
});

api.put('/tasks/:id', async (req, res) => {
    try {
        const taskToUpdate = await Task.findById(req.params.id);
        taskToUpdate.set = {
            title: req.params.title,
            priority: req.params.priority,
            done: req.params.done
        }
        await taskToUpdate.save();
        res.status(200).send('Task updated succesfully');
    } catch (err) {
        res.status(400).send(err.message)
    }
});

api.delete('/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndRemove(req.params.id);
        res.status(200).send('Task removed succesfully');
    }
    catch (err) {
        res.status(400).send(err.message)
    }
});

module.exports = api;