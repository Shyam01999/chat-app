const express = require("express");
const { sendToken } = require("../../utils/feature");
const TryCatch = require("../../utils/TryCatch");
const { User } = require("../../models")

const register = TryCatch(async (req, res) => {
    try {
        
        const { name, username, password, avatar } = req.body;
        // console.log("User model", User)
        // console.log("register controller");
        const newUser = User.create({ ...req.body });
        sendToken(res, 201, newUser, "Signup sucessfully");
    }
    catch (error) {
        console.log(`Error in register controller ${error}`)
    }
})

const login = (req, res) => {
    try {
        res.send("hello world")

        sendToken(res, 201, { id: 1 }, "login sucessfully");
    }
    catch (error) {

    }
}

module.exports = { login, register }