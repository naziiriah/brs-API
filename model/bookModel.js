const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    author:{
        type:String,
        required:true,    
    },
    ISBN: {
        type:String,
        required:true,
        unique:true
    },
    title :{
        type:String,
        required:true,
        unique:true
    },
    image :{
        type:String,
        required:true,
    },
    price : {
        type:Number,
        required:true,
    },
    available:{
        type:Boolean,
        required:true
    }
},{
    timestamps:true,
}
)

module.exports = mongoose.model('Book', bookSchema)