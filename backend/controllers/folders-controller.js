const FoldersService = require('../services/folders-service');

class FoldersController {
    async createFolder(req, res, next) {
        try {
            const { name, parentFolder, userCreatedFolder, folderType = 2 } = req.body;
            console.log('name', name);
            console.log('parentFolder', parentFolder);
            console.log('userCreatedFolder', userCreatedFolder);
            console.log('folderType', folderType);
            const response = await FoldersService.createFolder(name, parentFolder, userCreatedFolder, folderType);
            return res.json(response);
        } catch (e) {
            next(e);
            console.log(e);
        }
    }

    async getAllFilesByUserId(req, res, next) {
        try {
            const { id } = req.params;
            console.log('id', id);
            const response = await FoldersService.getAllFilesByUserId(id);
            return res.json(response);
        } catch (e) {
            next(e);
            console.log(e);
        }
    }
}

module.exports = new FoldersController();
