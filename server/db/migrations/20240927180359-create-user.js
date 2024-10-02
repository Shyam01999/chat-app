'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "first name cannot be null",
          },
          notEmpty: {
            msg: "first name cannot be empty",
          }
        }
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "last name cannot be null",
          },
          notEmpty: {
            msg: "last name cannot be empty",
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Enforce unique constraint at the database level
        validate: {
          notNull: {
            msg: "email cannot be null",
          },
          notEmpty: {
            msg: "email cannot be empty",
          },
          isEmail: {
            msg: "Invalid email id",
          }
        }
      },
      userType: {
        type: Sequelize.ENUM('0', '1', '2'),
        allowNull: false,
        validate: {
          notNull: {
            msg: "userType cannot be null",
          },
          notEmpty: {
            msg: "userType cannot be empty",
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password cannot be null",
          },
          notEmpty: {
            msg: "password cannot be empty",
          },
          len: {
            args: [7],
            msg: "Password must be at least 7 characters long",
          }
        }
      },
      // No need to define confirmpassword in the database since it's virtual
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deletedAt:{
        allowNull: true,
        type:Sequelize.DATE,
        
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
}; 