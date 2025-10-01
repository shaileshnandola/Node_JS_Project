const AddCategory = require('../models/categorymodel');
const SubCategory = require('../models/subcategorymodel');
const Extracategory = require('../models/extracategorymodel')

module.exports.addExtraCategory = async (req, res) => {
    try {
        const categories = await AddCategory.find();

        res.render('extracategory/addExtraCategory', {
            categories,
        });
    } catch (err) {
        console.error(err);
        res.redirect('/extracategory/addExtraCategory');
    }
};

module.exports.addExtraCategorypage = async (req, res) => {
    try {
        let extracategory = await Extracategory.create(req.body);
        return res.redirect('/extracategory/addExtraCategory')

    } catch (err) {
        console.log(err);
        return res.redirect('/extracategory/addExtraCategory')
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

module.exports.viewExtraCategorypage = async (req, res) => {
    try {
        const subcategories = await Extracategory.find().populate('category').populate('subcategory');
        res.render('extracategory/viewExtraCategorypage', { subcategories });
    } catch (err) {
        console.log(err);
        return false
    }
};
module.exports.deleteExtraCategory = async (req, res) => {
    try {
        console.log(req.params.extracategoryId);

        let extracategoryRecord = await Extracategory.findById(req.params.extracategoryId);
        if (extracategoryRecord) {
            try {
                const imagePath = path.join(__dirname, '..', 'uploads/categoryimages', extracategoryRecord.profile);
                fs.unlinkSync(imagePath);
                fs.existsSync(imagePath)

            }
            catch (err) {
                console.log('image not found');
            }
            let deleteExtraCategory = await Extracategory.findByIdAndDelete(req.params.extracategoryId);
            if (deleteExtraCategory) {
                console.log('Record delete');
                return res.redirect("/extracategory/viewExtraCategory");
            }
            else {
                console.log('something wrong');
                return res.redirect("/extracategory/viewExtraCategory");
            }
        }
        else {
            console.log('Record not found');
            return res.redirect("/extracategory/viewExtraCategory");
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("/extracategory/viewExtraCategory");
    }
}
module.exports.editExtraCategory = async (req, res) => {
    try {
        let extracategorydata = await Extracategory.findById(req.params.extracategoryId).populate('category').populate('subcategory');
        let category = req.cookies.categoryname;
        if (extracategorydata) {
            return res.render('extracategory/updateExtraCategory', {
                extracategorydata, category
            });
        }
        else {
            console.log("something wrong");
            return res.redirect('/extracategory/viewExtraCategory');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('/extracategory/viewExtraCategory');
    }
}
module.exports.EditExtraCategorydata = async (req, res) => {
    try {
        const extracategoryId = req.params.extracategoryId;

        const extracategoryExist = await Extracategory.findById(extracategoryId);
        if (!extracategoryExist) {
            console.log(' ExtraCategory not found');
            return res.redirect("/extracategory/viewExtraCategory");
        }

        const updatedData = {
            extracategory:req.body.extracategory
        };

        const updatedExtraCategory = await Extracategory.findByIdAndUpdate(extracategoryId, updatedData); 

        if (updatedExtraCategory) {
            console.log(" ExtraCategory updated successfully");
        } else {
            console.log(' ExtraCategory update failed');
        }

        return res.redirect("/extracategory/viewExtraCategory");

    } catch (err) {
        console.error(err);
        return res.redirect("/extracategory/viewExtraCategory");
    }
};
