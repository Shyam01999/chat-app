const express = require("express");
const { singleAvatar } = require("../middleware/multer");
const { isAuthenticated } = require("../middleware/auth");
const { newGroup } = require("../controller/chatController/chat.controller");

const chatRoute = express.Router();

chatRoute.post("/group", isAuthenticated, newGroup);
// chatRoute.get("/logout", logout);

module.exports = chatRoute