const express = require("express");
const { login, register, getDetails, logout, searchUser, sendFriendRequest } = require("../controller/userController/user.controller");
const { singleAvatar } = require("../middleware/multer");
const { isAuthenticated } = require("../middleware/auth");
const { registerValidator, validateHandler, loginValidator, sendFriendRequestValidator } = require("../lib/validators");

const userRoute = express.Router();

userRoute.post("/register", singleAvatar, registerValidator(), validateHandler, register);
userRoute.post("/login", loginValidator(), validateHandler, login);

userRoute.get("/me", isAuthenticated, getDetails);
userRoute.get("/logout", logout);
userRoute.get("/searchuser", isAuthenticated, searchUser);
userRoute.put("/sendrequest", isAuthenticated, sendFriendRequestValidator(), validateHandler, sendFriendRequest);

module.exports = userRoute