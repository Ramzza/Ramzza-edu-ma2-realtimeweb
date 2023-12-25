const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
  timestamp: {
    type: Date,
  },

  conversation: {
    type: String,
  },

  user_from: {
    type: String,
  },

  user_to: {
    type: String,
  },

  message: {
    type: String,
  },
});

module.exports = mongoose.model('Chat', ChatSchema);
