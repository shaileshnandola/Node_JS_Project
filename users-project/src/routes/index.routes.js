const express = require('express');

const router = express.Router();

router.use("/admin", require("./admin.routes"));
router.use("/manager", require("./manager.routes"));

module.exports = router;




