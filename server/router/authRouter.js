const authRouter = require('express').Router();
const { signup, login } = require('../controller/authController/authController');

authRouter.route('/signup').post(signup);
authRouter.route('/login').post(login);

module.exports = authRouter;