const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String, // only for email/password users
  googleId: String, // only for Google users
  profileImage: String,
});

module.exports = mongoose.model('User', userSchema);
