const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Todo = mongoose.model('todos', TodoSchema);
