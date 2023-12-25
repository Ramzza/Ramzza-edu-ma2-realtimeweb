const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    default: '',
  },

  lastname: {
    type: String,
    default: '',
  },

  cnp: {
    type: String,
    unique: true,
  },

  email: {
    type: String,
    unique: true,
  },

  username: {
    type: String,
    unique: true,
  },

  password: {
    type: String,
  },

  date_started: {
    type: Date,
    default: null,
  },

  date_end: {
    type: Date,
    default: null,
  },

  position: {
    type: String,
    default: '',
  },

  salary: {
    type: Number,
    default: 0,
  },

  pc: {
    type: Map,
  },

  car: {
    type: Map,
  },

  comments: {
    type: Array,
  },
});

module.exports = mongoose.model('User', UserSchema);
