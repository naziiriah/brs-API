const express = require('express')
const Router = express.Router()
const { 
    createBook, 
    getBook,
    deleteBook,
    updateBook 
} = require('../controller/bookController')

Router.route('/').get(getBook).post(createBook)
Router.route('/:id').put(updateBook).delete(deleteBook)


module.exports = Router
