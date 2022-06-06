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
    },
    rented : {
        type: Array,
        max:10
    }    
},
{
    timestamp:true,
})

module.exports = mongoose.model('user', userSchema)