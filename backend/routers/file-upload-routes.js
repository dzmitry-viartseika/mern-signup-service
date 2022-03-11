const express = require('express');
const {upload} = require('../helper/filehelper');
const {singleFileUpload, multipleFileUpload,
    getallSingleFiles, getallMultipleFiles} = require('../controllers/fileuploaderController');
const router = express.Router();


router.post('/singleFile', upload.single('file'), singleFileUpload);
router.post('/multipleFiles', upload.array('files'), multipleFileUpload);
router.get('/getSingleFiles', getallSingleFiles);
router.get('/getMultipleFiles', getallMultipleFiles);


module.exports = {
    routes: router
}
