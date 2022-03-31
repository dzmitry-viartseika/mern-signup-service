const WeekBasedWorkingCalendarDate = require('../services/week-based-working-calendar-date-service');

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
            const data = req.body.date;
            console.log('data', data);
            const dataInfo = await WeekBasedWorkingCalendarDate.changeWorkingDate(data);
            return res.json(dataInfo)
        } catch (e) {
            next(e);
            console.log(e);
        }
    }
}

module.exports = new WeekBasedWorkingCalendarDateController();
