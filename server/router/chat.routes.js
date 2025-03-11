const express = require("express");
const { singleAvatar, attachmentsMulter } = require("../middleware/multer");
const { isAuthenticated } = require("../middleware/auth");
const { newGroup, getMyChats, getMyGroups, addMembers, removeMember, leaveMember, sendAttachments, getChatDetails, renameGroup, deleteGroup, getMessages } = require("../controller/chatController/chat.controller");

const chatRoute = express.Router();

chatRoute.post("/group", isAuthenticated, newGroup);
chatRoute.get("/my", isAuthenticated, getMyChats);
chatRoute.get("/my/groups", isAuthenticated, getMyGroups);
chatRoute.put("/addmembers", isAuthenticated, addMembers);
chatRoute.put("/removemember", isAuthenticated, removeMember);
chatRoute.delete("/leave/:id", isAuthenticated, leaveMember);
chatRoute.post("/messages", isAuthenticated, attachmentsMulter, sendAttachments);
chatRoute.get("/messages/:id", isAuthenticated, getMessages)
chatRoute.route("/:id").get(getChatDetails).put(isAuthenticated, renameGroup).delete(isAuthenticated, deleteGroup)

module.exports = chatRoute