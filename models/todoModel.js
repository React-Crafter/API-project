const mongoose = require('mongoose');
const todoSchemas = require('../schemas/todoSchemas');

// todo model
const Todos = mongoose.model('todo', todoSchemas);

// all exporrts
module.exports = Todos;