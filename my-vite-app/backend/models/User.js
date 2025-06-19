const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },
  id: {
    type: String,
    unique: true,
  },
  department: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  institute: {
    type: String,
  },
  profileImage: {
    type: String, // Store image URL (e.g., "https://example.com/profile.jpg")
  },
});

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
