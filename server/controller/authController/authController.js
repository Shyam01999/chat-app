const user = require("../../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const catchAsync = require("../../utils/TryCatch");
const AppError = require("../../utils/appError");

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });

}

//handle error using global error handler using try catch block
// const signup = async (req, res, next) => {
//     try {
//         const { firstName, lastName, email, userType, password, confirmpassword, deletedAt } = req.body;

//         if (!['1', '2'].includes(userType)) {
//             return res.status(400).json({
//                 status: 'success',
//                 message: "You not allowed to registred"
//             })
//         }

//         const newuser = await user.create({
//             firstName, lastName, email, userType, password, confirmpassword
//         })

//         const result = newuser.toJSON();

//         delete result.password;
//         delete result.deletedAt;

//         result.token = generateToken({ id: result.id })

//         if (!result) {
//             return res.status(400).json({
//                 status: 'success',
//                 message: "user not registered"
//             })
//         }

//         return res.status(202).json({
//             status: 'success',
//             message: "Signup successfully",
//             data: result
//         });
//     }
//     catch (error) {
//         return next(new Error(error))
//     }

// }

//handle error using global error handler using catchAsync middleware
const signup = catchAsync(
    async (req, res, next) => {

        const { firstName, lastName, email, userType, password, confirmpassword, deletedAt } = req.body;

        if (!['1', '2'].includes(userType)) {
            throw new AppError("Admin user are not allowed to register", 400);
        }

        const newuser = await user.create({
            firstName, lastName, email, userType, password, confirmpassword
        })

        const result = newuser.toJSON();

        if (!result) {
            throw new AppError("user not registered", 400);
        }

        delete result.password;
        delete result.deletedAt;

        result.token = generateToken({ id: result.id });

        return res.status(202).json({
            status: 'success',
            message: "Signup successfully",
            data: result
        });



    })

const login = catchAsync(
    async (req, res, next) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError('Please provide email and password', 400));
        }

        const currentuser = await user.findOne({ where: { email } })

        if (!currentuser || !(await bcrypt.compare(password, currentuser.password))) {
            return next(new AppError('Invalid email or password', 400));
        }

        const token = generateToken({
            id: currentuser.id
        })

        return res.status(200).json({
            status: 'success',
            message: 'Login successfull',
            data: currentuser,
            token
        });
    });

const authentication = catchAsync(async (req, res, next) => {
    // 1.get token
    let idToken = '';

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        idToken = req.headers.authorization.split(' ')[1];
    }

    if (!idToken) {
        return next(new AppError('Please login to access this resource', 401))
    }
    // 2.verify token
    const tokenDetails = jwt.verify(idToken, process.env.JWT_SECRET_KEY);
    if (!tokenDetails) {
        return next(new AppError('Invalid token', 401))
    }

    // 3.Find user using token
    const freshUser = await user.findByPk(tokenDetails.id);
    if (!freshUser) {
        return next(new AppError('User no longer exist', 400))
    }
    // 4.Store user details in Object
    req.user = freshUser;
    console.log(req.user)
    next()

})

const authorizeRole = (...userType) => (req, res, next) => {
    if (!userType.includes(req.user.userType)) {
        return next(new AppError(`Role ${req.user.userType} is not allowed to access this resource`, 403))
    }

    next();
}

module.exports = {
    login,
    signup,
    authentication,
    authorizeRole,
}