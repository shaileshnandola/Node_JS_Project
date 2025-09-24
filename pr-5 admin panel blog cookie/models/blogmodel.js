
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const UPLOAD_PATH = path.join('/uploads');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    image: { 
        type: String, 
        required: false,
    },
    content: {
        type: String,
        required: true,
    },
    create_date: {
        type: String,
        required: true,
    },
    update_date: {
        type: String,
        required: true,
    },
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

blogSchema.statics.uploadimage = multer({ storage: storage }).single('image');

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
