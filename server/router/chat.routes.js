const express = require("express");
const { singleAvatar } = require("../middleware/multer");
const { isAuthenticated } = require("../middleware/auth");
const { newGroup, getMyChats, getMyGroups, addMembers, removeMember, leaveMember } = require("../controller/chatController/chat.controller");

const chatRoute = express.Router();

chatRoute.post("/group", isAuthenticated, newGroup);
chatRoute.get("/my", isAuthenticated, getMyChats);
chatRoute.get("/my/groups", isAuthenticated, getMyGroups);
chatRoute.put("/addmembers", isAuthenticated, addMembers);
chatRoute.put("/removemember", isAuthenticated, removeMember);
chatRoute.delete("/leave/:id", isAuthenticated, leaveMember);

module.exports = chatRoute