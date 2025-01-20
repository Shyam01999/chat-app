const AppError = require("../utils/appError");

module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define("Message", {
        senderId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        chatId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Chat',
                key: 'id'
            }
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        attachment: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: [],
        }
    }, {
        freezeTableName: true
    });

    Message.association = (models) => {
        Message.belongsTo(models.User, {
            foreignKey: 'senderId',
            as: 'sender'
        })

        Message.belongsTo(models.Chat, {
            foreignKey:"chatId",
            as :'chat message'
        })
    }

    return Message;
}