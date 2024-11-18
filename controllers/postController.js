const Post = require('../models/Post');
const mongoose = require('mongoose');

exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({});

        if (!posts || posts.length === 0) {
            return next(new Error('Post not found'))
        }

        return res.status(200).json({ message: 'Posts retrieved successfully', posts });
    } catch (error) {
        return next(error)
    }
}

exports.getPost = async (req, res, next) => {
    const  postId  = req.params.postid;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return next(new Error('Post not found'))
        }

        return res.status(200).json({ message: 'Post retrieved successfully', post });
    } catch (error) {
        return next(error)
    }
}

exports.updatePost = async (req, res, next) => {
    const  id = req.params.postid;
    const newPostData = req.body;

    try {
        // Find the existing post
        const post = await Post.findById(id);

        if (!post) {
            return next(new Error('Post not found'));
        }

        // Merge the existing post with the new data
        Object.assign(post, newPostData);

        const updatedPost = await post.save();

        return res.status(200).json({ message: 'Post updated successfully', updatedPost });

    } catch (error) {
        return next(error)
    }
}

exports.deletePost = async (req, res, next) => {
    const  id  = req.params.postid;

    try {
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return next(new Error('Post not found'))
        }

        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        return next(error)
    }
}

exports.likePost = async (req, res, next) => {
    const postId = req.params.postid;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return next(new Error('Invalid post ID'))
    }

    try{
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {$inc: {likes : 1}},
            {new:true}
        )
        if(!updatedPost) {
            return next(new Error('Post not found'))
        }
        return res.status(200).send({message: 'Post liked successfully'});
    } catch(err){
        return next(error)
    }
}