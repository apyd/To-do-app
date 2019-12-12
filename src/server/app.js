const helmet = require('helmet');
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const api = require('./routes/api');
const auth = require('./routes/auth')
const path = require('path');
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
app.use('/auth', auth);

mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log('Connected sucessfully to MongoDB...'))
    .catch(err => console.log(err));

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));

module.exports = app;