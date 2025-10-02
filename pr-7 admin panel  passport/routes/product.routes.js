const express = require('express');
const routes = express.Router();
const productCtr = require('../controllers/productCtr')
const productmodel = require('../models/prductmodel')

routes.get("/addProduct", productCtr.addProduct);
routes.get("/subcategory", productCtr.Subcategories);
routes.get("/extracategory", productCtr.extracategories);
routes.post("/addProductInsert", productmodel.uploadimage, productCtr.addProductInsert)
routes.get("/viewProduct", productCtr.viewProduct)
routes.get('/viewsingleproduct/:productId',productmodel.uploadimage,productCtr.viewsingleproduct)
routes.get("/deleteproduct/:productId", productCtr.deleteproduct);
routes.get("/editproduct/:productId",productCtr.editproduct)
routes.post('/updateProduct', productmodel.uploadimage, productCtr.updateProduct);


module.exports = routes;