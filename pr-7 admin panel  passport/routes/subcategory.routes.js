const express = require('express');
const routes = express.Router();
const categoryctr = require("../controllers/subcategoryCtr");
const AddCategory = require('../models/categorymodel');

routes.get("/addSubCategory", categoryctr.addSubCategory);
routes.post("/add-subcategory", categoryctr.addSubCategorypage);
routes.get("/viewSubCategory", categoryctr.viewSubCategorypage);
routes.get("/deleteSubCategory/:subcategoryId",categoryctr.deleteSubCategory)
routes.get("/editSubCategory/:subcategoryId",categoryctr.editSubCategory)
routes.post('/EditSubCategorydata/:subcategoryId', AddCategory.uploadimage, categoryctr.EditSubCategorydata);
routes.post('/singleobject/:categoryId',categoryctr.singleobject);



module.exports = routes;
