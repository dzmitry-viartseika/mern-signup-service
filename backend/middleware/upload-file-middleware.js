const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
})

const types = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
        console.log('only jpg and png file supported')
    }
};

module.exports = function() {
    const upload = multer({ storage, fileFilter }).single('file');
    return function(req, res, next) {
        upload(req, res, (err) => {
            if(err) return res.status(400).send(err.message);

            next();
        });
    };
}
