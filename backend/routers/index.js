const Router = require('express');
const UserController = require('../controllers/user-controller');
const authMiddleWare = require('../middleware/auth-middleware');
const { body } = require('express-validator');
const upload = require('../middleware/upload-file-middleware');

const router = new Router();

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.post('/forgot-password/', UserController.forgotPassword);
router.post('/forgot-password/:token', UserController.forgotPassword);
router.get('/users', authMiddleWare, UserController.getUsers);
router.post('/upload')

module.exports = router;
