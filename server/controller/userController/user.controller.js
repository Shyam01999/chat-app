const express = require("express");
const { sendToken, cookieOptions } = require("../../utils/feature");
const TryCatch = require("../../utils/TryCatch");
const { User } = require("../../models");
const AppError = require("../../utils/appError");
const bcrypt = require("bcrypt");

const register = TryCatch(async (req, res, next) => {
        let { name, username, password, avatar } = req.body;
        
        const existingUser = await User.findOne({ where: { name } });
        if (existingUser) {
            return next(new AppError('User with this name already exists', 400));
        }

        //password hash
        const saltRound = 10;
        const hashPassword = await bcrypt.hash(password, saltRound);
        password = hashPassword;

        const newUser = User.create({ name, username, password, avatar });

        if (newUser) {
            sendToken(res, 201, newUser, "Signup sucessfully");
        } else {
            return next(new AppError('Registration failed', 400));
        }
})

const login = TryCatch(async (req, res, next) => {
    const { username, password } = req.body;

    const userExist = await User.findOne({ where: { username } });
    if (userExist) {

        // Retrieve the hashed password from the database
        const { password: hashedPassword } = userExist;

        const passwordCheck = await bcrypt.compare(password, hashedPassword);
        // const userstorepassword = userExist.dataValues.password;
        //const passwordCheck = userstorepassword == password

        if (passwordCheck) {
            return sendToken(res, 200, userExist, "Login sucessfully");
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

    const user = await User.findOne({ where: { id: req.user?.id } });

    if (!user) {
        return next(new AppError("User not found", 404))
    }

    const { password, ...userData } = user.toJSON();
    res.status(200).json({ success: true, data: userData })
})

const logout = TryCatch((req, res, next) => {
    res.status(200).cookie("chat-app-token", "", { ...cookieOptions, maxAge: 0 }).json({ message: "Loggedout successfully" })
});

const searchUser = TryCatch(async(req, res)=>{
    const {name} = req.query;

    res.status(200).json({
        success:true,
        message:name
    })
})

module.exports = { login, register, getDetails, logout, searchUser }