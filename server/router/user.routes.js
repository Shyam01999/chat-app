const express = require("express");
const { login, register, getDetails, logout } = require("../controller/userController/user.controller");
const { singleAvatar } = require("../middleware/multer");
const { isAuthenticated } = require("../middleware/auth");

const app = express();

const userRoute = express.Router();

userRoute.post("/register", singleAvatar, register);
userRoute.post("/login", login);

// app.use();

userRoute.get("/me", isAuthenticated, getDetails);
userRoute.get("/logout", logout);

module.exports = userRoute