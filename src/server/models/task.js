const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 55
    },
    priority: {
        type: String,
        enum: ['low', 'normal', 'high'],
        required: true,
        lowercase: true,
        trim: true
    },
    done: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Task', taskSchema);
