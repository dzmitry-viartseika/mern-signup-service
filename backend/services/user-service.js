const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw new Error('Пользователь с таким email уже существует');
        }
        const hashPassword = bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await UserModel.create({ email, password: hashPassword, activationLink });
        await mailService.sendActivationMail(email, activationLink);
        // await user.save();
    }
}

module.exports = new UserService();
