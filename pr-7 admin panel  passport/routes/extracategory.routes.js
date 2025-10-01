const express = require('express');
const routes = express.Router();
const extracategory = require("../controllers/extracategoryCtr");
const AddCategory = require('../models/categorymodel');

routes.get("/addExtraCategory", extracategory.addExtraCategory);
routes.get("/subcategory", extracategory.Subcategories);
routes.post("/add-ExtraCategory", extracategory.addExtraCategorypage);
routes.get("/viewExtraCategory", extracategory.viewExtraCategorypage);
routes.get("/deleteExtraCategory/:extracategoryId",extracategory.deleteExtraCategory)
routes.get("/editExtraCategory/:extracategoryId",extracategory.editExtraCategory)
routes.post('/EditExtraCategorydata/:extracategoryId', AddCategory.uploadimage, extracategory.EditExtraCategorydata);

module.exports = routes;
