const express = require("express");
const { sendToken } = require("../../utils/feature");
const TryCatch = require("../../utils/TryCatch");

const register = TryCatch(async (req, res) => {
    try {
        console.log("register controller");

        sendToken(res, 201, { id: 1 }, "login sucessfully");
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