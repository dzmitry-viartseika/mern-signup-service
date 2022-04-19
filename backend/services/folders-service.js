const FolderModel = require('../models/folder-model');

class FoldersService {
    async createFolder(name, parentFolder, userCreatedFolder, folderType) {
        const folder = await FolderModel.create({ name, parentFolder, userCreatedFolder, folderType });
        return {
            folder,
        }
    }

    async getAllFilesByUserId(id) {
        const folders = await FolderModel.find({ userCreatedFolder: id });
        return {
            folders,
        }
    }

    async deleteFolderById(id) {
        const file = await FolderModel.findOne({ _id: id });
        if (!file) {
            return {
                message: 'The File was not founded',
            }
        }
        console.log('file', file);
        file.remove();
        return {
            message: 'File was deleted',
        }
    }
}

module.exports = new FoldersService();
