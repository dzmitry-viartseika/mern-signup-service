const express = require('express');
const WishesController = require('../controllers/wishes-controller');
const router = express.Router();

router.post('/send-wishes', WishesController.sendWishesToEmail);

module.exports = {
    routes: router
}
