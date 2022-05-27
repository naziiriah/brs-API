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
    },
    title :{
        type:String,
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