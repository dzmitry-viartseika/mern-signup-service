const multer = require('multer');

class FileController {
    async uploadFile(req,res,next) {
        console.log('req.file', req.file)
        try {
            if (req.file) {
                // path записать в базу
                res.json(req.file);
            }
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new FileController();
