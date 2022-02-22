const multer = require('multer');

const upload = multer({
    storage: Storage
}).single('testImage');

class fileController {
    async uploadFile(req,res,next) {
        upload(req, res, (err) => {
            if (err) {
                console.error(err);
            } else {
            }
        })
    }
}
