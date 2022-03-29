const UserService = require('../services/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error')

class UserController {
    async registration(req,res,next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Заполните корректно почту и пароль минимальное <br> количество символов 3, а максимальное 32', errors.array()))
            }
            const { email, password } = req.body;
            const userData = await UserService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true // нельзя изменять и получать внутри браузера JS
            });
            // res.sendStatus(200);
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
            res.clearCookie('accessToken');
            return res.json(token)
        } catch (e) {
            next(e);
            console.log(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async activate(req,res,next) {
        try {
            const activationLink = req.params.link;
            await UserService.activate(activationLink);
            // TODO: env route
            return res.redirect('http://localhost:8080/crm/dashboard');
        } catch (e) {
            next(e);
            console.log(e);
        }
    }

    async resetPassword(req,res,next) {
        try {
            const resetLink = req.params.link;
            console.log('resetLink', resetLink);
            await UserService.refreshPassword(resetLink);
            return res.redirect(process.env.CLIENT_RESET_PASSWORD_URL)
        } catch (e) {
            next(e);
            console.log(e);
        }
    }

    async forgotPassword(req, res, next) {
        try {
            await UserService.forgotPassword(req);
            res.json({message: 'Проверьте почту'})
        } catch (e) {
            next(e);
            console.log(e);
        }
    }

    async changedPassword(req, res, next) {
        try {
            const users = await UserService.changePassword(req);
            return res.json(users)
        } catch (e) {
            next(e);
            console.log(e);
        }
    }

    async updateUser(req, res, next) {
        try {
            const { email, updatedUser } = req.body;
            const userData = await UserService.updateUser(email, updatedUser);
            return res.json(userData);
        } catch (e) {
            next(e);
            console.log(e);
        }
    }

    async getCurrentUser(req, res, next) {
        if (req.headers && req.headers.authorization) {
            console.log('req.session', req)
            const token = req.headers.authorization.split(' ');
            const userData = await UserService.getCurrentUser(token);
            return res.json(userData);
        }
    }

    async getUsers(req,res,next) {
        try {
           const users = await UserService.getUsers();
           return res.json(users)
        } catch (e) {
            next(e);
            console.log(e);
        }
    }

    async test(req, res,next) {
        try {
            const user = await UserService.googleUser();
            return res.json(user)
        } catch (e) {
            next(e);
            console.log(e);
        }
    }

    async getWorkingDaysList(req, res, next) {
        try {
            const list = await WeekBasedWorkingCalendarDate.getWorkingDaysList();
            return res.json(list)
        } catch (e) {
            next(e);
            console.log(e);
        }
    }
}

module.exports = new UserController();
