const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title: {
    type: String,
  },

  body: {
    type: String,
  },

  created_by: {
    type: String,
  },

  created_at: {
    type: Date,
  },
});

module.exports = mongoose.model('Post', PostSchema);
