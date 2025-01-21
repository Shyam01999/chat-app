const express  = require("express");
const { login, register, getDetails } = require("../controller/userController/user.controller");
const { singleAvatar } = require("../middleware/multer");
const { isAuthenticated } = require("../middleware/auth");

const app = express();

const userRoute = express.Router();

userRoute.post("/register", singleAvatar, register)
userRoute.get("/login", login)

app.use(isAuthenticated);

userRoute.get("/me", getDetails)

module.exports = userRoute