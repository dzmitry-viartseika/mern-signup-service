const FolderModel = require('../models/folder-model');

class FoldersService {
    async createFolder(name, parentFolder, userCreatedFolder, folderType) {
        const folder = await FolderModel.create({ name, parentFolder, userCreatedFolder, folderType });
        return {
            folder,
        }
    }

    async getAllFilesByUserId(id) {
        console.log('id', id);
        const folders = await FolderModel.find({ userCreatedFolder: id });
        console.log('folders', folders);
        return {
            folders,
        }
    }
}

module.exports = new FoldersService();
