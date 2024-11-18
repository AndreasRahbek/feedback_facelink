const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//User routes
router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:userid', userController.getUser)
router.put('/users/:userid', userController.updateUser);
router.delete('/users/:userid', userController.deleteUser);

//User post routes
router.post('/users/:userid/posts', userController.createPost)
router.get('/users/:userid/posts', userController.getPosts)
router.get('/users/:userid/posts/:postid', userController.getPost)


module.exports = router;
