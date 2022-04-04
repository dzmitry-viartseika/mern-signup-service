const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isActivated: {
        type: Boolean,
        default: false,
    },
    activationLink: {
        type: String,
    },
    resetLink: {
        type: String,
        default: '',
    },
    avatar: {
        type: String,
        default: '',
    },
    firstName: {
        type: String,
        default: '',
    },
    lastName: {
        type: String,
        default: '',
    },
    phoneNumber: {
        type: String,
        default: '',
    },
});

UserSchema.set('toJSON', {
    virtuals: true,
})

module.exports = model('User', UserSchema);
