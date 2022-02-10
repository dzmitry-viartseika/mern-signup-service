const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw new Error('Пользователь с таким email уже существует');
        }
        const hashPassword = bcrypt.hash(password, 3);
        const user = await UserModel.create({ email, password: hashPassword });
        await user.save();
    }
}

module.exports = new UserService();
