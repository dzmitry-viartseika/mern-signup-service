const WishesService = require('../services/wishes-service');

class WishesController {
    async sendWishesToEmail(req, res, next) {
        try {
            const { text, email } = req.body;
            console.log('text1', text);
            const response = await WishesService.sendWishesToEmail(email, text);
            return res.json(response);
        } catch (e) {
            next(e);
            console.log(e);
        }
    }
}

module.exports = new WishesController();
