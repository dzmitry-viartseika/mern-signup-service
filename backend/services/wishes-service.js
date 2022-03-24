const mailService = require('./mail-service');

class WishesService {
    async sendWishesToEmail(email, text) {
        await mailService.sendWishesText(email, text);
    }
}

module.exports = new WishesService();
