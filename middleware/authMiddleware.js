const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const user = require('../model/userModel')


const protect = asyncHandler (async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')
            next()
        }catch(error){
            console.log(error)
            res.status(400)
            throw new Error('not authorised')

        }
    }
    if(!token) {
        res.status(401)
            throw new Error('not authorised, no token recieved')
    }
})

module.exports = {protect}