const mongoose = require('mongoose');

const extracategoryschema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AddCategory'

    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    },
    extracategory: {
        type: String,
    }
});
const Extracategorymodel = mongoose.model('Extracategory', extracategoryschema);

module.exports = Extracategorymodel;