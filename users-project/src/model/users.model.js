const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  contact: {
    type: String,
    match: /^[0-9]{10}$/, 
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'employee'],
  },
  profile: {
    type: String, 
  },
  isDelete:{
    type:Boolean,
    default:false
  }

}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('User', userSchema);
