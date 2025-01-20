const jwt = require('jsonwebtoken');

const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
}

const sendToken = (res, code, user, message) => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
    // console.log("token", token)
    res.status(code).cookie("chat-app-token", token, cookieOptions).json({
        sucess: true,
        message,
        token,
        // user

    })
}


module.exports = { sendToken, cookieOptions}