const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const user  = require('../model/userModel')


const createUser = (req, res) => {
        res.status(200).json({
            message: "created"
        })
}

const loginUser = (req, res) =>{

}
 
const userInfo = (req, res) => {

}

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET , {
        expiresIn : '30d',
    })

}

module.exports = {
    createUser,
    loginUser,
    userInfo
}
