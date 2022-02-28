const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true)
        } else {
            console.log('only jpg and png file supported')
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload;
