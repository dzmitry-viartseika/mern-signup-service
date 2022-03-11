const Router = require('express');
const UserController = require('../controllers/user-controller');
const FileController = require('../controllers/file-controller');
const authMiddleWare = require('../middleware/auth-middleware');
const fileMiddleWare = require('../middleware/upload-file-middleware');
const passport = require('passport');
const { body } = require('express-validator');

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
router.post('/change-password/', UserController.changedPassword);
router.get('/forgot-password/:link', UserController.resetPassword);
router.get('/users', authMiddleWare, UserController.getUsers);

module.exports = router;
