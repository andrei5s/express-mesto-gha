const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: '',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: '',
  },
  avatar: {
    type: String,
    minlength: 2,
    required: true,
    default: '',
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);
