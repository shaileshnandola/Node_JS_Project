const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const imageupload = ('./uploads/categoryimages')

const categoryschema = mongoose.Schema({
    categoryname: {
        type: String,
        required: true
    },
    profile: {
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

categoryschema.statics.uploadimage = multer({ storage: storage }).single('profile');

const AddCategory = mongoose.model('AddCategory', categoryschema);
module.exports = AddCategory;
