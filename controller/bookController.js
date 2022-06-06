const Books = require('../model/bookModel')
const user = require('../model/userModel')
const asyncHandler = require('express-async-handler')


// get all Books
// GET /

const getBook = asyncHandler( async (req, res) => {
    const books  = await Books.find()
    res.status(200).json(books)
})

// get books a specific user created
// GET /mybooks
const myBooks = asyncHandler(async (req, res) => {
    const books  = await Books.find({
        user:req.user.id
    })

    res.status(200).json(books)
})

// create new book for rentals
// POST /

const createBook = asyncHandler( async(req, res) => {
    
    const {title,ISBN,available ,author, }  = req.body
    const  image = req.file.originalname
    
    if(! title || !ISBN || !available || !author || !image ){
        res.status(400)
        throw new Error('Complete the form')
    }

    const isBookExist = await Books.findOne({
        title:title })

    const isISBNExist = await Books.findOne({
        ISBN:ISBN
    })

    if(isBookExist ){
        res.status(400).json({
            message:"this books exist already" 
        })
    }

    if(isISBNExist){
        res.status(400).json({
            message:"this ISBN code have been used" 
        })
    }


    const newBook = await Books.create({
      author:author,
      ISBN:ISBN,
      title:title,
      image:image,
      available:Boolean(available),
      user: req.user.id
    })
    
    res.status(200).json(newBook)
})

//  edit a books created by the user
// PUT /:id
const updateBook =asyncHandler( async( req, res) => {
    const book = await Books.findById((req.params.id))

    if(!book){
        res.status(400)
        throw new Error('Book not found')
    }
    const currentUser =await user.findById(req.user.id)

    if(!currentUser){
        res.status(401)
        throw new Error ('user not found')
    }

    if(book.user.toString() !== currentUser.id){
        res.status(401)
        throw new Error('user not authorised') 
    }

    const updatedBooks = await Books.findByIdAndUpdate(req.params.id, req.body, {
        new:true
    })
    res.status(200).json(updatedBooks)
})

// delete a particular book by the user
// DELETE /:id
const deleteBook = asyncHandler( async (req, res) => {

    const books  = await Books.findById((req.params.id))

    if(!books){
        res.status(400)
        throw new Error('Book does not exist!!')
    }

    
    const currentUser =await user.findById(req.user.id)

    if(!currentUser){
        res.status(401)
        throw new Error ('user not found')
    }

    if(books.user.toString() !== currentUser.id){
        res.status(401)
        throw new Error('user not authorised') 
    }

    await books.remove()
    res.status(200).json({
        message:"delete books"
    })
})

const updateRentedStatus = asyncHandler (async(req, res) => {
    const books  = await Books.findById((req.params.id))

    if(!books){
        res.status(400)
        throw new Error('Book does not exist!!')
    }
    
    const User = req.user
    
        
    const isRented = books.rented.filter(state => state.email === User.email)
        if(isRented.length === 0){
            await books.updateOne({$push:{rented : {email:User.email}}})
            res.status(200).json({
                message:'rent updated in book'
            })
            await User.updateOne({$push:{rented : books}})
        }else{
            res.status(400).json({
                message:'You have already rented this book'
            })
        }
})

module.exports = {
    getBook,
    myBooks,
    createBook,
    updateBook,
    deleteBook,
    updateRentedStatus
}