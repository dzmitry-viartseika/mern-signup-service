const express = require('express');
const { upload } = require('../helper/filehelper');
const { singleFileUpload, multipleFileUpload,
    getallSingleFiles, getallMultipleFiles, deleteFile, getFileById } = require('../controllers/fileuploaderController');
const router = express.Router();


router.post('/singleFile', upload.single('file'), singleFileUpload);
router.post('/multipleFiles', upload.array('files'), multipleFileUpload);
router.get('/getSingleFiles', getallSingleFiles);
router.get('/getMultipleFiles', getallMultipleFiles);
router.delete('/delete-file', deleteFile);
router.get('/get-file', getFileById);


module.exports = {
    routes: router
}
