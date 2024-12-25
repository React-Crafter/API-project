const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
        minLength: [5, 'min Length is 5 charecter'],
        maxLength: [20, 'max Length is 20 charecter'],
        uniqe: [true, 'The title already exists.']
    },
    description: {
        type: String,
        required: [true, 'descripetion is required'],
        minLength: [20, 'min Length is 20 charecter'],
        maxLength: [200, 'max Length is 200 charecter'],
    },
    Date: {
        type: Date,
        default: Date.now
    }
});

module.exports = todoSchema;