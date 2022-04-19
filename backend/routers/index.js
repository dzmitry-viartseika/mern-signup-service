const Router = require('express');
const UserController = require('../controllers/user-controller');
const FolderController = require('../controllers/folders-controller');
const WishesController = require('../controllers/wishes-controller');
const WeekBasedWorkingCalendarDateController = require('../controllers/week-based-working-calendar-date-controller');
const authMiddleWare = require('../middleware/auth-middleware');
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
router.patch('/update-user', UserController.updateUser);
router.get('/me', UserController.getCurrentUser);
router.get('/working-days', WeekBasedWorkingCalendarDateController.getWorkingDaysList);
router.patch('/changed-working-days', WeekBasedWorkingCalendarDateController.changeWorkingDate);
router.post('/send-wishes', WishesController.sendWishesToEmail);
router.get('/get-users', UserController.getUsers);
router.post('/folder', FolderController.createFolder);
router.get('/folder/:id', FolderController.getAllFilesByUserId);
router.delete('/folder/:id', FolderController.deleteFolderById);

module.exports = router;
