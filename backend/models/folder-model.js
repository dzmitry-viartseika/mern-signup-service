const { Schema, model } = require('mongoose');

const FolderSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    parentFolder: {
        type: String,
    },
    userCreatedFolder: {
        type: String,
        required: true,
    },
    folderType: {
        type: Number,
    }
})

module.exports = model('Folder', FolderSchema);
