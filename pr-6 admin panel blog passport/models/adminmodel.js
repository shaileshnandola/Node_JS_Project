const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const imageupload = ('./uploads')

const addAdminschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    qualification: {
        type: Array,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: true,
        required: true
    },
    create_date: {
        type: String,
        required: true
    },
    update_date: {
        type: String,
        required: true
    },
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', imageupload));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now())
    }
});

addAdminschema.statics.uploadimage = multer({ storage: storage }).single('profile');

const AddAdmin = mongoose.model('AddAdmin', addAdminschema);
module.exports = AddAdmin;
