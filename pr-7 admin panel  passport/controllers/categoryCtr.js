const path = require('path');
const fs = require('fs');
const moment = require('moment');
const AddCategory = require('../models/categorymodel');
const SubCategory = require('../models/subcategorymodel');
const ExtraCategory=require('../models/extracategorymodel')


module.exports.addCategory = async (req, res) => {
    try {
        return res.render("category/addCategory");
    } catch (err) {
        console.log("Error rendering category form:", err);
        return res.redirect("/");
    }
};

module.exports.addnewcategory = async (req, res) => {
    try {
        console.log("Uploaded file:", req.file);

        if (req.file) {
            req.body.profile = "/uploads/categoryimages/" + req.file.filename;
        } else {
            req.body.profile = "";
            console.log("No image uploaded");
        }

        await AddCategory.create(req.body);
        console.log("✅ Category add Successfully");

        res.redirect("/category/addcategory");
    } catch (err) {
        console.log("Error inserting category:", err);
        res.status(500).send("Internal Server Error");
    }
};
module.exports.viewCategory = async (req, res) => {
    try {
        const category = await AddCategory.find();
        return res.render("category/viewCategory", { category })
    } catch (err) {
        console.log(err);
        return false;
    }
}
module.exports.deleteCategory = async (req, res) => {
    try {
        console.log(req.params.categoryId);

        let categoryRecord = await AddCategory.findById(req.params.categoryId);
        if (!categoryRecord) {
            return res.redirect("/category/viewCategory")
        }
        else {
            let imagePath = categoryRecord.profile;
            if (imagePath != "") {
                imagePath = path.join(__dirname, "..", imagePath)
                await fs.unlinkSync(imagePath);
            }
            await AddCategory.findByIdAndDelete(req.params.categoryId);
            await SubCategory.deleteMany({
                category: req.params.categoryId
            });
             await ExtraCategory.deleteMany({
                category: req.params.categoryId
            });
            return res.redirect("/category/viewCategory")
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("/category/viewCategory");
    }
}
module.exports.editCategory = async (req, res) => {
    try {
        let categorydata = await AddCategory.findById(req.params.categoryId);
        let category = req.cookies.categoryname;
        if (categorydata) {
            return res.render('category/updateCategory', {
                categorydata, category
            });
        }
        else {
            console.log("something wrong");
            return res.redirect('/category/viewCategory');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('/category/viewCategory');
    }
}
module.exports.EditCategorydata = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const categoryExist = await AddCategory.findById(categoryId);

        if (!categoryExist) {
            console.log(' Category not found');
            return res.redirect("/category/viewCategory");
        }

        if (req.file) {
            const oldImagePath = path.join(__dirname, '..', categoryExist.profile);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            } else {
                console.log('Old image not found to delete');
            }
        }

        const updatedData = {
            categoryname: req.body.categoryname,
            profile: req.file
                ? "/uploads/categoryimages/" + req.file.filename
                : categoryExist.profile,
            update_date: moment().format('DD-MM-YYYY, h:mm:ss a')
        };

        const updatedCategory = await AddCategory.findByIdAndUpdate(categoryId, updatedData);

        if (updatedCategory) {
            console.log("Category updated successfully");
        } else {
            console.log(' Category update failed');
        }

        return res.redirect("/category/viewCategory");
    } catch (err) {
        console.error(" Error updating category:", err);
        return res.redirect("/category/viewCategory");
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


