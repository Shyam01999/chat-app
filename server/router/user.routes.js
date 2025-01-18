const express  = require("express");
const { login, register } = require("../controller/userController/user.controller");
const { singleAvatar } = require("../middleware/multer");

const userRoute = express.Router();

userRoute.post("/register", singleAvatar, register)
userRoute.get("/login", login)

module.exports = userRoute