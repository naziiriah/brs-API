const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
    },
    profilePicture: {
        type:String,
        default:''
    },
    isAdmin : {
        type:Boolean,
        default:false
    }    
},
{
    timestamp:true,
})

module.exports = mongoose.model('user', userSchema)