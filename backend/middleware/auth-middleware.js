const ApiError = require('../exceptions/api-error');
const tokenService = require('../services/token-service');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.unAuthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.unAuthorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData) {
            return  next(ApiError.unAuthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        console.log(e);
        return next(ApiError.unAuthorizedError());
    }
}
