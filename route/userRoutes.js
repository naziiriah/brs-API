const express = require ('express')
const Router = express.Router()
const {
    userInfo,
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    rentedList
} = require('../controller/userController')
const { protect} = require('../middleware/authMiddleware')

Router.route('/').post(createUser)
Router.route('/user').get(protect,userInfo)
Router.route('/login').post(loginUser)
Router.route('/update').put(protect, updateUser)
Router.route('/delete').delete(protect, deleteUser)
Router.route('/rented').put(protect, rentedList)


module.exports = Router