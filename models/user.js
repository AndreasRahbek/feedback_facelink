const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {type: String, required: true},
    //match sikrer at der er tegn før og efter @ og at der er et punktum til sidst. ".+" betyder et vilkårligt tegn.
    // det sikrer altså at en email altid har strukturen 'example@example.example'
    email: {type: String, required: true, match: /.+@.+\..+/},
    password: {type: String, required: true},
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }],
});

const User = mongoose.model('User', userSchema);
module.exports = User