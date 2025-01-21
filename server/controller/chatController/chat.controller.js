const TryCatch = require("../../utils/TryCatch");
const { Chat } = require("../../models");

const newGroup = TryCatch(async (req, res, next) => {
    res.status(200).json({ message: "Chat controller" })
});

module.exports = {
    newGroup
}