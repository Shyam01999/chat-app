const express  = require("express");
const { login } = require("../controller/userController/user.controller");

const userRoute = express.Router();

userRoute.get("/login", login)

module.exports = userRoute