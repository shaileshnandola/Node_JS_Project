const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// Upload folder path
const UPLOAD_PATH = path.join(__dirname, '..', 'uploads/productimages');

// Product Schema
const productschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AddCategory',
        required: true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory',
        required: true
    },
    extracategory: {   
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Extracategory',
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    }
});

// Multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_PATH);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Upload middleware
productschema.statics.uploadimage = multer({ storage: storage }).single('profile');

const Product = mongoose.model('Product', productschema);

module.exports = Product;
