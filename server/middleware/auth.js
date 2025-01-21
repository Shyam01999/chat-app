const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const TryCatch = require("../utils/TryCatch");
const { User } = require("../models");

const isAuthenticated = TryCatch(async (req, res, next) => {
    const token = req.cookies["chat-app-token"];

    if (!token) {
        return next(new AppError("Please login to access this resource", 401));
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findOne({ where: { id: decodeToken.id } });

    if (!user) {
        return next(new AppError(`User with ${decodeToken.id} not exit`, 404))
    }
    
    req.user = user;

    next()

})

const authorizeRole = (...roles) => TryCatch(async(req, res, next) => {
    if(!roles.includes(req.user.role)){
        return next(new AppError(`Role ${req.user.role} is not allowed to access this resource`, 403));
    }

    next();
})

module.exports = { isAuthenticated, authorizeRole}