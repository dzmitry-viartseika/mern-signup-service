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
        file.remove();
        return {
            message: 'File was deleted',
            code: 200
        }
    }

    async updateCreatedFolder(id, data) {
        let file = await FolderModel.updateOne({ _id: id },  data);
        if (!file) {
            return {
                message: 'The File was not founded',
            }
        }
        return {
            message: 'File succesfully updated',
            code: 200
        }
    }
}

module.exports = new FoldersService();
