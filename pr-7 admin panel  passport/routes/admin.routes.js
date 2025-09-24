const express = require('express');

const routes = express.Router();

const adminctr = require("../controllers/adminCtr")
const AddAdmin = require('../models/adminmodel');

routes.get('/deshboard', adminctr.deshboard)
routes.get("/addAdmin",adminctr.addAdmin)
routes.get("/viewAdmin",adminctr.viewAdmin)
routes.post('/addAdmininsertdata', AddAdmin.uploadimage, adminctr.addAdmininsertdata);
routes.get("/deleteAdmin/:adminId",adminctr.deleteAdmin)
routes.get("/editAdmin/:adminId",adminctr.editAdmin)
routes.post('/EditAdmindata/:adminId', AddAdmin.uploadimage, adminctr.EditAdmindata);
routes.post('/singleobject/:adminId',adminctr.singleobject);


module.exports = routes;
