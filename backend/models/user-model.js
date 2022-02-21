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
    }
})

module.exports = model('User', UserSchema);
