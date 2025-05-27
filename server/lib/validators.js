const { validationResult, body, param, query } = require("express-validator");
const AppError = require("../utils/appError");

const validateHandler = (req, res, next) => {
    const errors = validationResult(req);
    const errorMessage = errors.array().map((item) => item.msg).join(", ");

    if (errors.isEmpty()) {
        return next();
    } else {
        return next(new AppError(errorMessage, 400))
    }
}

const registerValidator = () => [
    body("name", "Please Enter Name").notEmpty(),
    body("username", "Please Enter Username").notEmpty(),
    body("password", "Please Enter Password").notEmpty(),
];

const loginValidator = () => [
    body("username", "Please Enter Username").notEmpty(),
    body("password", "Please Enter Password").notEmpty(),
];

const newGroupValidator = () => [
    body("name", "Please Enter Name").notEmpty(),
    body("members")
        .notEmpty()
        .withMessage("Please Enter members")
        .isArray({ min: 2, max: 100 })
        .withMessage("Members must be 2-100")
];

const addMembersValidator = () => [
    body("chatid", "Please Enter ChatId").notEmpty(),
    body("members")
        .notEmpty()
        .withMessage("Please Enter members")
        .isArray({ min: 1, max: 97 })
        .withMessage("Members must be 1-97")
];

const removeMemberValidator = () => [
    body("chatid", "Please Enter Chat Id").notEmpty(),
    body("userid", "Please Enter User Id").notEmpty(),
];

const leaveMemberValidator = () => [
    param("id", "Please Enter Chat Id").notEmpty()
];

const sendAttachmentsValidator = () => [
    body("chatid", "Please Enter Chat Id").notEmpty(),
];

const getChatDetailsValidator = () => [
    param("id", "Please Enter Chat Id").notEmpty()
];

const renameGroupValidator = () => [
    param("id", "Please Enter Chat Id").notEmpty(),
    body("name", "Please Enter Name").notEmpty(),
];

const deleteGroupValidator = () => [
    param("id", "Please Enter Chat Id").notEmpty(),
];

const getMessagesValidator = () => [
    param("id", "Please Enter Chat Id").notEmpty(),
    query("page", "Please Enter page number").notEmpty(),
];

const sendFriendRequestValidator = () => [
    body("userId", "Please Enter User Id").notEmpty(),
];


module.exports = {
    validateHandler,
    registerValidator,
    loginValidator,
    newGroupValidator,
    addMembersValidator,
    removeMemberValidator,
    leaveMemberValidator,
    sendAttachmentsValidator,
    getChatDetailsValidator,
    renameGroupValidator,
    deleteGroupValidator,
    getMessagesValidator,
    sendFriendRequestValidator,
}