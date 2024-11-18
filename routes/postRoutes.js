const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');

router.post('/users/:userid/posts', postController.createPost)
router.get('/users/:userid/posts', postController.getPosts)
router.get('/users/:userid/posts/:postid', postController.getPost)
router.put('/users/:userid/posts/:postid', postController.updatePost)
router.delete('/users/:userid/posts/:postid', postController.deletePost)

module.exports = router;