const express = require("express");
const { login, register, getDetails, logout, searchUser } = require("../controller/userController/user.controller");
const { singleAvatar } = require("../middleware/multer");
const { isAuthenticated } = require("../middleware/auth");

const userRoute = express.Router();

userRoute.post("/register", singleAvatar, register);
userRoute.post("/login", login);

userRoute.get("/me", isAuthenticated, getDetails);
userRoute.get("/logout", logout);
userRoute.get("/serachuser", searchUser)

module.exports = userRoute