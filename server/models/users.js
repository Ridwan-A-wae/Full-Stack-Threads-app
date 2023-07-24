const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    post: {
        type:String,
        required:true

    },
    image: {
        type:String,
    },
    message: {
        type:String
    }
    
},{timestamps: true})

const User = mongoose.model('users', userSchema)

module.exports = User