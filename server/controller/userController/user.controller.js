const express = require("express");
const { sendToken } = require("../../utils/feature");
const TryCatch = require("../../utils/TryCatch");
const { User } = require("../../models");
const AppError = require("../../utils/appError");
const bcrypt = require("bcryptjs");

const register = TryCatch(async (req, res, next) => {
    try {
        let { name, username, password, avatar } = req.body;
        // console.log("User model", User)
        // console.log("register controller");
        //password hash
        const saltRound = 10;
        const hashPassword = await bcrypt.hash(password, saltRound);
        password = hashPassword;

        const existingUser = await User.findOne({ where: { name } });
        if (existingUser) {
            return next(new AppError('User with this name already exists', 400));
        }

        const newUser = User.create({ name, username, password, avatar });

        if (newUser) {
            sendToken(res, 201, newUser, "Signup sucessfully");
        } else {
            return next(new AppError('Registration failed', 400));
        }
    }
    catch (error) {
        console.log(`Error in register controller ${error}`)
    }
})

const login = TryCatch(async (req, res) => {
    const { username, password } = req.body;

    const userExist = await User.findOne({ where: { username } });
    if (userExist) {

      // Retrieve the hashed password from the database
      const hashedPassword = userExist.rows[0].password;
      const passwordCheck = await bcrypt.compare(password, hashedPassword);
    
      const userstorepassword = emailExist.dataValues.password;
    //const passwordCheck = userstorepassword == password

      if (passwordCheck) {
        return sendToken(res, 201, newUser, "Login sucessfully");
      }
      else {
        return next(new AppError('Invalid Credentials', 400))
      }

    }
    else {
      return next(new AppError('Invalid Credentials', 400))
    }
    
})

const getDetails = TryCatch(async (req, res, next) => {
    const { id } = req.user;

    if (!id) {
        return next(new AppError("Id not found", 404))
    }

    const user = await User.findOne({ where: { id } });

    if (!user) {
        return next(new AppError("User not found", 404))
    }

    res.status(200).json({ success: true, data: user })
})

module.exports = { login, register, getDetails }