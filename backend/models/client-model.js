const { Schema, model } = require('mongoose');

const ClientSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
});

ClientSchema.set('toJSON', {
    virtuals: true,
})

module.exports = model('Client', ClientSchema);
