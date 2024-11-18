const User = require('../models/user');
const Post = require('../models/post')


exports.createUser = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return next(new Error('All fields are required'));
    }
    const user = new User({username,email,password});

    try {
        const savedUser = await user.save();
        return res.status(201).json({message: 'User created successfully', savedUser});
    } catch(error){
        return next(error)
    }
}

exports.getUser = async (req, res, next) => {
    const {userid} = req.params

    try{
        const user = await User.findById(userid);

        if (!user) {
            return next(new Error('Couldnt find user with given id'))
        }

        return res.status(200).json({message: 'User found successfully', user});
    } catch (error){
        return next(error)
    }
}


exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        if (!users) {
            return next(new Error('Couldnt find any users'))
        }

        return res.status(200).json({message: 'User found successfully', users});
    } catch(error){
        return next(error)
    }
}

exports.deleteUser = async (req, res, next) => {
    const {userid} = req.params
    try{
        const user = await User.findByIdAndDelete(userid)

        if (!user) {
            return next(new Error('User not found'))
        }

        return res.status(200).json({message: 'User deleted successfully'});
   } catch (error){
        return next(error)
   }
}

exports.updateUser = async (req, res, next) => {
    try {
        const  userid = req.params.userid;
        const userData = req.body;

        const user = await User.findById(userid);

        if (!user) {
            return next(new Error('User not found'));
        }

        Object.assign(user, userData)

        const updatedUser = await user.save();

        return res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        return next(error)
    }
}


//<------------------ User post methods ------------------>
exports.createPost = async (req, res, next) => {
    const {text, likes, dislikes} = req.body;
    const userId = req.params.userid

    if (!text || !userId) {
        return next(new Error('All fields required'))
    }


    const post = new Post({ text, userId, likes, dislikes});

    try {
        const savedPost = await post.save();
        return res.status(201).json({ message: 'Post created successfully', savedPost });
    } catch (error) {
        return next(error)
    }
}

exports.getPosts = async (req, res, next) => {
    const userID = req.params.userid
    try {
        const posts = await Post.find({userId: userID});

        if (!posts || posts.length === 0) {
            return next(new Error('No posts found'))
        }

        return res.status(200).json({ message: 'Posts retrieved successfully', posts });
    } catch (error) {
        return next(error)
    }
}

exports.getPost = async (req, res, next) => {
    const postId  = req.params.postid;
    const userId = req.params.userid

    try {
        const post = await Post.findById({_id: postId, userId: userId});

        if (!post) {
            return next(new Error('Post not found'))
        }

        return res.status(200).json({ message: 'Post retrieved successfully', post });
    } catch (error) {
        return next(error)
    }
}




