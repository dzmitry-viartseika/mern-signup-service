const { Schema, model } = require('mongoose');

const WeekBasedWorkingCalendarDateSchema = new Schema({
    calendar: {
        type: Date,
    },
    lastModifiedTime: {
        type: Date,
    },
    creationTime: {
        type: Date,
    },
    intervalType: {
      type: String,
    },
    description: {
        type: String,
    },
    begin: {
        type: Date,
    },
    end: {
        type: Date,
    },
})

module.exports = model('WeekBasedWorkingCalendarDateModel', WeekBasedWorkingCalendarDateSchema);
