const express = require('express');
const { allusers } = require('../controller/user.controller');
const VerifyTokan = require('../middleware/VerifyToken');

const routes = express.Router();

routes.get('/', VerifyTokan,  allusers);

module.exports = routes;
