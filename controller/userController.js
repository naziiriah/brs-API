const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const user  = require('../model/userModel')


const createUser = asyncHandler( async(req, res) => {
       const { name, email, password} = req.body

       if(!name || !email || !password ){
           res.status(400)
           throw new Error('Input fields character correctly!!')
       }

       const userExists = await user.findOne({email})

       if(userExists){
           res.status(400)
           throw new Error('User exists')
       }

       const salt = await bcrypt.genSalt(10)
       const hashedpassword = await bcrypt.hash(password, salt)

       const newUser = await user.create({
           name,
           email,
           password:hashedpassword,
       })

       if(newUser){
           res.status(200)
               .json({
                   _id:newUser.id,
                   email:newUser.email,
                   name:newUser.name,
                   token:generateToken(newUser.id)
               })
       }
       
})

const loginUser = asyncHandler( async(req, res) =>{
    const {email, password} = req.body

    if(!email || !user){
        res.status(400)
        throw new Error('Input credentials')
    }

    const userExists = await user.findOne({email})

    if(userExists && bcrypt.compare(password, userExists.password)){
        res.status(200).json({
            _id:userExists.id,
            name: userExists.name,
            email:userExists.email,
            rented:userExists.rented,
            profilePic:userExists.profilePicture,
            token: generateToken(userExists.id)
            })
    }else{
        res.status(400)
        throw new Error('This User does not exist!!')
    }
})
//  GET USER INFORMATION
//  
const userInfo = asyncHandler( async(req, res) => {
    const { _id, email, name, rented, profilePic } = req.user

    res.status(200).json({
        id:_id,
        email,
        name,
        rented,
        profilePic,
        token: generateToken(req.user.id)
    })
})

const updateUser  = asyncHandler(async(req, res) => {
    const currentuser =  req.user
    const { name, email, password} = req.body

       if(!name || !email || !password ){
           res.status(400)
           throw new Error('Input fields character correctly!!')
       }

       const salt = await bcrypt.genSalt(10)
       const hashedpassword = await bcrypt.hash(password, salt)

       const newUserInfo = {
           name,
           email,
           password:hashedpassword,
       }
    try{
        await user.findByIdAndUpdate(currentuser.id,newUserInfo, {
            new:true})
            res
                .status(200)
                .json({
                    message: 'account updated'
                    })
    }
    catch(error){
        res.status(403)
        throw new Error("You can't edit this account")
    }
})

const deleteUser = asyncHandler( async(req, res) => {
    const currentUser = req.user

    try{
        await user.findByIdAndDelete(currentUser.id)
         res.status(200).json({
             message: 'account deleted'
         })
     }
     catch(error){
         res.status(403)
         throw new Error("You can't deleted this account")
     }

})



const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET , {
        expiresIn : '30d',
    })

}

module.exports = {
    createUser,
    loginUser,
    userInfo,
    updateUser,
    deleteUser,
}
