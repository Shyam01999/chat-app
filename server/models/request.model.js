const AppError = require("../utils/appError");

module.exports = (sequelize, DataTypes) => {
    const Request = sequelize.define("Request", {
        status: {
            type: DataTypes.STRING,
            defaultValue: "Pending"
        },
        senderId: {
            type: DataTypes.INTEGER,
        },
        receiverId: {
            type: DataTypes.INTEGER,
        }
    }, {
        freezeTableName: true
    });

    Request.association = (models) => {
    }

    return Request;
}