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
        data:Buffer,
        type:String,
        required:true,
    },
    price : {
        type:Number,
        required:true,
    },
    rented: {
        type:Array,
        max:10     
    }
},{
    timestamps:true,
}
)

module.exports = mongoose.model('Book', bookSchema)