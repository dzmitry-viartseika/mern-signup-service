const ApiError = require('../exceptions/api-error');

module.exports = function (req, res, next) {
    try {

    } catch (e) {
        console.log(e);
        return next(ApiError.unAuthorizedError())
    }
}
