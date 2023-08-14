const express = require("express");
const {getOneUser, registerUser, Login} = require('../controllers/user.controller');
const verifyToken = require("../middleware/validate.token");
const routerUser = express.Router()


routerUser.route('/').get( verifyToken, getOneUser)
routerUser.route('/register').post(registerUser)
routerUser.route('/login').post(Login)

module.exports = routerUser;