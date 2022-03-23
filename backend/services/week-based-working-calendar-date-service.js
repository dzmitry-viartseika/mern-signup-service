// const UserModel = require('../models/user-model');
// const Oauth2User = require('../models/oauth2-user-model');
// const TokenModel = require('../models/token-model');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const uuid = require('uuid');
// const mailService = require('./mail-service');
// const tokenService = require('./token-service');
// const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
// const passport = require('passport');
const WeekBasedWorkingCalendarDateModel = require('../models/week-based-working-calendar-date-model');

class WeekBasedWorkingCalendarDate {
    async getWorkingDaysList() {
        const lists = await WeekBasedWorkingCalendarDateModel.find({});
        return lists;
    }

    async changeWorkingDate(dateInfo) {
        if (!dateInfo) {
            throw ApiError.badRequest('Некорректная дата');
        }
        const data = await WeekBasedWorkingCalendarDateModel.findOne({ calendar: dateInfo.calendar });
        if(!data) {
            const user = await WeekBasedWorkingCalendarDateModel.create({ intervalType: dateInfo.intervalType, calendar: dateInfo.calendar });
            await user.save();
            return user;
        } else {
            await WeekBasedWorkingCalendarDateModel.deleteOne({ _id: data._id });
        }
    }
}

module.exports = new WeekBasedWorkingCalendarDate();
