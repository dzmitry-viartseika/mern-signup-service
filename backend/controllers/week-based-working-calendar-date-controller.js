const WeekBasedWorkingCalendarDate = require('../services/week-based-working-calendar-date-service');
// const { validationResult } = require('express-validator');
// const ApiError = require('../exceptions/api-error')

class WeekBasedWorkingCalendarDateController {
    async getWorkingDaysList(req, res, next) {
        try {
            const list = await WeekBasedWorkingCalendarDate.getWorkingDaysList();
            return res.json(list)
        } catch (e) {
            next(e);
            console.log(e);
        }
    }

    async changeWorkingDate(req, res, next) {
        try {
            const list = await WeekBasedWorkingCalendarDate.changeWorkingDate();
            return res.json(list)
        } catch (e) {
            next(e);
            console.log(e);
        }
    }
}

module.exports = new WeekBasedWorkingCalendarDateController();
