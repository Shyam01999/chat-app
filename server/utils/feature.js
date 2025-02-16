const jwt = require('jsonwebtoken');

const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
}

const sendToken = (res, code, user, message) => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
    
    res.status(code).cookie("chat-app-token", token, cookieOptions).json({
        success: true,
        message,
        token,
        // user

    })
}

const emitEvent = (req, event, users, data) => {
    console.log("Emmiting events", event)
}


module.exports = { sendToken, cookieOptions, emitEvent}