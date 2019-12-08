const helmet = require('helmet');
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Task = require('./models/task');
const routes = require('./routes/routes');
const api = require('./routes/api');
const path = require('path');
const Joi = require('@hapi/joi');
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/templates'));
app.use(helmet());
app.use('/', routes);
app.use('/api', api);

mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log('Connected sucessfully to MongoDB...'))
    .catch(err => console.log(err));

function validateTask(task) {
    const schema = {
        title: Joi.string().min(1).max(55).required(),
        description: Joi.string(),
        priority: Joi.string().valid(['low', 'normal', 'high']).lowercase().trim().required(),
        done: Joi.boolean()
    }
    return Joi.validate(task, schema);
}

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));

module.exports = app;