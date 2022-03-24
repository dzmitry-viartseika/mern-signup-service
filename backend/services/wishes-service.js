const mailService = require('./mail-service');

class WishesService {
    async sendWishesToEmail(email, text) {
        console.log('text2', text);
        console.log('email', email);
        await mailService.sendWishesText(email, text);
    }
}

module.exports = new WishesService();
