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
        console.log('lists', lists)
        return lists;
        // return [
        //     "2022-01-01",
        //     "2022-01-02",
        //     "2022-01-03",
        //     "2022-01-04",
        //     "2022-01-05",
        //     "2022-01-06",
        //     "2022-01-07",
        //     "2022-01-08",
        //     "2022-01-09",
        //     "2022-01-15",
        //     "2022-01-16",
        //     "2022-01-22",
        //     "2022-01-23",
        //     "2022-01-29",
        //     "2022-01-30",
        //     "2022-02-05",
        //     "2022-02-06",
        //     "2022-02-12",
        //     "2022-02-13",
        //     "2022-02-19",
        //     "2022-02-20",
        //     "2022-02-23",
        //     "2022-02-26",
        //     "2022-02-27",
        //     "2022-03-06",
        //     "2022-03-07",
        //     "2022-03-08",
        //     "2022-03-12",
        //     "2022-03-13",
        //     "2022-03-19",
        //     "2022-03-20",
        //     "2022-03-26",
        //     "2022-03-27",
        //     "2022-04-02",
        //     "2022-04-03",
        //     "2022-04-09",
        //     "2022-04-10",
        //     "2022-04-16",
        //     "2022-04-17",
        //     "2022-04-23",
        //     "2022-04-24",
        //     "2022-04-30",
        //     "2022-05-01",
        //     "2022-05-02",
        //     "2022-05-03",
        //     "2022-05-07",
        //     "2022-05-08",
        //     "2022-05-09",
        //     "2022-05-10",
        //     "2022-05-14",
        //     "2022-05-15",
        //     "2022-05-21",
        //     "2022-05-22",
        //     "2022-05-28",
        //     "2022-05-29",
        //     "2022-06-04",
        //     "2022-06-05",
        //     "2022-06-11",
        //     "2022-06-12",
        //     "2022-06-13",
        //     "2022-06-18",
        //     "2022-06-19",
        //     "2022-06-25",
        //     "2022-06-26",
        //     "2022-07-02",
        //     "2022-07-03",
        //     "2022-07-09",
        //     "2022-07-10",
        //     "2022-07-16",
        //     "2022-07-17",
        //     "2022-07-23",
        //     "2022-07-24",
        //     "2022-07-30",
        //     "2022-07-31",
        //     "2022-08-06",
        //     "2022-08-07",
        //     "2022-08-13",
        //     "2022-08-14",
        //     "2022-08-20",
        //     "2022-08-21",
        //     "2022-08-27",
        //     "2022-08-28",
        //     "2022-09-03",
        //     "2022-09-04",
        //     "2022-09-10",
        //     "2022-09-11",
        //     "2022-09-17",
        //     "2022-09-18",
        //     "2022-09-24",
        //     "2022-09-25",
        //     "2022-10-01",
        //     "2022-10-02",
        //     "2022-10-08",
        //     "2022-10-09",
        //     "2022-10-15",
        //     "2022-10-16",
        //     "2022-10-22",
        //     "2022-10-23",
        //     "2022-10-29",
        //     "2022-10-30",
        //     "2022-11-04",
        //     "2022-11-05",
        //     "2022-11-06",
        //     "2022-11-12",
        //     "2022-11-13",
        //     "2022-11-19",
        //     "2022-11-20",
        //     "2022-11-26",
        //     "2022-11-27",
        //     "2022-12-03",
        //     "2022-12-04",
        //     "2022-12-10",
        //     "2022-12-11",
        //     "2022-12-17",
        //     "2022-12-18",
        //     "2022-12-24",
        //     "2022-12-25",
        //     "2022-12-31"
        // ]
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
