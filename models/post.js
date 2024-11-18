const mongoose = require('mongoose');
const Schema = mongoose.Schema

const postSchema = new Schema({
    text: {type: String, required: true},
    userId: {type: Number, required: true},
    likes: {type: Number, required: true},
    dislikes: {type: Number, required: true},
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post