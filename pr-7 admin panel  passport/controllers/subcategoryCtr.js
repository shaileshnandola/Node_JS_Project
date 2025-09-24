
const AddCategory = require('../models/categorymodel');

module.exports.addSubCategory = async (req, res) => {
    try {
        const category = await AddCategory.find();
        res.render('subcategory/addSubCategory', { category });
    } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).send("Internal Server Error");
    }
};





