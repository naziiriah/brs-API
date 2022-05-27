const Books = require('../model/bookModel')
const asyncHandler = require('express-async-handler')

const getBook = (req, res) => {
    
    res.status(200).json({
        message:"get books"
    })
}

const createBook = (req, res) => {

}
const updateBook =( req, res) => {

}
const deleteBook = (req, res) => {

}

module.exports = {
    getBook,
    createBook,
    updateBook,
    deleteBook
}