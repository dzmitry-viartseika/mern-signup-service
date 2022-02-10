const express = require('express');
const UserController = require('../controllers/category-controllers');
const user_controller = new UserController();
const router = new express.Router();

router.get('/getCategoryList', user_controller.getCategoryList);
router.post('/newCategory', user_controller.newCategory);
router.patch('/editCategory/:id', user_controller.editCategory)
// router.delete('/deleteCategory', user_controller.deleteCategory);

module.exports = router;
