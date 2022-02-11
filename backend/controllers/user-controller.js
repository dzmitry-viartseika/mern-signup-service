const UserService = require('../services/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error')

class UserController {
    async registration(req,res,next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Ошибка валидации', errors.array()))
            }
            const { email, password } = req.body;
            const userData = await UserService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true // нельзя изменять и получать внутри браузера JS
            });
            res.sendStatus(200);
            return res.json(userData);
        } catch (e) {
            next(e);
            console.log(e);
        }
    }

    async login(req,res,next) {
        try {
            const { email, password } = req.body;
            const userData = await UserService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true // нельзя изменять и получать внутри браузера JS
            });
            return res.json(userData);
        } catch (e) {
            next(e);
            console.log(e);
        }
    }

    async logout(req,res,next) {
        try {
            const { refreshToken } =  req.cookies;
            const token = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token)
        } catch (e) {
            next(e);
            console.log(e);
        }
    }

    async refresh(req,res,next) {
        try {
            const { refreshToken } =  req.cookies;
            const userData = await UserService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true // нельзя изменять и получать внутри браузера JS
            });
            return res.json(userData);
        } catch (e) {
            next(e);
            console.log(e);
        }
    }

    async activate(req,res,next) {
        try {
            const activationLink = req.params.link;
            await UserService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e);
            console.log(e);
        }
    }

    async getUsers(req,res,next) {
        try {
           const users = await UserService.getAllUsers();
           return res.json(users)
        } catch (e) {
            next(e);
            console.log(e);
        }
    }
}

module.exports = new UserController();
