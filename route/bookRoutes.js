const express = require('express')
const Router = express.Router()
const { 
    createBook, 
    getBook,
    deleteBook,
    updateBook, 
    myBooks
} = require('../controller/bookController')
const uploads = require('../storage/storage')
const {protect} = require('../middleware/authMiddleware')


Router.route('/').get(getBook).post(uploads.single('image'), protect, createBook)
Router.route('/:id').put(uploads.single('image'), protect, updateBook).delete( protect, deleteBook)
Router.route('/mybooks').get(protect, myBooks)

module.exports = Router
