const User = require('../models/user');


 exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send({message: 'All fields are required'})
    }
    const posts = []
    const user = new User({username,email,password,posts});

    try {
        const savedUser = await user.save();
        return res.status(201).json({message: 'User created successfully', savedUser});
    } catch(error){
        return res.status(500).send({message: 'Error creating user. Try again later'})
    }
}

exports.getUser = async (req, res) => {
    const {userid} = req.params

    try{
        const user = await User.findById(userid);

        if (!user) {
            return res.status(404).send({message: 'User not found'})
        }

        return res.status(200).json({message: 'User found successfully', user});
    } catch (error){
        return res.status(500).send({message: 'Error getting user. Try again later'})
    }
}



exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (!users) {
            return res.status(404).send({message: 'User not found'})
        }

        return res.status(200).json({message: 'User found successfully', users});
    } catch(error){
        console.error(error)
        return res.status(500).send({message: 'Error getting users. Try again later'})
    }
}

exports.deleteUser = async (req, res) => {
    const {userid} = req.params
    try{
        const user = await User.findByIdAndDelete(userid)

        if (!user) {
            return res.status(404).send({message: 'User not found'})
        }

        return res.status(200).json({message: 'User deleted successfully'});
   } catch (error){
       console.log(error)
       return res.status(400)
   }
}

exports.updateUser = async (req, res) => {
    try{
        const {userid} = req.params
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).send({message: 'All fields are required'})
        }
        const user = {username, email,password};
        const updatedUser = await User.findByIdAndUpdate(userid, user, {new: true});
        if (!updatedUser) {
            return res.status(404).send({message: 'User not found'})
        }
        return res.status(200).json({message: 'User updated successfully', updatedUser});
    } catch(error){
        console.log(error)
        return res.status(400).send({message: 'Database error' })
    }
}
