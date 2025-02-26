const express = require("express");
const { singleAvatar } = require("../middleware/multer");
const { isAuthenticated } = require("../middleware/auth");
const { newGroup, getMyChats, getMyGroups, addMembers } = require("../controller/chatController/chat.controller");

const chatRoute = express.Router();

chatRoute.post("/group", isAuthenticated, newGroup);
chatRoute.get("/my", isAuthenticated, getMyChats);
chatRoute.get("/my/groups", isAuthenticated, getMyGroups);
chatRoute.put("/addmembers", isAuthenticated, addMembers);

module.exports = chatRoute