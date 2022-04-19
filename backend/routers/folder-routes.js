const express = require('express');
const FoldersController = require('../controllers/folders-controller');
const router = express.Router();

router.post('/folder/', FoldersController.createFolder);
router.get('/folder/:id', FoldersController.getAllFilesByUserId);

module.exports = {
    routes: router
}
