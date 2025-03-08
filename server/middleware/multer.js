const multer = require("multer");

const multerUpload = multer({
    limit:{
        fileSize:1024 * 1024 * 5 //5MB file size
    }
})

const singleAvatar = multerUpload.single("avatar");

const attachmentsMulter = multerUpload.array("files", 5)

module.exports = {multerUpload, singleAvatar, attachmentsMulter}