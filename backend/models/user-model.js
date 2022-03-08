const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: false,
    },
    googleId: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
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
    displayName: {
        type: String,
        default: '',
    },
})

module.exports = model('User', UserSchema);
