const Post = require('../models/Post');


exports.createPost = async (req, res) => {
    const {text} = req.body;
    const {userid} = req.params

    if (!text || !userid) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    const {likes, dislikes} = 0

    const post = new Post({ text, userid, likes, dislikes});

    try {
        const savedPost = await post.save();
        return res.status(201).json({ message: 'Post created successfully', savedPost });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error creating post. Try again later.' });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});

        if (!posts || posts.length === 0) {
            return res.status(404).send({ message: 'No posts found' });
        }

        return res.status(200).json({ message: 'Posts retrieved successfully', posts });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error retrieving posts. Try again later.' });
    }
};

exports.getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        return res.status(200).json({ message: 'Post retrieved successfully', post });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error retrieving post. Try again later.' });
    }
};

exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { text, userId, likes, dislikes, date } = req.body;

    if (!text || !userId || likes === undefined || dislikes === undefined || !date) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { text, userId, likes, dislikes, date },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).send({ message: 'Post not found' });
        }

        return res.status(200).json({ message: 'Post updated successfully', updatedPost });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error updating post. Try again later.' });
    }
};


exports.deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).send({ message: 'Post not found' });
        }

        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error deleting post. Try again later.' });
    }
};


exports.likePost = async (req, res) => {
    const {id} = req.params;
    const updatedPost= Post.findByIdAndUpdate(
        id,
        {$inc: {likes : 1}},
        {new:true}
    )
    if(!updatedPost) {
        return res.status(404).send({ message: 'Post not found' });
    }
}