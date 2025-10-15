const express = require('express');
const { registerUser, LoginUser, myprofile, editprofile, deleteprofile } = require('../controller/user.controller');
const uploadImage = require('../middleware/uploadImage');
const VerifyToken = require('../middleware/VerifyToken');

const routes = express.Router();

routes.post('/register', uploadImage.single('profile'), registerUser);
routes.post('/login', LoginUser);
routes.post('/profile', VerifyToken, myprofile);
routes.put('/update-profile', uploadImage.single('profile'), VerifyToken, editprofile);
routes.delete('/delete-profile', VerifyToken, deleteprofile);
routes.use("/user",require('../routes/user.routes'))

module.exports = routes;
