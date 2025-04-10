const express = require("express");
const { login, register, getDetails, logout, searchUser } = require("../controller/userController/user.controller");
const { singleAvatar } = require("../middleware/multer");
const { isAuthenticated } = require("../middleware/auth");
const { registerValidator, validateHandler, loginValidator } = require("../lib/validators");

const userRoute = express.Router();

userRoute.post("/register", singleAvatar, registerValidator(), validateHandler, register);
userRoute.post("/login", loginValidator(), validateHandler, login);

userRoute.get("/me", isAuthenticated, getDetails);
userRoute.get("/logout", logout);
userRoute.get("/searchuser", searchUser)

module.exports = userRoute