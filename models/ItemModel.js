const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  realname: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
  },

  githubID: {
    type: Number,
    required: true,
  },

  repos: {
    type: Number,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
    required: true,
  },
});

module.exports = mongoose.model('Item', itemSchema);
