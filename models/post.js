const mongoose = require('mongoose');
const Schema = mongoose.Schema

const postSchema = new Schema({
    text: {type: String, required: true},
    timestamp: {type: Date, default: Date.now},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    likes: {type: Number, required: true, default: 0},
    dislikes: {type: Number, required: true, default: 0},

});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

module.exports = Post