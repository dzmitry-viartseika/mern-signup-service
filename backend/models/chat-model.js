const { Schema, model } = require('mongoose');

const ChatSchema = new Schema({
    chatId: {
        type: String,
        required: true,
    },
    senderId: {
        type: String,
        required: true,
    },
    message: {
        type: Array,
    },
})

module.exports = model('Chat', ChatSchema);
