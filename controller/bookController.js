const Books = require('../model/bookModel')
const asyncHandler = require('express-async-handler')

const getBook = asyncHandler( async (req, res) => {
    const books  = await Books.find({
        user:req.user.id
    })
    res.status(200).json(books)
})

const createBook = asyncHandler( async(req, res) => {
    const books  = await Books.find({
        user:req.user.id
    })
    
    res.status(200).json({
        message:"create books"
    })
})
const updateBook =( req, res) => {
    res.status(200).json({
        message:"update books"
    })
}
const deleteBook = (req, res) => {
    res.status(200).json({
        message:"delete books"
    })
}

module.exports = {
    getBook,
    createBook,
    updateBook,
    deleteBook
}