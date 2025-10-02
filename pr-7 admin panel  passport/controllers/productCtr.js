const AddCategory = require('../models/categorymodel');
const SubCategory = require('../models/subcategorymodel');
const Extracategory = require('../models/extracategorymodel')
const productmodel = require('../models/prductmodel')
const path = require('path');
const fs = require('fs');

module.exports.addProduct = async (req, res) => {
    try {
        const categories = await AddCategory.find();
        const subcategories = await SubCategory.find()
        const extracategories = await Extracategory.find()
        return res.render("product/addProduct", {
            categories, subcategories, extracategories
        });
    } catch (err) {
        console.log("Error rendering category form:", err);
        return res.redirect("/admin/deshboard");
    }
};
module.exports.Subcategories = async (req, res) => {
    try {
        const categoryId = req.query.categoryId;
        if (!categoryId) {
            return res.json({ message: "Category ID is required" });
        }

        const subcategories = await SubCategory.find({ category: categoryId });

        return res.json({ subcategory: subcategories });
    } catch (err) {
        console.log("Error fetching subcategories:", err);
        return res.json({ message: "Server error" });
    }
};
module.exports.extracategories = async (req, res) => {
    try {
        const categoryId = req.query.categoryId;
        if (!categoryId) {
            return res.json({ message: "Category ID is required" });
        }

        const extracategories = await Extracategory.find({ category: categoryId });

        return res.json({ extracategorycategory: extracategories });
    } catch (err) {
        console.log("Error fetching subcategories:", err);
        return res.json({ message: "Server error" });
    }
};
module.exports.viewProduct = async (req, res) => {
    try {
        const admin = req.cookies.admin;
        const search = req.query.search || "";

        const productList = await productmodel.find({
            $or: [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ]
        })
            .populate("category")
            .populate("subcategory")
            .populate("extracategory");

        return res.render("product/viewProduct", { productList, admin });
    } catch (err) {
        console.log("❌ Error loading products:", err);
        return res.redirect("/");
    }
};

module.exports.addProductInsert = async (req, res) => {
    try {
        console.log("Uploaded file:", req.file);

        if (req.file) {
            req.body.profile = "/uploads/productimages/" + req.file.filename;
        } else {
            req.body.profile = "";
            console.log("No image uploaded");
        }

        await productmodel.create(req.body);
        console.log("✅ product add Successfully");

        res.redirect("/product/addProduct");
    } catch (err) {
        console.log("Error inserting category:", err);
        res.status(500).send("Internal Server Error");
    }
};
module.exports.deleteproduct = async (req, res) => {
    try {
        const product = await productmodel.findById(req.params.productId);
        if (product && product.profile) {
            const imagePath = path.join(__dirname, '..', 'uploads/productimages', product.profile);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        await productmodel.findByIdAndDelete(req.params.productId);
        return res.redirect("/product/viewProduct");
    } catch (err) {
        console.log("Error deleting product:", err);
        return res.redirect("/product/viewProduct");
    }
};

module.exports.viewsingleproduct = async (req, res) => {
    try {
        const single = await productmodel.findById(req.params.productId)
            .populate('category')
            .populate('subcategory')
            .populate('extracategory');

        return res.render('product/viewsingleproduct', { single });
    } catch (err) {
        console.log(err);
        return res.redirect('/admin');
    }
};
module.exports.editproduct = async (req, res) => {
    try {
        const productdata = await productmodel.findById(req.params.productId)
            .populate('category')
            .populate('subcategory')
            .populate('extracategory');

        const categories = await AddCategory.find();
        const subcategories = await SubCategory.find();
        const extracategories = await Extracategory.find();

        if (!productdata) {
            console.log("❌ Product not found");
            return res.redirect('/product/viewProduct');
        }

        return res.render('product/updateproduct', {
            productdata,
            categories,
            subcategories,
            extracategories
        });
    } catch (err) {
        console.log(err);
        return res.redirect('/product/viewProduct');
    }
};

module.exports.updateProduct = async (req, res) => {
    try {
        const productId = req.body.id; 

        let productExist = await productmodel.findById(productId);
        if (!productExist) {
            console.log('❌ Product not found');
            return res.redirect("/product/viewProduct");
        }

        let profilePath = productExist.profile;
        if (req.file) {
            profilePath = "/uploads/productimages/" + req.file.filename;

            if (productExist.profile) {
                const oldImagePath = path.join(__dirname, '..', productExist.profile);
                if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
            }
        }

        const updatedData = {
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
            subcategory: req.body.subcategory,
            extracategory: req.body.extracategory,
            Quantity: req.body.Quantity,
            description: req.body.description,
            profile: profilePath
        };

        await productmodel.findByIdAndUpdate(productId, updatedData);

        console.log("✅ Product updated successfully");
        return res.redirect("/product/viewProduct");

    } catch (err) {
        console.error("❌ Error updating product:", err);
        return res.redirect("/product/viewProduct");
    }
};