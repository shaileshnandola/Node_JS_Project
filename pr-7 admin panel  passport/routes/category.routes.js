const express = require('express');

const routes = express.Router();

const categoryctr = require("../controllers/categoryCtr")
const AddCategory = require('../models/categorymodel');

routes.get("/addCategory", categoryctr.addCategory)
routes.get("/viewCategory",categoryctr.viewCategory)
routes.post('/addnewcategory', AddCategory.uploadimage, categoryctr.addnewcategory);
routes.get("/deleteCategory/:categoryId",categoryctr.deleteCategory)
routes.get("/editCategory/:categoryId",categoryctr.editCategory)
routes.post('/EditCategorydata/:categoryId', AddCategory.uploadimage, categoryctr.EditCategorydata);
routes.post('/singleobject/:categoryId',categoryctr.singleobject);

module.exports = routes;