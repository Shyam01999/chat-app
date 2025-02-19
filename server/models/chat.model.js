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
            type: DataTypes.ARRAY(DataTypes.STRING),
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

    Chat.associate = (models) => {
        Chat.belongsToMany(models.User, {
            through: 'ChatUsers', // Join table (if needed)
            foreignKey: 'chatId',
            otherKey: 'userId',
          });
    }

    return Chat;
}