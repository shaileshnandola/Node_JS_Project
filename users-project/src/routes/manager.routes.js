const express = require('express');
const { addManager, allManager, editManager, deleteManager } = require('../controller/admin.controller');
const VerifyTokan = require('../middleware/VerifyToken');
const verifyRole = require('../middleware/VerifyRole');
const uploadImage = require('../middleware/uploadImage');

const router = express.Router();

router.post('/addManager',VerifyTokan ,verifyRole('admin'),uploadImage.single('profile'), addManager)
router.get('/allManager',VerifyTokan , verifyRole('admin', 'manager'),uploadImage.single('profile'),allManager)
router.put('/editManager',VerifyTokan,verifyRole('admin'),uploadImage.single('profile'),editManager)
router.delete('/deleteManager',VerifyTokan , verifyRole('admin'),uploadImage.single('profile'),deleteManager)


module.exports = router;