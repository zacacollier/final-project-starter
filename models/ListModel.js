const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  items: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    },
  ],
});

module.exports = mongoose.model('List', listSchema);
