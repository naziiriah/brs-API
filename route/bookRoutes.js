const express = require('express')
const Router = express.Router()
const { 
    createBook, 
    getBook,
    deleteBook,
    updateBook, 
    myBooks,
    updateRentedStatus
} = require('../controller/bookController')
const uploads = require('../storage/storage')
const {protect} = require('../middleware/authMiddleware')


Router.route('/').get(getBook).post( protect, uploads,createBook)
Router.route('/:id').put( protect, uploads,updateBook).delete( protect, deleteBook)
Router.route('/mybooks').get(protect, myBooks)
Router.route('/rent/:id').put(protect, updateRentedStatus)

module.exports = Router
