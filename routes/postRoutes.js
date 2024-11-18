const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');

router.get('/posts', postController.getPosts)
router.get('/posts/:postid', postController.getPost)
router.put('/posts/:postid', postController.updatePost)
router.delete('/posts/:postid', postController.deletePost)

router.patch('/posts/:postid/like', postController.likePost)


module.exports = router;