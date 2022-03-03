const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    description: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            const err = new Error('Extention');
            err.code = 'EXTENTION';
            return cb(err);
        }
        cb(null, true);
    }
}).single('file');

router.post('/image', (req, res) => {
    upload(req, res, err => {
        let error = '';
        if (err.code === 'LIMIT_FILE_SIZE') {
            error = 'Картинка не более 2mb';
        }
        if (err.code === 'EXTENTION') {
            error = 'Только jpeg png jpg';
        }

        res.json({
            ok: !!error,
            error
        })
    })

})

module.exports = router;
