const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw ApiError.badRequest('Пользователь с таким email уже существует');
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await UserModel.create({ email, password: hashPassword, activationLink });
        console.log('user #1', user);
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        }
    }

    async forgotPassword(req, res, next) {
        console.log('log1 #1')
        const { email } = req.body;

        UserModel.findOne({ email }, async (err, user) => {
            if(err || !user) {
                throw ApiError.badRequest('Пользователь с таким email не найден')
            }

            const token = jwt.sign(
                {_id: user._id},
                process.env.API_URL,
                {
                    expiresIn: "15m",
                }
            );
            console.log('token', token);
            console.log('user', user);
            const resetLink = uuid.v4();
            user.resetLink = resetLink;
            console.log('user', user);
            user.save();
            const link = `${process.env.API_URL}/api/forgot-password/${resetLink}`;
            await mailService.sendForgotMail(email, link);
        });
    }

    async changePassword(req, res, next) {
        const { email, newPassword } = req.body;

        UserModel.findOne({ email }, async (err, user) => {
            if(err || !user) {
                throw ApiError.badRequest('Пользователь с таким email не найден')
            }

            const token = jwt.sign(
                {_id: user._id},
                process.env.API_URL,
                {
                    expiresIn: "15m",
                }
            );
            const hashPassword = await bcrypt.hash(newPassword, 3);
            user.password = hashPassword;
            user.save();
        });
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw ApiError.badRequest('Пользователь с таким email не найден')
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals) {
            throw ApiError.badRequest('Некорректный пароль');
        }

        const userDto = new UserDto(user);
        // TODO дублирование и нужно вынести в отдельную функцию
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink });
        if(!user) {
            throw ApiError.badRequest('Некорректная активация ссылки')
        }
        user.isActivated = true;
        await user.save();
    }

    async refreshPassword(resetLink) {
        const user = await UserModel.findOne({ resetLink });
        if(!user) {
            throw ApiError.badRequest('Некорректная активация ссылки')
        }
        // console.log('user', user)
        // user.avatar = 'wertey';
        // await user.save();
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unAuthorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.unAuthorizedError();
        }
        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user);
        // TODO дублирование и нужно вынести в отдельную функцию
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        }
    }

    async getAllUsers(req, res,next) {
        try {
            const users = await UserModel.find();
            return users;
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new UserService();
