

const AppError = require("../utils/appError");

// const user = sequelize.define('user', {
//   id: {
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//     type: DataTypes.INTEGER
//   },
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull:false,
//     validate:{
//       notNull:{
//         msg:"first name cannot be null",
//       },
//       notEmpty:{
//         msg:"first name cannot be empty",
//       }
//     }
//   },
//   lastName: {
//     type: DataTypes.STRING,
//     allowNull:false,
//     validate:{
//       notNull:{
//         msg:"last name cannot be null",
//       },
//       notEmpty:{
//         msg:"last name cannot be empty",
//       }
//     }
//   },
//   email: {
//     type: DataTypes.STRING,
//     unique: true,
//     allowNull:false,
//     validate:{
//       notNull:{
//         msg:"email name cannot be null",
//       },
//       notEmpty:{
//         msg:"email name cannot be empty",
//       },
//       isEmail:{
//         msg:"Invalid email id"
//       }
//     }
//   },
//   userType: {
//     type: DataTypes.ENUM('0', '1', '2'),
//     allowNull:false,
//     validate:{
//       notNull:{
//         msg:"userType name cannot be null",
//       },
//       notEmpty:{
//         msg:"userType name cannot be empty",
//       }
//     }
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull:false,
//     validate:{
//       notNull:{
//         msg:"password name cannot be null",
//       },
//       notEmpty:{
//         msg:"password name cannot be empty",
//       },
//       len: {
//         args: [7], 
//         msg: "Password must be at least 7 characters long",
//       }
//     }
//   },
//   confirmpassword: {
//     type: DataTypes.VIRTUAL,
//     set(value) {
//       if (value == this.password) {
//         const hashPassword = bcrypt.hashSync(value, 10);
//         this.setDataValue('password', hashPassword);
//       } else {
//         throw new AppError('Password and Confirm password must be same.', 400);
//       }
//     }
//   },
//   createdAt: {
//     allowNull: false,
//     type: DataTypes.DATE
//   },
//   updatedAt: {
//     allowNull: false,
//     type: DataTypes.DATE
//   },
//   deletedAt: {
//     type: DataTypes.DATE
//   }
// },
//   {
//     paranoid: true,
//     freezeTableName: true,
//     modelName: 'user'
//   });

//   user.hasMany(project, {foreignKey : 'createdBy'});
//   project.belongsTo(user, {
//     foreignKey:'createdBy',
//   })


//   module.exports = user;


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.JSONB,
      isValidImageObject(value) {
        // If it's an array, validate each object in the array
        if (Array.isArray(value)) {
          value.forEach(item => {
            if (!item.public_id || !item.url) {
              throw new AppError('Each avatar object must contain public_id and url');
            }
          });
        }
        // If it's a single object, validate that object
        else if (value && (!value.public_id || !value.url)) {
          throw new AppError('Avatar object must contain public_id and url');
        }
      },
    }
  }, { freezeTableName: true })

  User.associate = (models) => {
    User.belongsToMany(models.Chat, {
      through: 'ChatUsers', // Join table (if needed)
      foreignKey: 'userId',
      otherKey: 'chatId',
    });
  }

  return User;
}