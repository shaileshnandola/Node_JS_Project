const express = require('express');
const routes = express.Router();
const categoryctr = require("../controllers/subcategoryCtr");
const AddCategory = require('../models/categorymodel');

routes.get("/addSubCategory", categoryctr.addSubCategory);

module.exports = routes;
