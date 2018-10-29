'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
  fullname: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

schema.set('toJSON', {
  virtuals: true,     // include built-in virtual `id`
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
    delete result.password; // prevents password from being returned
  }
});

schema.methods.validatePassword = function (password) {
  return password === this.password;
};

schema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

schema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('User', schema);