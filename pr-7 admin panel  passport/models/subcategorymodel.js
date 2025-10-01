const mongoose = require('mongoose');

const subcategoryschema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AddCategory'

    },
    subcategory: {
        type: String,
        required: true
    }
});

const subcategorymodel = mongoose.model('subcategory', subcategoryschema);
module.exports = subcategorymodel;
