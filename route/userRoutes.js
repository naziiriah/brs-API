const express = require ('express')
const Router = express.Router()
const {
    userInfo,
    createUser,
    loginUser
} = require('../controller/userController')
const { protect} = require('../middleware/authMiddleware')

Router.route('/').post(createUser)
Router.route('/user').get(protect,userInfo)
Router.route('/login').post(loginUser)

module.exports = Router