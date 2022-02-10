const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const UserController = require('../controllers/user-controller');
const user_controller = new UserController();

const router = new express.Router();

router.delete('/me', auth, user_controller.deleteUser);
router.get('/', admin,  user_controller.getUser);
router.post('/', user_controller.addUser);
router.post('/login', user_controller.login);
router.get('/me',auth, user_controller.profile);
router.post('/logout',auth, user_controller.logout);
router.patch('/updateName/:name', auth, user_controller.updateUser);
router.patch('/upDateBill/:id', user_controller.upDateBill);

module.exports = router;
