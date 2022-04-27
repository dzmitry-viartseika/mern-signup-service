const { Schema, model } = require('mongoose');

const ChatSchema = new Schema({
    chatId: {
        type: String,
    },
    senderId: {
        type: String,
    },
    message: {
        type: Array,
    },
    date: {
        type: Date,
    },
    messageId: {
        type: String,
    },
    user: {
        type: String,
    },
})

module.exports = model('Chat', ChatSchema);
