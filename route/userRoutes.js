const express = require ('express')
const Router = express.Router()
const {
    userInfo,
    createUser,
    loginUser
} = require('../controller/userController')

Router.route('/').post(createUser)
Router.route('/user').get(userInfo)
Router.route('/login').post(loginUser)


module.exports = Router