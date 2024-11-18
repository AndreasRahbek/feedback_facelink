const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.createUser);
router.get('/users:userid', userController.getUser)
router.get('/users', userController.getUsers);
router.put('/users/:userid', userController.updateUser);
router.delete('/users/:userid', userController.deleteUser);

module.exports = router;
