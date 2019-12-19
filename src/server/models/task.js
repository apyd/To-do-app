const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

let taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    done: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
});

module.exports = mongoose.model('Task', taskSchema);
