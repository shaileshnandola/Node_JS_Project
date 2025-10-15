const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'] 
    },
    profile: {
        type: String,
    }
}, { versionKey: false }); 

module.exports = mongoose.model('User', userSchema);
