
const AddCategory = require('../models/categorymodel');
const SubCategory = require('../models/subcategorymodel');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

module.exports.addSubCategory = async (req, res) => {
    try {
        const categories = await AddCategory.find();
        res.render('subcategory/addSubCategory', { categories });
    } catch (err) {
        console.log(err);
        return res.redirect('/subcategory/addSubCategory')
    }
};

module.exports.viewSubCategorypage = async (req, res) => {
    try {
        const subcategories = await SubCategory.find().populate('category');
        res.render('subcategory/viewSubCategorypage', { subcategories });
    } catch (err) {
        console.log(err);
        return false
    }
};


module.exports.addSubCategorypage = async (req, res) => {
    try {
        let subcategory = await SubCategory.create(req.body);
        return res.redirect('/subcategory/addSubCategory')

    } catch (err) {
        console.log(err);
        return res.redirect('/subcategory/addSubCategory')
    }
};
module.exports.deleteSubCategory = async (req, res) => {
    try {
        console.log(req.params.subcategoryId);

        let subcategoryRecord = await SubCategory.findById(req.params.subcategoryId);
        if (subcategoryRecord) {
            // try {
            //     const imagePath = path.join(__dirname, '..', 'uploads/categoryimages', subcategoryRecord.profile);
            //     fs.unlinkSync(imagePath);
            //     fs.existsSync(imagePath)

            // }
            // catch (err) {
            //     console.log('image not found');
            // }
            let deleteSubCategory = await SubCategory.findByIdAndDelete(req.params.subcategoryId);
            if (deleteSubCategory) {
                console.log('Record delete');
                return res.redirect("/subcategory/viewSubCategory");
            }
            else {
                console.log('something wrong');
                return res.redirect("/subcategory/viewSubCategory");
            }
        }
        else {
            console.log('Record not found');
            return res.redirect("/subcategory/viewSubCategory");

        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("/subcategory/viewSubCategory");
    }
}
module.exports.editSubCategory = async (req, res) => {
    try {
        let subcategorydata = await SubCategory.findById(req.params.subcategoryId).populate('category');
        let category = req.cookies.categoryname;
        if (subcategorydata) {
            return res.render('subcategory/updateSubCategory', {
                subcategorydata, category
            });
        }
        else {
            console.log("something wrong");
            return res.redirect('/subcategory/viewSubCategory');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('/subcategory/viewSubCategory');
    }
}
module.exports.EditSubCategorydata = async (req, res) => {
    try {
        const subcategoryId = req.params.subcategoryId;

        const subcategoryExist = await SubCategory.findById(subcategoryId);
        if (!subcategoryExist) {
            console.log(' SubCategory not found');
            return res.redirect("/subcategory/viewSubCategory");
        }

        const updatedData = {
            category: req.body.category,
            subcategory: req.body.subcategory,
        };

        const updatedSubCategory = await SubCategory.findByIdAndUpdate(subcategoryId, updatedData);

        if (updatedSubCategory) {
            console.log(" SubCategory updated successfully");
        } else {
            console.log(' SubCategory update failed');
        }

        return res.redirect("/subcategory/viewSubCategory");

    } catch (err) {
        console.error(err);
        return res.redirect("/subcategory/viewSubCategory");
    }
};
module.exports.singleobject = async (req, res) => {
    try {
        console.log(req.params.categoryId);
        let categorydata = await AddCategory.findById(req.params.categoryId);
        console.log(categorydata);

        return res.status(200).json({ status: "success", data: categorydata });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: "error", message: "Something went wrong" });
    }
};







