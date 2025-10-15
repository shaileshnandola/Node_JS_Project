const express = require('express');
const router = express.Router();
const uploadImage = require('../middleware/uploadImage');
const VerifyToken  = require('../middleware/VerifyToken');
const {
  registerUser,
  LoginUser,
  myProfile,
  updateMyProfile,
  deleteMyProfile,
  allAdmin,
} = require('../controller/admin.controller');

router.post('/register', uploadImage.single('profile'), registerUser);
router.post('/login', LoginUser);
router.get('/myprofile', VerifyToken, myProfile);
router.put('/update-profile', VerifyToken, uploadImage.single('profile'), updateMyProfile);
router.delete('/delete-profile', VerifyToken, deleteMyProfile);
router.get('/allAdmin', VerifyToken,allAdmin);


module.exports = router;