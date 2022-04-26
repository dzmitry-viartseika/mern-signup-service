const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const UsersDto = require('../dtos/users-dto');
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
            const resetLink = uuid.v4();
            user.resetLink = resetLink;
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
            user,
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

    async getCurrentUser(token) {
        const user = await UserModel.findOne({});
        return user;
    }

    async getUsers() {
        const users = await UserModel.find({});
        const modifiedUsersList = users.map((item) => {
            const usersDto = new UsersDto(item);
            return usersDto;

        })
        return modifiedUsersList;
    }

    async updateUser(updatedUser) {
        if (!updatedUser.email) {
            throw ApiError.unAuthorizedError();
        }
        const user = await UserModel.findOne({ email: updatedUser.email });

        if (!user) {
            throw ApiError.badRequest('Пользователь с таким email не найден');
        }

        user.avatar = updatedUser.avatar;
        user.firstName = updatedUser.firstName;
        user.lastName = updatedUser.lastName;
        user.phoneNumber = updatedUser.phoneNumber;
        user.showNotify = updatedUser.showNotify;
        user.emailNotify = updatedUser.emailNotify;
        user.isChatSounds = updatedUser.isChatSounds;
        user.save();
        return user;
    }

    async googleUser(req, res,next) {
        // res.send({
        //     message: 'wertey  sucecess',
        //     // user: req.user,
        // })
    }
}

module.exports = new UserService();
