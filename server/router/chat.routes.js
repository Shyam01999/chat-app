const express = require("express");
const { singleAvatar, attachmentsMulter } = require("../middleware/multer");
const { isAuthenticated } = require("../middleware/auth");
const { newGroup, getMyChats, getMyGroups, addMembers, removeMember, leaveMember, sendAttachments, getChatDetails, renameGroup, deleteGroup, getMessages } = require("../controller/chatController/chat.controller");
const { validateHandler, newGroupValidator, addMembersValidator, removeMemberValidator, leaveMemberValidator, getChatDetailsValidator, renameGroupValidator, deleteGroupValidator, sendAttachmentsValidator, getMessagesValidator } = require("../lib/validators");

const chatRoute = express.Router();

chatRoute.post("/group", isAuthenticated, newGroupValidator(), validateHandler, newGroup);
chatRoute.get("/my", isAuthenticated, getMyChats);
chatRoute.get("/my/groups", isAuthenticated, getMyGroups);
chatRoute.put("/addmembers", isAuthenticated, addMembersValidator(), validateHandler, addMembers);
chatRoute.put("/removemember", isAuthenticated, removeMemberValidator(), validateHandler, removeMember);
chatRoute.delete("/leave/:id", isAuthenticated, leaveMemberValidator(), validateHandler, leaveMember);
chatRoute.post("/messages", isAuthenticated, attachmentsMulter, sendAttachmentsValidator(), validateHandler, sendAttachments);
chatRoute.get("/messages/:id", isAuthenticated, getMessagesValidator(), validateHandler, getMessages)
chatRoute.route("/:id")
    .get(isAuthenticated, getChatDetailsValidator(), validateHandler, getChatDetails)
    .put(isAuthenticated, renameGroupValidator(), validateHandler, renameGroup)
    .delete(isAuthenticated, deleteGroupValidator(), validateHandler, deleteGroup)

module.exports = chatRoute