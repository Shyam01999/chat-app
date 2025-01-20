const AppError = require("../utils/appError");

module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define("Chat", {
        name: DataTypes.STRING,
        groupChat: DataTypes.BOOLEAN,
        creator: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "User",
                key: 'id'
            }
        },
        member: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: [],
            validate: {
                isValidMemberArray(value) {
                    if (!Array.isArray(value)) {
                        throw new AppError('Members must be an array');
                    }
                }
            }
        }
    }, {
        freezeTableName: true
    });

    Chat.association = (models) => {
        Chat.belongsTo(models.User, {
            foreignKey: 'creator',
            as: 'chatCreator'
        })
    }

    return Chat;
}